/**
 * Tarang Studio - Master Controller
 * Orchestrates Audio Engine, Dual Decks, Soundboard, WebSocket & On-Air Broadcast State
 */

import { StudioAudioEngine } from './audio-engine.js';
import { MusicDeckManager } from './music-deck.js';
import { SoundboardManager } from './soundboard.js';

class StudioController {
  constructor() {
    this.engine = new StudioAudioEngine();
    this.deckManager = new MusicDeckManager(this.engine);
    this.soundboard = new SoundboardManager(this.engine);

    // Broadcast State
    this.isLive = false;
    this.broadcastSeconds = 0;
    this.broadcastTimerId = null;
    this.activeChannelId = null;
    this.activeChannelTitle = 'Indie Express On-Air';
    this.activeRjName = 'RJ Creator';
    this.activeCity = 'Bengaluru';
    this.listenersCount = 1;
    this.socket = null;

    // Load channel info from URL params or localStorage
    this._parseChannelParams();
  }

  _parseChannelParams() {
    const params = new URLSearchParams(window.location.search);
    this.activeChannelId = params.get('channelId') || `custom-${Date.now()}`;
    this.activeChannelTitle = params.get('title') || 'The Indie Express with RJ';
    this.activeRjName = params.get('rj') || 'RJ Alwin';
    this.activeCity = params.get('city') || 'Bengaluru';

    // Check saved session
    try {
      const auth = JSON.parse(localStorage.getItem('tarang_auth_user') || '{}');
      if (auth.name) this.activeRjName = auth.name;
      if (auth.homeCity) this.activeCity = auth.homeCity;
    } catch (e) {}
  }

  async init() {
    this.initDOM();
    this.setupEventListeners();
    this.initWebSocket();
    await this.initMicrophoneDevices();
    this.startMetersLoop();

    // Preload trending tracks in background
    this.loadTrendingTracks();
  }

  initDOM() {
    // Top Bar
    this.btnMasterBroadcast = document.getElementById('btn-master-broadcast');
    this.btnBroadcastText = document.getElementById('broadcast-btn-text');
    this.onAirSign = document.getElementById('on-air-sign');
    this.onAirText = document.getElementById('on-air-text');
    this.timerDisplay = document.getElementById('broadcast-timer-display');
    this.listenersDisplay = document.getElementById('live-listeners-display');
    this.channelNameDisplay = document.getElementById('studio-channel-name');
    this.rjNameDisplay = document.getElementById('studio-rj-name');
    this.cityDisplay = document.getElementById('studio-city-display');
    this.btnRecordShow = document.getElementById('btn-record-show');
    this.spectrumCanvas = document.getElementById('studio-spectrum-canvas');
    this.spectrumCtx = this.spectrumCanvas ? this.spectrumCanvas.getContext('2d') : null;

    if (this.channelNameDisplay) this.channelNameDisplay.textContent = this.activeChannelTitle;
    if (this.rjNameDisplay) this.rjNameDisplay.textContent = this.activeRjName;
    if (this.cityDisplay) this.cityDisplay.textContent = this.activeCity;

    // Mixer Channels & Faders
    this.faderMic = document.getElementById('fader-mic');
    this.faderMusic = document.getElementById('fader-music');
    this.faderSfx = document.getElementById('fader-sfx');
    this.faderMaster = document.getElementById('fader-master');
    this.faderHeadphones = document.getElementById('fader-headphones');

    // VU Meters
    this.vuFillMic = document.getElementById('vu-fill-mic');
    this.vuPeakMic = document.getElementById('vu-peak-mic');
    this.vuFillMusic = document.getElementById('vu-fill-music');
    this.vuPeakMusic = document.getElementById('vu-peak-music');
    this.vuFillSfx = document.getElementById('vu-fill-sfx');
    this.vuPeakSfx = document.getElementById('vu-peak-sfx');
    this.vuFillMaster = document.getElementById('vu-fill-master');
    this.vuPeakMaster = document.getElementById('vu-peak-master');

    // Mic Master Controls
    this.btnMicToggle = document.getElementById('btn-mic-toggle');
    this.micToggleLabel = document.getElementById('mic-toggle-label');
    this.micDeviceSelect = document.getElementById('mic-device-select');
    this.toggleVoiceEnhance = document.getElementById('toggle-voice-enhance');
    this.toggleMicMonitor = document.getElementById('toggle-mic-monitor');

    // Auto-Ducking
    this.toggleDucking = document.getElementById('toggle-ducking');
    this.duckLevelSlider = document.getElementById('duck-level-slider');
    this.duckLevelVal = document.getElementById('duck-level-val');
    this.duckStatusPill = document.getElementById('duck-status-pill');

    // Decks
    this.crossfadeSlider = document.getElementById('crossfade-slider');
    this.deckElements = {
      A: {
        deckBox: document.getElementById('deck-box-a'),
        title: document.getElementById('deck-a-title'),
        artist: document.getElementById('deck-a-artist'),
        art: document.getElementById('deck-a-art'),
        statePill: document.getElementById('deck-a-state'),
        playBtn: document.getElementById('btn-deck-a-play'),
        cueBtn: document.getElementById('btn-deck-a-cue'),
        progressFill: document.getElementById('deck-a-progress-fill'),
        progressBar: document.getElementById('deck-a-progress-bar'),
        timeDisplay: document.getElementById('deck-a-time')
      },
      B: {
        deckBox: document.getElementById('deck-box-b'),
        title: document.getElementById('deck-b-title'),
        artist: document.getElementById('deck-b-artist'),
        art: document.getElementById('deck-b-art'),
        statePill: document.getElementById('deck-b-state'),
        playBtn: document.getElementById('btn-deck-b-play'),
        cueBtn: document.getElementById('btn-deck-b-cue'),
        progressFill: document.getElementById('deck-b-progress-fill'),
        progressBar: document.getElementById('deck-b-progress-bar'),
        timeDisplay: document.getElementById('deck-b-time')
      }
    };

    // Library & Search
    this.searchTrackInput = document.getElementById('search-track-input');
    this.genreFilterSelect = document.getElementById('genre-filter-select');
    this.trackResultsContainer = document.getElementById('track-results-container');
    this.fileUploadInput = document.getElementById('file-upload-track');

    // Soundboard
    this.sfxPads = document.querySelectorAll('.sfx-pad-btn');
    this.fileUploadSfx = document.getElementById('file-upload-sfx');

    // Shoutout & Chat
    this.shoutoutInput = document.getElementById('shoutout-text-input');
    this.btnSpeakShoutout = document.getElementById('btn-speak-shoutout');
    this.chatMessagesBox = document.getElementById('studio-chat-messages');
    this.chatReplyForm = document.getElementById('studio-chat-form');
    this.chatReplyInput = document.getElementById('studio-chat-input');
  }

  setupEventListeners() {
    // Master Broadcast Toggle
    this.btnMasterBroadcast.addEventListener('click', () => {
      if (!this.isLive) {
        this.startBroadcast();
      } else {
        this.endBroadcast();
      }
    });

    // Recording Button
    this.btnRecordShow.addEventListener('click', async () => {
      try {
        await this.engine.init();
        if (!this.engine.isRecording) {
          this.engine.startRecording();
          this.btnRecordShow.classList.add('recording');
          this.btnRecordShow.innerHTML = '<span>⏹️</span> Stop Recording';
        } else {
          const rec = await this.engine.stopRecording();
          this.btnRecordShow.classList.remove('recording');
          this.btnRecordShow.innerHTML = '<span>⏺️</span> Record Show';
          if (rec && rec.url) {
            const a = document.createElement('a');
            a.href = rec.url;
            a.download = `tarang-broadcast-${Date.now()}.${rec.extension}`;
            a.click();
          }
        }
      } catch (err) {
        alert(err.message);
      }
    });

    // Mic Master Button
    this.btnMicToggle.addEventListener('click', async () => {
      await this.engine.init();
      if (!this.engine.hasMic) {
        try {
          const label = await this.engine.openMicDevice({ deviceId: this.micDeviceSelect.value });
          console.log('Opened mic:', label);
        } catch (e) {
          alert('Could not open microphone: ' + e.message);
          return;
        }
      }

      const willOpen = !this.engine.micOpen;
      this.engine.setMicOpen(willOpen);
      if (willOpen) {
        this.btnMicToggle.classList.add('on-air');
        this.micToggleLabel.textContent = 'MIC ON AIR (Mute)';
      } else {
        this.btnMicToggle.classList.remove('on-air');
        this.micToggleLabel.textContent = 'MIC MUTED (Click to Talk)';
      }
    });

    // Mic Device Change
    this.micDeviceSelect.addEventListener('change', async () => {
      if (this.engine.hasMic) {
        await this.engine.openMicDevice({ deviceId: this.micDeviceSelect.value });
      }
    });

    // Voice Enhance & Monitor Toggles
    this.toggleVoiceEnhance.addEventListener('change', (e) => {
      this.engine.setVoiceEnhance(e.target.checked);
    });
    this.toggleMicMonitor.addEventListener('change', (e) => {
      this.engine.setMicMonitor(e.target.checked);
    });

    // Auto-Ducking controls
    this.toggleDucking.addEventListener('change', (e) => {
      this.engine.setDuckOptions({ enabled: e.target.checked });
    });
    this.duckLevelSlider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      this.duckLevelVal.textContent = `${val}%`;
      this.engine.setDuckOptions({ level: val / 100 });
    });
    this.engine.addEventListener('duckchange', (e) => {
      if (e.detail.ducked) {
        this.duckStatusPill.classList.add('ducking');
        this.duckStatusPill.textContent = 'DUCKING ACTIVE';
      } else {
        this.duckStatusPill.classList.remove('ducking');
        this.duckStatusPill.textContent = 'STANDBY';
      }
    });

    // Faders
    this.faderMic.addEventListener('input', (e) => this.engine.setFader('mic', parseFloat(e.target.value)));
    this.faderMusic.addEventListener('input', (e) => this.engine.setFader('music', parseFloat(e.target.value)));
    this.faderSfx.addEventListener('input', (e) => this.engine.setFader('sfx', parseFloat(e.target.value)));
    this.faderMaster.addEventListener('input', (e) => this.engine.setFader('master', parseFloat(e.target.value)));
    this.faderHeadphones.addEventListener('input', (e) => this.engine.setFader('headphones', parseFloat(e.target.value)));

    // Crossfader
    this.crossfadeSlider.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.deckManager.setCrossfade(val);
    });

    // Decks Controls
    ['A', 'B'].forEach(deckId => {
      const els = this.deckElements[deckId];
      els.playBtn.addEventListener('click', async () => {
        await this.engine.init();
        this.deckManager.togglePlay(deckId);
      });
      els.cueBtn.addEventListener('click', () => {
        this.deckManager.seek(deckId, 0);
      });
      els.progressBar.addEventListener('click', (e) => {
        const rect = els.progressBar.getBoundingClientRect();
        const frac = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        this.deckManager.seek(deckId, frac);
      });
    });

    // Deck Manager Events
    this.deckManager.addEventListener('deckstatechange', (e) => {
      const { deckId, state } = e.detail;
      const els = this.deckElements[deckId];
      els.statePill.textContent = state;
      if (state === 'playing') {
        els.statePill.classList.add('playing');
        els.playBtn.textContent = '⏸ Pause';
        els.deckBox.classList.add('active-deck');
        // Report Now Playing to listeners!
        this.broadcastNowPlaying(this.deckManager.decks[deckId].track);
      } else {
        els.statePill.classList.remove('playing');
        els.playBtn.textContent = '▶ Play';
        if (this.deckManager.decks[deckId === 'A' ? 'B' : 'A'].state !== 'playing') {
          els.deckBox.classList.remove('active-deck');
        }
      }
    });

    this.deckManager.addEventListener('decktimeupdate', (e) => {
      const { deckId, currentTime, duration, progress } = e.detail;
      const els = this.deckElements[deckId];
      els.progressFill.style.width = `${progress}%`;
      const curM = Math.floor(currentTime / 60);
      const curS = String(Math.floor(currentTime % 60)).padStart(2, '0');
      const durM = Math.floor(duration / 60);
      const durS = String(Math.floor(duration % 60)).padStart(2, '0');
      els.timeDisplay.textContent = `${curM}:${curS} / ${durM}:${durS}`;
    });

    this.deckManager.addEventListener('trackchange', (e) => {
      const { deckId, track } = e.detail;
      const els = this.deckElements[deckId];
      els.title.textContent = track.title;
      els.artist.textContent = track.artist;
      if (track.artwork) els.art.src = track.artwork;
    });

    // Audius Search & Genre Filter
    let searchTimeout = null;
    this.searchTrackInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => this.searchTracks(), 400);
    });
    this.genreFilterSelect.addEventListener('change', () => this.searchTracks());

    // Library Tabs
    document.querySelectorAll('.lib-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.lib-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        if (tab === 'trending') {
          this.loadTrendingTracks();
        } else if (tab === 'search') {
          this.searchTracks();
        } else if (tab === 'uploads') {
          this.renderUploadsTab();
        }
      });
    });

    // Custom MP3 Upload
    this.fileUploadInput.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      files.forEach(file => {
        const url = URL.createObjectURL(file);
        const track = {
          id: `upload-${Date.now()}`,
          title: file.name.replace(/\.[^/.]+$/, ''),
          artist: this.activeRjName,
          artwork: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
          duration: 180,
          genre: 'Upload',
          source: 'local',
          audioUrl: url
        };
        this.deckManager.addToQueue(track);
      });
      alert(`Added ${files.length} track(s) to Queue!`);
    });

    // Soundboard Pads
    this.sfxPads.forEach(pad => {
      pad.addEventListener('click', async () => {
        await this.engine.init();
        const sfx = pad.dataset.sfx;
        this.soundboard.trigger(sfx);
      });
    });

    // Custom Sound Drop Upload
    if (this.fileUploadSfx) {
      this.fileUploadSfx.addEventListener('change', (e) => {
        const files = Array.from(e.target.files);
        files.forEach(f => this.soundboard.addCustomSound(f));
        alert('Custom sound drops loaded into soundboard!');
      });
    }

    // Keyboard Shortcuts (Hotkeys)
    window.addEventListener('keydown', async (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key >= '1' && e.key <= '8') {
        const index = parseInt(e.key) - 1;
        if (this.sfxPads[index]) {
          await this.engine.init();
          this.sfxPads[index].click();
        }
      } else if (e.key.toLowerCase() === 'm' || e.code === 'Space') {
        e.preventDefault();
        this.btnMicToggle.click();
      }
    });

    // Quick TTS Shoutout Drop
    this.btnSpeakShoutout.addEventListener('click', async () => {
      const text = this.shoutoutInput.value.trim();
      if (!text) return;
      await this.engine.init();
      this.speakAnnouncement(text);
      this.shoutoutInput.value = '';
    });

    // Chat reply send
    this.chatReplyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.chatReplyInput.value.trim();
      if (!text) return;
      const msg = {
        user: `${this.activeRjName} (ON AIR)`,
        city: this.activeCity,
        text,
        fromMe: true
      };
      this.appendChatMessage(msg);
      this.chatReplyInput.value = '';
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ event: 'chat:message', data: msg }));
      }
    });
  }

  async initMicrophoneDevices() {
    try {
      const devices = await StudioAudioEngine.listMicrophones();
      this.micDeviceSelect.innerHTML = '';
      if (devices.length === 0) {
        this.micDeviceSelect.innerHTML = '<option value="">Default Studio Mic</option>';
      } else {
        devices.forEach((dev, idx) => {
          const opt = document.createElement('option');
          opt.value = dev.deviceId;
          opt.textContent = dev.label || `Microphone ${idx + 1}`;
          this.micDeviceSelect.appendChild(opt);
        });
      }
    } catch (e) {
      this.micDeviceSelect.innerHTML = '<option value="">Default Microphone</option>';
    }
  }

  /* ---------------------- Realtime VU Meters Loop ---------------------- */

  startMetersLoop() {
    const loop = () => {
      const meters = this.engine.readMeters();
      if (meters) {
        // Mic meter
        this.vuFillMic.style.height = `${meters.mic.level}%`;
        this.vuPeakMic.style.bottom = `${meters.mic.peak}%`;
        // Music meter
        this.vuFillMusic.style.height = `${meters.music.level}%`;
        this.vuPeakMusic.style.bottom = `${meters.music.peak}%`;
        // SFX meter
        this.vuFillSfx.style.height = `${meters.sfx.level}%`;
        this.vuPeakSfx.style.bottom = `${meters.sfx.peak}%`;
        // Master meter
        this.vuFillMaster.style.height = `${meters.master.level}%`;
        this.vuPeakMaster.style.bottom = `${meters.master.peak}%`;
      }

      // Draw Topbar Spectrum Analyser
      if (this.spectrumCtx && this.engine.spectrum) {
        const buffer = new Uint8Array(this.engine.spectrum.frequencyBinCount);
        this.engine.getSpectrum(buffer);
        const w = this.spectrumCanvas.width;
        const h = this.spectrumCanvas.height;
        this.spectrumCtx.clearRect(0, 0, w, h);
        const bars = 24;
        const barWidth = (w / bars) - 2;
        for (let i = 0; i < bars; i++) {
          const val = buffer[i * 2] || 0;
          const barHeight = (val / 255) * h;
          this.spectrumCtx.fillStyle = this.isLive ? '#ff3b30' : '#ff851a';
          this.spectrumCtx.fillRect(i * (barWidth + 2), h - barHeight, barWidth, barHeight);
        }
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ------------------- Broadcast Go-Live & End Logic ------------------- */

  async startBroadcast() {
    await this.engine.init();

    // Auto-open mic if available
    try {
      if (!this.engine.hasMic) {
        await this.engine.openMicDevice({ deviceId: this.micDeviceSelect.value });
      }
    } catch (e) {}

    this.isLive = true;
    this.btnMasterBroadcast.classList.add('is-live');
    this.btnBroadcastText.textContent = 'End Broadcast';
    this.onAirSign.classList.add('active');
    this.onAirText.textContent = 'ON AIR LIVE';

    // Start show timer
    this.broadcastSeconds = 0;
    if (this.broadcastTimerId) clearInterval(this.broadcastTimerId);
    this.broadcastTimerId = setInterval(() => {
      this.broadcastSeconds++;
      const hrs = String(Math.floor(this.broadcastSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((this.broadcastSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(this.broadcastSeconds % 60).padStart(2, '0');
      this.timerDisplay.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);

    // Notify backend
    fetch(`/api/v1/channels/${this.activeChannelId}/broadcasts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rj: this.activeRjName, title: this.activeChannelTitle })
    }).catch(() => {});

    // Soundboard opening jingle
    this.soundboard.trigger('jingle');

    // Announce to RJ
    setTimeout(() => {
      this.speakAnnouncement(`You are now on air live in ${this.activeCity} on Tarang Radio! Have a great broadcast, RJ!`);
    }, 600);
  }

  async endBroadcast() {
    if (!confirm('Are you sure you want to end your live radio broadcast?')) return;

    this.isLive = false;
    this.btnMasterBroadcast.classList.remove('is-live');
    this.btnBroadcastText.textContent = 'Start Live Broadcast';
    this.onAirSign.classList.remove('active');
    this.onAirText.textContent = 'OFF AIR';

    if (this.broadcastTimerId) clearInterval(this.broadcastTimerId);
    this.broadcastTimerId = null;

    // Notify backend
    fetch(`/api/v1/channels/${this.activeChannelId}/end`, {
      method: 'POST'
    }).catch(() => {});

    // Mute mic
    this.engine.setMicOpen(false);
    this.btnMicToggle.classList.remove('on-air');
    this.micToggleLabel.textContent = 'MIC MUTED (Click to Talk)';

    // Stop recorder if active
    if (this.engine.isRecording) {
      this.btnRecordShow.click();
    }
  }

  broadcastNowPlaying(track) {
    if (!track) return;
    fetch(`/api/v1/channels/${this.activeChannelId}/nowplaying`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: track.title,
        artist: track.artist,
        type: 'music'
      })
    }).catch(() => {});
  }

  speakAnnouncement(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.02;

      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi') || v.name.includes('India'));
      if (match) utterance.voice = match;

      // Auto-duck music while speech plays
      this.engine.duckGain.gain.setValueAtTime(0.25, this.engine.ctx.currentTime);
      utterance.onend = () => {
        if (!this.engine.isDucked) {
          this.engine.duckGain.gain.linearRampToValueAtTime(1.0, this.engine.ctx.currentTime + 0.8);
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {}
  }

  /* ----------------------- Track Search & Lists ----------------------- */

  async searchTracks() {
    const query = this.searchTrackInput.value.trim() || 'chill';
    const genre = this.genreFilterSelect.value;
    this.trackResultsContainer.innerHTML = '<div style="color:#888;padding:12px;">Searching Audius tracks...</div>';
    const tracks = await this.deckManager.searchAudiusTracks(query, genre);
    this.renderTrackResults(tracks);
  }

  async loadTrendingTracks() {
    const genre = this.genreFilterSelect.value;
    this.trackResultsContainer.innerHTML = '<div style="color:#888;padding:12px;">Loading trending hits...</div>';
    const tracks = await this.deckManager.fetchTrendingTracks(genre);
    this.renderTrackResults(tracks);
  }

  renderTrackResults(tracks) {
    this.trackResultsContainer.innerHTML = '';
    if (!tracks || tracks.length === 0) {
      this.trackResultsContainer.innerHTML = '<div style="color:#888;padding:12px;">No tracks found. Try another search.</div>';
      return;
    }

    tracks.forEach(track => {
      const row = document.createElement('div');
      row.className = 'track-item-row';
      row.innerHTML = `
        <div class="track-item-left">
          <img class="track-item-art" src="${track.artwork || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150'}" alt="Art">
          <div class="track-item-text">
            <div class="track-item-title">${track.title}</div>
            <div class="track-item-artist">${track.artist} · ${track.genre || 'Indie'}</div>
          </div>
        </div>
        <div class="track-item-actions">
          <button class="btn-load-deck btn-load-a" data-deck="A">Deck A</button>
          <button class="btn-load-deck btn-load-b" data-deck="B">Deck B</button>
          <button class="btn-load-deck btn-add-q">Queue</button>
        </div>
      `;

      row.querySelector('.btn-load-a').addEventListener('click', async () => {
        await this.engine.init();
        this.deckManager.loadTrack('A', track, true);
        this.deckManager.setCrossfade(0);
        this.crossfadeSlider.value = '0';
      });

      row.querySelector('.btn-load-b').addEventListener('click', async () => {
        await this.engine.init();
        this.deckManager.loadTrack('B', track, true);
        this.deckManager.setCrossfade(1);
        this.crossfadeSlider.value = '1';
      });

      row.querySelector('.btn-add-q').addEventListener('click', () => {
        this.deckManager.addToQueue(track);
        alert(`Added "${track.title}" to play queue!`);
      });

      this.trackResultsContainer.appendChild(row);
    });
  }

  renderUploadsTab() {
    this.trackResultsContainer.innerHTML = `
      <div style="padding:16px;text-align:center;color:#aaa;">
        <p style="margin-bottom:12px;">Upload your own MP3 / WAV audio tracks to play on-air</p>
        <button class="btn-load-deck" style="padding:10px 18px;font-size:0.9rem;" onclick="document.getElementById('file-upload-track').click()">
          📂 Select Audio Files From Device
        </button>
      </div>
    `;
  }

  /* ------------------- Realtime WebSocket Integration ------------------- */

  initWebSocket() {
    try {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
      this.socket = new WebSocket(wsUrl);

      this.socket.addEventListener('message', (e) => {
        try {
          const payload = JSON.parse(e.data);
          if (payload.event === 'listeners:update') {
            if (payload.data.channelId === this.activeChannelId) {
              this.listenersCount = payload.data.count;
              if (this.listenersDisplay) {
                this.listenersDisplay.textContent = this.listenersCount >= 1000 
                  ? `${(this.listenersCount / 1000).toFixed(1)}k` 
                  : this.listenersCount;
              }
            }
          } else if (payload.event === 'chat:message') {
            this.appendChatMessage(payload.data);
          }
        } catch (err) {}
      });
    } catch (e) {}
  }

  appendChatMessage(msg) {
    if (!this.chatMessagesBox) return;
    const row = document.createElement('div');
    row.className = 'chat-msg-row';
    row.innerHTML = `
      <span class="chat-msg-author">${msg.user} (${msg.city || 'Listener'}):</span>
      <span class="chat-msg-text">${msg.text}</span>
    `;
    this.chatMessagesBox.appendChild(row);
    this.chatMessagesBox.scrollTop = this.chatMessagesBox.scrollHeight;
  }
}

// Auto-boot on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
  window.studio = new StudioController();
  window.studio.init();
});
