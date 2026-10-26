import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let pool = null;
let isConnected = false;
let dbEngine = 'none'; // 'postgres' | 'file-fallback'

export function getPool() {
  if (pool) return pool;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    return null;
  }

  // Detect SSL need (cloud hosted databases usually enforce SSL)
  const isLocalhost = connectionString.includes('localhost') || connectionString.includes('127.0.0.1');
  const sslConfig = isLocalhost ? false : { rejectUnauthorized: false };

  pool = new Pool({
    connectionString,
    ssl: sslConfig,
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });

  pool.on('error', (err) => {
    console.error('⚠️ Unexpected error on idle PostgreSQL client:', err.message);
  });

  return pool;
}

export async function testConnection() {
  const p = getPool();
  if (!p) {
    isConnected = false;
    dbEngine = 'file-fallback';
    return { ok: false, engine: dbEngine, reason: 'No DATABASE_URL configured' };
  }

  try {
    const client = await p.connect();
    try {
      const res = await client.query('SELECT NOW() as now, version() as version;');
      isConnected = true;
      dbEngine = 'postgres';
      return {
        ok: true,
        engine: dbEngine,
        now: res.rows[0].now,
        version: res.rows[0].version
      };
    } finally {
      client.release();
    }
  } catch (err) {
    isConnected = false;
    dbEngine = 'file-fallback';
    return {
      ok: false,
      engine: dbEngine,
      reason: err.message
    };
  }
}

export function getDbStatus() {
  return {
    connected: isConnected,
    engine: dbEngine
  };
}
