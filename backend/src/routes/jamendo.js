import express from 'express';

export function createJamendoRouter() {
  const router = express.Router();

  // Curated royalty-free fallback tracks if Jamendo API key is missing or unauthorized
  const FALLBACK_TRACKS = [
    {
      id: 'jamendo-demo-1',
      title: 'Acoustic Sunrise in Bangalore',
      artist: 'Acoustic Lab',
      artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80',
      audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
      duration: 184,
      shareurl: 'https://www.jamendo.com',
      license_ccurl: 'https://creativecommons.org/licenses/by-nc-sa/3.0/',
      licenseName: 'CC BY-NC-SA 3.0',
      isPlayable: true,
      genre: 'Acoustic',
      source: 'jamendo-fallback'
    },
    {
      id: 'jamendo-demo-2',
      title: 'Midnight Marine Drive Lo-Fi',
      artist: 'Desi Chillout',
      artwork: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=300&auto=format&fit=crop&q=80',
      audio: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3',
      duration: 215,
      shareurl: 'https://www.jamendo.com',
      license_ccurl: 'https://creativecommons.org/licenses/by-sa/3.0/',
      licenseName: 'CC BY-SA 3.0',
      isPlayable: true,
      genre: 'Lo-Fi',
      source: 'jamendo-fallback'
    },
    {
      id: 'jamendo-demo-3',
      title: 'Delhi Street Vibes & Sitar Fusion',
      artist: 'Raga Electronic',
      artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80',
      audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tuesday-glitch-113941.mp3',
      duration: 168,
      shareurl: 'https://www.jamendo.com',
      license_ccurl: 'https://creativecommons.org/licenses/by/4.0/',
      licenseName: 'CC BY 4.0',
      isPlayable: true,
      genre: 'World',
      source: 'jamendo-fallback'
    },
    {
      id: 'jamendo-demo-4',
      title: 'Backwater Evening Ragas',
      artist: 'Kerala Soundscape',
      artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&auto=format&fit=crop&q=80',
      audio: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=ambient-piano-amp-strings-10711.mp3',
      duration: 242,
      shareurl: 'https://www.jamendo.com',
      license_ccurl: 'https://creativecommons.org/licenses/by-nc/4.0/',
      licenseName: 'CC BY-NC 4.0',
      isPlayable: true,
      genre: 'Ambient',
      source: 'jamendo-fallback'
    }
  ];

  /**
   * Helper to inspect Creative Commons license rules and determine playability
   */
  function verifyTrackLicense(rawTrack) {
    const licenses = rawTrack.licenses || {};
    const ccurl = rawTrack.license_ccurl || '';

    // If it has a CC license or license_ccurl and audio stream
    const hasAudio = !!rawTrack.audio;
    const isCreativeCommons = licenses.cc === 'true' || licenses.cc === true || !!ccurl;

    // Build human-friendly license label
    let licenseName = 'Creative Commons';
    if (ccurl.includes('by-nc-sa')) {
      licenseName = 'CC BY-NC-SA';
    } else if (ccurl.includes('by-nc-nd')) {
      licenseName = 'CC BY-NC-ND';
    } else if (ccurl.includes('by-nc')) {
      licenseName = 'CC BY-NC';
    } else if (ccurl.includes('by-sa')) {
      licenseName = 'CC BY-SA';
    } else if (ccurl.includes('by-nd')) {
      licenseName = 'CC BY-ND';
    } else if (ccurl.includes('/by/')) {
      licenseName = 'CC BY';
    } else if (ccurl.includes('zero') || ccurl.includes('publicdomain')) {
      licenseName = 'CC0 / Public Domain';
    }

    // For non-commercial demo streaming, CC licenses with audio stream are permitted
    const isPlayable = hasAudio && isCreativeCommons;
    const licenseStatus = isPlayable
      ? 'Permitted for non-commercial demo playback'
      : (hasAudio ? 'Restricted license (Playback disabled)' : 'Missing stream URL (Unavailable)');

    return {
      id: rawTrack.id,
      title: rawTrack.name || rawTrack.title || 'Untitled Track',
      artist: rawTrack.artist_name || 'Independent Artist',
      artwork: rawTrack.image || rawTrack.album_image || '',
      audio: isPlayable ? rawTrack.audio : null,
      duration: rawTrack.duration || 0,
      shareurl: rawTrack.shareurl || `https://www.jamendo.com/track/${rawTrack.id}`,
      license_ccurl: ccurl || 'https://creativecommons.org/licenses/',
      licenseName,
      isPlayable,
      licenseStatus,
      genre: rawTrack.musicinfo?.tags?.genres?.[0] || 'Indie',
      source: 'jamendo'
    };
  }

  // GET /api/v1/jamendo/tracks - Featured/Trending tracks
  router.get('/tracks', async (req, res) => {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const limit = Math.min(parseInt(req.query.limit, 10) || 12, 50);
    const tag = req.query.tag || '';

    if (!clientId) {
      return res.json({
        status: 'demo_fallback',
        warning: 'JAMENDO_CLIENT_ID is not configured in .env. Using curated royalty-free demo tracks.',
        hasCredential: false,
        results: FALLBACK_TRACKS
      });
    }

    try {
      let jamendoUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=${limit}&include=licenses&audioformat=mp32&order=popularity_week`;
      if (tag && tag.toLowerCase() !== 'all') {
        jamendoUrl += `&tags=${encodeURIComponent(tag)}`;
      }

      const response = await fetch(jamendoUrl);
      const data = await response.json();

      if (data.headers?.status !== 'success') {
        console.warn('Jamendo API returned error:', data.headers?.error_message || 'Unknown error');
        return res.json({
          status: 'error_fallback',
          warning: `Jamendo API error: ${data.headers?.error_message || 'Unauthorized / Invalid Client ID'}. Showing curated demo tracks.`,
          hasCredential: true,
          results: FALLBACK_TRACKS
        });
      }

      const verifiedTracks = (data.results || []).map(verifyTrackLicense);
      res.json({
        status: 'ok',
        hasCredential: true,
        results_count: verifiedTracks.length,
        results: verifiedTracks
      });
    } catch (err) {
      console.error('Error fetching Jamendo tracks:', err.message);
      res.json({
        status: 'network_fallback',
        warning: `Could not reach Jamendo API: ${err.message}. Showing curated demo tracks.`,
        hasCredential: !!clientId,
        results: FALLBACK_TRACKS
      });
    }
  });

  // GET /api/v1/jamendo/search - Search tracks
  router.get('/search', async (req, res) => {
    const clientId = process.env.JAMENDO_CLIENT_ID;
    const query = (req.query.q || '').trim();
    const tag = req.query.tag || '';
    const limit = Math.min(parseInt(req.query.limit, 10) || 15, 50);

    if (!clientId) {
      const filtered = FALLBACK_TRACKS.filter(t => 
        !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.artist.toLowerCase().includes(query.toLowerCase())
      );
      return res.json({
        status: 'demo_fallback',
        warning: 'JAMENDO_CLIENT_ID is not configured in .env. Using curated royalty-free demo tracks.',
        hasCredential: false,
        results: filtered
      });
    }

    try {
      let jamendoUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=${clientId}&format=jsonpretty&limit=${limit}&include=licenses&audioformat=mp32`;
      if (query) {
        jamendoUrl += `&namesearch=${encodeURIComponent(query)}`;
      }
      if (tag && tag.toLowerCase() !== 'all') {
        jamendoUrl += `&tags=${encodeURIComponent(tag)}`;
      }

      const response = await fetch(jamendoUrl);
      const data = await response.json();

      if (data.headers?.status !== 'success') {
        const filtered = FALLBACK_TRACKS.filter(t => 
          !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.artist.toLowerCase().includes(query.toLowerCase())
        );
        return res.json({
          status: 'error_fallback',
          warning: `Jamendo API error: ${data.headers?.error_message || 'Unauthorized'}. Showing curated demo tracks.`,
          hasCredential: true,
          results: filtered
        });
      }

      const verifiedTracks = (data.results || []).map(verifyTrackLicense);
      res.json({
        status: 'ok',
        hasCredential: true,
        results_count: verifiedTracks.length,
        results: verifiedTracks
      });
    } catch (err) {
      console.error('Error searching Jamendo tracks:', err.message);
      res.json({
        status: 'network_fallback',
        warning: `Could not reach Jamendo API: ${err.message}. Showing curated demo tracks.`,
        hasCredential: !!clientId,
        results: FALLBACK_TRACKS
      });
    }
  });

  return router;
}
