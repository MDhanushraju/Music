-- Tarang Database Schema
-- Production PostgreSQL DDL for Tarang City Radio

CREATE TABLE IF NOT EXISTS cities (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  slug VARCHAR(128) UNIQUE NOT NULL,
  freq VARCHAR(64) NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  phone VARCHAR(32) UNIQUE,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(32) NOT NULL DEFAULT 'listener', -- 'listener' | 'creator' | 'admin'
  avatar VARCHAR(255) DEFAULT 'AJ',
  bio TEXT DEFAULT 'Creator & Audiophile',
  home_city_id VARCHAR(64) REFERENCES cities(id) ON DELETE SET NULL,
  settings JSONB DEFAULT '{"bitrate":"320","staticBurst":true,"autoDucking":true,"visualizer":true,"liveAlerts":true,"floatingReactions":true,"homeCity":"bengaluru"}',
  listening_hours NUMERIC(6,1) DEFAULT 48.0,
  is_online BOOLEAN DEFAULT FALSE,
  last_login_at TIMESTAMPTZ,
  last_logout_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS channels (
  id VARCHAR(64) PRIMARY KEY,
  city_id VARCHAR(64) REFERENCES cities(id) ON DELETE CASCADE,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  rj VARCHAR(128) NOT NULL,
  lang VARCHAR(128) DEFAULT 'Hindi & English',
  tags TEXT[] DEFAULT '{}',
  listeners INT DEFAULT 0,
  is_live BOOLEAN DEFAULT FALSE,
  gradient VARCHAR(255),
  talk_script TEXT,
  owner_id VARCHAR(64) REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS broadcasts (
  id VARCHAR(64) PRIMARY KEY,
  channel_id VARCHAR(64) REFERENCES channels(id) ON DELETE CASCADE,
  livekit_room VARCHAR(128),
  publish_token VARCHAR(255),
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMPTZ,
  peak_listeners INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
  channel_id VARCHAR(64) REFERENCES channels(id) ON DELETE CASCADE,
  notify BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, channel_id)
);

CREATE TABLE IF NOT EXISTS now_playing (
  channel_id VARCHAR(64) PRIMARY KEY REFERENCES channels(id) ON DELETE CASCADE,
  title VARCHAR(255),
  artist VARCHAR(255),
  type VARCHAR(32) DEFAULT 'music', -- 'music' | 'talk'
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users (phone);
CREATE INDEX IF NOT EXISTS idx_channels_city_live ON channels (city_id, is_live);
CREATE INDEX IF NOT EXISTS idx_channels_slug ON channels (slug);
CREATE INDEX IF NOT EXISTS idx_broadcasts_channel ON broadcasts (channel_id, started_at DESC);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user ON subscriptions (user_id);
