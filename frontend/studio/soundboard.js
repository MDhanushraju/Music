/**
 * Tarang Studio - Soundboard & Audio Effects Unit
 * Routes synthesized and uploaded sound FX directly into StudioAudioEngine.sfxFader
 */

export class SoundboardManager extends EventTarget {
  constructor(engine) {
    super();
    this.engine = engine;
    this.customSounds = [];
  }

  init() {
    // Soundboard uses engine.sfxFader directly
  }

  trigger(sfxId) {
    if (!this.engine.ctx) return;
    const ctx = this.engine.ctx;
    const out = this.engine.sfxFader;

    switch (sfxId) {
      case 'airhorn':
        this._playAirhorn(ctx, out);
        break;
      case 'applause':
        this._playApplause(ctx, out);
        break;
      case 'jingle':
        this._playJingle(ctx, out);
        break;
      case 'scratch':
        this._playScratch(ctx, out);
        break;
      case 'laugh':
        this._playLaugh(ctx, out);
        break;
      case 'rimshot':
        this._playRimshot(ctx, out);
        break;
      case 'laser':
        this._playLaser(ctx, out);
        break;
      case 'radiobeep':
        this._playRadioBeep(ctx, out);
        break;
      default:
        // Check custom sound
        const custom = this.customSounds.find(s => s.id === sfxId);
        if (custom && custom.url) {
          this._playAudioFile(custom.url);
        }
    }

    this.dispatchEvent(new CustomEvent('sfxtrigger', { detail: { sfxId } }));
  }

  _playAudioFile(url) {
    const audio = new Audio(url);
    audio.crossOrigin = 'anonymous';
    const source = this.engine.ctx.createMediaElementSource(audio);
    source.connect(this.engine.sfxFader);
    audio.play().catch(e => console.warn('Custom SFX play error:', e));
  }

  _playAirhorn(ctx, out) {
    const t = ctx.currentTime;
    [0, 0.16, 0.32, 0.6].forEach(delay => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'sawtooth';
      osc1.frequency.setValueAtTime(466.16, t + delay); // Bb4
      osc2.frequency.setValueAtTime(622.25, t + delay); // Eb5

      gain.gain.setValueAtTime(0.24, t + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, t + delay + 0.24);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(out);

      osc1.start(t + delay);
      osc2.start(t + delay);
      osc1.stop(t + delay + 0.25);
      osc2.stop(t + delay + 0.25);
    });
  }

  _playApplause(ctx, out) {
    const duration = 2.2;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI) * 0.22;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.Q.setValueAtTime(0.7, ctx.currentTime);

    noise.connect(filter);
    filter.connect(out);
    noise.start();
  }

  _playJingle(ctx, out) {
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const t = ctx.currentTime;
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t + i * 0.12);

      gain.gain.setValueAtTime(0.26, t + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.12 + 0.65);

      osc.connect(gain);
      gain.connect(out);

      osc.start(t + i * 0.12);
      osc.stop(t + i * 0.12 + 0.7);
    });
  }

  _playScratch(ctx, out) {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, t);
    osc.frequency.linearRampToValueAtTime(1600, t + 0.15);
    osc.frequency.linearRampToValueAtTime(260, t + 0.3);

    gain.gain.setValueAtTime(0.28, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(out);
    osc.start(t);
    osc.stop(t + 0.36);
  }

  _playLaugh(ctx, out) {
    const t = ctx.currentTime;
    for (let i = 0; i < 6; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      const start = t + i * 0.14;
      osc.frequency.setValueAtTime(340 + (i % 2) * 80, start);
      osc.frequency.exponentialRampToValueAtTime(190, start + 0.12);

      gain.gain.setValueAtTime(0.18, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.13);

      osc.connect(gain);
      gain.connect(out);
      osc.start(start);
      osc.stop(start + 0.14);
    }
  }

  _playRimshot(ctx, out) {
    const t = ctx.currentTime;
    // Snare burst + high tom ping
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(90, t + 0.08);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    osc.connect(gain);
    gain.connect(out);
    osc.start(t);
    osc.stop(t + 0.1);

    // Rim click
    setTimeout(() => {
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      const clickT = ctx.currentTime;
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1200, clickT);
      clickGain.gain.setValueAtTime(0.25, clickT);
      clickGain.gain.exponentialRampToValueAtTime(0.001, clickT + 0.05);
      clickOsc.connect(clickGain);
      clickGain.connect(out);
      clickOsc.start(clickT);
      clickOsc.stop(clickT + 0.06);
    }, 120);
  }

  _playLaser(ctx, out) {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(2200, t);
    osc.frequency.exponentialRampToValueAtTime(120, t + 0.22);

    gain.gain.setValueAtTime(0.22, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

    osc.connect(gain);
    gain.connect(out);
    osc.start(t);
    osc.stop(t + 0.26);
  }

  _playRadioBeep(ctx, out) {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, t);

    gain.gain.setValueAtTime(0.18, t);
    gain.gain.setValueAtTime(0.18, t + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

    osc.connect(gain);
    gain.connect(out);
    osc.start(t);
    osc.stop(t + 0.36);
  }

  addCustomSound(file) {
    const url = URL.createObjectURL(file);
    const sound = {
      id: `custom-${Date.now()}`,
      name: file.name.replace(/\.[^/.]+$/, ''),
      url
    };
    this.customSounds.push(sound);
    this.dispatchEvent(new CustomEvent('customsoundadded', { detail: { sound } }));
    return sound;
  }
}
