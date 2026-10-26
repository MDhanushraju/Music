/**
 * TARANG - Modern City-Based FM Radio Platform
 * Interactive Audio Engine, RJ Studio, & Live Stream Simulation
 */

// Initial Data: Cities and their live channels
const CITIES_DATA = [
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    freq: '91.1 MHz Stream',
    channels: [
      {
        id: 'blr-namma-morning',
        title: 'Namma Morning',
        rj: 'RJ Kavya',
        lang: 'Kannada & English talk',
        tags: ['Talk', 'Indie', 'Morning Show'],
        listeners: 1342,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff6600, #993300)',
        talkScript: "Good morning Bengaluru! This is RJ Kavya on Tarang Namma Morning 91.1. Grab your piping hot filter coffee, traffic on Outer Ring Road is moving slow as usual, but we've got some lovely indie Kannada vibes lined up for you!"
      },
      {
        id: 'blr-koramangala-code',
        title: 'Koramangala Chai & Code',
        rj: 'RJ Abhi',
        lang: 'English & Hindi banter',
        tags: ['Talk', 'Late Night'],
        listeners: 890,
        isLive: true,
        gradient: 'linear-gradient(135deg, #1f1f26, #ff7a1a)',
        talkScript: "What's up techies and night owls! You're tuned into Koramangala Chai & Code on Tarang. Debugging past midnight? Sit back, take a breath, let these lo-fi beats keep your sanity intact."
      },
      {
        id: 'blr-indiranagar-indie',
        title: 'Indiranagar Indie Wave',
        rj: 'RJ Maya',
        lang: 'Kannada Indie & Folk',
        tags: ['Indie', 'Music'],
        listeners: 1120,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ffa826, #d94d00)',
        talkScript: "Hey music lovers! Welcome to Indiranagar Indie Wave on Tarang 91.1. We are highlighting fresh grassroots singer-songwriters from across Karnataka today."
      }
    ]
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    freq: '98.3 MHz Stream',
    channels: [
      {
        id: 'mum-meri-jaan',
        title: 'Mumbai Meri Jaan',
        rj: 'RJ Rohit',
        lang: 'Hindi & Bambaiya talk',
        tags: ['Bollywood', 'Morning Show', 'Talk'],
        listeners: 3215,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff4d00, #7a1f00)',
        talkScript: "Aamchi Mumbai! This is RJ Rohit on Tarang Mumbai 98.3. Local train updates: Western line running on time, weather is pleasant at Marine Drive. Ready for some retro Bollywood magic?"
      },
      {
        id: 'mum-marine-confessions',
        title: 'Marine Drive Confessions',
        rj: 'RJ Tara',
        lang: 'Hindi & Urdu poetry',
        tags: ['Late Night', 'Talk'],
        listeners: 2150,
        isLive: true,
        gradient: 'linear-gradient(135deg, #18181f, #ff6600)',
        talkScript: "Shubh raatri Mumbai. You are listening to RJ Tara on Tarang. Sit by the sea breeze, let go of the hectic city rush, and share your untold stories with us."
      },
      {
        id: 'mum-gully-beats',
        title: 'Gully Cyphers & Hip-Hop',
        rj: 'MC D-Street',
        lang: 'Hindi & Marathi rap',
        tags: ['Music', 'Indie'],
        listeners: 1450,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff9900, #cc4400)',
        talkScript: "Representing Mumbai street sounds on Tarang! Fresh underground hip-hop, boom bap, and desi flows right to your headphones!"
      }
    ]
  },
  {
    id: 'delhi',
    name: 'Delhi',
    freq: '104.0 MHz Stream',
    channels: [
      {
        id: 'del-dilli6-gupshup',
        title: 'Dilli 6 Chai & Gupshup',
        rj: 'RJ Nitin',
        lang: 'Hindi talk & humor',
        tags: ['Talk', 'Comedy', 'Morning Show'],
        listeners: 2840,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ea580c, #9a3412)',
        talkScript: "Haan ji Dilli walon! RJ Nitin hazir hai Tarang Delhi 104.0 par. CP ki thand, Chandni Chowk ki jalebi aur humara live gupshup show! Bhejo apne shoutouts!"
      },
      {
        id: 'del-hauz-khas-indie',
        title: 'Hauz Khas Indie Sunset',
        rj: 'RJ Sam',
        lang: 'English & Hindi Indie',
        tags: ['Indie', 'Music'],
        listeners: 1780,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff851a, #201a14)',
        talkScript: "Good evening Delhi! Tuning into Hauz Khas Indie Sunset on Tarang. Independent music from university campuses and garage bands across the capital."
      }
    ]
  },
  {
    id: 'chennai',
    name: 'Chennai',
    freq: '93.5 MHz Stream',
    channels: [
      {
        id: 'chn-morning-kapi',
        title: 'Madras Morning Kapi',
        rj: 'RJ Ananya',
        lang: 'Tamil & English cine talk',
        tags: ['Morning Show', 'Talk', 'Bollywood'],
        listeners: 1920,
        isLive: true,
        gradient: 'linear-gradient(135deg, #d97706, #78350f)',
        talkScript: "Vanakkam Chennai! RJ Ananya with you on Tarang Chennai 93.5. Morning filter coffee in hand, breezy Marina beach air, and the greatest Kollywood melodies streaming live!"
      },
      {
        id: 'chn-marina-acoustic',
        title: 'Marina Coastal Rhythms',
        rj: 'RJ Karthik',
        lang: 'Tamil Fusion & Folk',
        tags: ['Indie', 'Music'],
        listeners: 1410,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff6600, #17171e)',
        talkScript: "Vanakkam! Tune into Marina Coastal Rhythms on Tarang. Blending traditional Carnatic notes with contemporary acoustic indie grooves."
      }
    ]
  },
  {
    id: 'kolkata',
    name: 'Kolkata',
    freq: '91.9 MHz Stream',
    channels: [
      {
        id: 'kol-nostalgia-adda',
        title: 'Calcutta Nostalgia & Adda',
        rj: 'RJ Sourav',
        lang: 'Bengali & English Adda',
        tags: ['Talk', 'Indie', 'Late Night'],
        listeners: 1650,
        isLive: true,
        gradient: 'linear-gradient(135deg, #b45309, #451a03)',
        talkScript: "Nomoshkar Kolkata! You are listening to Tarang Kolkata 91.9 with RJ Sourav. The evening tea stall adda is on, playing timeless Bengali rock and soulful acoustics."
      },
      {
        id: 'kol-park-street-jazz',
        title: 'Park Street Jazz Lounge',
        rj: 'RJ Ria',
        lang: 'English Smooth Jazz',
        tags: ['Music', 'Late Night'],
        listeners: 980,
        isLive: true,
        gradient: 'linear-gradient(135deg, #2a2018, #ff851a)',
        talkScript: "Welcome to the Park Street Jazz Lounge on Tarang Kolkata. Dim your lights, unwind, and let the saxophones carry your night away."
      }
    ]
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    freq: '92.7 MHz Stream',
    channels: [
      {
        id: 'hyd-biryani-bass',
        title: 'Biryani & Bass',
        rj: 'RJ Vikram',
        lang: 'Telugu & Hyderabadi talk',
        tags: ['Bollywood', 'Talk', 'Morning Show'],
        listeners: 2310,
        isLive: true,
        gradient: 'linear-gradient(135deg, #f97316, #7c2d12)',
        talkScript: "Namaskaram Hyderabad! RJ Vikram live on Tarang 92.7! Charminar chai, spicy Irani snacks, and Tollywood's biggest chartbusters coming right up!"
      }
    ]
  },
  {
    id: 'pune',
    name: 'Pune',
    freq: '95.0 MHz Stream',
    channels: [
      {
        id: 'pun-fc-road-buzz',
        title: 'FC Road Campus Banter',
        rj: 'RJ Tanmay',
        lang: 'Marathi & Hindi Comedy',
        tags: ['Comedy', 'Talk', 'Indie'],
        listeners: 1540,
        isLive: true,
        gradient: 'linear-gradient(135deg, #c2410c, #1f1f26)',
        talkScript: "Kasa kay Pune! RJ Tanmay here on Tarang Pune 95.0. Campus life, canteen gossip, weekend plans, and fresh Pune indie jams!"
      }
    ]
  },
  {
    id: 'kochi',
    name: 'Kochi',
    freq: '94.3 MHz Stream',
    channels: [
      {
        id: 'koc-malabar-chill',
        title: 'Malabar Sunset Melodies',
        rj: 'RJ Nithin',
        lang: 'Malayalam Indie & Talk',
        tags: ['Indie', 'Music', 'Late Night'],
        listeners: 1280,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ea580c, #431407)',
        talkScript: "Namaskaram Kochi! Tuning in to Tarang Kochi 94.3 with RJ Nithin. Relax with the sounds of backwaters and beautiful contemporary Malayalam indie music."
      }
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    freq: '92.7 MHz Stream',
    channels: [
      {
        id: 'goa-anjuna-sunset',
        title: 'Anjuna Sunset Sessions',
        rj: 'RJ Leo',
        lang: 'English Chill & Reggae',
        tags: ['Indie', 'Music', 'Late Night'],
        listeners: 1820,
        isLive: true,
        gradient: 'linear-gradient(135deg, #ff7a1a, #991b1b)',
        talkScript: "Peace and love from sunny Goa! RJ Leo on Tarang Goa 92.7. Golden hour by the ocean, acoustic guitars, and laid-back coastal vibrations."
      }
    ]
  }
];

// Sample Live Chat Messages pool for authentic atmosphere
const SAMPLE_CHATS = [
  { user: 'Sneha_R', city: 'Bengaluru', text: 'Kavya please play that Raghu Dixit acoustic track! Loving the vibe today ☕' },
  { user: 'Arjun_M', city: 'Mumbai', text: 'Silk board traffic got me stuck, Tarang keeping me sane rn 😂' },
  { user: 'Dev_Delhi', city: 'Delhi', text: 'Shoutout to Dilli 6! Chai garam hai boss 🔥' },
  { user: 'Anand_K', city: 'Chennai', text: 'Best RJ in south India hands down! Sound quality is crisp 🎧' },
  { user: 'Pooja_99', city: 'Kolkata', text: 'Adda time with Tarang! Perfect evening companion ❤️' },
  { user: 'Rohan_B', city: 'Bengaluru', text: 'Sending love from Indiranagar! That last guitar solo was magic 🎸' }
];

/* ==========================================================================
   AUDIO ENGINE (Web Audio API Synthesizer & Speech Voiceover)
   ========================================================================== */
class RadioAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.analyser = null;
    this.timerInterval = null;
    this.secondsPlayed = 0;
    this.lofiNotes = [261.63, 329.63, 392.00, 493.88, 587.33, 659.25]; // C4, E4, G4, B4, D5, E5
    this.noteStep = 0;
    this.synthLoopInterval = null;
    this.isMuted = false;
    this.previousVolume = 0.8;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Plays authentic FM static burst when tuning between frequencies
  playStaticBurst(duration = 0.35) {
    if (!this.ctx) return;
    if (window.tarang && window.tarang.userSettings && window.tarang.userSettings.staticBurst === false) return;
    try {
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.2;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start();
    } catch (e) {
      console.warn("Audio static effect error:", e);
    }
  }

  // Realistic synthesized Lo-Fi / Ambient Radio Stream chords & beat
  startStationMusicStream() {
    if (this.synthLoopInterval) {
      clearInterval(this.synthLoopInterval);
    }

    // Play initial station chime
    this.playStationJingle(false);

    // Continuous lo-fi groove sequencer
    this.synthLoopInterval = setInterval(() => {
      if (!this.isPlaying || !this.ctx) return;
      this.triggerAmbientChord();
    }, 1800);
  }

  triggerAmbientChord() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    try {
      const t = this.ctx.currentTime;
      const chord = [
        this.lofiNotes[this.noteStep % this.lofiNotes.length],
        this.lofiNotes[(this.noteStep + 2) % this.lofiNotes.length],
        this.lofiNotes[(this.noteStep + 4) % this.lofiNotes.length]
      ];
      this.noteStep++;

      // Warm Pad Synth
      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(750, t);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.08, t + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.7);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t);
        osc.stop(t + 1.8);
      });

      // Soft Sub-bass kick
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(110, t);
      kickOsc.frequency.exponentialRampToValueAtTime(40, t + 0.35);

      kickGain.gain.setValueAtTime(0.2, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain);

      kickOsc.start(t);
      kickOsc.stop(t + 0.4);
    } catch (e) {
      console.warn("Synth play error:", e);
    }
  }

  // Soundboard SFX Triggers
  playStationJingle(alertUser = true) {
    if (!this.ctx) this.init();
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const t = this.ctx.currentTime;
      notes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + i * 0.12);

        gain.gain.setValueAtTime(0.18, t + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(t + i * 0.12);
        osc.stop(t + i * 0.12 + 0.7);
      });
    } catch (e) {
      console.warn("Jingle error:", e);
    }
  }

  playAirhorn() {
    if (!this.ctx) this.init();
    try {
      const t = this.ctx.currentTime;
      [0, 0.16, 0.32, 0.6].forEach(delay => {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';

        osc1.frequency.setValueAtTime(466.16, t + delay); // Bb4
        osc2.frequency.setValueAtTime(622.25, t + delay); // Eb5

        gain.gain.setValueAtTime(0.16, t + delay);
        gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.masterGain);

        osc1.start(t + delay);
        osc2.start(t + delay);
        osc1.stop(t + delay + 0.24);
        osc2.stop(t + delay + 0.24);
      });
    } catch (e) {
      console.warn("Airhorn error:", e);
    }
  }

  playApplause() {
    if (!this.ctx) this.init();
    try {
      const duration = 1.8;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI) * 0.18;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, this.ctx.currentTime);
      filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(this.masterGain);
      noise.start();
    } catch (e) {
      console.warn("Applause error:", e);
    }
  }

  playVinylScratch() {
    if (!this.ctx) this.init();
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';

      osc.frequency.setValueAtTime(180, t);
      osc.frequency.linearRampToValueAtTime(1400, t + 0.15);
      osc.frequency.linearRampToValueAtTime(300, t + 0.3);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(t);
      osc.stop(t + 0.36);
    } catch (e) {
      console.warn("Scratch error:", e);
    }
  }

  playLaughTrack() {
    if (!this.ctx) this.init();
    try {
      const t = this.ctx.currentTime;
      for (let i = 0; i < 6; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = t + i * 0.14;
        osc.frequency.setValueAtTime(320 + (i % 2) * 80, start);
        osc.frequency.exponentialRampToValueAtTime(180, start + 0.12);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start);
        osc.stop(start + 0.14);
      }
    } catch (e) {
      console.warn("Laugh error:", e);
    }
  }

  setVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(parseFloat(val), this.ctx.currentTime);
    }
  }

  toggleMute() {
    if (!this.masterGain || !this.ctx) return false;
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.previousVolume = this.masterGain.gain.value || 0.8;
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    } else {
      this.masterGain.gain.setValueAtTime(this.previousVolume, this.ctx.currentTime);
    }
    return this.isMuted;
  }

  // Live RJ Speech synthesis for authentic radio personality talk
  speakRJ(text) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel(); // Clear any ongoing voice
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.pitch = 1.02;

      // Find an Indian English / lively voice if available in browser
      const voices = window.speechSynthesis.getVoices();
      const inVoice = voices.find(v => v.lang.includes('en-IN') || v.lang.includes('hi') || v.name.includes('India'));
      if (inVoice) {
        utterance.voice = inVoice;
      }

      // Slightly duck background music while RJ is on air if enabled
      const shouldDuck = !window.tarang || window.tarang.userSettings?.autoDucking !== false;
      if (shouldDuck && this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        utterance.onend = () => {
          if (this.masterGain && this.ctx && !this.isMuted) {
            this.masterGain.gain.linearRampToValueAtTime(0.8, this.ctx.currentTime + 1.0);
          }
        };
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }
}

/* ==========================================================================
   APP STATE & UI CONTROLLER
   ========================================================================== */
class TarangApp {
  constructor() {
    this.audio = new RadioAudioEngine();
    this.cities = CITIES_DATA;
    this.activeCityId = 'bengaluru';
    this.activeFilter = 'all'; // 'all', 'live', 'subscribed'
    this.activeGenre = 'all';
    this.currentChannel = null;
    this.subscribedChannelIds = new Set(JSON.parse(localStorage.getItem('tarang_subs') || '["blr-namma-morning"]'));
    this.customChannels = JSON.parse(localStorage.getItem('tarang_custom_channels') || '[]');

    // Merge custom created channels into cities
    this.customChannels.forEach(ch => {
      const city = this.cities.find(c => c.name.toLowerCase() === ch.cityName.toLowerCase());
      if (city) {
        city.channels.unshift(ch);
      }
    });

    this.timerId = null;
    this.timeCounter = 0;
    this.chatMessages = [...SAMPLE_CHATS];
    this.isStudioLive = false;
    this.isStudioMicActive = false;
    this.vuAnimationId = null;

    // User Profile & Audio Settings
    const defaultSettings = {
      staticBurst: true,
      autoDucking: true,
      visualizer: true,
      bitrate: '320',
      homeCity: 'bengaluru',
      liveAlerts: true,
      floatingReactions: true
    };
    this.userSettings = Object.assign(defaultSettings, JSON.parse(localStorage.getItem('tarang_user_settings') || '{}'));
    if (this.userSettings.homeCity && this.cities.some(c => c.id === this.userSettings.homeCity)) {
      this.activeCityId = this.userSettings.homeCity;
    }

    this.initDOM();
    this.initAuthSession();
    this.renderCitiesTuner();
    this.renderChannels();
    this.setupEventListeners();
    this.startLiveFluctuations();
    this.initBackendSync();
  }

  initDOM() {
    // Tuner
    this.tunerListEl = document.getElementById('tuner-cards-list');
    this.tunerNeedleEl = document.getElementById('tuner-needle');
    this.tunerTicksEl = document.getElementById('tuner-ticks');
    this.tunerContainerEl = document.getElementById('tuner-track-container');

    // Section
    this.cityHeadingEl = document.getElementById('current-city-heading');
    this.cityFreqEl = document.getElementById('current-city-freq');
    this.channelsListEl = document.getElementById('channels-list');
    this.emptyStateEl = document.getElementById('empty-state');

    // Player
    this.playerIdleEl = document.getElementById('player-idle-content');
    this.playerActiveEl = document.getElementById('player-active-content');
    this.playerChannelTitleEl = document.getElementById('player-channel-title');
    this.playerRjInfoEl = document.getElementById('player-rj-info');
    this.playerCityLabelEl = document.getElementById('player-city-label');
    this.playerThumbEl = document.getElementById('player-thumb');
    this.btnPlayPause = document.getElementById('btn-play-pause');
    this.iconPlay = document.getElementById('icon-play');
    this.iconPause = document.getElementById('icon-pause');
    this.timeTickerEl = document.getElementById('live-time-ticker');
    this.volSlider = document.getElementById('volume-slider');
    this.btnMuteToggle = document.getElementById('btn-mute-toggle');
    this.iconVolHigh = document.getElementById('icon-vol-high');
    this.iconVolMuted = document.getElementById('icon-vol-muted');
    this.visualizerCanvas = document.getElementById('audio-visualizer-canvas');
    this.visualizerCtx = this.visualizerCanvas.getContext('2d');

    // Chat Drawer
    this.chatDrawerEl = document.getElementById('chat-drawer');
    this.chatMessagesListEl = document.getElementById('chat-messages-container');
    this.chatBadgeCountEl = document.getElementById('chat-badge-count');
    this.chatFormEl = document.getElementById('chat-form');
    this.chatInputEl = document.getElementById('chat-input');

    // Creator Studio Modal
    this.studioModalEl = document.getElementById('studio-modal');
    this.studioFormEl = document.getElementById('studio-form');
    this.studioOnAirSign = document.getElementById('studio-on-air-sign');
    this.btnToggleStudioMic = document.getElementById('btn-toggle-studio-mic');
    this.micLabelEl = document.getElementById('mic-label');
    this.vuFillEl = document.getElementById('vu-meter-fill');
    this.btnBroadcastToggle = document.getElementById('btn-broadcast-toggle');
    this.broadcastBtnText = document.getElementById('broadcast-btn-text');

    // Profile Sidebar & Backdrop Elements
    this.btnOpenProfile = document.getElementById('btn-open-profile');
    this.btnCloseProfile = document.getElementById('btn-close-profile');
    this.profileSidebar = document.getElementById('profile-sidebar');
    this.profileBackdrop = document.getElementById('profile-backdrop');
    this.profileSubsContainer = document.getElementById('profile-subs-container');
    this.profileSubsBadge = document.getElementById('profile-subs-badge');
    this.profileStatSubs = document.getElementById('profile-stat-subs');
    this.profileStatHosted = document.getElementById('profile-stat-hosted');
    this.btnProfileLaunchStudio = document.getElementById('btn-profile-launch-studio');
    this.btnAccountSignout = document.getElementById('btn-account-signout');
    this.btnLogout = document.getElementById('btn-logout');

    // Settings Inputs
    this.settingStaticBurst = document.getElementById('setting-static-burst');
    this.settingAutoDucking = document.getElementById('setting-auto-ducking');
    this.settingVisualizer = document.getElementById('setting-visualizer');
    this.settingHomeCity = document.getElementById('setting-home-city');
    this.settingLiveAlerts = document.getElementById('setting-live-alerts');
    this.settingFloatingReactions = document.getElementById('setting-floating-reactions');
    this.streamBitrateBadge = document.querySelector('.stream-bitrate');

    // Overlay
    this.reactionsLayerEl = document.getElementById('reactions-layer');

    // Render Tuner ticks
    let ticksHtml = '';
    for (let i = 0; i < 48; i++) {
      const isMajor = i % 6 === 0;
      ticksHtml += `<div class="tick-mark ${isMajor ? 'major' : ''}"></div>`;
    }
    this.tunerTicksEl.innerHTML = ticksHtml;

    // Start Visualizer Loop
    this.runVisualizerLoop();
  }

  renderCitiesTuner() {
    this.tunerListEl.innerHTML = '';
    this.cities.forEach((city) => {
      const card = document.createElement('div');
      const isActive = city.id === this.activeCityId;
      card.className = `city-tuner-card ${isActive ? 'active' : ''}`;
      card.dataset.cityId = city.id;

      const liveCount = city.channels.filter(c => c.isLive).length;
      card.innerHTML = `
        <div class="city-card-name">${city.name}</div>
        <div class="city-card-count">${liveCount} live</div>
      `;

      card.addEventListener('click', () => {
        this.switchCity(city.id, card);
      });

      this.tunerListEl.appendChild(card);
    });

    // Position needle on active card
    setTimeout(() => {
      const activeCard = this.tunerListEl.querySelector('.city-tuner-card.active');
      if (activeCard) {
        this.updateNeedlePosition(activeCard);
      }
    }, 50);
  }

  updateNeedlePosition(cardElement) {
    if (!cardElement) return;
    const cardRect = cardElement.getBoundingClientRect();
    const containerRect = this.tunerContainerEl.getBoundingClientRect();
    const relativeCenter = (cardRect.left - containerRect.left) + (cardRect.width / 2) + this.tunerContainerEl.scrollLeft;
    this.tunerNeedleEl.style.left = `${relativeCenter}px`;
  }

  switchCity(cityId, cardElement) {
    if (this.activeCityId === cityId) return;

    this.activeCityId = cityId;
    this.audio.playStaticBurst(0.28); // Real FM tuning static sound

    document.querySelectorAll('.city-tuner-card').forEach(el => el.classList.remove('active'));
    if (cardElement) {
      cardElement.classList.add('active');
      this.updateNeedlePosition(cardElement);
      // Smooth scroll into view
      cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    const currentCity = this.cities.find(c => c.id === this.activeCityId);
    if (currentCity) {
      this.cityHeadingEl.textContent = `${currentCity.name} on air`;
      this.cityFreqEl.textContent = currentCity.freq;
    }

    this.renderChannels();
  }

  renderChannels() {
    const currentCity = this.cities.find(c => c.id === this.activeCityId);
    if (!currentCity) return;

    let filtered = currentCity.channels.filter(channel => {
      // Filter by status (All, Live, Subscribed)
      if (this.activeFilter === 'live' && !channel.isLive) return false;
      if (this.activeFilter === 'subscribed' && !this.subscribedChannelIds.has(channel.id)) return false;

      // Filter by genre
      if (this.activeGenre !== 'all') {
        const matchesGenre = channel.tags.some(tag => tag.toLowerCase() === this.activeGenre.toLowerCase());
        if (!matchesGenre) return false;
      }
      return true;
    });

    this.channelsListEl.innerHTML = '';

    if (filtered.length === 0) {
      this.emptyStateEl.classList.remove('hidden');
    } else {
      this.emptyStateEl.classList.add('hidden');

      filtered.forEach(channel => {
        const isCurrentlyPlaying = this.currentChannel && this.currentChannel.id === channel.id && this.audio.isPlaying;
        const isSubscribed = this.subscribedChannelIds.has(channel.id);

        const card = document.createElement('div');
        card.className = `channel-card ${isCurrentlyPlaying ? 'is-playing' : ''}`;
        card.dataset.channelId = channel.id;

        const tagsHtml = channel.tags.map(t => `<span class="tag-badge">${t}</span>`).join('');
        const listenersFormatted = channel.listeners >= 1000 ? `${(channel.listeners / 1000).toFixed(1)}k` : channel.listeners;

        card.innerHTML = `
          <div class="card-top-row">
            <div class="channel-artwork" style="background: ${channel.gradient};">
              <div class="channel-bars-icon">
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
                <span class="eq-bar"></span>
              </div>
            </div>
            <div class="channel-main-info">
              <div class="channel-title-row">
                <h3 class="channel-title">${channel.title}</h3>
              </div>
              <p class="channel-host">${channel.rj} · ${channel.lang}</p>
              <div class="channel-tags">${tagsHtml}</div>
            </div>
          </div>

          <div class="card-bottom-row">
            <div class="live-listeners-badge">
              <span class="live-beacon"></span>
              <span>Live · <span class="listener-count-num" data-id="${channel.id}">${listenersFormatted}</span></span>
            </div>
            <div class="card-actions-group">
              <button class="btn-subscribe ${isSubscribed ? 'is-subscribed' : ''}" data-channel-id="${channel.id}">
                ${isSubscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
              <button class="btn-tune-card" data-channel-id="${channel.id}">
                ${isCurrentlyPlaying ? 'Listening' : 'Tune In'}
              </button>
            </div>
          </div>
        `;

        // Subscribe button handler
        const subBtn = card.querySelector('.btn-subscribe');
        subBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleSubscribe(channel.id, subBtn);
        });

        // Click card or Tune button to tune into this station
        card.addEventListener('click', () => {
          this.tuneIntoChannel(channel);
        });

        this.channelsListEl.appendChild(card);
      });
    }
  }

  toggleSubscribe(channelId, buttonEl) {
    const isNowSubscribed = !this.subscribedChannelIds.has(channelId);
    if (!isNowSubscribed) {
      this.subscribedChannelIds.delete(channelId);
      buttonEl.classList.remove('is-subscribed');
      buttonEl.textContent = 'Subscribe';
    } else {
      this.subscribedChannelIds.add(channelId);
      buttonEl.classList.add('is-subscribed');
      buttonEl.textContent = '✓ Subscribed';
      this.spawnFloatingReaction('❤️');
    }
    localStorage.setItem('tarang_subs', JSON.stringify([...this.subscribedChannelIds]));
    this.renderProfileSubscriptions();

    // Persist subscription to backend database
    try {
      const authUser = JSON.parse(localStorage.getItem('tarang_auth_user') || '{}');
      const userId = authUser.id || 'usr_dev_1';
      fetch(`/api/v1/channels/${channelId}/subscribe`, {
        method: isNowSubscribed ? 'PUT' : 'DELETE',
        headers: { 'Content-Type': 'application/json', 'x-user-id': userId },
        body: JSON.stringify({ userId })
      }).catch(() => {});
    } catch (e) {
      // Ignore network sync errors
    }

    // If on Subscribed filter view, re-render
    if (this.activeFilter === 'subscribed') {
      this.renderChannels();
    }
  }

  tuneIntoChannel(channel) {
    this.audio.init();
    this.audio.playStaticBurst(0.3);

    this.currentChannel = channel;
    this.audio.isPlaying = true;
    this.audio.startStationMusicStream();

    // Update bottom player UI
    this.playerIdleEl.classList.add('hidden');
    this.playerActiveEl.classList.remove('hidden');

    this.playerChannelTitleEl.textContent = channel.title;
    this.playerRjInfoEl.textContent = `${channel.rj} · ${channel.lang}`;
    this.playerCityLabelEl.textContent = this.cities.find(c => c.id === this.activeCityId)?.name || 'India';
    this.playerThumbEl.style.background = channel.gradient;

    this.iconPlay.classList.add('hidden');
    this.iconPause.classList.remove('hidden');

    // Reset and start show timer
    this.secondsPlayed = 0;
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.secondsPlayed++;
      const hrs = String(Math.floor(this.secondsPlayed / 3600)).padStart(2, '0');
      const mins = String(Math.floor((this.secondsPlayed % 3600) / 60)).padStart(2, '0');
      const secs = String(this.secondsPlayed % 60).padStart(2, '0');
      this.timeTickerEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);

    this.renderChannels();

    // RJ on-air greeting after tuning in!
    setTimeout(() => {
      if (channel.talkScript) {
        this.audio.speakRJ(channel.talkScript);
      }
    }, 800);
  }

  togglePlayPause() {
    if (!this.currentChannel) return;
    this.audio.isPlaying = !this.audio.isPlaying;

    if (this.audio.isPlaying) {
      this.iconPlay.classList.add('hidden');
      this.iconPause.classList.remove('hidden');
      this.audio.startStationMusicStream();
    } else {
      this.iconPlay.classList.remove('hidden');
      this.iconPause.classList.add('hidden');
      if (this.audio.synthLoopInterval) {
        clearInterval(this.audio.synthLoopInterval);
      }
    }
    this.renderChannels();
  }

  playNextStation() {
    const currentCity = this.cities.find(c => c.id === this.activeCityId);
    if (!currentCity || !currentCity.channels.length) return;
    const currentIndex = currentCity.channels.findIndex(c => c.id === this.currentChannel?.id);
    const nextIndex = (currentIndex + 1) % currentCity.channels.length;
    this.tuneIntoChannel(currentCity.channels[nextIndex]);
  }

  playPrevStation() {
    const currentCity = this.cities.find(c => c.id === this.activeCityId);
    if (!currentCity || !currentCity.channels.length) return;
    const currentIndex = currentCity.channels.findIndex(c => c.id === this.currentChannel?.id);
    const prevIndex = (currentIndex - 1 + currentCity.channels.length) % currentCity.channels.length;
    this.tuneIntoChannel(currentCity.channels[prevIndex]);
  }

  // Floating Reaction Emojis
  spawnFloatingReaction(emoji) {
    if (this.userSettings && this.userSettings.floatingReactions === false) return;
    const reactionEl = document.createElement('div');
    reactionEl.className = 'floating-reaction-item';
    reactionEl.textContent = emoji;

    // Randomize initial horizontal position slightly
    const offset = Math.floor(Math.random() * 60) - 30;
    reactionEl.style.left = `calc(50% + ${offset}px)`;

    this.reactionsLayerEl.appendChild(reactionEl);

    setTimeout(() => {
      reactionEl.remove();
    }, 2200);
  }

  // Live Canvas Visualizer
  runVisualizerLoop() {
    const canvas = this.visualizerCanvas;
    const ctx = this.visualizerCtx;
    const bufferLength = this.audio.analyser ? this.audio.analyser.frequencyBinCount : 32;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      requestAnimationFrame(render);

      if (this.userSettings && this.userSettings.visualizer === false) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (this.audio.isPlaying && this.audio.analyser) {
        this.audio.analyser.getByteFrequencyData(dataArray);
      } else {
        // Idle line
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = 4;
        }
      }

      const barWidth = (canvas.width / 24) - 2;
      let x = 0;

      for (let i = 0; i < 24; i++) {
        let barHeight = (dataArray[i] / 255) * canvas.height;
        if (barHeight < 3) barHeight = 3;

        // Radio Spectrum Gradient (Deep orange to electric amber and gold)
        const grad = ctx.createLinearGradient(0, canvas.height, 0, 0);
        grad.addColorStop(0, '#d94d00');
        grad.addColorStop(0.55, '#ff6600');
        grad.addColorStop(1, '#ffc247');

        ctx.fillStyle = this.audio.isPlaying ? grad : '#25211c';
        ctx.beginPath();
        ctx.roundRect(x, canvas.height - barHeight, barWidth, barHeight, 2);
        ctx.fill();

        x += barWidth + 2;
      }
    };
    render();
  }

  // Realistic listener count fluctuation to make it feel genuinely live
  startLiveFluctuations() {
    setInterval(() => {
      this.cities.forEach(city => {
        city.channels.forEach(ch => {
          const delta = Math.floor(Math.random() * 7) - 3;
          ch.listeners = Math.max(50, ch.listeners + delta);
        });
      });

      // Update in DOM if visible
      document.querySelectorAll('.listener-count-num').forEach(el => {
        const id = el.dataset.id;
        for (const city of this.cities) {
          const ch = city.channels.find(c => c.id === id);
          if (ch) {
            el.textContent = ch.listeners >= 1000 ? `${(ch.listeners / 1000).toFixed(1)}k` : ch.listeners;
            break;
          }
        }
      });

      // Ambient reactions from other online listeners
      if (this.audio.isPlaying && Math.random() > 0.6) {
        const emojis = ['🔥', '❤️', '👏', '☕', '🌊'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.spawnFloatingReaction(randomEmoji);
      }
    }, 3500);
  }

  // Setup UI Event Listeners
  setupEventListeners() {
    // Quick Tune on Idle Bar
    document.getElementById('btn-quick-tune').addEventListener('click', () => {
      const currentCity = this.cities.find(c => c.id === this.activeCityId);
      if (currentCity && currentCity.channels.length > 0) {
        this.tuneIntoChannel(currentCity.channels[0]);
      }
    });

    // Player controls
    this.btnPlayPause.addEventListener('click', () => this.togglePlayPause());
    document.getElementById('btn-next-channel').addEventListener('click', () => this.playNextStation());
    document.getElementById('btn-prev-channel').addEventListener('click', () => this.playPrevStation());

    // RJ Talk Button: Triggers live speech commentary
    document.getElementById('btn-rj-speak').addEventListener('click', () => {
      if (this.currentChannel && this.currentChannel.talkScript) {
        this.audio.speakRJ(this.currentChannel.talkScript);
        this.spawnFloatingReaction('🎙️');
      }
    });

    // Volume Slider
    this.volSlider.addEventListener('input', (e) => {
      this.audio.setVolume(e.target.value);
      if (parseFloat(e.target.value) === 0) {
        this.iconVolHigh.classList.add('hidden');
        this.iconVolMuted.classList.remove('hidden');
      } else {
        this.iconVolHigh.classList.remove('hidden');
        this.iconVolMuted.classList.add('hidden');
      }
    });

    // Mute Toggle
    this.btnMuteToggle.addEventListener('click', () => {
      const isMuted = this.audio.toggleMute();
      if (isMuted) {
        this.iconVolHigh.classList.add('hidden');
        this.iconVolMuted.classList.remove('hidden');
      } else {
        this.iconVolHigh.classList.remove('hidden');
        this.iconVolMuted.classList.add('hidden');
      }
    });

    // Listener Reaction Buttons
    document.querySelectorAll('.reaction-trigger-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const emoji = btn.dataset.reaction;
        this.spawnFloatingReaction(emoji);
      });
    });

    // Feed Filter Pills (All / Live now / Subscribed)
    document.querySelectorAll('#feed-filters .filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#feed-filters .filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.activeFilter = pill.dataset.filter;
        this.renderChannels();
      });
    });

    // Genre Chips
    document.querySelectorAll('#genre-filters .genre-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#genre-filters .genre-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeGenre = chip.dataset.genre;
        this.renderChannels();
      });
    });

    // Reset Filters Button
    document.getElementById('btn-reset-filters').addEventListener('click', () => {
      this.activeFilter = 'all';
      this.activeGenre = 'all';
      document.querySelectorAll('#feed-filters .filter-pill').forEach(p => p.classList.remove('active'));
      document.querySelector('#feed-filters .filter-pill[data-filter="all"]').classList.add('active');
      document.querySelectorAll('#genre-filters .genre-chip').forEach(c => c.classList.remove('active'));
      document.querySelector('#genre-filters .genre-chip[data-genre="all"]').classList.add('active');
      this.renderChannels();
    });

    // Chat Drawer Toggle
    const toggleChat = () => {
      this.chatDrawerEl.classList.toggle('closed');
      if (!this.chatDrawerEl.classList.contains('closed')) {
        this.chatBadgeCountEl.textContent = '0';
        this.renderChatMessages();
      }
    };
    document.getElementById('btn-toggle-chat').addEventListener('click', toggleChat);
    document.getElementById('btn-close-chat').addEventListener('click', toggleChat);

    // Chat Message Send Form
    this.chatFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = this.chatInputEl.value.trim();
      if (!text) return;

      const newMsg = {
        user: 'You (Listener)',
        city: this.cities.find(c => c.id === this.activeCityId)?.name || 'Online',
        text: text,
        fromMe: true
      };
      this.chatMessages.push(newMsg);
      this.chatInputEl.value = '';
      this.renderChatMessages();
      this.spawnFloatingReaction('💬');

      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ event: 'chat:message', data: newMsg }));
      }

      // RJ acknowledgement response after a moment!
      setTimeout(() => {
        if (this.currentChannel && this.audio.isPlaying) {
          const rjName = this.currentChannel.rj;
          const ackText = `Shoutout to our live listener for the message: "${text}". We appreciate you tuning into ${this.currentChannel.title}!`;
          this.audio.speakRJ(ackText);
        }
      }, 1500);
    });

    // Studio Modal Open/Close
    const btnOpenStudio = document.getElementById('btn-open-studio');
    const btnCloseStudio = document.getElementById('btn-close-studio');
    const btnCancelStudio = document.getElementById('btn-cancel-studio');

    const openStudio = () => this.studioModalEl.classList.remove('hidden');
    const closeStudio = () => this.studioModalEl.classList.add('hidden');

    btnOpenStudio.addEventListener('click', openStudio);
    btnCloseStudio.addEventListener('click', closeStudio);
    btnCancelStudio.addEventListener('click', closeStudio);

    // Studio Soundboard FX triggers
    document.querySelectorAll('.sfx-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const sfx = btn.dataset.sfx;
        switch (sfx) {
          case 'airhorn': this.audio.playAirhorn(); break;
          case 'applause': this.audio.playApplause(); break;
          case 'jingle': this.audio.playStationJingle(); break;
          case 'scratch': this.audio.playVinylScratch(); break;
          case 'laugh': this.audio.playLaughTrack(); break;
        }
        this.spawnFloatingReaction('🔊');
      });
    });

    // Studio Mic Toggle & VU Meter
    this.btnToggleStudioMic.addEventListener('click', () => {
      this.isStudioMicActive = !this.isStudioMicActive;
      if (this.isStudioMicActive) {
        this.btnToggleStudioMic.classList.add('active');
        this.btnToggleStudioMic.textContent = 'Mute Mic';
        this.micLabelEl.textContent = 'Creator Mic: LIVE ON AIR';
        this.startVUMeter();
      } else {
        this.btnToggleStudioMic.classList.remove('active');
        this.btnToggleStudioMic.textContent = 'Unmute Mic';
        this.micLabelEl.textContent = 'Creator Mic: Muted';
        this.stopVUMeter();
      }
    });

    // Studio Broadcast Form Submit: Launch Channel Live!
    this.studioFormEl.addEventListener('submit', (e) => {
      e.preventDefault();
      this.startCreatorLiveBroadcast();
    });

    // Profile Sidebar Open & Close (Spotify-style)
    if (this.btnOpenProfile) {
      this.btnOpenProfile.addEventListener('click', () => this.openProfileSidebar());
    }
    if (this.btnCloseProfile) {
      this.btnCloseProfile.addEventListener('click', () => this.closeProfileSidebar());
    }
    if (this.profileBackdrop) {
      this.profileBackdrop.addEventListener('click', () => this.closeProfileSidebar());
    }

    // Global Escape key listener to close modals & drawers
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeProfileSidebar();
        if (this.studioModalEl && !this.studioModalEl.classList.contains('hidden')) {
          this.studioModalEl.classList.add('hidden');
        }
        if (this.chatDrawerEl && !this.chatDrawerEl.classList.contains('closed')) {
          this.chatDrawerEl.classList.add('closed');
        }
      }
    });

    // Profile Tabs Switching
    document.querySelectorAll('.profile-tab-btn').forEach(tabBtn => {
      tabBtn.addEventListener('click', () => {
        document.querySelectorAll('.profile-tab-btn').forEach(b => b.classList.remove('active'));
        tabBtn.classList.add('active');
        const targetTab = tabBtn.dataset.tab;
        document.querySelectorAll('.profile-tab-pane').forEach(pane => pane.classList.add('hidden'));
        const activePane = document.getElementById(`pane-${targetTab}`);
        if (activePane) activePane.classList.remove('hidden');
      });
    });

    // Launch Studio directly from Profile Drawer
    if (this.btnProfileLaunchStudio) {
      this.btnProfileLaunchStudio.addEventListener('click', () => {
        this.closeProfileSidebar();
        this.studioModalEl.classList.remove('hidden');
      });
    }

    // Bitrate selection
    document.querySelectorAll('.bitrate-btn').forEach(btn => {
      if (btn.dataset.bitrate === (this.userSettings.bitrate || '320')) {
        document.querySelectorAll('.bitrate-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
      btn.addEventListener('click', () => {
        document.querySelectorAll('.bitrate-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const bitrate = btn.dataset.bitrate;
        this.userSettings.bitrate = bitrate;
        this.saveUserSettings();
        if (this.streamBitrateBadge) {
          this.streamBitrateBadge.textContent = `${bitrate}kbps ${bitrate === '320' ? 'HD' : bitrate === '192' ? 'HQ' : 'STD'}`;
        }
      });
    });

    // Setting Toggles & Switches
    if (this.settingStaticBurst) {
      this.settingStaticBurst.checked = this.userSettings.staticBurst !== false;
      this.settingStaticBurst.addEventListener('change', (e) => {
        this.userSettings.staticBurst = e.target.checked;
        this.saveUserSettings();
      });
    }

    if (this.settingAutoDucking) {
      this.settingAutoDucking.checked = this.userSettings.autoDucking !== false;
      this.settingAutoDucking.addEventListener('change', (e) => {
        this.userSettings.autoDucking = e.target.checked;
        this.saveUserSettings();
      });
    }

    if (this.settingVisualizer) {
      this.settingVisualizer.checked = this.userSettings.visualizer !== false;
      this.settingVisualizer.addEventListener('change', (e) => {
        this.userSettings.visualizer = e.target.checked;
        this.saveUserSettings();
      });
    }

    if (this.settingLiveAlerts) {
      this.settingLiveAlerts.checked = this.userSettings.liveAlerts !== false;
      this.settingLiveAlerts.addEventListener('change', (e) => {
        this.userSettings.liveAlerts = e.target.checked;
        this.saveUserSettings();
      });
    }

    if (this.settingFloatingReactions) {
      this.settingFloatingReactions.checked = this.userSettings.floatingReactions !== false;
      this.settingFloatingReactions.addEventListener('change', (e) => {
        this.userSettings.floatingReactions = e.target.checked;
        this.saveUserSettings();
      });
    }

    if (this.settingHomeCity) {
      this.settingHomeCity.value = this.userSettings.homeCity || 'bengaluru';
      this.settingHomeCity.addEventListener('change', (e) => {
        this.userSettings.homeCity = e.target.value;
        this.saveUserSettings();
        const cityObj = this.cities.find(c => c.id === e.target.value);
        const cityDisplay = document.getElementById('profile-city-display');
        if (cityDisplay && cityObj) {
          cityDisplay.textContent = `${cityObj.name} (${cityObj.freq})`;
        }
      });
    }

    // Logout / Sign Out handlers (notify database & redirect to login page)
    const handleLogout = async () => {
      try {
        const authUser = JSON.parse(localStorage.getItem('tarang_auth_user') || '{}');
        if (authUser && authUser.id) {
          await fetch('/api/v1/auth/logout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-user-id': authUser.id
            },
            body: JSON.stringify({ userId: authUser.id })
          });
        }
      } catch (e) {
        // Continue logout even if offline
      }

      localStorage.removeItem('tarang_auth_user');
      if (this.audio && this.audio.isPlaying) {
        this.togglePlayPause();
      }
      window.location.href = 'login.html';
    };

    if (this.btnLogout) {
      this.btnLogout.addEventListener('click', handleLogout);
    }
    if (this.btnAccountSignout) {
      this.btnAccountSignout.addEventListener('click', handleLogout);
    }
  }

  startVUMeter() {
    const loop = () => {
      if (!this.isStudioMicActive) return;
      const level = Math.random() * 70 + 20; // 20% to 90%
      this.vuFillEl.style.width = `${level}%`;
      this.vuAnimationId = requestAnimationFrame(loop);
    };
    loop();
  }

  stopVUMeter() {
    if (this.vuAnimationId) cancelAnimationFrame(this.vuAnimationId);
    this.vuFillEl.style.width = '12%';
  }

  startCreatorLiveBroadcast() {
    const title = document.getElementById('broadcast-title').value.trim() || 'Live Radio Lounge';
    const rjName = document.getElementById('broadcast-rj').value.trim() || 'RJ Creator';
    const cityName = document.getElementById('broadcast-city').value;
    const genre = document.getElementById('broadcast-genre').value;
    const lang = document.getElementById('broadcast-lang').value.trim() || 'Hindi & English';

    const newChannel = {
      id: `custom-${Date.now()}`,
      title: title,
      rj: rjName,
      cityName: cityName,
      lang: lang,
      tags: [genre, 'Live On Air'],
      listeners: 1,
      isLive: true,
      gradient: 'linear-gradient(135deg, #ff6600, #ff851a)',
      talkScript: `Welcome everyone to my live show ${title} on Tarang ${cityName}! RJ ${rjName} is live and broadcasting right now!`
    };

    // Add to city
    const targetCity = this.cities.find(c => c.name.toLowerCase() === cityName.toLowerCase());
    if (targetCity) {
      targetCity.channels.unshift(newChannel);
    }

    // Save
    this.customChannels.push(newChannel);
    localStorage.setItem('tarang_custom_channels', JSON.stringify(this.customChannels));

    // Notify backend if online
    fetch('/api/v1/channels', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, rj: rjName, cityName, genre, lang })
    }).catch(() => {});

    // Update Studio UI State
    this.isStudioLive = true;
    this.studioOnAirSign.classList.add('live');
    this.studioOnAirSign.textContent = 'ON AIR LIVE';
    this.btnBroadcastToggle.classList.add('is-live');
    this.broadcastBtnText.textContent = 'Opening Studio...';

    this.audio.playStationJingle();

    setTimeout(() => {
      // Launch directly into dedicated RJ live broadcast console
      const studioParams = new URLSearchParams({
        channelId: newChannel.id,
        title: title,
        rj: rjName,
        city: cityName,
        genre: genre
      });
      window.location.href = `studio.html?${studioParams.toString()}`;
    }, 450);
  }

  renderChatMessages() {
    this.chatMessagesListEl.innerHTML = '';
    this.chatMessages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.fromMe ? 'from-me' : ''}`;
      bubble.innerHTML = `
        <div class="chat-bubble-author">
          <span>${msg.user} • ${msg.city}</span>
          <span class="chat-time">Just now</span>
        </div>
        <div class="chat-bubble-text">${msg.text}</div>
      `;
      this.chatMessagesListEl.appendChild(bubble);
    });
    this.chatMessagesListEl.scrollTop = this.chatMessagesListEl.scrollHeight;
  }

  saveUserSettings() {
    localStorage.setItem('tarang_user_settings', JSON.stringify(this.userSettings));

    // Persist settings to backend database
    try {
      const authUser = JSON.parse(localStorage.getItem('tarang_auth_user') || '{}');
      if (authUser && authUser.id) {
        fetch('/api/v1/auth/me', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': authUser.id
          },
          body: JSON.stringify({
            settings: this.userSettings,
            homeCity: this.userSettings.homeCity
          })
        }).catch(() => {});
      }
    } catch (e) {
      // Ignore network sync errors
    }
  }

  async initAuthSession() {
    let authUser = null;
    try {
      const stored = localStorage.getItem('tarang_auth_user');
      if (stored) authUser = JSON.parse(stored);
    } catch (e) {
      console.warn('Could not parse auth session:', e);
    }

    if (!authUser || !authUser.isLoggedIn) {
      return;
    }

    // Synchronize full profile & subscriptions from database
    try {
      const res = await fetch('/api/v1/auth/me', {
        headers: { 'x-user-id': authUser.id || 'usr_dev_1' }
      });
      if (res.ok) {
        const payload = await res.json();
        if (payload.data) {
          authUser = { ...authUser, ...payload.data, isLoggedIn: true };
          localStorage.setItem('tarang_auth_user', JSON.stringify(authUser));

          // Load subscriptions from database
          if (Array.isArray(payload.data.subscriptions)) {
            payload.data.subscriptions.forEach(id => this.subscribedChannelIds.add(id));
            localStorage.setItem('tarang_subs', JSON.stringify([...this.subscribedChannelIds]));
            this.renderProfileSubscriptions();
          }

          // Apply saved database settings if present
          if (payload.data.settings) {
            this.userSettings = Object.assign(this.userSettings, payload.data.settings);
            localStorage.setItem('tarang_user_settings', JSON.stringify(this.userSettings));
          }
        }
      }
    } catch (e) {
      console.warn('Backend profile sync offline, using cached profile:', e);
    }

    const nameEl = document.getElementById('profile-name-display');
    const cityEl = document.getElementById('profile-city-display');
    const thumbLetter = document.querySelector('.profile-avatar-thumb .avatar-letter');
    const largeLetter = document.querySelector('.profile-avatar-large .avatar-large-text');
    const tierBadge = document.querySelector('.profile-tier-badge');
    const handleEl = document.querySelector('.profile-user-handle');
    const hoursEl = document.querySelector('.profile-stats-grid .stat-box:nth-child(1) .stat-number');

    if (nameEl) nameEl.textContent = authUser.name || 'Alwin Joseph';
    if (thumbLetter) thumbLetter.textContent = (authUser.avatar || authUser.name?.[0] || 'A').slice(0, 2);
    if (largeLetter) largeLetter.textContent = (authUser.avatar || authUser.name?.[0] || 'AJ').slice(0, 2);
    if (tierBadge) tierBadge.textContent = authUser.role === 'creator' ? 'PRO RJ' : 'LISTENER';
    if (handleEl) {
      const handle = authUser.name ? '@' + authUser.name.toLowerCase().replace(/\s+/g, '') : '@listener';
      handleEl.textContent = `${handle} · ${authUser.bio || (authUser.role === 'creator' ? 'Creator & Audiophile' : 'Community Member')}`;
    }
    if (hoursEl && authUser.listeningHours) {
      hoursEl.textContent = `${authUser.listeningHours}h`;
    }
    if (cityEl && authUser.homeCity) {
      const matchedCity = this.cities.find(c => c.name.toLowerCase() === authUser.homeCity.toLowerCase() || c.id === authUser.homeCity.toLowerCase());
      cityEl.textContent = matchedCity ? `${matchedCity.name} (${matchedCity.freq})` : authUser.homeCity;
    }
  }

  openProfileSidebar() {
    this.renderProfileSubscriptions();
    if (this.profileSidebar) this.profileSidebar.classList.remove('closed');
    if (this.profileBackdrop) this.profileBackdrop.classList.remove('hidden');
  }

  closeProfileSidebar() {
    if (this.profileSidebar) this.profileSidebar.classList.add('closed');
    if (this.profileBackdrop) this.profileBackdrop.classList.add('hidden');
  }

  renderProfileSubscriptions() {
    if (!this.profileSubsContainer) return;
    this.profileSubsContainer.innerHTML = '';

    const allChannels = [];
    this.cities.forEach(city => {
      city.channels.forEach(ch => {
        if (!allChannels.some(existing => existing.id === ch.id)) {
          allChannels.push({ ...ch, cityName: city.name });
        }
      });
    });

    const subscribedChannels = allChannels.filter(ch => this.subscribedChannelIds.has(ch.id));

    if (this.profileStatSubs) {
      this.profileStatSubs.textContent = subscribedChannels.length;
    }
    if (this.profileSubsBadge) {
      this.profileSubsBadge.textContent = `${subscribedChannels.length} ${subscribedChannels.length === 1 ? 'Station' : 'Stations'}`;
    }
    if (this.profileStatHosted) {
      this.profileStatHosted.textContent = this.customChannels.length;
    }

    if (subscribedChannels.length === 0) {
      this.profileSubsContainer.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: var(--text-secondary); font-size: 13px; line-height: 1.5; background: #121217; border-radius: 12px; border: 1px dashed rgba(255,102,0,0.25);">
          📻 No subscribed frequencies yet.<br>Click "Subscribe" on any station card to pin it here!
        </div>
      `;
      return;
    }

    subscribedChannels.forEach(ch => {
      const item = document.createElement('div');
      item.className = 'profile-sub-item';
      item.innerHTML = `
        <div class="sub-item-left">
          <div class="sub-item-thumb" style="background: ${ch.gradient};">
            <span>📻</span>
          </div>
          <div class="sub-item-info">
            <h5 class="sub-item-title">${ch.title}</h5>
            <p class="sub-item-rj">${ch.rj} · ${ch.cityName || 'Live'}</p>
          </div>
        </div>
        <button class="btn-tune-mini" data-id="${ch.id}">Tune In</button>
      `;

      item.querySelector('.btn-tune-mini').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeProfileSidebar();
        // Switch to station's city if needed
        const targetCity = this.cities.find(c => c.channels.some(sc => sc.id === ch.id));
        if (targetCity && targetCity.id !== this.activeCityId) {
          this.switchCity(targetCity.id);
        }
        this.tuneIntoChannel(ch);
      });

      this.profileSubsContainer.appendChild(item);
    });
  }

  initBackendSync() {
    // Attempt WebSocket connection to Tarang realtime gateway
    try {
      const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${wsProtocol}//${window.location.host}/ws`;
      this.socket = new WebSocket(wsUrl);

      this.socket.addEventListener('open', () => {
        console.log('⚡ Connected to Tarang Realtime Gateway');
      });

      this.socket.addEventListener('message', (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.event === 'listeners:update') {
            const { channelId, count } = payload.data;
            for (const city of this.cities) {
              const ch = city.channels.find(c => c.id === channelId);
              if (ch) {
                ch.listeners = count;
                const badge = document.querySelector(`.listener-count-num[data-id="${channelId}"]`);
                if (badge) {
                  badge.textContent = count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
                }
                break;
              }
            }
          } else if (payload.event === 'channel:live') {
            const channel = payload.data.channel;
            if (channel) {
              const city = this.cities.find(c => c.id === channel.cityId || c.name.toLowerCase() === (payload.data.city || '').toLowerCase());
              if (city && !city.channels.some(c => c.id === channel.id)) {
                city.channels.unshift(channel);
                this.renderChannels();
                this.renderCitiesTuner();
              }
            }
          } else if (payload.event === 'chat:message') {
            if (!payload.data.fromMe) {
              this.chatMessages.push(payload.data);
              this.renderChatMessages();
            }
          }
        } catch (e) {
          // Ignore parse errors
        }
      });
    } catch (e) {
      // Graceful fallback to standalone client
    }
  }
}

// Instantiate application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.tarang = new TarangApp();
});
