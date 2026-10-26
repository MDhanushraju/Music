import express from 'express';
import { dbRepository } from '../db/repository.js';

export function createCitiesRouter() {
  const router = express.Router();

  // GET /api/v1/cities - List all cities with active live channel counts
  router.get('/', async (req, res) => {
    try {
      const list = await dbRepository.getCities();
      res.json({ success: true, data: list });
    } catch (err) {
      console.error('Error fetching cities:', err);
      res.status(500).json({ success: false, message: 'Failed to fetch cities' });
    }
  });

  // GET /api/v1/cities/:slug/channels - Get channels for a city
  router.get('/:slug/channels', async (req, res) => {
    const { slug } = req.params;
    const { filter, genre } = req.query; // filter: all | live | subscribed

    try {
      const cities = await dbRepository.getCities();
      const city = cities.find(c => c.slug === slug || c.id === slug);
      if (!city) {
        return res.status(404).json({ success: false, message: `City '${slug}' not found` });
      }

      const channels = await dbRepository.getChannelsByCity(slug, { filter, genre });

      res.json({
        success: true,
        city,
        data: channels
      });
    } catch (err) {
      console.error(`Error fetching channels for city ${slug}:`, err);
      res.status(500).json({ success: false, message: 'Failed to fetch channels' });
    }
  });

  return router;
}
