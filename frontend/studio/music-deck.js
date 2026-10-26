/**
 * Tarang Studio - Dual Music Deck & Library Manager
 * Connects Deck A & Deck B into StudioAudioEngine.musicFader
 * Supports Audius Search, Trending Playlists, Local MP3 Uploads, and Auto-Play Queue.
 */

export class MusicDeckManager extends EventTarget {
  constructor(engine) {
    super();
    this.engine = engine;
    this.queue = [];
    this.currentTrack = null;
    this.crossfadeVal = 0.5; // 0 = Deck A, 1 = Deck B
    this.activeDeckId = 'A'; // 'A' or 'B'
    this.autoPlayQueue = true;

    // Deck audio elements & nodes
    this.decks = {
      A: {
        el: null,
        source: null,
        gain: null,
        track: null,
        state: 'empty' // 'empty', 'loading', 'playing', 'paused'
      },
      B: {
        el: null,
        source: null,
        gain: null,
        track: null,
        state: 'empty'
      }
    };
  }

  init() {
    if (!this.engine.ctx) return;
    const ctx = this.engine.ctx;

    // Initialize Deck A
    if (!this.decks.A.el) {
      const audioA = new Audio();
      audioA.crossOrigin = 'anonymous';
      audioA.preload = 'auto';
      const sourceA = ctx.createMediaElementSource(audioA);
      const gainA = ctx.createGain();
      gainA.gain.value = 1.0;
      sourceA.connect(gainA);
      gainA.connect(this.engine.musicFader);

      this.decks.A.el = audioA;
      this.decks.A.source = sourceA;
      this.decks.A.gain = gainA;
      this._wireDeckEvents('A', audioA);
    }

    // Initialize Deck B
    if (!this.decks.B.el) {
      const audioB = new Audio();
      audioB.crossOrigin = 'anonymous';
      audioB.preload = 'auto';
      const sourceB = ctx.createMediaElementSource(audioB);
      const gainB = ctx.createGain();
      gainB.gain.value = 1.0;
      sourceB.connect(gainB);
      gainB.connect(this.engine.musicFader);

      this.decks.B.el = audioB;
      this.decks.B.source = sourceB;
      this.decks.B.gain = gainB;
      this._wireDeckEvents('B', audioB);
    }

    this.setCrossfade(0.5);
  }

  _wireDeckEvents(deckId, audioEl) {
    audioEl.addEventListener('play', () => {
      this.decks[deckId].state = 'playing';
      this.dispatchEvent(new CustomEvent('deckstatechange', { detail: { deckId, state: 'playing' } }));
    });

    audioEl.addEventListener('pause', () => {
      this.decks[deckId].state = 'paused';
      this.dispatchEvent(new CustomEvent('deckstatechange', { detail: { deckId, state: 'paused' } }));
    });

    audioEl.addEventListener('timeupdate', () => {
      this.dispatchEvent(new CustomEvent('decktimeupdate', {
        detail: {
          deckId,
          currentTime: audioEl.currentTime,
          duration: audioEl.duration || 0,
          progress: audioEl.duration ? (audioEl.currentTime / audioEl.duration) * 100 : 0
        }
      }));
    });

    audioEl.addEventListener('ended', () => {
      this.decks[deckId].state = 'ended';
      this.dispatchEvent(new CustomEvent('deckended', { detail: { deckId } }));
      if (this.autoPlayQueue && this.queue.length > 0) {
        this.playNextInQueue();
      }
    });

    audioEl.addEventListener('error', (err) => {
      console.warn(`Deck ${deckId} playback error:`, err);
      this.decks[deckId].state = 'error';
      this.dispatchEvent(new CustomEvent('deckerror', { detail: { deckId, error: err } }));
    });
  }

  /**
   * Set crossfader value between 0 (Deck A 100%) and 1 (Deck B 100%)
   */
  setCrossfade(val) {
    this.crossfadeVal = Math.max(0, Math.min(1, val));
    if (!this.engine.ctx) return;
    const t = this.engine.ctx.currentTime;
    // Equal-power crossfade
    const gainAVal = Math.cos(this.crossfadeVal * 0.5 * Math.PI);
    const gainBVal = Math.cos((1 - this.crossfadeVal) * 0.5 * Math.PI);

    if (this.decks.A.gain) this.decks.A.gain.gain.setTargetAtTime(gainAVal, t, 0.02);
    if (this.decks.B.gain) this.decks.B.gain.gain.setTargetAtTime(gainBVal, t, 0.02);
    this.dispatchEvent(new CustomEvent('crossfadechange', { detail: { val: this.crossfadeVal } }));
  }

  /**
   * Load track into specified deck ('A' or 'B')
   */
  async loadTrack(deckId, track, autoPlay = true) {
    this.init();
    const deck = this.decks[deckId];
    if (!deck) return;

    deck.track = track;
    deck.state = 'loading';
    this.dispatchEvent(new CustomEvent('deckloading', { detail: { deckId, track } }));

    // Determine streamable audio URL
    let streamUrl = track.audioUrl || track.streamUrl;
    if (!streamUrl && track.id && track.source === 'audius') {
      streamUrl = `https://api.audius.co/v1/tracks/${track.id}/stream?app_name=TARANG`;
    }

    try {
      deck.el.src = streamUrl;
      await deck.el.load();
      if (autoPlay) {
        await deck.el.play();
        deck.state = 'playing';
      } else {
        deck.state = 'paused';
      }
      this.currentTrack = track;
      this.dispatchEvent(new CustomEvent('trackchange', { detail: { deckId, track, state: deck.state } }));
    } catch (err) {
      console.error(`Failed to play track on Deck ${deckId}:`, err);
      deck.state = 'error';
      this.dispatchEvent(new CustomEvent('deckerror', { detail: { deckId, error: err } }));
    }
  }

  togglePlay(deckId) {
    const deck = this.decks[deckId];
    if (!deck || !deck.el) return;
    if (deck.el.paused) {
      deck.el.play().catch(e => console.warn(e));
    } else {
      deck.el.pause();
    }
  }

  seek(deckId, fraction) {
    const deck = this.decks[deckId];
    if (!deck || !deck.el || !deck.el.duration) return;
    deck.el.currentTime = fraction * deck.el.duration;
  }

  setDeckVolume(deckId, vol) {
    const deck = this.decks[deckId];
    if (!deck || !deck.el) return;
    deck.el.volume = Math.max(0, Math.min(1, vol));
  }

  addToQueue(track) {
    this.queue.push(track);
    this.dispatchEvent(new CustomEvent('queueupdate', { detail: { queue: [...this.queue] } }));
  }

  removeFromQueue(index) {
    if (index >= 0 && index < this.queue.length) {
      this.queue.splice(index, 1);
      this.dispatchEvent(new CustomEvent('queueupdate', { detail: { queue: [...this.queue] } }));
    }
  }

  playNextInQueue() {
    if (this.queue.length === 0) return;
    const nextTrack = this.queue.shift();
    this.dispatchEvent(new CustomEvent('queueupdate', { detail: { queue: [...this.queue] } }));

    // Determine target deck: if Deck A is playing or recently active, switch to B, or load into currently idle deck
    const targetDeck = (this.decks.A.state === 'playing') ? 'B' : 'A';
    // Crossfade smoothly to the new deck
    this.loadTrack(targetDeck, nextTrack, true);
    // Smooth crossfade to targetDeck
    this.setCrossfade(targetDeck === 'A' ? 0 : 1);
  }

  /* ------------------- Audius Music API Integration ------------------- */

  async searchAudiusTracks(query, genre = '') {
    try {
      let url = `https://api.audius.co/v1/tracks/search?query=${encodeURIComponent(query)}&app_name=TARANG`;
      if (genre && genre !== 'All') {
        url += `&genre=${encodeURIComponent(genre)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Audius API error status ${res.status}`);
      const data = await res.json();
      const rawTracks = data.data || [];
      return rawTracks
        .filter(t => t.is_streamable !== false)
        .map(t => ({
          id: t.id,
          title: t.title,
          artist: t.user?.name || 'Unknown Artist',
          artwork: t.artwork?.['150x150'] || t.artwork?.['480x480'] || '',
          duration: t.duration || 0,
          genre: t.genre || 'Indie',
          source: 'audius',
          streamUrl: `https://api.audius.co/v1/tracks/${t.id}/stream?app_name=TARANG`
        }));
    } catch (err) {
      console.warn('Audius search error, using curated backup:', err);
      return this.getCuratedBackups().filter(t => 
        !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.artist.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  async fetchTrendingTracks(genre = '') {
    try {
      let url = 'https://api.audius.co/v1/tracks/trending?app_name=TARANG&time=week&limit=20';
      if (genre && genre !== 'All') {
        url += `&genre=${encodeURIComponent(genre)}`;
      }
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Trending fetch error status ${res.status}`);
      const data = await res.json();
      const rawTracks = data.data || [];
      const formatted = rawTracks
        .filter(t => t.is_streamable !== false)
        .map(t => ({
          id: t.id,
          title: t.title,
          artist: t.user?.name || 'Unknown Artist',
          artwork: t.artwork?.['150x150'] || t.artwork?.['480x480'] || '',
          duration: t.duration || 0,
          genre: t.genre || 'Indie',
          source: 'audius',
          streamUrl: `https://api.audius.co/v1/tracks/${t.id}/stream?app_name=TARANG`
        }));
      return formatted.length > 0 ? formatted : this.getCuratedBackups();
    } catch (err) {
      console.warn('Audius trending error, falling back to curated list:', err);
      return this.getCuratedBackups();
    }
  }

  /**
   * Curated high quality royalty-free tracks for instant fallback
   */
  getCuratedBackups() {
    return [
      {
        id: 'tarang-lofi-1',
        title: 'Monsoon Chai & Bangalore Lo-Fi',
        artist: 'Tarang Acoustic Lab',
        artwork: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=150&auto=format&fit=crop&q=80',
        duration: 184,
        genre: 'Lo-Fi',
        source: 'curated',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3'
      },
      {
        id: 'tarang-mumbai-groove',
        title: 'Marine Drive Sunset Groove',
        artist: 'RJ Studio Beats',
        artwork: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=80',
        duration: 215,
        genre: 'Indie',
        source: 'curated',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=chill-abstract-intention-12099.mp3'
      },
      {
        id: 'tarang-delhi-flow',
        title: 'Connaught Place Midnight Chill',
        artist: 'Dilli Dhun Collective',
        artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150&auto=format&fit=crop&q=80',
        duration: 168,
        genre: 'Hip-Hop',
        source: 'curated',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=tuesday-glitch-113941.mp3'
      },
      {
        id: 'tarang-kochi-breeze',
        title: 'Backwater Rain & Morning Raga',
        artist: 'Kerala Acoustic Ensemble',
        artwork: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&auto=format&fit=crop&q=80',
        duration: 242,
        genre: 'World',
        source: 'curated',
        audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=ambient-piano-amp-strings-10711.mp3'
      }
    ];
  }
}
