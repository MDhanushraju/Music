# 🚀 Tarang Radio - Production Deployment Guide

This guide outlines how to deploy Tarang for production and demo environments.

---

## 🏗️ Architecture Overview

* **Unified Full-Stack Service**: The Express backend serves both the REST API, WebSocket real-time gateway, and the pre-built Vite frontend static assets from a single port (`PORT`, default `4000`).
* **Database Layer**:
  * **Primary**: PostgreSQL (Docker, Supabase, Neon, Render, AWS RDS, or Railway).
  * **Zero-Config Fallback**: If `DATABASE_URL` is not provided, Tarang automatically falls back to an embedded JSON database (`backend/data/tarang-db.json`) so demos run immediately with persistent data.
* **Realtime**: WebSockets (`ws://.../ws`) for live listener counts, on-air broadcasts, and chat sync.

---

## ⚡ Option 1: 1-Click Cloud Deployment (Render - Recommended)

Render provides a free web service and free managed PostgreSQL database.

1. Push your repository to GitHub or GitLab.
2. In [Render Dashboard](https://dashboard.render.com), click **New +** → **Blueprint**.
3. Select your repository. Render will detect [`render.yaml`](../render.yaml) automatically:
   * Sets up a managed PostgreSQL database (`tarang-db`)
   * Builds the Vite frontend (`npm run build:frontend`)
   * Launches the production server on `$PORT` with auto-wired `DATABASE_URL`.
4. Click **Apply**. Your app will be live on an HTTPS URL (e.g. `https://tarang-radio.onrender.com`).

---

## 🐳 Option 2: Docker & Docker Compose

Run the entire production stack locally or on any cloud VPS (Ubuntu, Debian, AWS EC2, DigitalOcean).

### Prerequisites
* Docker & Docker Compose installed.

### Commands

```bash
# 1. Clone repository & enter folder
git clone <your-repo-url>
cd tarang-radio

# 2. Start PostgreSQL and Tarang App
docker compose up --build -d

# 3. Check container logs
docker compose logs -f app
```

Once running:
* **Web App & Studio**: `http://localhost:4000`
* **API Health Check**: `http://localhost:4000/api/v1/health`
* **PostgreSQL Database**: `localhost:5432`

---

## 🌐 Option 3: Managed Cloud PostgreSQL (Supabase / Neon / Railway)

You can pair any cloud Postgres provider with a cloud Node.js host.

1. **Create Database**:
   * Create a free database on [Supabase](https://supabase.com) or [Neon](https://neon.tech).
   * Copy the Postgres Connection String (e.g. `postgres://postgres.[ref]:[password]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require`).

2. **Configure Environment Variables**:
   In your hosting provider (Render, Railway, Fly.io, Heroku):
   ```ini
   NODE_ENV=production
   PORT=4000
   DATABASE_URL=postgres://user:password@host:5432/dbname?sslmode=require
   CORS_ORIGIN=*
   JWT_SECRET=your-secure-random-key
   ```

3. **Deploy & Build**:
   ```bash
   npm run build:frontend
   npm --prefix backend start
   ```

Tarang will automatically run DDL table migrations and seed the 8 cities and 14 initial channels on first startup!

---

## 🖥️ Option 4: Linux VPS / Dedicated Server (PM2 + Nginx)

### 1. Build and Install Dependencies
```bash
cd tarang-radio
npm install
npm run build:frontend
npm --prefix backend install --omit=dev
```

### 2. Configure PM2 Process Manager
```bash
npm install -g pm2
pm2 start backend/src/server.js --name "tarang-radio" --env NODE_ENV=production,PORT=4000
pm2 save
pm2 startup
```

### 3. Nginx Reverse Proxy Configuration (with SSL & WebSocket support)
```nginx
server {
    listen 80;
    server_name radio.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🧪 Production Health Check & Verification

Once deployed, query the health endpoint:

```bash
curl https://your-domain.com/api/v1/health
```

Expected JSON response:
```json
{
  "status": "ok",
  "service": "Tarang Radio Production API",
  "environment": "production",
  "uptime": 128.5,
  "database": {
    "engine": "postgres",
    "connected": true
  },
  "metrics": {
    "citiesCount": 8,
    "channelsCount": 14,
    "liveChannelsCount": 14,
    "activeWsClients": 1
  }
}
```
