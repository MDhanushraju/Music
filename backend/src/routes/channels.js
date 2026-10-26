import express from 'express';
import { dbRepository } from '../db/repository.js';

export function createChannelsRouter({ broadcastWsEvent }) {
  const router = express.Router();

  // GET /api/v1/channels/:id - Channel details
  router.get('/:id', async (req, res) => {
    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }
      res.json({ success: true, data: channel });
    } catch (err) {
      console.error('Error fetching channel details:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

  // POST /api/v1/channels - Creator creates a new channel
  router.post('/', async (req, res) => {
    const { title, rj, cityName, genre, lang, gradient, ownerId } = req.body;
    if (!title || !cityName) {
      return res.status(400).json({ success: false, message: 'Title and cityName are required' });
    }

    try {
      const newChannel = await dbRepository.createChannel({
        title,
        rj,
        cityName,
        genre,
        lang,
        gradient,
        ownerId
      });

      // Notify listeners via WebSocket
      broadcastWsEvent('channel:live', {
        channelId: newChannel.id,
        name: newChannel.title,
        city: cityName,
        channel: newChannel
      });

      res.status(201).json({ success: true, data: newChannel });
    } catch (err) {
      console.error('Error creating channel:', err);
      res.status(500).json({ success: false, message: 'Failed to create channel' });
    }
  });

  // POST /api/v1/channels/:id/broadcasts - Go live flow
  router.post('/:id/broadcasts', async (req, res) => {
    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }

      const broadcast = await dbRepository.startBroadcast(channel.id);

      broadcastWsEvent('channel:live', {
        channelId: channel.id,
        name: channel.title,
        city: channel.cityId,
        broadcast
      });

      res.json({ success: true, data: broadcast });
    } catch (err) {
      console.error('Error starting broadcast:', err);
      res.status(500).json({ success: false, message: 'Failed to start broadcast' });
    }
  });

  // POST /api/v1/channels/:id/end - RJ ends the live show; channel falls back to AutoDJ
  router.post('/:id/end', async (req, res) => {
    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }

      await dbRepository.endBroadcast(channel.id);

      broadcastWsEvent('channel:offline', { channelId: channel.id });
      res.json({ success: true, data: { ...channel, isLive: false, nowPlaying: null } });
    } catch (err) {
      console.error('Error ending broadcast:', err);
      res.status(500).json({ success: false, message: 'Failed to end broadcast' });
    }
  });

  // POST /api/v1/channels/:id/nowplaying - RJ console reports current track or talk segment
  router.post('/:id/nowplaying', async (req, res) => {
    const { title, artist, type } = req.body || {};
    if (type !== 'music' && type !== 'talk') {
      return res.status(400).json({ success: false, message: 'type must be "music" or "talk"' });
    }

    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }

      const cleanTitle = String(title || '').slice(0, 200);
      const cleanArtist = String(artist || '').slice(0, 200);

      const nowPlaying = await dbRepository.updateNowPlaying(channel.id, {
        title: cleanTitle,
        artist: cleanArtist,
        type
      });

      broadcastWsEvent('nowplaying:update', { channelId: channel.id, ...nowPlaying });
      res.json({ success: true, data: nowPlaying });
    } catch (err) {
      console.error('Error updating now playing:', err);
      res.status(500).json({ success: false, message: 'Failed to update now playing' });
    }
  });

  // POST /api/v1/channels/:id/listen - Listener tunes in
  router.post('/:id/listen', async (req, res) => {
    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }

      const listeners = await dbRepository.incrementListeners(channel.id);

      broadcastWsEvent('listeners:update', {
        channelId: channel.id,
        count: listeners
      });

      res.json({
        success: true,
        data: {
          mode: channel.isLive ? 'live' : 'autodj',
          channelId: channel.id,
          listeners,
          nowPlaying: channel.nowPlaying || {
            title: channel.title,
            rj: channel.rj,
            type: 'live_stream'
          }
        }
      });
    } catch (err) {
      console.error('Error tuning into channel:', err);
      res.status(500).json({ success: false, message: 'Failed to tune in' });
    }
  });

  // POST /api/v1/channels/:id/heartbeat - Heartbeat for active listener presence
  router.post('/:id/heartbeat', async (req, res) => {
    try {
      const channel = await dbRepository.getChannelById(req.params.id);
      if (!channel) {
        return res.status(404).json({ success: false, message: 'Channel not found' });
      }
      res.json({ success: true, listeners: channel.listeners });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Heartbeat error' });
    }
  });

  // PUT /api/v1/channels/:id/subscribe - Subscribe to a channel
  router.put('/:id/subscribe', async (req, res) => {
    const userId = req.body?.userId || req.headers['x-user-id'] || 'usr_dev_1';
    try {
      await dbRepository.subscribe(userId, req.params.id);
      res.json({ success: true, message: 'Subscribed successfully' });
    } catch (err) {
      console.error('Subscribe error:', err);
      res.status(500).json({ success: false, message: 'Failed to subscribe' });
    }
  });

  // DELETE /api/v1/channels/:id/subscribe - Unsubscribe
  router.delete('/:id/subscribe', async (req, res) => {
    const userId = req.body?.userId || req.headers['x-user-id'] || 'usr_dev_1';
    try {
      await dbRepository.unsubscribe(userId, req.params.id);
      res.json({ success: true, message: 'Unsubscribed successfully' });
    } catch (err) {
      console.error('Unsubscribe error:', err);
      res.status(500).json({ success: false, message: 'Failed to unsubscribe' });
    }
  });

  return router;
}
