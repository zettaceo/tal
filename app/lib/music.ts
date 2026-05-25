"use client";

const N: Record<string, number> = {
  C2:65.41, Cs2:69.30, D2:73.42, Ds2:77.78, E2:82.41, F2:87.31, Fs2:92.50, G2:98.00, Gs2:103.83, A2:110.00, As2:116.54, B2:123.47,
  C3:130.81, Cs3:138.59, D3:146.83, Ds3:155.56, E3:164.81, F3:174.61, Fs3:185.00, G3:196.00, Gs3:207.65, A3:220.00, As3:233.08, B3:246.94,
  C4:261.63, Cs4:277.18, D4:293.66, Ds4:311.13, E4:329.63, F4:349.23, Fs4:369.99, G4:392.00, Gs4:415.30, A4:440.00, As4:466.16, B4:493.88,
  C5:523.25, Cs5:554.37, D5:587.33, Ds5:622.25, E5:659.25, F5:698.46, Fs5:739.99, G5:783.99, Gs5:830.61, A5:880.00, As5:932.33, B5:987.77,
  C6:1046.50, D6:1174.66, E6:1318.51, F6:1396.91, G6:1567.98,
  R:0,
};

type Note = [string, number];
interface Track { wave: OscillatorType; vol: number; notes: Note[]; }
export interface Song { bpm: number; tracks: Track[]; }

class MusicEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private active = false;
  private timer: ReturnType<typeof setTimeout> | null = null;
  private current: string | null = null;
  private muted = false;

  private ensure() {
    if (this.ctx) return;
    if (typeof window === "undefined") return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.075;
    this.master.connect(this.ctx.destination);
  }

  unlock() {
    this.ensure();
    if (this.ctx?.state === "suspended") this.ctx.resume().catch(() => {});
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (this.master) this.master.gain.value = m ? 0 : 0.075;
  }

  isMuted() { return this.muted; }

  play(name: string, song: Song) {
    this.ensure();
    if (!this.ctx || !this.master) return;
    if (this.current === name && this.active) return;
    this.stop();
    this.current = name;
    this.active = true;

    const beatLen = 60 / song.bpm;
    const trackLens = song.tracks.map(t => t.notes.reduce((s, [, b]) => s + b, 0));
    const loopBeats = Math.max(...trackLens);
    const loopDur = loopBeats * beatLen;
    let nextStart = this.ctx.currentTime + 0.08;

    const scheduleLoop = () => {
      if (!this.active || !this.ctx || !this.master) return;
      const startT = nextStart;

      song.tracks.forEach(track => {
        let t = startT;
        track.notes.forEach(([note, beats]) => {
          const freq = N[note] ?? 0;
          const dur = beats * beatLen;
          if (freq > 0 && this.ctx && this.master) {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = track.wave;
            osc.frequency.value = freq;
            osc.connect(gain);
            gain.connect(this.master);
            gain.gain.setValueAtTime(0, t);
            gain.gain.linearRampToValueAtTime(track.vol * 0.4, t + 0.012);
            gain.gain.exponentialRampToValueAtTime(track.vol * 0.18, t + dur * 0.65);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + dur * 0.97);
            osc.start(t);
            osc.stop(t + dur + 0.02);
          }
          t += dur;
        });
      });

      nextStart += loopDur;
      const msToNext = (nextStart - this.ctx.currentTime) * 1000 - 250;
      this.timer = setTimeout(scheduleLoop, Math.max(40, msToNext));
    };
    scheduleLoop();
  }

  stop() {
    this.active = false;
    this.current = null;
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
  }

  blip(freq: number, dur = 0.08, wave: OscillatorType = "square", vol = 0.3) {
    this.ensure();
    if (!this.ctx || !this.master) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = wave;
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(this.master);
    const t = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.start(t);
    osc.stop(t + dur + 0.01);
  }
}

export const music = new MusicEngine();

// ─── SONGS ────────────────────────────────────────────────────────────────────

// Castle night — peaceful, exterior, walking
export const CASTLE_NIGHT: Song = {
  bpm: 78,
  tracks: [
    { wave: "triangle", vol: 0.7, notes: [
      ["A2",2],["E3",2],["A2",2],["E3",2],
      ["F2",2],["C3",2],["F2",2],["C3",2],
      ["G2",2],["D3",2],["G2",2],["D3",2],
      ["E2",2],["B2",2],["E2",2],["B2",2],
    ]},
    { wave: "square", vol: 0.32, notes: [
      ["A4",2],["C5",1],["E5",1],["D5",2],["B4",2],
      ["A4",2],["F4",1],["A4",1],["C5",2],["R",2],
      ["G4",2],["B4",1],["D5",1],["C5",2],["A4",2],
      ["E4",2],["G4",1],["B4",1],["A4",4],
    ]},
    { wave: "sine", vol: 0.18, notes: [
      ["E5",4],["R",4],["C5",4],["R",4],
      ["D5",4],["R",4],["E5",4],["A5",4],
    ]},
  ],
};

// Throne — royal, formal
export const THRONE_ROOM: Song = {
  bpm: 88,
  tracks: [
    { wave: "triangle", vol: 0.7, notes: [
      ["C3",4],["G3",4],["F3",4],["C4",4],
      ["D3",4],["A3",4],["G3",4],["G2",4],
    ]},
    { wave: "square", vol: 0.3, notes: [
      ["C5",1],["E5",1],["G5",1],["C6",1],["G5",2],["E5",2],
      ["F5",1],["A5",1],["C6",1],["F5",1],["C6",2],["A5",2],
      ["D5",1],["F5",1],["A5",1],["D5",1],["A5",2],["F5",2],
      ["G5",1],["B4",1],["D5",1],["G5",1],["G5",4],
    ]},
  ],
};

// Playful — counting, hearts
export const PLAYFUL: Song = {
  bpm: 110,
  tracks: [
    { wave: "triangle", vol: 0.6, notes: [
      ["C3",1],["G3",1],["C3",1],["G3",1],
      ["F3",1],["C4",1],["F3",1],["C4",1],
      ["G3",1],["D4",1],["G3",1],["D4",1],
      ["C3",1],["G3",1],["E3",1],["G3",1],
    ]},
    { wave: "square", vol: 0.3, notes: [
      ["E5",1],["G5",1],["E5",1],["C5",1],["E5",1],["G5",1],["A5",2],
      ["F5",1],["A5",1],["F5",1],["C5",1],["F5",1],["A5",1],["C6",2],
      ["G5",1],["B5",1],["G5",1],["D5",1],["G5",1],["B5",1],["A5",2],
      ["E5",1],["G5",1],["C5",2],["E5",1],["G5",1],["E5",2],
    ]},
  ],
};

// Mystery — the button, anticipation
export const MYSTERY: Song = {
  bpm: 70,
  tracks: [
    { wave: "triangle", vol: 0.7, notes: [
      ["E2",4],["B2",4],
      ["A2",4],["E3",4],
      ["F2",4],["C3",4],
      ["G2",4],["D3",4],
    ]},
    { wave: "sine", vol: 0.25, notes: [
      ["B4",2],["E5",2],["G5",4],
      ["A4",2],["C5",2],["E5",4],
      ["A4",2],["F5",2],["A5",4],
      ["D5",2],["B4",2],["G4",4],
    ]},
  ],
};

// Emotional — rooftop, fireworks, speech
export const EMOTIONAL: Song = {
  bpm: 58,
  tracks: [
    { wave: "triangle", vol: 0.7, notes: [
      ["D3",4],["A3",4],
      ["As2",4],["F3",4],
      ["F3",4],["C4",4],
      ["C3",4],["G3",4],
    ]},
    { wave: "sine", vol: 0.42, notes: [
      ["D5",2],["F5",2],["A5",4],
      ["G5",2],["F5",2],["D5",4],
      ["F5",2],["A5",2],["C6",4],
      ["E5",2],["D5",2],["C5",4],
    ]},
    { wave: "triangle", vol: 0.2, notes: [
      ["D4",8],
      ["As3",8],
      ["F4",8],
      ["G4",8],
    ]},
  ],
};

// Comedy — final cut
export const COMEDY: Song = {
  bpm: 140,
  tracks: [
    { wave: "square", vol: 0.5, notes: [
      ["C5",0.5],["E5",0.5],["G5",0.5],["C6",0.5],["G5",0.5],["E5",0.5],["C5",1],
      ["F5",0.5],["A5",0.5],["C6",0.5],["A5",0.5],["F5",1],["R",1],
      ["G5",1],["F5",1],["E5",1],["D5",1],
      ["C5",4],
    ]},
    { wave: "triangle", vol: 0.6, notes: [
      ["C3",2],["G3",2],
      ["F3",2],["C4",2],
      ["G3",2],["G2",2],
      ["C3",4],
    ]},
  ],
};
