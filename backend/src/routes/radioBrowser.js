import express from 'express';

const USER_AGENT = 'TarangRadioDemo/1.0 (https://github.com/Alwin541/tarang-radio; demo radio app)';

// Resilient curated Indian stations if upstream Radio Browser API is slow or unreachable
const FALLBACK_INDIAN_STATIONS = [
  {
    stationuuid: 'air-vividh-bharati-1',
    name: 'AIR Vividh Bharati',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/vividhbharati/vividhbharati.m3u8',
    url_resolved: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/vividhbharati/vividhbharati.m3u8',
    homepage: 'http://prasarbharati.gov.in/',
    favicon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/All_India_Radio_logo.svg/200px-All_India_Radio_logo.svg.png',
    tags: 'classical,oldies,talk,news',
    country: 'India',
    state: 'Maharashtra',
    language: 'hindi',
    codec: 'AAC',
    bitrate: 128,
    votes: 9800
  },
  {
    stationuuid: 'air-fm-gold-delhi',
    name: 'AIR FM Gold Delhi',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/fmgold/fmgold.m3u8',
    url_resolved: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/fmgold/fmgold.m3u8',
    homepage: 'http://prasarbharati.gov.in/',
    favicon: '',
    tags: 'news,retro,hindi',
    country: 'India',
    state: 'Delhi',
    language: 'hindi',
    codec: 'AAC',
    bitrate: 128,
    votes: 8200
  },
  {
    stationuuid: 'air-rainbow-kannada',
    name: 'AIR FM Rainbow Bengaluru',
    url: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/fmrainbow/fmrainbow.m3u8',
    url_resolved: 'https://airhlspush.pc.cdn.bitgravity.com/httppush/hlspush/fmrainbow/fmrainbow.m3u8',
    homepage: 'http://prasarbharati.gov.in/',
    favicon: '',
    tags: 'kannada,music,talk,indie',
    country: 'India',
    state: 'Karnataka',
    language: 'kannada',
    codec: 'AAC',
    bitrate: 128,
    votes: 5600
  },
  {
    stationuuid: 'radio-city-hindi',
    name: 'Radio City Hindi Hits',
    url: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    url_resolved: 'https://stream.zeno.fm/f3wvbbqmdg8uv',
    homepage: 'https://www.radiocity.in',
    favicon: '',
    tags: 'bollywood,pop,hits',
    country: 'India',
    state: 'Maharashtra',
    language: 'hindi',
    codec: 'MP3',
    bitrate: 128,
    votes: 4300
  },
  {
    stationuuid: 'radio-mirchi-tamil',
    name: 'Radio Mirchi Tamil Top 20',
    url: 'https://stream.zeno.fm/c2k7n9w26hhvv',
    url_resolved: 'https://stream.zeno.fm/c2k7n9w26hhvv',
    homepage: 'https://www.radiomirchi.com',
    favicon: '',
    tags: 'tamil,kollywood,film',
    country: 'India',
    state: 'Tamil Nadu',
    language: 'tamil',
    codec: 'MP3',
    bitrate: 128,
    votes: 6200
  },
  {
    stationuuid: 'malayalam-club-fm',
    name: 'Club FM Kerala Live',
    url: 'https://stream.zeno.fm/s493h1r1738uv',
    url_resolved: 'https://stream.zeno.fm/s493h1r1738uv',
    homepage: 'https://clubfm.in',
    favicon: '',
    tags: 'malayalam,kerala,mollywood',
    country: 'India',
    state: 'Kerala',
    language: 'malayalam',
    codec: 'MP3',
    bitrate: 128,
    votes: 3900
  }
];

export function createRadioBrowserRouter() {
  const router = express.Router();

  // Known active mirror servers for Radio Browser
  const SERVERS = [
    'https://de1.api.radio-browser.info',
    'https://nl1.api.radio-browser.info',
    'https://at1.api.radio-browser.info'
  ];

  async function fetchFromRadioBrowser(endpointPath) {
    let lastError = null;
    for (const server of SERVERS) {
      try {
        const url = `${server}${endpointPath}`;
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);

        const res = await fetch(url, {
          headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'application/json'
          },
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (res.ok) {
          return await res.json();
        }
      } catch (err) {
        lastError = err;
      }
    }
    throw lastError || new Error('All Radio Browser mirrors failed to respond');
  }

  // GET /api/v1/radio-browser/stations - Search stations in India
  router.get('/stations', async (req, res) => {
    const { state = '', language = '', name = '', limit = 30 } = req.query;

    const queryParams = new URLSearchParams({
      countrycode: 'IN',
      hidebroken: 'true',
      order: 'votes',
      reverse: 'true',
      limit: String(Math.min(parseInt(limit, 10) || 30, 80))
    });

    if (state && state.toLowerCase() !== 'all') {
      queryParams.set('state', state);
    }
    if (language && language.toLowerCase() !== 'all') {
      queryParams.set('language', language.toLowerCase());
    }
    if (name) {
      queryParams.set('name', name);
    }

    try {
      const data = await fetchFromRadioBrowser(`/json/stations/search?${queryParams.toString()}`);

      // Map response to consistent format
      const stations = (data || []).map(st => ({
        id: st.stationuuid,
        name: st.name?.trim() || 'Indian Radio Station',
        streamUrl: st.url_resolved || st.url,
        homepage: st.homepage || '',
        favicon: st.favicon || '',
        state: st.state?.trim() || 'All India',
        country: 'India',
        language: st.language?.trim() || 'Desi / Indian',
        tags: st.tags ? st.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        bitrate: st.bitrate || 128,
        codec: st.codec || 'MP3',
        votes: st.votes || 0,
        source: 'radio-browser',
        isThirdParty: true
      }));

      res.json({
        status: 'ok',
        count: stations.length,
        disclaimer: 'Third-party community streams discovered via Radio Browser API. Tarang does not host or rebroadcast these streams.',
        results: stations
      });
    } catch (err) {
      console.warn('Radio Browser query failed, returning fallback Indian stations:', err.message);
      
      let filtered = [...FALLBACK_INDIAN_STATIONS];
      if (state && state.toLowerCase() !== 'all') {
        filtered = filtered.filter(s => s.state.toLowerCase() === state.toLowerCase());
      }
      if (language && language.toLowerCase() !== 'all') {
        filtered = filtered.filter(s => s.language.toLowerCase() === language.toLowerCase());
      }
      if (name) {
        filtered = filtered.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
      }

      res.json({
        status: 'fallback',
        warning: `Could not reach live Radio Browser directory: ${err.message}. Showing curated stations.`,
        count: filtered.length,
        disclaimer: 'Third-party community streams discovered via Radio Browser API. Tarang does not host or rebroadcast these streams.',
        results: filtered.map(st => ({
          id: st.stationuuid,
          name: st.name,
          streamUrl: st.url_resolved,
          homepage: st.homepage,
          favicon: st.favicon,
          state: st.state,
          country: 'India',
          language: st.language,
          tags: st.tags.split(','),
          bitrate: st.bitrate,
          codec: st.codec,
          votes: st.votes,
          source: 'radio-browser',
          isThirdParty: true
        }))
      });
    }
  });

  // GET /api/v1/radio-browser/filters - Available Indian states and languages
  router.get('/filters', (req, res) => {
    res.json({
      states: [
        'All',
        'Maharashtra',
        'Karnataka',
        'Delhi',
        'Tamil Nadu',
        'Kerala',
        'West Bengal',
        'Telangana',
        'Gujarat',
        'Punjab',
        'Uttar Pradesh',
        'Rajasthan',
        'Goa'
      ],
      languages: [
        'All',
        'Hindi',
        'Kannada',
        'Tamil',
        'Telugu',
        'Malayalam',
        'Marathi',
        'Bengali',
        'Punjabi',
        'Gujarati',
        'English',
        'Urdu'
      ]
    });
  });

  return router;
}
