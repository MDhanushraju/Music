import { getPool, getDbStatus } from './pool.js';
import { loadFileData, saveFileData } from './init.js';

/**
 * Format PostgreSQL row to match Tarang client model
 */
function formatChannelRow(row, nowPlaying = null) {
  if (!row) return null;
  return {
    id: row.id,
    cityId: row.city_id || row.cityId,
    slug: row.slug,
    title: row.title,
    rj: row.rj,
    lang: row.lang,
    tags: Array.isArray(row.tags) ? row.tags : (row.tags ? [row.tags] : []),
    listeners: parseInt(row.listeners || 0, 10),
    isLive: Boolean(row.is_live !== undefined ? row.is_live : row.isLive),
    gradient: row.gradient,
    talkScript: row.talk_script || row.talkScript,
    ownerId: row.owner_id || row.ownerId || null,
    nowPlaying: nowPlaying || (row.now_playing ? row.now_playing : null),
    createdAt: row.created_at || row.createdAt
  };
}

function formatCityRow(row, liveCount = 0, channelCount = 0) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    freq: row.freq,
    lat: parseFloat(row.lat) || 0,
    lng: parseFloat(row.lng) || 0,
    liveCount: parseInt(liveCount || 0, 10),
    channelCount: parseInt(channelCount || 0, 10)
  };
}

function formatUserRow(row) {
  if (!row) return null;
  let settings = row.settings;
  if (typeof settings === 'string') {
    try {
      settings = JSON.parse(settings);
    } catch {
      settings = {};
    }
  }

  const defaultSettings = {
    bitrate: '320',
    staticBurst: true,
    autoDucking: true,
    visualizer: true,
    liveAlerts: true,
    floatingReactions: true,
    homeCity: row.home_city_id || row.homeCity || 'bengaluru'
  };

  return {
    id: row.id,
    name: row.name || 'Alwin Joseph',
    phone: row.phone || '',
    email: row.email || '',
    role: row.role || 'creator',
    avatar: row.avatar || (row.name ? row.name.slice(0, 2).toUpperCase() : 'AJ'),
    bio: row.bio || 'Creator & Audiophile',
    homeCity: row.home_city_id || row.homeCity || 'Bengaluru',
    settings: { ...defaultSettings, ...(settings || {}) },
    listeningHours: parseFloat(row.listening_hours || row.listeningHours || 48.0),
    isOnline: Boolean(row.is_online !== undefined ? row.is_online : row.isOnline),
    lastLoginAt: row.last_login_at || row.lastLoginAt || null,
    lastLogoutAt: row.last_logout_at || row.lastLogoutAt || null,
    createdAt: row.created_at || row.createdAt
  };
}

export const dbRepository = {
  /**
   * Get all cities with liveCount and channelCount
   */
  async getCities() {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const query = `
        SELECT 
          c.id, c.name, c.slug, c.freq, c.lat, c.lng,
          COUNT(ch.id) AS channel_count,
          COUNT(ch.id) FILTER (WHERE ch.is_live = true) AS live_count
        FROM cities c
        LEFT JOIN channels ch ON ch.city_id = c.id
        GROUP BY c.id, c.name, c.slug, c.freq, c.lat, c.lng
        ORDER BY c.name ASC;
      `;
      const { rows } = await pool.query(query);
      return rows.map(r => formatCityRow(r, r.live_count, r.channel_count));
    }

    // Fallback file storage
    const data = loadFileData();
    return data.cities.map(city => {
      const cityChannels = data.channels.filter(c => c.cityId === city.id);
      const liveCount = cityChannels.filter(c => c.isLive).length;
      return {
        ...city,
        liveCount,
        channelCount: cityChannels.length
      };
    });
  },

  /**
   * Get channels for a city with filtering and sorting
   */
  async getChannelsByCity(citySlug, { filter = 'all', genre = 'all' } = {}) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      let query = `
        SELECT 
          ch.*,
          row_to_json(np.*) as now_playing,
          c.name as city_name
        FROM channels ch
        JOIN cities c ON ch.city_id = c.id
        LEFT JOIN now_playing np ON np.channel_id = ch.id
        WHERE (c.slug = $1 OR c.id = $1)
      `;
      const params = [citySlug];

      if (filter === 'live') {
        params.push(true);
        query += ` AND ch.is_live = $${params.length}`;
      }

      if (genre && genre !== 'all') {
        params.push(`%${genre.toLowerCase()}%`);
        query += ` AND array_to_string(ch.tags, ',') ILIKE $${params.length}`;
      }

      query += ` ORDER BY ch.is_live DESC, ch.listeners DESC;`;

      const { rows } = await pool.query(query, params);
      return rows.map(r => formatChannelRow(r, r.now_playing));
    }

    // Fallback file storage
    const data = loadFileData();
    const city = data.cities.find(c => c.slug === citySlug || c.id === citySlug);
    if (!city) return [];

    let filtered = data.channels.filter(c => c.cityId === city.id);

    if (filter === 'live') {
      filtered = filtered.filter(c => c.isLive);
    }

    if (genre && genre !== 'all') {
      filtered = filtered.filter(c =>
        c.tags && c.tags.some(t => t.toLowerCase() === genre.toLowerCase())
      );
    }

    filtered.sort((a, b) => {
      if (a.isLive !== b.isLive) {
        return a.isLive ? -1 : 1;
      }
      return (b.listeners || 0) - (a.listeners || 0);
    });

    return filtered.map(c => ({
      ...c,
      nowPlaying: data.nowPlaying[c.id] || null
    }));
  },

  /**
   * Get single channel by ID or Slug
   */
  async getChannelById(idOrSlug) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const query = `
        SELECT 
          ch.*,
          row_to_json(c.*) as city,
          row_to_json(np.*) as now_playing
        FROM channels ch
        JOIN cities c ON ch.city_id = c.id
        LEFT JOIN now_playing np ON np.channel_id = ch.id
        WHERE ch.id = $1 OR ch.slug = $1
        LIMIT 1;
      `;
      const { rows } = await pool.query(query, [idOrSlug]);
      if (rows.length === 0) return null;
      const formatted = formatChannelRow(rows[0], rows[0].now_playing);
      formatted.city = rows[0].city;
      return formatted;
    }

    // Fallback file storage
    const data = loadFileData();
    const ch = data.channels.find(c => c.id === idOrSlug || c.slug === idOrSlug);
    if (!ch) return null;
    const city = data.cities.find(c => c.id === ch.cityId);
    return {
      ...ch,
      city,
      nowPlaying: data.nowPlaying[ch.id] || null
    };
  },

  /**
   * Create a new Channel
   */
  async createChannel({ title, rj, cityName, genre, lang, gradient, ownerId = null }) {
    const status = getDbStatus();
    const cleanSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const id = `custom-${Date.now()}`;
    const tags = [genre || 'Talk', 'Live On Air'];
    const talkScript = `Welcome to ${title} on Tarang ${cityName}! RJ ${rj || 'Creator'} is live right now!`;
    const grad = gradient || 'linear-gradient(135deg, #ff2d70, #7928ca)';

    if (status.connected) {
      const pool = getPool();
      const { rows: cityRows } = await pool.query(
        'SELECT id FROM cities WHERE LOWER(name) = LOWER($1) OR id = LOWER($1) LIMIT 1;',
        [cityName]
      );
      const cityId = cityRows.length > 0 ? cityRows[0].id : 'bengaluru';

      const insertQuery = `
        INSERT INTO channels 
          (id, city_id, slug, title, rj, lang, tags, listeners, is_live, gradient, talk_script, owner_id)
        VALUES 
          ($1, $2, $3, $4, $5, $6, $7, 1, true, $8, $9, $10)
        RETURNING *;
      `;
      const { rows } = await pool.query(insertQuery, [
        id,
        cityId,
        cleanSlug,
        title,
        rj || 'RJ Creator',
        lang || 'Hindi & English',
        tags,
        grad,
        talkScript,
        ownerId
      ]);
      return formatChannelRow(rows[0]);
    }

    // Fallback file storage
    const data = loadFileData();
    const city = data.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase() || c.id === cityName.toLowerCase());
    const cityId = city ? city.id : 'bengaluru';

    const newChannel = {
      id,
      cityId,
      slug: cleanSlug,
      title,
      rj: rj || 'RJ Creator',
      lang: lang || 'Hindi & English',
      tags,
      listeners: 1,
      isLive: true,
      gradient: grad,
      talkScript,
      ownerId
    };

    data.channels.unshift(newChannel);
    saveFileData(data);
    return newChannel;
  },

  /**
   * Start a Broadcast session for a channel
   */
  async startBroadcast(channelId) {
    const broadcastId = `bcast-${Date.now()}`;
    const livekitRoom = `tarang-${channelId}`;
    const publishToken = `demo_token_${Date.now()}`;
    const startedAt = new Date().toISOString();

    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      await pool.query(
        'UPDATE channels SET is_live = true, listeners = GREATEST(1, listeners + 1) WHERE id = $1;',
        [channelId]
      );
      await pool.query(
        `INSERT INTO broadcasts (id, channel_id, livekit_room, publish_token, started_at)
         VALUES ($1, $2, $3, $4, $5);`,
        [broadcastId, channelId, livekitRoom, publishToken, startedAt]
      );
      return { broadcastId, channelId, startedAt, livekitRoom, publishToken };
    }

    // Fallback file storage
    const data = loadFileData();
    const channel = data.channels.find(c => c.id === channelId);
    if (channel) {
      channel.isLive = true;
      channel.listeners = Math.max(1, (channel.listeners || 0) + 1);
      const bcast = { broadcastId, channelId, startedAt, livekitRoom, publishToken };
      data.broadcasts.push(bcast);
      saveFileData(data);
      return bcast;
    }
    return null;
  },

  /**
   * End Broadcast session
   */
  async endBroadcast(channelId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      await pool.query('UPDATE channels SET is_live = false WHERE id = $1;', [channelId]);
      await pool.query(
        'UPDATE broadcasts SET ended_at = CURRENT_TIMESTAMP WHERE channel_id = $1 AND ended_at IS NULL;',
        [channelId]
      );
      await pool.query('DELETE FROM now_playing WHERE channel_id = $1;', [channelId]);
      return true;
    }

    // Fallback file storage
    const data = loadFileData();
    const channel = data.channels.find(c => c.id === channelId);
    if (channel) {
      channel.isLive = false;
      delete data.nowPlaying[channelId];
      saveFileData(data);
      return true;
    }
    return false;
  },

  /**
   * Update Now Playing info
   */
  async updateNowPlaying(channelId, { title, artist, type }) {
    const updatedAt = new Date().toISOString();
    const status = getDbStatus();

    if (status.connected) {
      const pool = getPool();
      const query = `
        INSERT INTO now_playing (channel_id, title, artist, type, updated_at)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (channel_id) DO UPDATE SET
          title = EXCLUDED.title,
          artist = EXCLUDED.artist,
          type = EXCLUDED.type,
          updated_at = EXCLUDED.updated_at
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [channelId, title, artist, type, updatedAt]);
      return rows[0];
    }

    // Fallback file storage
    const data = loadFileData();
    const item = { title, artist, type, updatedAt };
    data.nowPlaying[channelId] = item;
    saveFileData(data);
    return item;
  },

  /**
   * Increment or set listener count
   */
  async incrementListeners(channelId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const { rows } = await pool.query(
        'UPDATE channels SET listeners = COALESCE(listeners, 0) + 1 WHERE id = $1 RETURNING listeners;',
        [channelId]
      );
      return rows.length > 0 ? rows[0].listeners : 1;
    }

    const data = loadFileData();
    const ch = data.channels.find(c => c.id === channelId);
    if (ch) {
      ch.listeners = (ch.listeners || 0) + 1;
      saveFileData(data);
      return ch.listeners;
    }
    return 1;
  },

  /**
   * Update listener count for active broadcast
   */
  async updateListenerCount(channelId, count) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      await pool.query('UPDATE channels SET listeners = $1 WHERE id = $2;', [count, channelId]);
      return count;
    }

    const data = loadFileData();
    const ch = data.channels.find(c => c.id === channelId);
    if (ch) {
      ch.listeners = count;
      saveFileData(data);
    }
    return count;
  },

  /**
   * Subscriptions
   */
  async subscribe(userId, channelId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      await pool.query(
        'INSERT INTO subscriptions (user_id, channel_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;',
        [userId, channelId]
      );
      return true;
    }

    const data = loadFileData();
    const exists = data.subscriptions.some(s => s.userId === userId && s.channelId === channelId);
    if (!exists) {
      data.subscriptions.push({ userId, channelId, createdAt: new Date().toISOString() });
      saveFileData(data);
    }
    return true;
  },

  async unsubscribe(userId, channelId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      await pool.query(
        'DELETE FROM subscriptions WHERE user_id = $1 AND channel_id = $2;',
        [userId, channelId]
      );
      return true;
    }

    const data = loadFileData();
    data.subscriptions = data.subscriptions.filter(s => !(s.userId === userId && s.channelId === channelId));
    saveFileData(data);
    return true;
  },

  async getSubscriptions(userId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const { rows } = await pool.query(
        'SELECT channel_id FROM subscriptions WHERE user_id = $1;',
        [userId]
      );
      return rows.map(r => r.channel_id);
    }

    const data = loadFileData();
    return data.subscriptions.filter(s => s.userId === userId).map(s => s.channelId);
  },

  /**
   * USER & PROFILE MANAGEMENT
   */
  async getUserById(userId) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1 LIMIT 1;', [userId]);
      if (rows.length === 0) return null;
      return formatUserRow(rows[0]);
    }

    const data = loadFileData();
    const user = data.users.find(u => u.id === userId);
    return user ? formatUserRow(user) : null;
  },

  async getUserByPhone(phone) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const { rows } = await pool.query('SELECT * FROM users WHERE phone = $1 LIMIT 1;', [phone]);
      if (rows.length === 0) return null;
      return formatUserRow(rows[0]);
    }

    const data = loadFileData();
    const user = data.users.find(u => u.phone === phone);
    return user ? formatUserRow(user) : null;
  },

  /**
   * User registration / OTP verification with login timestamp
   */
  async verifyUser({ phone, code, role = 'creator', name = 'Alwin Joseph' }) {
    const userId = `usr_${phone.replace(/\D/g, '').slice(-8) || 'dev_1'}`;
    const now = new Date().toISOString();

    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const query = `
        INSERT INTO users (id, name, phone, role, is_online, last_login_at)
        VALUES ($1, $2, $3, $4, true, CURRENT_TIMESTAMP)
        ON CONFLICT (phone) DO UPDATE SET 
          is_online = true,
          last_login_at = CURRENT_TIMESTAMP
        RETURNING *;
      `;
      const { rows } = await pool.query(query, [userId, name, phone, role]);
      return formatUserRow(rows[0]);
    } else {
      const data = loadFileData();
      let user = data.users.find(u => u.phone === phone);
      if (!user) {
        user = {
          id: userId,
          name: name || 'Alwin Joseph',
          phone,
          role: role || 'creator',
          avatar: name ? name.slice(0, 2).toUpperCase() : 'AJ',
          bio: 'Creator & Audiophile',
          homeCity: 'Bengaluru',
          settings: {
            bitrate: '320',
            staticBurst: true,
            autoDucking: true,
            visualizer: true,
            liveAlerts: true,
            floatingReactions: true,
            homeCity: 'bengaluru'
          },
          listeningHours: 48.0,
          isOnline: true,
          lastLoginAt: now,
          lastLogoutAt: null,
          createdAt: now
        };
        data.users.push(user);
      } else {
        user.isOnline = true;
        user.lastLoginAt = now;
      }
      saveFileData(data);
      return formatUserRow(user);
    }
  },

  /**
   * Update Profile & Settings
   */
  async updateUserProfile(userId, updates) {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const fields = [];
      const values = [];
      let idx = 1;

      if (updates.name !== undefined) {
        fields.push(`name = $${idx++}`);
        values.push(updates.name);
      }
      if (updates.email !== undefined) {
        fields.push(`email = $${idx++}`);
        values.push(updates.email);
      }
      if (updates.avatar !== undefined) {
        fields.push(`avatar = $${idx++}`);
        values.push(updates.avatar);
      }
      if (updates.bio !== undefined) {
        fields.push(`bio = $${idx++}`);
        values.push(updates.bio);
      }
      if (updates.homeCity !== undefined) {
        fields.push(`home_city_id = $${idx++}`);
        values.push(updates.homeCity);
      }
      if (updates.settings !== undefined) {
        fields.push(`settings = $${idx++}`);
        values.push(JSON.stringify(updates.settings));
      }
      if (updates.listeningHours !== undefined) {
        fields.push(`listening_hours = $${idx++}`);
        values.push(updates.listeningHours);
      }

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(userId);

      const query = `
        UPDATE users 
        SET ${fields.join(', ')} 
        WHERE id = $${values.length} 
        RETURNING *;
      `;
      const { rows } = await pool.query(query, values);
      return rows.length > 0 ? formatUserRow(rows[0]) : null;
    }

    const data = loadFileData();
    const user = data.users.find(u => u.id === userId);
    if (!user) return null;

    if (updates.name !== undefined) user.name = updates.name;
    if (updates.email !== undefined) user.email = updates.email;
    if (updates.avatar !== undefined) user.avatar = updates.avatar;
    if (updates.bio !== undefined) user.bio = updates.bio;
    if (updates.homeCity !== undefined) user.homeCity = updates.homeCity;
    if (updates.settings !== undefined) user.settings = { ...user.settings, ...updates.settings };
    if (updates.listeningHours !== undefined) user.listeningHours = updates.listeningHours;

    saveFileData(data);
    return formatUserRow(user);
  },

  /**
   * Record User Logout
   */
  async recordUserLogout(userId) {
    const now = new Date().toISOString();
    const status = getDbStatus();

    if (status.connected) {
      const pool = getPool();
      await pool.query(
        'UPDATE users SET is_online = false, last_logout_at = CURRENT_TIMESTAMP WHERE id = $1;',
        [userId]
      );
      return true;
    }

    const data = loadFileData();
    const user = data.users.find(u => u.id === userId);
    if (user) {
      user.isOnline = false;
      user.lastLogoutAt = now;
      saveFileData(data);
    }
    return true;
  },

  /**
   * Count total stats
   */
  async getStats() {
    const status = getDbStatus();
    if (status.connected) {
      const pool = getPool();
      const { rows: cityRows } = await pool.query('SELECT COUNT(*) as count FROM cities;');
      const { rows: chanRows } = await pool.query('SELECT COUNT(*) as count FROM channels;');
      const { rows: liveRows } = await pool.query('SELECT COUNT(*) as count FROM channels WHERE is_live = true;');
      const { rows: userRows } = await pool.query('SELECT COUNT(*) as count FROM users;');
      const { rows: onlineRows } = await pool.query('SELECT COUNT(*) as count FROM users WHERE is_online = true;');
      return {
        citiesCount: parseInt(cityRows[0].count, 10),
        channelsCount: parseInt(chanRows[0].count, 10),
        liveChannelsCount: parseInt(liveRows[0].count, 10),
        usersCount: parseInt(userRows[0].count, 10),
        onlineUsersCount: parseInt(onlineRows[0].count, 10),
        engine: 'postgres'
      };
    }

    const data = loadFileData();
    return {
      citiesCount: data.cities.length,
      channelsCount: data.channels.length,
      liveChannelsCount: data.channels.filter(c => c.isLive).length,
      usersCount: data.users.length,
      onlineUsersCount: data.users.filter(u => u.isOnline).length,
      engine: 'file-fallback'
    };
  }
};
