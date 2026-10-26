import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getPool, testConnection } from './pool.js';
import { CITIES, INITIAL_CHANNELS } from '../data/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fallback file storage location
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.resolve(DATA_DIR, 'tarang-db.json');

export async function initializeDatabase() {
  const status = await testConnection();

  if (status.ok) {
    console.log(`🐘 Connected to PostgreSQL (${status.version?.split(' ')[0] || 'active'})`);
    await initPostgresSchema();
    await seedPostgresIfEmpty();
    return { engine: 'postgres', connected: true };
  } else {
    console.warn(`⚠️ PostgreSQL unavailable (${status.reason}).`);
    console.log(`📂 Using embedded persistent JSON database at ${DB_FILE}`);
    initFileStorageIfEmpty();
    return { engine: 'file-fallback', connected: false };
  }
}

async function initPostgresSchema() {
  const pool = getPool();
  const schemaPath = path.resolve(__dirname, 'schema.sql');
  const ddl = fs.readFileSync(schemaPath, 'utf8');

  try {
    await pool.query(ddl);
    console.log('✅ PostgreSQL schema verified & up to date.');
  } catch (err) {
    console.error('❌ Failed to run schema DDL:', err.message);
    throw err;
  }
}

async function seedPostgresIfEmpty() {
  const pool = getPool();
  try {
    const { rows: cityRows } = await pool.query('SELECT COUNT(*) as count FROM cities;');
    if (parseInt(cityRows[0].count, 10) === 0) {
      console.log('🌱 Seeding PostgreSQL with initial cities...');
      for (const city of CITIES) {
        await pool.query(
          `INSERT INTO cities (id, name, slug, freq, lat, lng)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (id) DO NOTHING;`,
          [city.id, city.name, city.slug, city.freq, city.lat, city.lng]
        );
      }
    }

    const { rows: chanRows } = await pool.query('SELECT COUNT(*) as count FROM channels;');
    if (parseInt(chanRows[0].count, 10) === 0) {
      console.log('🌱 Seeding PostgreSQL with initial channels...');
      for (const ch of INITIAL_CHANNELS) {
        await pool.query(
          `INSERT INTO channels (id, city_id, slug, title, rj, lang, tags, listeners, is_live, gradient, talk_script)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
           ON CONFLICT (id) DO NOTHING;`,
          [
            ch.id,
            ch.cityId,
            ch.slug,
            ch.title,
            ch.rj,
            ch.lang,
            ch.tags,
            ch.listeners,
            ch.isLive,
            ch.gradient,
            ch.talkScript
          ]
        );
      }
      console.log('✅ PostgreSQL seeding completed successfully.');
    }
  } catch (err) {
    console.error('⚠️ Error during PostgreSQL seeding:', err.message);
  }
}

function initFileStorageIfEmpty() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      cities: CITIES,
      channels: INITIAL_CHANNELS,
      users: [
        {
          id: 'usr_dev_1',
          name: 'Alwin Joseph',
          phone: '+91 98765 43210',
          role: 'creator',
          homeCity: 'Bengaluru'
        }
      ],
      subscriptions: [],
      broadcasts: [],
      nowPlaying: {}
    };

    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf8');
    console.log('✅ Created fresh fallback database file with initial seed.');
  }
}

export function loadFileData() {
  try {
    initFileStorageIfEmpty();
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading fallback DB file:', err.message);
    return {
      cities: [...CITIES],
      channels: [...INITIAL_CHANNELS],
      users: [],
      subscriptions: [],
      broadcasts: [],
      nowPlaying: {}
    };
  }
}

export function saveFileData(data) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing fallback DB file:', err.message);
  }
}
