import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';
import { WebSocketServer, WebSocket } from 'ws';
import dotenv from 'dotenv';
import { initializeDatabase } from './db/init.js';
import { dbRepository } from './db/repository.js';
import { getDbStatus, getPool } from './db/pool.js';
import { createCitiesRouter } from './routes/cities.js';
import { createChannelsRouter } from './routes/channels.js';
import { createAuthRouter } from './routes/auth.js';
import { createJamendoRouter } from './routes/jamendo.js';
import { createRadioBrowserRouter } from './routes/radioBrowser.js';
import { createAiRjRouter } from './routes/aiRj.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// Enable CORS
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));
app.use(express.json());

// WebSocket Server for realtime broadcast sync and listener counts
const wss = new WebSocketServer({ server, path: '/ws' });

function broadcastWsEvent(event, data) {
  const payload = JSON.stringify({ event, data, timestamp: new Date().toISOString() });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload);
    }
  });
}

wss.on('connection', (ws) => {
  ws.send(JSON.stringify({
    event: 'connected',
    data: { message: 'Connected to Tarang Realtime Gateway' }
  }));

  ws.on('message', (message) => {
    try {
      const parsed = JSON.parse(message.toString());
      if (parsed.event === 'chat:message') {
        // Broadcast listener chat message to all connected clients
        broadcastWsEvent('chat:message', parsed.data);
      }
    } catch (err) {
      console.error('Error handling WS message:', err);
    }
  });
});

// Periodic organic listener fluctuation
setInterval(async () => {
  try {
    const channels = await dbRepository.getChannelsByCity('bengaluru', { filter: 'live' });
    if (channels && channels.length > 0) {
      const liveCh = channels[Math.floor(Math.random() * channels.length)];
      const delta = Math.floor(Math.random() * 5) - 2;
      const newCount = Math.max(50, (liveCh.listeners || 100) + delta);
      await dbRepository.updateListenerCount(liveCh.id, newCount);

      broadcastWsEvent('listeners:update', {
        channelId: liveCh.id,
        count: newCount
      });
    }
  } catch {
    // Non-blocking background fluctuation
  }
}, 4500);

// API Routes
app.use('/api/v1/cities', createCitiesRouter());
app.use('/api/v1/channels', createChannelsRouter({ broadcastWsEvent }));
app.use('/api/v1/auth', createAuthRouter());
app.use('/api/v1/jamendo', createJamendoRouter());
app.use('/api/v1/radio-browser', createRadioBrowserRouter());
app.use('/api/v1/ai-rj', createAiRjRouter());

// README Route Alias: POST /api/v1/broadcasts/:id/end
app.post('/api/v1/broadcasts/:id/end', async (req, res) => {
  try {
    const channelId = req.params.id;
    await dbRepository.endBroadcast(channelId);
    broadcastWsEvent('channel:offline', { channelId, isLive: false });
    res.json({ success: true, message: 'Broadcast ended' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to end broadcast' });
  }
});

// Production Health & Status Endpoint
app.get('/api/v1/health', async (req, res) => {
  try {
    const dbStatus = getDbStatus();
    const stats = await dbRepository.getStats();
    res.json({
      status: 'ok',
      service: 'Tarang Radio Production API',
      environment: process.env.NODE_ENV || 'production',
      uptime: process.uptime(),
      database: {
        engine: stats.engine,
        connected: dbStatus.connected
      },
      metrics: {
        citiesCount: stats.citiesCount,
        channelsCount: stats.channelsCount,
        liveChannelsCount: stats.liveChannelsCount,
        activeWsClients: wss.clients.size
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Serve Frontend Static Build (Unified Production Deployment)
const frontendDistPath = path.resolve(__dirname, '../../frontend/dist');
if (fs.existsSync(frontendDistPath)) {
  console.log(`📦 Serving frontend static build from ${frontendDistPath}`);
  app.use(express.static(frontendDistPath));

  app.get('/studio', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'studio.html'));
  });

  app.get('/login', (req, res) => {
    res.sendFile(path.join(frontendDistPath, 'login.html'));
  });

  // Fallback for HTML5 client routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/ws')) {
      return next();
    }
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('📻 Tarang Radio API Server is running. To serve the UI, run `npm run build:frontend`.');
  });
}

// Start Server and Initialize Database
async function startServer() {
  try {
    console.log('⚡ Initializing database layer...');
    await initializeDatabase();

    server.listen(PORT, () => {
      console.log(`📻 Tarang Radio Production Server running at http://localhost:${PORT}`);
      console.log(`⚡ WebSocket gateway active at ws://localhost:${PORT}/ws`);
    });
  } catch (err) {
    console.error('Fatal startup error:', err);
    process.exit(1);
  }
}

// Graceful Shutdown
function handleShutdown(signal) {
  console.log(`\n🛑 Received ${signal}. Gracefully shutting down...`);
  wss.close(() => {
    console.log('⚡ WebSocket server closed.');
  });
  server.close(async () => {
    console.log('📻 HTTP server closed.');
    const pool = getPool();
    if (pool) {
      await pool.end();
      console.log('🐘 PostgreSQL pool disconnected.');
    }
    process.exit(0);
  });
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

startServer();
