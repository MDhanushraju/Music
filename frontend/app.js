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
        audioUrl: '/audio/bengaluru-namma-morning.mp3',
        nowPlayingSong: 'Filter Coffee Morning - Acoustic Strings',
        talkScript: "Good morning Bengaluru! This is RJ Kavya on Tarang Namma Morning 91.1. Grab your piping hot filter coffee, traffic on Outer Ring Road is moving slow as usual, but we've got some lovely indie Kannada vibes lined up for you!"
      },
      {
        id: 'blr-koramangala-code',
        title: 'Koramangala Chai & Code',
        rj: 'RJ Abhi',
        lang: 'English & Hindi banter',
        tags: ['Talk', 'Late Night'],
        listeners: 890,
        isLive: false,
        gradient: 'linear-gradient(135deg, #1f1f26, #ff7a1a)',
        audioUrl: '/audio/bengaluru-chai-code.mp3',
        nowPlayingSong: 'Midnight Terminal - Chai & Code Lo-Fi',
        talkScript: "What's up techies and night owls! You're tuned into Koramangala Chai & Code on Tarang. Debugging past midnight? Sit back, take a breath, let these lo-fi beats keep your sanity intact."
      },
      {
        id: 'blr-indiranagar-indie',
        title: 'Indiranagar Indie Wave',
        rj: 'RJ Maya',
        lang: 'Kannada Indie & Folk',
        tags: ['Indie', 'Music'],
        listeners: 1120,
        isLive: false,
        gradient: 'linear-gradient(135deg, #ffa826, #d94d00)',
        audioUrl: '/audio/bengaluru-namma-morning.mp3',
        nowPlayingSong: 'Mysore Road Acoustic - Indie Waves',
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
        audioUrl: '/audio/mumbai-meri-jaan.mp3',
        nowPlayingSong: 'Aamchi Mumbai - Retro Bollywood Beat',
        talkScript: "Aamchi Mumbai! This is RJ Rohit on Tarang Mumbai 98.3. Local train updates: Western line running on time, weather is pleasant at Marine Drive. Ready for some retro Bollywood magic?"
      },
      {
        id: 'mum-marine-confessions',
        title: 'Marine Drive Confessions',
        rj: 'RJ Tara',
        lang: 'Hindi & Urdu poetry',
        tags: ['Late Night', 'Talk'],
        listeners: 2150,
        isLive: false,
        gradient: 'linear-gradient(135deg, #18181f, #ff6600)',
        audioUrl: '/audio/mumbai-marine-confessions.mp3',
        nowPlayingSong: 'Marine Drive Waves - Night Lo-Fi',
        talkScript: "Shubh raatri Mumbai. You are listening to RJ Tara on Tarang. Sit by the sea breeze, let go of the hectic city rush, and share your untold stories with us."
      },
      {
        id: 'mum-gully-beats',
        title: 'Gully Cyphers & Hip-Hop',
        rj: 'MC D-Street',
        lang: 'Hindi & Marathi rap',
        tags: ['Music', 'Indie'],
        listeners: 1450,
        isLive: false,
        gradient: 'linear-gradient(135deg, #ff9900, #cc4400)',
        audioUrl: '/audio/mumbai-gully-beats.mp3',
        nowPlayingSong: 'Dharavi Cypher - Underground Flow',
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
        audioUrl: '/audio/delhi-dilli6-gupshup.mp3',
        nowPlayingSong: 'Chandni Chowk Raga Beat - Desi Groove',
        talkScript: "Haan ji Dilli walon! RJ Nitin hazir hai Tarang Delhi 104.0 par. CP ki thand, Chandni Chowk ki jalebi aur humara live gupshup show! Bhejo apne shoutouts!"
      },
      {
        id: 'del-hauz-khas-indie',
        title: 'Hauz Khas Indie Sunset',
        rj: 'RJ Sam',
        lang: 'English & Hindi Indie',
        tags: ['Indie', 'Music'],
        listeners: 1780,
        isLive: false,
        gradient: 'linear-gradient(135deg, #ff851a, #201a14)',
        audioUrl: '/audio/bengaluru-namma-morning.mp3',
        nowPlayingSong: 'Hauz Khas Social - Campus Indie Rock',
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
        audioUrl: '/audio/chennai-morning-kapi.mp3',
        nowPlayingSong: 'Mylapore Strings - Morning Kapi Melodies',
        talkScript: "Vanakkam Chennai! RJ Ananya with you on Tarang Chennai 93.5. Morning filter coffee in hand, breezy Marina beach air, and the greatest Kollywood melodies streaming live!"
      },
      {
        id: 'chn-marina-acoustic',
        title: 'Marina Coastal Rhythms',
        rj: 'RJ Karthik',
        lang: 'Tamil Fusion & Folk',
        tags: ['Indie', 'Music'],
        listeners: 1410,
        isLive: false,
        gradient: 'linear-gradient(135deg, #ff6600, #17171e)',
        audioUrl: '/audio/chennai-morning-kapi.mp3',
        nowPlayingSong: 'Marina Coastal Rhythms - Carnatic Fusion',
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
        audioUrl: '/audio/kolkata-rock.mp3',
        nowPlayingSong: 'College Street Rock - Calcutta Adda',
        talkScript: "Nomoshkar Kolkata! You are listening to Tarang Kolkata 91.9 with RJ Sourav. The evening tea stall adda is on, playing timeless Bengali rock and soulful acoustics."
      },
      {
        id: 'kol-park-street-jazz',
        title: 'Park Street Jazz Lounge',
        rj: 'RJ Ria',
        lang: 'English Smooth Jazz',
        tags: ['Music', 'Late Night'],
        listeners: 980,
        isLive: false,
        gradient: 'linear-gradient(135deg, #2a2018, #ff851a)',
        audioUrl: '/audio/kolkata-rock.mp3',
        nowPlayingSong: 'Midnight at Mocambo - Park Street Jazz',
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
        audioUrl: '/audio/hyderabad-biryani-bass.mp3',
        nowPlayingSong: 'Biryani & Bass - Tollywood Club Groove',
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
        isLive: false,
        gradient: 'linear-gradient(135deg, #c2410c, #1f1f26)',
        audioUrl: '/audio/delhi-dilli6-gupshup.mp3',
        nowPlayingSong: 'FC Road Buzz - Collegiate Indie Beat',
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
        isLive: false,
        gradient: 'linear-gradient(135deg, #ea580c, #431407)',
        audioUrl: '/audio/chennai-morning-kapi.mp3',
        nowPlayingSong: 'Backwaters & Breeze - Malabar Acoustic',
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
        isLive: false,
        gradient: 'linear-gradient(135deg, #ff7a1a, #991b1b)',
        audioUrl: '/audio/goa-sunset-chill.mp3',
        nowPlayingSong: 'Anjuna Golden Hour - Coastal Reggae Chill',
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
    this.streamAudio = null;
    this.currentMode = 'synth'; // 'synth' or 'stream'
    this.onStreamStateChange = null;
  }

  initStreamAudio() {
    if (!this.streamAudio) {
      this.streamAudio = new Audio();
      this.streamAudio.preload = 'none';
      this.streamAudio.volume = this.previousVolume || 0.8;

      this.streamAudio.addEventListener('playing', () => {
        this.isPlaying = true;
        if (this.onStreamStateChange) this.onStreamStateChange('playing');
      });

      this.streamAudio.addEventListener('pause', () => {
        if (this.currentMode === 'stream') {
          this.isPlaying = false;
          if (this.onStreamStateChange) this.onStreamStateChange('paused');
        }
      });

      this.streamAudio.addEventListener('ended', () => {
        this.isPlaying = false;
        if (this.onStreamStateChange) this.onStreamStateChange('ended');
        if (this.onSongEnded) {
          this.onSongEnded();
        }
      });

      this.streamAudio.addEventListener('waiting', () => {
        if (this.onStreamStateChange) this.onStreamStateChange('buffering');
      });

      this.streamAudio.addEventListener('error', (e) => {
        console.warn('Audio stream playback error:', e);
        if (this.onStreamStateChange) this.onStreamStateChange('error');
      });
    }
  }

  async playExternalStream(url, onStateChange) {
    this.init();
    this.initStreamAudio();
    this.stopSynth();
    this.currentMode = 'stream';
    this.onStreamStateChange = onStateChange;

    this.streamAudio.src = url;
    try {
      await this.streamAudio.play();
      this.isPlaying = true;
      return true;
    } catch (err) {
      console.warn('Stream play() failed or blocked by browser policy:', err);
      if (err.name === 'NotAllowedError' && window.tarang) {
        window.tarang.showAutoplayAlert();
      }
      if (this.onStreamStateChange) this.onStreamStateChange('error');
      return false;
    }
  }

  stopStream() {
    if (this.streamAudio) {
      this.streamAudio.pause();
      this.streamAudio.removeAttribute('src');
      this.streamAudio.load();
    }
  }

  stopSynth() {
    if (this.synthLoopInterval) {
      clearInterval(this.synthLoopInterval);
      this.synthLoopInterval = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
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
    const floatVal = parseFloat(val);
    this.previousVolume = floatVal;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(floatVal, this.ctx.currentTime);
    }
    if (this.streamAudio) {
      this.streamAudio.volume = floatVal;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      }
      if (this.streamAudio) {
        this.streamAudio.muted = true;
      }
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setValueAtTime(this.previousVolume, this.ctx.currentTime);
      }
      if (this.streamAudio) {
        this.streamAudio.muted = false;
        this.streamAudio.volume = this.previousVolume;
      }
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
      const originalVolume = this.previousVolume || 0.8;

      if (shouldDuck) {
        if (this.streamAudio) {
          this.streamAudio.volume = Math.max(0.12, originalVolume * 0.22);
        }
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        }
        utterance.onend = () => {
          if (this.streamAudio && !this.isMuted) {
            let current = this.streamAudio.volume;
            const step = (originalVolume - current) / 10;
            const rampInterval = setInterval(() => {
              if (!this.streamAudio || this.isMuted) {
                clearInterval(rampInterval);
                return;
              }
              current = Math.min(originalVolume, current + step);
              this.streamAudio.volume = current;
              if (current >= originalVolume) clearInterval(rampInterval);
            }, 40);
          }
          if (this.masterGain && this.ctx && !this.isMuted) {
            this.masterGain.gain.linearRampToValueAtTime(originalVolume, this.ctx.currentTime + 0.8);
          }
        };
      } else {
        utterance.onend = () => {
          if (this.streamAudio && !this.isMuted) {
            this.streamAudio.volume = originalVolume;
          }
        };
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error:", e);
    }
  }

  // Promise-based sentence speaker for sequential multi-segment shows with multilingual support
  speakSentence(text, langCode = 'kn-IN', onStart) {
    return new Promise((resolve) => {
      if (!('speechSynthesis' in window)) {
        setTimeout(resolve, 2000);
        return;
      }
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.02;
        utterance.pitch = 1.0;
        utterance.lang = langCode || 'kn-IN';

        const voices = window.speechSynthesis.getVoices();
        const prefix = (langCode || 'kn').split('-')[0].toLowerCase();
        let matchedVoice = voices.find(v => v.lang.toLowerCase() === langCode.toLowerCase());
        if (!matchedVoice) {
          matchedVoice = voices.find(v => v.lang.toLowerCase().startsWith(prefix));
        }
        if (!matchedVoice) {
          matchedVoice = voices.find(v => v.lang.includes('IN') || v.name.includes('India') || v.lang.includes('hi'));
        }
        if (matchedVoice) {
          utterance.voice = matchedVoice;
        }

        const originalVolume = this.previousVolume || 0.8;
        if (this.streamAudio) {
          this.streamAudio.volume = Math.max(0.08, originalVolume * 0.18);
        }
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
        }

        utterance.onstart = () => {
          if (onStart) onStart();
        };

        utterance.onend = () => {
          resolve();
        };

        utterance.onerror = () => {
          resolve();
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn("Speech error:", err);
        resolve();
      }
    });
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
    this.activeView = 'city';
    this.currentSourceType = 'tarang'; // 'tarang', 'radio-browser', 'jamendo'
    this.currentStreamItem = null;
    this.radioBrowserStations = [];
    this.jamendoTracks = [];
    this.activeJamendoGenre = 'All';

    this.initDOM();
    this.initAuthSession();
    this.renderCitiesTuner();
    this.renderChannels();
    this.setupEventListeners();
    this.startLiveFluctuations();
    this.initBackendSync();
    this.loadBackendCitiesAndChannels();
    this.updateAirjBannerForCity(this.activeCityId);

    // Preload directory filters and Jamendo status in background
    this.loadRadioBrowserFilters();
    this.loadJamendoStatus();
  }

  initDOM() {
    // Navigation & Main Views
    this.tabNavCity = document.getElementById('tab-nav-city');
    this.tabNavDirectory = document.getElementById('tab-nav-directory');
    this.tabNavJamendo = document.getElementById('tab-nav-jamendo');
    this.viewCity = document.getElementById('view-city');
    this.viewDirectory = document.getElementById('view-directory');
    this.viewJamendo = document.getElementById('view-jamendo');

    // Tuner
    this.tunerListEl = document.getElementById('tuner-cards-list');
    this.tunerNeedleEl = document.getElementById('tuner-needle');
    this.needleFreqDisplay = document.getElementById('needle-freq-display');
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
    this.playerSourceTag = document.getElementById('player-source-tag');
    this.playerStatusBadge = document.getElementById('player-status-badge');
    this.playerAttributionLink = document.getElementById('player-attribution-link');
    this.playerChannelTitleEl = document.getElementById('player-channel-title');
    this.playerRjInfoEl = document.getElementById('player-rj-info');
    this.playerCityLabelEl = document.getElementById('player-city-label');
    this.playerThumbEl = document.getElementById('player-thumb');
    this.playerThumbIcon = document.getElementById('player-thumb-icon');
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

    // Autoplay blocked banner
    this.autoplayBanner = document.getElementById('autoplay-banner');
    this.btnResumeAutoplay = document.getElementById('btn-resume-autoplay');

    // Indian Radio Directory View Elements
    this.directorySearchInput = document.getElementById('directory-search-input');
    this.directoryStateSelect = document.getElementById('directory-state-select');
    this.directoryLangSelect = document.getElementById('directory-lang-select');
    this.directoryBtnRefresh = document.getElementById('directory-btn-refresh');
    this.directoryStationsGrid = document.getElementById('directory-stations-grid');
    this.directoryResultsCount = document.getElementById('directory-results-count');
    this.directoryEmptyState = document.getElementById('directory-empty-state');
    this.btnResetDirectoryFilters = document.getElementById('btn-reset-directory-filters');

    // Jamendo View Elements
    this.jamendoStatusBox = document.getElementById('jamendo-status-box');
    this.jamendoStatusTitle = document.getElementById('jamendo-status-title');
    this.jamendoStatusDesc = document.getElementById('jamendo-status-desc');
    this.jamendoStatusIcon = document.getElementById('jamendo-status-icon');
    this.jamendoSearchInput = document.getElementById('jamendo-search-input');
    this.jamendoGenreChips = document.getElementById('jamendo-genre-chips');
    this.jamendoTracksGrid = document.getElementById('jamendo-tracks-grid');
    this.jamendoResultsCount = document.getElementById('jamendo-results-count');
    this.jamendoEmptyState = document.getElementById('jamendo-empty-state');
    this.btnResetJamendoSearch = document.getElementById('btn-reset-jamendo-search');

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

    // AI RJ Daily Show Banner & Modal Elements
    this.airjLiveBanner = document.getElementById('airj-live-banner');
    this.airjHostLabel = document.getElementById('airj-host-label');
    this.airjWeatherText = document.getElementById('airj-weather-text');
    this.weatherIcon = document.getElementById('weather-icon');
    this.airjHeadline = document.getElementById('airj-headline');
    this.airjSnippet = document.getElementById('airj-snippet');
    this.btnStartAirjShow = document.getElementById('btn-start-airj-show');
    this.airjBtnLabel = document.getElementById('airj-btn-label');
    this.airjLangSelect = document.getElementById('airj-lang-select');
    this.airjAutohostCheckbox = document.getElementById('airj-autohost-checkbox');
    this.airjProviderBadge = document.getElementById('airj-provider-badge');

    this.airjModal = document.getElementById('airj-modal');
    this.btnCloseAirjModal = document.getElementById('btn-close-airj-modal');
    this.btnStopAirjShow = document.getElementById('btn-stop-airj-show');
    this.btnSkipToSong = document.getElementById('btn-skip-to-song');
    this.airjModalCityTag = document.getElementById('airj-modal-city-tag');
    this.airjModalLangTag = document.getElementById('airj-modal-lang-tag');
    this.airjModalEngineTag = document.getElementById('airj-modal-engine-tag');
    this.airjModalHostTitle = document.getElementById('airj-modal-host-title');
    this.airjModalWeatherIcon = document.getElementById('airj-modal-weather-icon');
    this.airjModalTemp = document.getElementById('airj-modal-temp');
    this.airjModalCond = document.getElementById('airj-modal-cond');
    this.airjModalWeatherMeta = document.getElementById('airj-modal-weather-meta');
    this.airjModalWeatherAlert = document.getElementById('airj-modal-weather-alert');

    // 5-step broadcast step elements
    this.airjModalStep1 = document.getElementById('airj-modal-step1');
    this.airjModalStep2 = document.getElementById('airj-modal-step2');
    this.airjModalStep3 = document.getElementById('airj-modal-step3');
    this.airjModalStep4 = document.getElementById('airj-modal-step4');
    this.airjModalStep5 = document.getElementById('airj-modal-step5');
    this.airjModalSongTitle = document.getElementById('airj-modal-song-title');
    this.airjLiveSubtitle = document.getElementById('airj-live-subtitle');
    this.airjSpeechStatus = document.getElementById('airj-speech-status');
    this.airjTranscriptHint = document.getElementById('airj-transcript-hint');

    this.segStep1Card = document.getElementById('seg-step1-card');
    this.segStep2Card = document.getElementById('seg-step2-card');
    this.segStep3Card = document.getElementById('seg-step3-card');
    this.segStep4Card = document.getElementById('seg-step4-card');
    this.segStep5Card = document.getElementById('seg-step5-card');

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
      const freqNum = (city.freq.match(/[\d\.]+/)?.[0] || '91.1') + ' MHz';
      card.innerHTML = `
        <div class="city-card-header">
          <span class="city-signal-pill ${liveCount > 0 ? 'live' : ''}">
            <span class="city-signal-dot"></span>
            <span class="city-freq-tag">${freqNum}</span>
          </span>
        </div>
        <div class="city-card-name">${city.name}</div>
        <div class="city-card-footer">
          <span class="city-live-status">
            <span class="mini-eq-bars">
              <span></span><span></span><span></span>
            </span>
            ${liveCount} ${liveCount === 1 ? 'Station' : 'Stations'}
          </span>
        </div>
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

    if (this.needleFreqDisplay) {
      const city = this.cities.find(c => c.id === this.activeCityId);
      const freqNum = city ? (city.freq.match(/[\d\.]+/)?.[0] || '91.1') : '91.1';
      this.needleFreqDisplay.textContent = freqNum;
    }
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
    this.updateAirjBannerForCity(cityId);
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

    // Sort: Live channels first, then by listener count descending (README Section 14)
    filtered.sort((a, b) => {
      if (Boolean(a.isLive) !== Boolean(b.isLive)) {
        return a.isLive ? -1 : 1;
      }
      return (b.listeners || 0) - (a.listeners || 0);
    });

    this.channelsListEl.innerHTML = '';

    if (filtered.length === 0) {
      this.emptyStateEl.classList.remove('hidden');
      const emptyTitle = document.getElementById('empty-title');
      const emptyDesc = document.getElementById('empty-desc');
      if (emptyTitle && emptyDesc) {
        if (this.activeFilter === 'live') {
          emptyTitle.textContent = 'No live broadcasts right now in this city';
          emptyDesc.textContent = 'All stations in this city are currently on AutoDJ. Click "All Channels" or switch to another city.';
        } else if (this.activeFilter === 'subscribed') {
          emptyTitle.textContent = 'No subscribed channels in this city';
          emptyDesc.textContent = 'Click "Subscribe" on any channel card to follow your favorite RJs!';
        } else {
          emptyTitle.textContent = 'No channels found';
          emptyDesc.textContent = 'Try choosing another genre filter or switch to a different city.';
        }
      }
    } else {
      this.emptyStateEl.classList.add('hidden');

      filtered.forEach(channel => {
        const isCurrentlyPlaying = this.currentChannel && this.currentChannel.id === channel.id && this.audio.isPlaying;
        const isSubscribed = this.subscribedChannelIds.has(channel.id);
        const isLive = Boolean(channel.isLive);

        const card = document.createElement('div');
        card.className = `channel-card ${isCurrentlyPlaying ? 'is-playing' : ''} ${isLive ? 'channel-live' : 'channel-autodj'}`;
        card.dataset.channelId = channel.id;
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `${channel.title}, ${channel.rj}, ${isLive ? 'Live on air' : 'AutoDJ playing'}`);

        const tagsHtml = channel.tags.map(t => `<span class="tag-badge">${t}</span>`).join('');
        const listenersFormatted = channel.listeners >= 1000 ? `${(channel.listeners / 1000).toFixed(1)}k` : channel.listeners;

        const badgeHtml = isLive
          ? `<div class="live-listeners-badge is-live">
               <span class="live-beacon"></span>
               <span>Live · <span class="listener-count-num" data-id="${channel.id}">${listenersFormatted}</span></span>
             </div>`
          : `<div class="live-listeners-badge is-autodj">
               <span class="autodj-tag-beacon">AutoDJ</span>
               <span>· <span class="listener-count-num" data-id="${channel.id}">${listenersFormatted}</span></span>
             </div>`;

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
            ${badgeHtml}
            <div class="card-actions-group">
              <button class="btn-subscribe ${isSubscribed ? 'is-subscribed' : ''}" data-channel-id="${channel.id}">
                ${isSubscribed ? '✓ Subscribed' : 'Subscribe'}
              </button>
              <button class="btn-tune-card" data-channel-id="${channel.id}">
                ${isCurrentlyPlaying ? 'Listening' : (isLive ? 'Tune In' : 'Play AutoDJ')}
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

        // Keyboard navigation: Enter or Space plays channel
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (e.target === subBtn) return;
            e.preventDefault();
            this.tuneIntoChannel(channel);
          }
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

  resetTimer() {
    this.secondsPlayed = 0;
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => {
      this.secondsPlayed++;
      const hrs = String(Math.floor(this.secondsPlayed / 3600)).padStart(2, '0');
      const mins = String(Math.floor((this.secondsPlayed % 3600) / 60)).padStart(2, '0');
      const secs = String(this.secondsPlayed % 60).padStart(2, '0');
      if (this.timeTickerEl) this.timeTickerEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
  }

  async tuneIntoChannel(channel) {
    this.audio.init();
    this.audio.stopSynth();
    this.audio.playStaticBurst(0.3);

    this.currentSourceType = 'tarang';
    this.currentChannel = channel;
    this.currentStreamItem = null;
    this.audio.isPlaying = true;
    this.hideAutoplayAlert();

    const isLive = Boolean(channel.isLive);

    // Update bottom player UI
    this.playerIdleEl.classList.add('hidden');
    this.playerActiveEl.classList.remove('hidden');

    if (this.playerSourceTag) {
      this.playerSourceTag.className = 'player-source-tag';
      this.playerSourceTag.textContent = isLive ? '🎙️ Tarang Live Broadcast' : '📻 Tarang City FM · AutoDJ';
    }
    if (this.playerStatusBadge) {
      this.playerStatusBadge.textContent = isLive ? '● LIVE' : 'AutoDJ';
      this.playerStatusBadge.className = `badge-live-stream ${isLive ? 'is-live' : 'is-autodj'}`;
    }
    if (this.playerAttributionLink) {
      this.playerAttributionLink.classList.add('hidden');
    }

    this.playerChannelTitleEl.textContent = channel.title;
    this.playerRjInfoEl.textContent = channel.nowPlayingSong
      ? `Now Playing: ${channel.nowPlayingSong} (${channel.rj})`
      : `${channel.rj} · ${channel.lang}`;
    this.playerCityLabelEl.textContent = this.cities.find(c => c.id === this.activeCityId)?.name || 'India';
    this.playerThumbEl.style.background = channel.gradient;
    if (this.playerThumbIcon) this.playerThumbIcon.textContent = '📻';

    this.iconPlay.classList.add('hidden');
    this.iconPause.classList.remove('hidden');

    this.resetTimer();
    this.renderChannels();
    this.renderRadioBrowserStations(this.radioBrowserStations);
    this.renderJamendoTracks(this.jamendoTracks);

    // Audio track URL for this station
    const audioUrl = channel.audioUrl || '/audio/bengaluru-namma-morning.mp3';

    // Play the station music track (loop enabled so it plays continuously!)
    await this.audio.playExternalStream(audioUrl, (state) => {
      if (state === 'error') {
        this.audio.startStationMusicStream();
      }
    });

    if (this.audio.streamAudio) {
      this.audio.streamAudio.loop = true;
    }

    // Call backend listen endpoint to increment listeners & receive LiveKit/AutoDJ token
    try {
      fetch(`/api/v1/channels/${channel.id}/listen`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      }).then(r => r.json()).then(res => {
        if (res.success && res.data) {
          if (res.data.listeners) {
            channel.listeners = res.data.listeners;
            const countEl = document.querySelector(`.listener-count-num[data-id="${channel.id}"]`);
            if (countEl) {
              countEl.textContent = channel.listeners >= 1000 
                ? `${(channel.listeners / 1000).toFixed(1)}k` 
                : channel.listeners;
            }
          }
        }
      }).catch(() => {});
    } catch (e) {}

    // Start 20s listener presence heartbeat
    if (this.channelHeartbeatTimer) clearInterval(this.channelHeartbeatTimer);
    this.channelHeartbeatTimer = setInterval(() => {
      if (this.currentChannel && this.currentChannel.id === channel.id && this.audio.isPlaying) {
        fetch(`/api/v1/channels/${channel.id}/heartbeat`, { method: 'POST' }).catch(() => {});
      } else {
        clearInterval(this.channelHeartbeatTimer);
        this.channelHeartbeatTimer = null;
      }
    }, 20000);
  }

  async tuneIntoRadioBrowserStation(station) {
    this.audio.init();
    this.audio.stopSynth();
    this.audio.playStaticBurst(0.25);

    this.currentSourceType = 'radio-browser';
    this.currentStreamItem = station;
    this.currentChannel = null;
    this.hideAutoplayAlert();

    // Update bottom player UI
    this.playerIdleEl.classList.add('hidden');
    this.playerActiveEl.classList.remove('hidden');

    if (this.playerSourceTag) {
      this.playerSourceTag.className = 'player-source-tag source-directory';
      this.playerSourceTag.textContent = '📡 Third-Party Radio';
    }
    if (this.playerStatusBadge) {
      this.playerStatusBadge.textContent = '● STREAM';
    }
    if (this.playerAttributionLink) {
      this.playerAttributionLink.classList.remove('hidden');
      this.playerAttributionLink.href = station.homepage || 'https://www.radio-browser.info/';
      this.playerAttributionLink.textContent = 'Station Homepage ↗';
    }

    this.playerChannelTitleEl.textContent = station.name;
    this.playerRjInfoEl.textContent = `${station.state || 'All India'} · ${station.language || 'Indian'} (${station.codec} ${station.bitrate}k)`;
    this.playerCityLabelEl.textContent = station.state || 'India';
    this.playerThumbEl.style.background = 'linear-gradient(135deg, #059669, #064e3b)';
    if (this.playerThumbIcon) this.playerThumbIcon.textContent = '📡';

    this.iconPlay.classList.add('hidden');
    this.iconPause.classList.remove('hidden');

    this.resetTimer();
    this.renderChannels();
    this.renderRadioBrowserStations(this.radioBrowserStations);
    this.renderJamendoTracks(this.jamendoTracks);

    const success = await this.audio.playExternalStream(station.streamUrl, (state) => {
      if (state === 'error') {
        this.spawnFloatingReaction('⚠️');
        alert(`Station "${station.name}" stream is currently unreachable from broadcaster. Please try another station.`);
        this.iconPlay.classList.remove('hidden');
        this.iconPause.classList.add('hidden');
      }
    });

    if (!success) {
      this.iconPlay.classList.remove('hidden');
      this.iconPause.classList.add('hidden');
    }
  }

  async tuneIntoJamendoTrack(track) {
    if (track.isPlayable === false) {
      alert(`Track "${track.title}" is restricted by license or missing audio and is unavailable for demo playback.`);
      return;
    }

    this.audio.init();
    this.audio.stopSynth();
    this.audio.playStaticBurst(0.25);

    this.currentSourceType = 'jamendo';
    this.currentStreamItem = track;
    this.currentChannel = null;
    this.hideAutoplayAlert();

    // Update bottom player UI
    this.playerIdleEl.classList.add('hidden');
    this.playerActiveEl.classList.remove('hidden');

    if (this.playerSourceTag) {
      this.playerSourceTag.className = 'player-source-tag source-jamendo';
      this.playerSourceTag.textContent = `🎵 Jamendo · ${track.licenseName || 'CC'}`;
    }
    if (this.playerStatusBadge) {
      this.playerStatusBadge.textContent = '● DEMO';
    }
    if (this.playerAttributionLink) {
      this.playerAttributionLink.classList.remove('hidden');
      this.playerAttributionLink.href = track.shareurl || 'https://www.jamendo.com';
      this.playerAttributionLink.textContent = `Jamendo (${track.licenseName}) ↗`;
    }

    this.playerChannelTitleEl.textContent = track.title;
    this.playerRjInfoEl.textContent = `${track.artist} · ${track.genre || 'Indie'}`;
    this.playerCityLabelEl.textContent = track.licenseName || 'Creative Commons';
    this.playerThumbEl.style.background = 'linear-gradient(135deg, #d97706, #78350f)';
    if (this.playerThumbIcon) this.playerThumbIcon.textContent = '🎵';

    this.iconPlay.classList.add('hidden');
    this.iconPause.classList.remove('hidden');

    this.resetTimer();
    this.renderChannels();
    this.renderRadioBrowserStations(this.radioBrowserStations);
    this.renderJamendoTracks(this.jamendoTracks);

    const success = await this.audio.playExternalStream(track.audio, (state) => {
      if (state === 'error') {
        alert(`Failed to load audio for track "${track.title}".`);
        this.iconPlay.classList.remove('hidden');
        this.iconPause.classList.add('hidden');
      }
    });

    if (!success) {
      this.iconPlay.classList.remove('hidden');
      this.iconPause.classList.add('hidden');
    }
  }

  togglePlayPause() {
    if (!this.currentChannel && !this.currentStreamItem) return;

    if (this.currentSourceType === 'tarang') {
      this.audio.isPlaying = !this.audio.isPlaying;
      if (this.audio.isPlaying) {
        this.iconPlay.classList.add('hidden');
        this.iconPause.classList.remove('hidden');
        if (this.audio.streamAudio && this.audio.streamAudio.src) {
          this.audio.streamAudio.play();
        } else {
          this.audio.startStationMusicStream();
        }
      } else {
        this.iconPlay.classList.remove('hidden');
        this.iconPause.classList.add('hidden');
        if (this.audio.streamAudio) {
          this.audio.streamAudio.pause();
        }
        this.audio.stopSynth();
      }
      this.renderChannels();
    } else {
      // Stream audio (Radio Browser or Jamendo)
      if (this.audio.streamAudio) {
        if (this.audio.streamAudio.paused) {
          this.audio.streamAudio.play().then(() => {
            this.audio.isPlaying = true;
            this.iconPlay.classList.add('hidden');
            this.iconPause.classList.remove('hidden');
          }).catch(err => {
            if (err.name === 'NotAllowedError') this.showAutoplayAlert();
          });
        } else {
          this.audio.streamAudio.pause();
          this.audio.isPlaying = false;
          this.iconPlay.classList.remove('hidden');
          this.iconPause.classList.add('hidden');
        }
      }
      if (this.currentSourceType === 'radio-browser') {
        this.renderRadioBrowserStations(this.radioBrowserStations);
      } else if (this.currentSourceType === 'jamendo') {
        this.renderJamendoTracks(this.jamendoTracks);
      }
    }
  }

  showAutoplayAlert() {
    if (this.autoplayBanner) {
      this.autoplayBanner.classList.remove('hidden');
    }
  }

  hideAutoplayAlert() {
    if (this.autoplayBanner) {
      this.autoplayBanner.classList.add('hidden');
    }
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

    // AI RJ Daily Show Buttons
    if (this.btnStartAirjShow) {
      this.btnStartAirjShow.addEventListener('click', () => this.playAiRjDailyShow());
    }
    if (this.btnCloseAirjModal) {
      this.btnCloseAirjModal.addEventListener('click', () => {
        if (this.airjModal) this.airjModal.classList.add('hidden');
      });
    }
    if (this.btnStopAirjShow) {
      this.btnStopAirjShow.addEventListener('click', () => this.stopAiRjShow());
    }
    if (this.btnSkipToSong) {
      this.btnSkipToSong.addEventListener('click', () => this.skipAiRjToSong());
    }

    if (this.airjLangSelect) {
      this.airjLangSelect.addEventListener('change', () => {
        this.updateAirjBanner();
      });
    }

    // Audio stream ended handler -> Triggers broadcast sequence every time a song finishes
    this.audio.onSongEnded = () => {
      this.handleSongCompletionAutoHost();
    };

    // RJ Talk Button in player: Triggers AI RJ Live Show with news, jokes & weather!
    document.getElementById('btn-rj-speak').addEventListener('click', () => {
      this.playAiRjDailyShow();
      this.spawnFloatingReaction('🎙️');
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

    // Segmented Navigation between City Stations, Radio Browser Directory, and Jamendo Music
    this.tabNavCity?.addEventListener('click', () => this.switchMainView('city'));
    this.tabNavDirectory?.addEventListener('click', () => this.switchMainView('directory'));
    this.tabNavJamendo?.addEventListener('click', () => this.switchMainView('jamendo'));

    // Autoplay Resume Button
    this.btnResumeAutoplay?.addEventListener('click', () => {
      this.hideAutoplayAlert();
      this.togglePlayPause();
    });

    // Indian Radio Directory Search & Filter Listeners
    let dirSearchDebounce = null;
    this.directorySearchInput?.addEventListener('input', () => {
      clearTimeout(dirSearchDebounce);
      dirSearchDebounce = setTimeout(() => this.loadRadioBrowserStations(), 350);
    });
    this.directoryStateSelect?.addEventListener('change', () => this.loadRadioBrowserStations());
    this.directoryLangSelect?.addEventListener('change', () => this.loadRadioBrowserStations());
    this.directoryBtnRefresh?.addEventListener('click', () => this.loadRadioBrowserStations());
    
    // Quick State Chips Listeners
    document.querySelectorAll('#directory-quick-chips .dir-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#directory-quick-chips .dir-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const state = chip.dataset.state;
        if (this.directoryStateSelect) {
          this.directoryStateSelect.value = state;
        }
        this.loadRadioBrowserStations();
      });
    });

    this.btnResetDirectoryFilters?.addEventListener('click', () => {
      if (this.directoryStateSelect) this.directoryStateSelect.value = 'All';
      if (this.directoryLangSelect) this.directoryLangSelect.value = 'All';
      if (this.directorySearchInput) this.directorySearchInput.value = '';
      document.querySelectorAll('#directory-quick-chips .dir-chip').forEach(c => c.classList.remove('active'));
      document.querySelector('#directory-quick-chips .dir-chip[data-state="All"]')?.classList.add('active');
      this.loadRadioBrowserStations();
    });

    // Jamendo Search & Genre Chips Listeners
    let jamSearchDebounce = null;
    this.jamendoSearchInput?.addEventListener('input', () => {
      clearTimeout(jamSearchDebounce);
      jamSearchDebounce = setTimeout(() => {
        const query = this.jamendoSearchInput.value.trim();
        this.loadJamendoTracks(this.activeJamendoGenre, query);
      }, 350);
    });

    document.querySelectorAll('#jamendo-genre-chips .genre-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('#jamendo-genre-chips .genre-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.activeJamendoGenre = chip.dataset.jamendoGenre || 'All';
        const query = this.jamendoSearchInput ? this.jamendoSearchInput.value.trim() : '';
        this.loadJamendoTracks(this.activeJamendoGenre, query);
      });
    });

    this.btnResetJamendoSearch?.addEventListener('click', () => {
      if (this.jamendoSearchInput) this.jamendoSearchInput.value = '';
      this.activeJamendoGenre = 'All';
      document.querySelectorAll('#jamendo-genre-chips .genre-chip').forEach(c => c.classList.remove('active'));
      document.querySelector('#jamendo-genre-chips .genre-chip[data-jamendo-genre="All"]')?.classList.add('active');
      this.loadJamendoTracks('All', '');
    });
  }

  /* ------------------- View Switching & Directory/Jamendo Loaders ------------------- */

  switchMainView(viewName) {
    this.activeView = viewName;
    document.querySelectorAll('.main-segmented-nav .nav-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.view === viewName);
    });

    if (this.viewCity) this.viewCity.classList.toggle('hidden', viewName !== 'city');
    if (this.viewDirectory) this.viewDirectory.classList.toggle('hidden', viewName !== 'directory');
    if (this.viewJamendo) this.viewJamendo.classList.toggle('hidden', viewName !== 'jamendo');

    if (viewName === 'directory' && (!this.radioBrowserStations || this.radioBrowserStations.length === 0)) {
      this.loadRadioBrowserStations();
    } else if (viewName === 'jamendo' && (!this.jamendoTracks || this.jamendoTracks.length === 0)) {
      this.loadJamendoTracks('All');
    }
  }

  async loadRadioBrowserFilters() {
    try {
      const res = await fetch('/api/v1/radio-browser/filters');
      if (res.ok) {
        const data = await res.json();
        this.radioBrowserFilters = data;
        if (this.directoryStateSelect && data.states) {
          this.directoryStateSelect.innerHTML = data.states.map(s => `<option value="${s}">${s === 'All' ? 'All India' : s}</option>`).join('');
        }
        if (this.directoryLangSelect && data.languages) {
          this.directoryLangSelect.innerHTML = data.languages.map(l => `<option value="${l}">${l === 'All' ? 'All Languages' : l}</option>`).join('');
        }
      }
    } catch (e) {
      console.warn('Could not load directory filters:', e);
    }
  }

  async loadRadioBrowserStations() {
    if (!this.directoryStationsGrid) return;
    this.directoryStationsGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">Fetching live Indian radio stations...</div>';
    if (this.directoryResultsCount) this.directoryResultsCount.textContent = 'Discovering stations...';

    const state = this.directoryStateSelect ? this.directoryStateSelect.value : 'All';
    const language = this.directoryLangSelect ? this.directoryLangSelect.value : 'All';
    const name = this.directorySearchInput ? this.directorySearchInput.value.trim() : '';

    const params = new URLSearchParams({ limit: '40' });
    if (state && state !== 'All') params.set('state', state);
    if (language && language !== 'All') params.set('language', language);
    if (name) params.set('name', name);

    try {
      const res = await fetch(`/api/v1/radio-browser/stations?${params.toString()}`);
      const data = await res.json();
      this.radioBrowserStations = data.results || [];
      this.renderRadioBrowserStations(this.radioBrowserStations);
      if (this.directoryResultsCount) {
        this.directoryResultsCount.textContent = `${this.radioBrowserStations.length} stations found`;
      }
    } catch (err) {
      console.error('Failed to load Radio Browser stations:', err);
      this.directoryStationsGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#ef4444;">Unable to connect to Radio Browser service. Please try again.</div>';
    }
  }

  renderRadioBrowserStations(stations) {
    if (!this.directoryStationsGrid) return;
    this.directoryStationsGrid.innerHTML = '';

    if (!stations || stations.length === 0) {
      if (this.directoryEmptyState) this.directoryEmptyState.classList.remove('hidden');
      return;
    }
    if (this.directoryEmptyState) this.directoryEmptyState.classList.add('hidden');

    stations.forEach(st => {
      const isPlaying = this.currentSourceType === 'radio-browser' && this.currentStreamItem?.id === st.id && this.audio.isPlaying;

      const card = document.createElement('div');
      card.className = `directory-station-card ${isPlaying ? 'is-playing' : ''}`;
      card.innerHTML = `
        <div class="station-card-top">
          <div class="station-card-icon">
            ${st.favicon ? `<img src="${st.favicon}" alt="" onerror="this.remove()">` : '📡'}
          </div>
          <div class="station-card-info">
            <h3 class="station-card-title" title="${st.name}">${st.name}</h3>
            <p class="station-card-location">📍 ${st.state || 'All India'}</p>
          </div>
        </div>

        <div class="station-tags-row">
          <span class="badge-station-tag lang">${st.language || 'Indian'}</span>
          <span class="badge-station-tag codec">${st.codec || 'MP3'} ${st.bitrate ? st.bitrate + 'k' : ''}</span>
          <span class="badge-station-tag">Third-Party Stream</span>
        </div>

        <div class="station-card-footer">
          <span class="station-votes-pill">⭐ ${st.votes || 0} votes</span>
          <button class="btn-tune-station ${isPlaying ? 'playing' : ''}">
            ${isPlaying ? '■ Stop' : '▶ Tune In'}
          </button>
        </div>
      `;

      card.querySelector('.btn-tune-station').addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
          this.togglePlayPause();
        } else {
          this.tuneIntoRadioBrowserStation(st);
        }
      });

      card.addEventListener('click', () => {
        if (!isPlaying) {
          this.tuneIntoRadioBrowserStation(st);
        }
      });

      this.directoryStationsGrid.appendChild(card);
    });
  }

  async loadJamendoStatus() {
    try {
      const res = await fetch('/api/v1/jamendo/tracks?limit=1');
      if (res.ok) {
        const data = await res.json();
        this.jamendoStatus = data;
        if (data.hasCredential && data.status === 'ok') {
          if (this.jamendoStatusTitle) this.jamendoStatusTitle.textContent = 'Jamendo API v3.0 Connected';
          if (this.jamendoStatusDesc) this.jamendoStatusDesc.textContent = 'Full catalog access enabled with automatic Creative Commons license inspection.';
          if (this.jamendoStatusIcon) this.jamendoStatusIcon.textContent = '✅';
        } else {
          if (this.jamendoStatusTitle) this.jamendoStatusTitle.textContent = 'Jamendo Demo Mode (Curated CC Music)';
          if (this.jamendoStatusDesc) this.jamendoStatusDesc.textContent = 'Showing verified royalty-free demo tracks. To search the full Jamendo catalog, set JAMENDO_CLIENT_ID in .env.';
          if (this.jamendoStatusIcon) this.jamendoStatusIcon.textContent = 'ℹ️';
        }
      }
    } catch (e) {
      console.warn('Could not check Jamendo status:', e);
    }
  }

  async loadJamendoTracks(tag = 'All', query = '') {
    if (!this.jamendoTracksGrid) return;
    this.jamendoTracksGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#888;">Fetching Creative Commons tracks from Jamendo...</div>';
    if (this.jamendoResultsCount) this.jamendoResultsCount.textContent = 'Loading music...';

    let endpoint = '/api/v1/jamendo/tracks?limit=24';
    if (query) {
      endpoint = `/api/v1/jamendo/search?q=${encodeURIComponent(query)}&limit=24`;
    }
    if (tag && tag !== 'All') {
      endpoint += `&tag=${encodeURIComponent(tag)}`;
    }

    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      this.jamendoTracks = data.results || [];
      this.renderJamendoTracks(this.jamendoTracks);
      if (this.jamendoResultsCount) {
        this.jamendoResultsCount.textContent = `${this.jamendoTracks.length} tracks available`;
      }
    } catch (err) {
      console.error('Failed to load Jamendo tracks:', err);
      this.jamendoTracksGrid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:30px;color:#ef4444;">Could not load Jamendo library. Please try again.</div>';
    }
  }

  renderJamendoTracks(tracks) {
    if (!this.jamendoTracksGrid) return;
    this.jamendoTracksGrid.innerHTML = '';

    if (!tracks || tracks.length === 0) {
      if (this.jamendoEmptyState) this.jamendoEmptyState.classList.remove('hidden');
      return;
    }
    if (this.jamendoEmptyState) this.jamendoEmptyState.classList.add('hidden');

    tracks.forEach(tr => {
      const isPlaying = this.currentSourceType === 'jamendo' && this.currentStreamItem?.id === tr.id && this.audio.isPlaying;
      const durationMins = tr.duration ? `${Math.floor(tr.duration / 60)}:${String(tr.duration % 60).padStart(2, '0')}` : 'Demo';

      const card = document.createElement('div');
      card.className = `jamendo-card ${isPlaying ? 'is-playing' : ''}`;
      card.innerHTML = `
        <div class="jamendo-art-wrap">
          <img class="jamendo-art-img" src="${tr.artwork || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'}" alt="${tr.title}" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'">
          <div class="jamendo-play-overlay">
            <span class="overlay-play-btn">${isPlaying ? '⏸' : '▶'}</span>
          </div>
          <span class="jamendo-duration-badge">${durationMins}</span>
        </div>

        <div class="jamendo-info-box">
          <h3 class="jamendo-track-name" title="${tr.title}">${tr.title}</h3>
          <p class="jamendo-artist-name">${tr.artist}</p>
          <div class="jamendo-license-row">
            <a class="license-pill" href="${tr.license_ccurl || 'https://creativecommons.org'}" target="_blank" rel="noopener noreferrer" title="View license terms">
              ⚖️ ${tr.licenseName || 'CC License'}
            </a>
            <a class="jamendo-source-link" href="${tr.shareurl || 'https://www.jamendo.com'}" target="_blank" rel="noopener noreferrer">
              Jamendo ↗
            </a>
          </div>
        </div>

        <div class="jamendo-card-actions">
          ${tr.isPlayable ? `
            <button class="btn-play-jamendo">
              ${isPlaying ? '■ Pause Track' : '▶ Play Track'}
            </button>
          ` : `
            <span class="btn-jamendo-unavailable" title="${tr.licenseStatus || 'License restricted'}">
              🚫 Unavailable
            </span>
          `}
        </div>
      `;

      if (tr.isPlayable) {
        card.querySelector('.btn-play-jamendo')?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (isPlaying) {
            this.togglePlayPause();
          } else {
            this.tuneIntoJamendoTrack(tr);
          }
        });

        card.addEventListener('click', () => {
          if (!isPlaying) {
            this.tuneIntoJamendoTrack(tr);
          }
        });
      }

      this.jamendoTracksGrid.appendChild(card);
    });
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
            const { channelId, channel } = payload.data || {};
            const targetId = channelId || channel?.id;
            let found = false;

            for (const city of this.cities) {
              const ch = city.channels.find(c => c.id === targetId);
              if (ch) {
                ch.isLive = true;
                found = true;
                break;
              }
            }

            if (!found && channel) {
              const city = this.cities.find(c => c.id === channel.cityId || c.name.toLowerCase() === (payload.data.city || '').toLowerCase());
              if (city && !city.channels.some(c => c.id === channel.id)) {
                city.channels.unshift({
                  ...channel,
                  isLive: true,
                  gradient: channel.gradient || 'linear-gradient(135deg, #ff6600, #ff851a)',
                  audioUrl: channel.audioUrl || '/audio/bengaluru-namma-morning.mp3'
                });
              }
            }

            // Realtime sort (Live first) & badge update
            this.renderChannels();
            this.renderCitiesTuner();

            if (this.currentChannel && this.currentChannel.id === targetId) {
              this.currentChannel.isLive = true;
              if (this.playerStatusBadge) {
                this.playerStatusBadge.textContent = '● LIVE';
                this.playerStatusBadge.className = 'badge-live-stream is-live';
              }
              if (this.playerSourceTag) {
                this.playerSourceTag.textContent = '🎙️ Tarang Live Broadcast';
              }
            }
          } else if (payload.event === 'channel:offline') {
            const { channelId } = payload.data || {};
            for (const city of this.cities) {
              const ch = city.channels.find(c => c.id === channelId);
              if (ch) {
                ch.isLive = false;
                break;
              }
            }

            // Realtime sort & badge update back to AutoDJ
            this.renderChannels();
            this.renderCitiesTuner();

            if (this.currentChannel && this.currentChannel.id === channelId) {
              this.currentChannel.isLive = false;
              if (this.playerStatusBadge) {
                this.playerStatusBadge.textContent = 'AutoDJ';
                this.playerStatusBadge.className = 'badge-live-stream is-autodj';
              }
              if (this.playerSourceTag) {
                this.playerSourceTag.textContent = '📻 Tarang City FM · AutoDJ';
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

  async loadBackendCitiesAndChannels() {
    try {
      const res = await fetch('/api/v1/cities');
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        for (const cityData of json.data) {
          const localCity = this.cities.find(c => c.id === cityData.id || c.name.toLowerCase() === cityData.name.toLowerCase());
          if (localCity) {
            try {
              const chRes = await fetch(`/api/v1/cities/${cityData.slug || cityData.id}/channels`);
              const chJson = await chRes.json();
              if (chJson.success && Array.isArray(chJson.data)) {
                chJson.data.forEach(remoteCh => {
                  const localCh = localCity.channels.find(c => c.id === remoteCh.id);
                  if (localCh) {
                    localCh.isLive = Boolean(remoteCh.isLive);
                    if (remoteCh.listeners) localCh.listeners = remoteCh.listeners;
                  } else {
                    localCity.channels.unshift({
                      ...remoteCh,
                      gradient: remoteCh.gradient || 'linear-gradient(135deg, #ff6600, #993300)',
                      audioUrl: remoteCh.audioUrl || '/audio/bengaluru-namma-morning.mp3'
                    });
                  }
                });
              }
            } catch (e) {}
          }
        }
        this.renderCitiesTuner();
        this.renderChannels();
      }
    } catch (e) {
      // Network fallback
    }
  }

  /* --------------------------------------------------------------------------
     AI RJ DAILY SHOW (Daily News, 2 Jokes, Real-time Weather & Song Transition)
     -------------------------------------------------------------------------- */

  /* --------------------------------------------------------------------------
     MULTILINGUAL AI FM RADIO JOCKEY BROADCAST ENGINE (5-Step Sequence)
     -------------------------------------------------------------------------- */

  handleSongCompletionAutoHost() {
    if (this.airjAutohostCheckbox && !this.airjAutohostCheckbox.checked) {
      console.log('Auto-host is disabled by listener. Advancing to next station track.');
      this.playNextStation();
      return;
    }
    const prevSong = this.playerChannelTitleEl?.textContent || '';
    console.log(`Song completed: "${prevSong}". Triggering 5-step Multilingual AI FM RJ Broadcast!`);
    this.playAiRjDailyShow({ isAutoTrigger: true, prevSong });
  }

  async updateAirjBannerForCity(cityId) {
    const targetCity = cityId || this.activeCityId || 'bengaluru';
    const lang = this.airjLangSelect?.value || '';
    try {
      const url = `/api/v1/ai-rj/daily-show?city=${targetCity}${lang ? `&lang=${lang}` : ''}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        this.currentAirjData = data;
        if (this.airjHostLabel) {
          this.airjHostLabel.textContent = `${data.rjName} · Live FM Presenter (${data.frequency})`;
        }
        if (this.airjWeatherText) {
          const w = data.weather;
          let icon = '⛅';
          if (w.condition.toLowerCase().includes('clear')) icon = '☀️';
          else if (w.condition.toLowerCase().includes('rain')) icon = '🌧️';
          else if (w.condition.toLowerCase().includes('thunder')) icon = '⛈️';
          else if (w.condition.toLowerCase().includes('fog') || w.condition.toLowerCase().includes('mist')) icon = '🌫️';
          if (this.weatherIcon) this.weatherIcon.textContent = icon;
          this.airjWeatherText.textContent = `${w.temp}°C · ${w.condition} (${w.rainProbability}% Rain)`;
        }
        if (this.airjHeadline) {
          this.airjHeadline.textContent = `${data.city}: ${data.timeLabel} Broadcast in ${data.languageLabel}`;
        }
        if (this.airjSnippet) {
          this.airjSnippet.textContent = `${data.sequence.step1_greeting} Weather: ${data.weather.desc}. Commute: ${data.trafficCorridors?.[0]?.road || 'Major corridors'}. Up Next: ${data.recommendedSong.title}!`;
        }
        if (this.airjProviderBadge) {
          this.airjProviderBadge.textContent = data.provider === 'openai' ? '🤖 OpenAI Engine' : '⚡ Studio FM Engine';
        }
        if (this.airjLangSelect && !lang) {
          this.airjLangSelect.value = data.language;
        }
      }
    } catch (e) {
      console.warn('Error updating AI RJ banner:', e);
    }
  }

  async playAiRjDailyShow({ isAutoTrigger = false, prevSong = '' } = {}) {
    this.audio.init();
    this.audio.stopSynth();
    this.audio.playStaticBurst(0.25);

    if (this.airjBtnLabel) this.airjBtnLabel.textContent = 'Connecting RJ...';

    const lang = this.airjLangSelect?.value || '';
    const currentPrevSong = prevSong || this.playerChannelTitleEl?.textContent || '';
    let data = null;

    try {
      const url = `/api/v1/ai-rj/daily-show?city=${this.activeCityId}&lang=${lang}&prevSong=${encodeURIComponent(currentPrevSong)}`;
      const res = await fetch(url);
      data = await res.json();
      this.currentAirjData = data;
    } catch (e) {
      console.warn('Failed to fetch AI RJ show:', e);
    }

    if (this.airjBtnLabel) this.airjBtnLabel.textContent = 'Start AI RJ Broadcast';

    if (!data || !data.success) {
      alert('Unable to load AI RJ show. Please ensure backend is running.');
      return;
    }

    // Open Modal
    if (this.airjModal) this.airjModal.classList.remove('hidden');
    if (this.airjModalCityTag) this.airjModalCityTag.textContent = `${data.city}, ${data.state} (${data.frequency})`;
    if (this.airjModalLangTag) this.airjModalLangTag.textContent = data.languageLabel;
    if (this.airjModalEngineTag) {
      this.airjModalEngineTag.textContent = data.provider === 'openai' ? '🤖 OpenAI Engine' : '⚡ Studio FM Engine';
    }
    if (this.airjModalHostTitle) this.airjModalHostTitle.textContent = `${data.rjName} Live On Air`;

    const w = data.weather;
    let icon = '⛅';
    if (w.condition.toLowerCase().includes('clear')) icon = '☀️';
    else if (w.condition.toLowerCase().includes('rain')) icon = '🌧️';
    else if (w.condition.toLowerCase().includes('thunder')) icon = '⛈️';
    else if (w.condition.toLowerCase().includes('fog') || w.condition.toLowerCase().includes('mist')) icon = '🌫️';

    if (this.airjModalWeatherIcon) this.airjModalWeatherIcon.textContent = icon;
    if (this.airjModalTemp) this.airjModalTemp.textContent = `${w.temp}°C`;
    if (this.airjModalCond) this.airjModalCond.textContent = w.condition;
    if (this.airjModalWeatherMeta) {
      this.airjModalWeatherMeta.textContent = `Wind ${w.windSpeed} km/h · Humidity ${w.humidity}% · Rain Prob ${w.rainProbability}% · Real-Time`;
    }
    if (this.airjModalWeatherAlert) {
      if (w.alert) {
        this.airjModalWeatherAlert.textContent = w.alert;
        this.airjModalWeatherAlert.classList.remove('hidden');
      } else {
        this.airjModalWeatherAlert.classList.add('hidden');
      }
    }

    // Populate 5 Broadcast Steps
    if (this.airjModalStep1) this.airjModalStep1.textContent = data.sequence.step1_greeting;
    if (this.airjModalStep2) this.airjModalStep2.textContent = data.sequence.step2_weather;
    if (this.airjModalStep3) this.airjModalStep3.textContent = data.sequence.step3_traffic;
    if (this.airjModalStep4) this.airjModalStep4.textContent = data.sequence.step4_joke;
    if (this.airjModalStep5) this.airjModalStep5.textContent = data.sequence.step5_songIntro;
    if (this.airjModalSongTitle) {
      this.airjModalSongTitle.textContent = `${data.recommendedSong.title} (${data.recommendedSong.artist})`;
    }

    this.isAiRjShowActive = true;
    this.speakAiRjShowSequence(data);
  }

  async speakAiRjShowSequence(data) {
    if (!this.isAiRjShowActive) return;

    const updateStatus = (text, subtitle) => {
      if (this.airjSpeechStatus) this.airjSpeechStatus.textContent = text;
      if (this.airjLiveSubtitle) this.airjLiveSubtitle.textContent = `"${subtitle}"`;
    };

    const clearHighlights = () => {
      document.querySelectorAll('.airj-segment-card').forEach(el => el.classList.remove('active-speaking'));
    };

    const voiceCode = data.speechVoiceCode || 'kn-IN';

    // Sequence 1/5: Song Completion Greeting
    clearHighlights();
    if (this.segStep1Card) this.segStep1Card.classList.add('active-speaking');
    updateStatus(`🎧 1/5 Greeting: ${data.rjName} welcoming ${data.city}...`, data.sequence.step1_greeting);
    await this.audio.speakSentence(data.sequence.step1_greeting, voiceCode);
    if (!this.isAiRjShowActive) return;

    // Sequence 2/5: Real-Time Weather Update
    clearHighlights();
    if (this.segStep2Card) this.segStep2Card.classList.add('active-speaking');
    updateStatus(`⛅ 2/5 Live Weather Update (${data.weather.temp}°C, ${data.weather.condition})...`, data.sequence.step2_weather);
    await this.audio.speakSentence(data.sequence.step2_weather, voiceCode);
    if (!this.isAiRjShowActive) return;

    // Sequence 3/5: Local Traffic Update
    clearHighlights();
    if (this.segStep3Card) this.segStep3Card.classList.add('active-speaking');
    updateStatus(`🚗 3/5 City Commute & Traffic Update...`, data.sequence.step3_traffic);
    await this.audio.speakSentence(data.sequence.step3_traffic, voiceCode);
    if (!this.isAiRjShowActive) return;

    // Sequence 4/5: Location-Specific Comedian Joke
    clearHighlights();
    if (this.segStep4Card) this.segStep4Card.classList.add('active-speaking');
    updateStatus(`😂 4/5 Local Comedian Joke...`, data.sequence.step4_joke);
    await this.audio.speakSentence(data.sequence.step4_joke, voiceCode);
    if (!this.isAiRjShowActive) return;

    // Trigger soundboard laugh track drop
    this.audio.playLaughTrack();
    await new Promise(r => setTimeout(r, 1200));
    if (!this.isAiRjShowActive) return;

    // Sequence 5/5: Next Song Introduction
    clearHighlights();
    if (this.segStep5Card) this.segStep5Card.classList.add('active-speaking');
    updateStatus(`🎵 5/5 Introducing Next Song: ${data.recommendedSong.title}...`, data.sequence.step5_songIntro);
    await this.audio.speakSentence(data.sequence.step5_songIntro, voiceCode);
    if (!this.isAiRjShowActive) return;

    // Completed 5-step sequence -> Smooth transition into the next song!
    updateStatus('Now Spinning Curated Track!', `Now playing: ${data.recommendedSong.title}`);
    await this.transitionToWeatherSong(data);
    setTimeout(() => {
      if (this.airjModal) this.airjModal.classList.add('hidden');
    }, 1500);
  }

  async transitionToWeatherSong(data) {
    this.isAiRjShowActive = false;
    const song = data.recommendedSong;

    // Update bottom player
    this.playerIdleEl.classList.add('hidden');
    this.playerActiveEl.classList.remove('hidden');

    if (this.playerSourceTag) {
      this.playerSourceTag.className = 'player-source-tag';
      this.playerSourceTag.textContent = `🎙️ AI RJ On-Air Pick · ${data.city} · ${data.weather.temp}°C ${data.weather.condition}`;
    }
    if (this.playerStatusBadge) {
      this.playerStatusBadge.textContent = '● ON-AIR PICK';
      this.playerStatusBadge.className = 'badge-live-stream is-live';
    }

    this.playerChannelTitleEl.textContent = song.title;
    this.playerRjInfoEl.textContent = `Curated for ${data.city} (${data.languageLabel}) · Hosted by ${data.rjName}`;
    this.playerCityLabelEl.textContent = data.city;
    this.playerThumbEl.style.background = 'linear-gradient(135deg, #ff6600, #ff851a)';

    this.iconPlay.classList.add('hidden');
    this.iconPause.classList.remove('hidden');

    this.resetTimer();

    // Play next song
    await this.audio.playExternalStream(song.audioUrl, (state) => {
      if (state === 'error') {
        this.audio.startStationMusicStream();
      }
    });

    if (this.audio.streamAudio) {
      // Allow track to play to completion so ended event will trigger the next broadcast
      this.audio.streamAudio.loop = false;
    }

    // Celebration burst
    this.spawnFloatingReaction('🎵');
    setTimeout(() => this.spawnFloatingReaction('⛅'), 400);
    setTimeout(() => this.spawnFloatingReaction('🔥'), 800);
  }

  skipAiRjToSong() {
    this.isAiRjShowActive = false;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.currentAirjData) {
      this.transitionToWeatherSong(this.currentAirjData);
    }
    if (this.airjModal) {
      this.airjModal.classList.add('hidden');
    }
  }

  stopAiRjShow() {
    this.isAiRjShowActive = false;
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.airjModal) this.airjModal.classList.add('hidden');
  }
}

// Instantiate application on DOM ready
window.addEventListener('DOMContentLoaded', () => {
  window.tarang = new TarangApp();
});
