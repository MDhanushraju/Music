/**
 * Tarang Studio - Audio Engine
 *
 * Signal flow (everything lives in one AudioContext):
 *
 *   Mic ─► highpass ─► compressor ─► micFader ─► micMute ─► micMeter ─┬─────────────► programBus
 *                                                                     └─► micMonitor ─► monitorBus
 *   Deck A ─► deckGainA ─┐
 *   Deck B ─► deckGainB ─┴─► musicFader ─► duckGain ─► musicMeter ─┬─► programBus
 *                                                                  └─► monitorBus
 *   SFX ─────────────────────────────────► sfxFader ─► sfxMeter ───┬─► programBus
 *                                                                  └─► monitorBus
 *
 *   programBus ─► masterFader ─► masterMeter ─► broadcastOut (MediaStreamDestination)
 *   monitorBus ─► headphones ─► speakers (RJ only, never broadcast)
 *
 * `broadcastOut.stream` is the exact mix listeners would hear. It feeds the
 * recorder today and is the track to publish once LiveKit is connected.
 */

const dbToPercent = (db) => Math.max(0, Math.min(100, ((db + 60) / 60) * 100));

class LevelMeter {
  constructor(ctx) {
    this.node = ctx.createAnalyser();
    this.node.fftSize = 1024;
    this.node.smoothingTimeConstant = 0;
    this.buffer = new Float32Array(this.node.fftSize);
    this.peakHold = 0;
    this.peakHoldUntil = 0;
  }

  /** Returns { rmsDb, level (0-100), peak (0-100) } */
  read() {
    this.node.getFloatTimeDomainData(this.buffer);
    let sum = 0;
    let peak = 0;
    for (let i = 0; i < this.buffer.length; i++) {
      const v = this.buffer[i];
      sum += v * v;
      const a = Math.abs(v);
      if (a > peak) peak = a;
    }
    const rms = Math.sqrt(sum / this.buffer.length);
    const rmsDb = rms > 0 ? 20 * Math.log10(rms) : -100;
    const peakDb = peak > 0 ? 20 * Math.log10(peak) : -100;
    const level = dbToPercent(rmsDb + 6); // small lift so speech sits mid-meter
    const peakPct = dbToPercent(peakDb);

    const now = performance.now();
    if (peakPct >= this.peakHold || now > this.peakHoldUntil) {
      this.peakHold = peakPct;
      this.peakHoldUntil = now + 900;
    }
    return { rmsDb, level, peak: this.peakHold, clipping: peak >= 0.99 };
  }
}

export class StudioAudioEngine extends EventTarget {
  constructor() {
    super();
    this.ctx = null;
    this.micStream = null;
    this.micSource = null;
    this.micOpen = false;
    this.duck = {
      enabled: true,
      mode: 'voice',        // 'voice' = duck when RJ speaks, 'open' = duck whenever mic is open
      level: 0.25,          // music gain while ducked (0-1)
      thresholdDb: -42,     // voice activity threshold
      holdMs: 650
    };
    this.isDucked = false;
    this._lastVoiceAt = 0;
    this._duckTimer = null;
    this.recorder = null;
    this.recordChunks = [];
  }

  /** Must be called from a user gesture (browser autoplay rules). */
  async init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioCtx({ latencyHint: 'interactive' });
    const ctx = this.ctx;

    // Buses
    this.programBus = ctx.createGain();
    this.monitorBus = ctx.createGain();

    // Master (broadcast) chain
    this.masterFader = ctx.createGain();
    this.masterMeter = new LevelMeter(ctx);
    this.broadcastOut = ctx.createMediaStreamDestination();
    this.programBus.connect(this.masterFader);
    this.masterFader.connect(this.masterMeter.node);
    this.masterMeter.node.connect(this.broadcastOut);

    // Spectrum analyser for the on-air visualizer
    this.spectrum = ctx.createAnalyser();
    this.spectrum.fftSize = 256;
    this.spectrum.smoothingTimeConstant = 0.82;
    this.masterFader.connect(this.spectrum);

    // Headphone monitor chain (RJ only)
    this.headphones = ctx.createGain();
    this.headphones.gain.value = 0.8;
    this.monitorBus.connect(this.headphones);
    this.headphones.connect(ctx.destination);

    // Mic chain (source attached later in openMicDevice)
    this.micHighpass = ctx.createBiquadFilter();
    this.micHighpass.type = 'highpass';
    this.micHighpass.frequency.value = 85;
    this.micCompressor = ctx.createDynamicsCompressor();
    this.micCompressor.threshold.value = -24;
    this.micCompressor.knee.value = 12;
    this.micCompressor.ratio.value = 4;
    this.micCompressor.attack.value = 0.005;
    this.micCompressor.release.value = 0.2;
    this.micFader = ctx.createGain();
    this.micMute = ctx.createGain();
    this.micMute.gain.value = 0; // start muted
    this.micMeter = new LevelMeter(ctx);
    this.micMonitor = ctx.createGain();
    this.micMonitor.gain.value = 0; // off by default to avoid feedback on speakers
    this.micVoiceEnhance = true;
    this._wireMicChain();
    this.micMute.connect(this.micMeter.node);
    this.micMeter.node.connect(this.programBus);
    this.micMeter.node.connect(this.micMonitor);
    this.micMonitor.connect(this.monitorBus);

    // Raw (pre-mute) mic meter: lets the RJ check levels before opening the mic
    this.micPreMeter = new LevelMeter(ctx);
    this.micFader.connect(this.micPreMeter.node);

    // Music chain
    this.musicFader = ctx.createGain();
    this.duckGain = ctx.createGain();
    this.musicMeter = new LevelMeter(ctx);
    this.musicFader.connect(this.duckGain);
    this.duckGain.connect(this.musicMeter.node);
    this.musicMeter.node.connect(this.programBus);
    this.musicMeter.node.connect(this.monitorBus);

    // SFX chain
    this.sfxFader = ctx.createGain();
    this.sfxMeter = new LevelMeter(ctx);
    this.sfxFader.connect(this.sfxMeter.node);
    this.sfxMeter.node.connect(this.programBus);
    this.sfxMeter.node.connect(this.monitorBus);

    // Ducking runs on a timer (not rAF) so it keeps working when the tab is in the background
    this._duckTimer = setInterval(() => this._updateDucking(), 40);
  }

  _wireMicChain() {
    this.micHighpass.disconnect();
    this.micCompressor.disconnect();
    if (this.micVoiceEnhance) {
      this.micHighpass.connect(this.micCompressor);
      this.micCompressor.connect(this.micFader);
    } else {
      this.micHighpass.connect(this.micFader);
    }
    this.micFader.connect(this.micMute);
  }

  setVoiceEnhance(on) {
    this.micVoiceEnhance = on;
    if (this.ctx) this._wireMicChain();
  }

  /* ----------------------------- Microphone ----------------------------- */

  static async listMicrophones() {
    if (!navigator.mediaDevices?.enumerateDevices) return [];
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter((d) => d.kind === 'audioinput');
  }

  async openMicDevice({ deviceId, noiseSuppression = true, echoCancellation = true } = {}) {
    await this.init();
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error('Microphone access needs a secure page. Open the studio on http://localhost:3000 (or HTTPS).');
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        deviceId: deviceId ? { exact: deviceId } : undefined,
        noiseSuppression,
        echoCancellation,
        autoGainControl: false,
        channelCount: 1
      }
    });
    this.closeMicDevice();
    this.micStream = stream;
    this.micSource = this.ctx.createMediaStreamSource(stream);
    this.micSource.connect(this.micHighpass);
    const track = stream.getAudioTracks()[0];
    track.addEventListener('ended', () => this.dispatchEvent(new CustomEvent('micdisconnected')));
    return track.label || 'Microphone';
  }

  closeMicDevice() {
    if (this.micSource) {
      this.micSource.disconnect();
      this.micSource = null;
    }
    if (this.micStream) {
      this.micStream.getTracks().forEach((t) => t.stop());
      this.micStream = null;
    }
  }

  get hasMic() {
    return Boolean(this.micStream);
  }

  setMicOpen(open) {
    if (!this.ctx) return;
    this.micOpen = open;
    const t = this.ctx.currentTime;
    this.micMute.gain.cancelScheduledValues(t);
    this.micMute.gain.setTargetAtTime(open ? 1 : 0, t, 0.015);
  }

  setMicMonitor(on) {
    if (this.ctx) this.micMonitor.gain.setTargetAtTime(on ? 1 : 0, this.ctx.currentTime, 0.02);
  }

  /* ------------------------------- Faders ------------------------------- */

  setFader(channel, value) {
    if (!this.ctx) return;
    const node = {
      mic: this.micFader,
      music: this.musicFader,
      sfx: this.sfxFader,
      master: this.masterFader,
      headphones: this.headphones
    }[channel];
    if (node) node.gain.setTargetAtTime(Math.max(0, value), this.ctx.currentTime, 0.02);
  }

  /** Readings for all meters, called from the UI animation loop. */
  readMeters() {
    if (!this.ctx) return null;
    return {
      mic: this.micOpen ? this.micMeter.read() : this.micPreMeter.read(),
      micOpen: this.micOpen,
      music: this.musicMeter.read(),
      sfx: this.sfxMeter.read(),
      master: this.masterMeter.read()
    };
  }

  getSpectrum(target) {
    if (!this.spectrum) return null;
    this.spectrum.getByteFrequencyData(target);
    return target;
  }

  /* ------------------------------ Ducking ------------------------------- */

  _updateDucking() {
    if (!this.ctx) return;
    let shouldDuck = false;
    if (this.duck.enabled && this.micOpen && this.hasMic) {
      if (this.duck.mode === 'open') {
        shouldDuck = true;
      } else {
        const { rmsDb } = this.micMeter.read();
        const now = performance.now();
        if (rmsDb > this.duck.thresholdDb) this._lastVoiceAt = now;
        shouldDuck = now - this._lastVoiceAt < this.duck.holdMs;
      }
    }

    if (shouldDuck !== this.isDucked) {
      this.isDucked = shouldDuck;
      const t = this.ctx.currentTime;
      this.duckGain.gain.cancelScheduledValues(t);
      // Fast attack when voice starts, slower release so music swells back smoothly
      this.duckGain.gain.setTargetAtTime(shouldDuck ? this.duck.level : 1, t, shouldDuck ? 0.06 : 0.35);
      this.dispatchEvent(new CustomEvent('duckchange', { detail: { ducked: shouldDuck } }));
    } else if (shouldDuck) {
      // Keep the ducked level in sync if the RJ moves the slider mid-talk
      this.duckGain.gain.setTargetAtTime(this.duck.level, this.ctx.currentTime, 0.1);
    }
  }

  setDuckOptions(opts) {
    Object.assign(this.duck, opts);
  }

  /* ------------------------------ Recording ----------------------------- */

  get isRecording() {
    return this.recorder?.state === 'recording';
  }

  startRecording() {
    if (!this.ctx || this.isRecording) return;
    const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
    const mimeType = types.find((t) => window.MediaRecorder?.isTypeSupported?.(t));
    if (!mimeType) throw new Error('Recording is not supported in this browser.');
    this.recordChunks = [];
    this.recorder = new MediaRecorder(this.broadcastOut.stream, { mimeType, audioBitsPerSecond: 192000 });
    this.recorder.addEventListener('dataavailable', (e) => {
      if (e.data.size > 0) this.recordChunks.push(e.data);
    });
    this.recorder.start(1000);
  }

  /** Resolves with { blob, url, extension } or null if nothing was recorded. */
  stopRecording() {
    return new Promise((resolve) => {
      if (!this.recorder || this.recorder.state === 'inactive') return resolve(null);
      const mimeType = this.recorder.mimeType;
      this.recorder.addEventListener('stop', () => {
        if (!this.recordChunks.length) return resolve(null);
        const blob = new Blob(this.recordChunks, { type: mimeType });
        const extension = mimeType.includes('mp4') ? 'm4a' : mimeType.includes('ogg') ? 'ogg' : 'webm';
        resolve({ blob, url: URL.createObjectURL(blob), extension });
      }, { once: true });
      this.recorder.stop();
    });
  }

  /** The mixed program output - publish this track to LiveKit when it is connected. */
  get broadcastStream() {
    return this.broadcastOut?.stream || null;
  }
}
