/**
 * ==============================================================================
 * SECRET BIRTHDAY GIFT - APPLICATION JAVASCRIPT
 * Interactive Multi-Step Kawaii Birthday Experience
 * ==============================================================================
 */

// Safe helper to encode SVG strings to valid Data URIs across all browsers (Chrome, Edge, Safari, Firefox)
function svgToUri(svgString) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString.trim());
}

// ==============================================================================
// 1. CONFIGURATION OBJECT (Easily customize photos, passcode, letter, and music)
// ==============================================================================
const CONFIG = {
  // Secret Passcode for Step 2 (default: 2009)
  passcode: '2009',

  // Countdown timer settings for Step 1
  countdown: {
    startSeconds: 3, // Set to 3 for quick testing (11:59:57 -> 00:00:00)
    displayStart: '11:59:57',
    displayEnd: '00:00:00'
  },

  // Romantic acoustic background music settings
  music: {
    // Put any custom MP3 link here (e.g. 'https://your-domain.com/romantic-acoustic.mp3')
    // If left empty or if external audio fails, the built-in romantic acoustic Web Audio synth will play!
    src: '',
    volume: 0.6,
    autoplay: true
  },

  // Step 5 - Gift 1: "MEMORIES" Polaroid Clothesline Photos & Captions
  polaroids: [
    {
      id: 1,
      // You can replace 'src' with your own image URL or local file path!
      src: '', // Empty uses default cute kawaii illustration
      caption: 'More than bestie ❤️',
      date: 'March 03, 2024',
      description: 'The Day when i first text you on insta , The Day when we first talk 03 march 2024.'
    },
    {
      id: 2,
      src: '',
      caption: 'Time with you is precious 💜',
      date: 'March 03 2024 Till Now',
      description: 'Its been 1,023 days of us , n i wish we could be together for a lot more many more days ! 2 years, 9 months, and 18 days together ♾️ !'
    },
    {
      id: 3,
      src: '',
      caption: 'Best Friend Forever ❤️',
      date: 'Since 03 march 2024',
      description: 'The warmth , your voice , ur presence , everything about u makes me feel  happy , complete and peaceful !!'
    },
    {
      id: 4,
      src: '',
      caption: 'You make me feel alive 🌟',
      date: 'Since 03 march 2024',
      description: "I don't know why but i feel so alive when am with you 💜.. you are my happy pill , my happiness , my joy , my everything ! I love you ! ❤️"
    }
  ],

  // Step 5 - Gift 2: Typewriter Birthday Wish Card
  letter: {
    photoSrc: '', // Custom photo URL or empty for default portrait
    photoCaption: 'My Favourite Person 🤍',
    dateStamp: 'December 21, 2026',
    recipientName: 'My Dearest Bestie',
    paragraphs: [
      "Happy birthday to my favourite person in the entire universe! 🤍",
      "From the very first moment we became friends, you brought an unexplainable amount of warmth, genuine laughter, and bright light into my life. Every single memory with you feels like a warm cup of cocoa on a cold winter night.",
      "Thank you for being the one person I can always run to, the one who knows all my quirks without judging, and the one who turns ordinary days into sweet, magical adventures.",
      "May this brand-new chapter of your life be overflowing with pure happiness, peace, success, and all the dreams your heart has been whispering for. You deserve the absolute world and more.",
      "Always your biggest cheerleader and forever by your side! 🎂✨ Happiest Birthday MAADAMMM JII! 💖"
    ]
  },

  // Step 5 - Gift 3: Birthday Cake Wish Message
  cake: {
    wishHeading: "HAPPY BIRTHDAY! 🎂✨",
    wishMessage: "May all your sweetest wishes and secret dreams come true this year! You are loved so, so much, today and every single day! 💖✨"
  }
};

// ==============================================================================
// 2. EMBEDDED KAWAII SVG ILLUSTRATIONS (Properly encoded, 100% offline & reliable)
// ==============================================================================
const DEFAULT_ILLUSTRATIONS = {
  // Cute Cat with Party Hat for Step 2 Polaroid
  birthdayCat: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#fff5f7"/>
      <circle cx="100" cy="115" r="55" fill="#ffffff" stroke="#ffccd5" stroke-width="4"/>
      <polygon points="60,85 75,45 95,75" fill="#ffffff" stroke="#ffccd5" stroke-width="4"/>
      <polygon points="65,80 77,52 90,75" fill="#ffb3c1"/>
      <polygon points="140,85 125,45 105,75" fill="#ffffff" stroke="#ffccd5" stroke-width="4"/>
      <polygon points="135,80 123,52 110,75" fill="#ffb3c1"/>
      <polygon points="100,25 80,75 120,75" fill="#ff4d6d"/>
      <circle cx="100" cy="25" r="8" fill="#ffd166"/>
      <line x1="86" y1="58" x2="114" y2="58" stroke="#ffd166" stroke-width="3"/>
      <line x1="92" y1="42" x2="108" y2="42" stroke="#ffffff" stroke-width="3"/>
      <circle cx="82" cy="112" r="5" fill="#33272a"/>
      <circle cx="118" cy="112" r="5" fill="#33272a"/>
      <circle cx="84" cy="110" r="1.5" fill="#ffffff"/>
      <circle cx="120" cy="110" r="1.5" fill="#ffffff"/>
      <path d="M96 122 Q100 126 104 122" stroke="#33272a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <ellipse cx="72" cy="120" rx="9" ry="5" fill="#ff758f" opacity="0.6"/>
      <ellipse cx="128" cy="120" rx="9" ry="5" fill="#ff758f" opacity="0.6"/>
      <text x="35" y="60" font-size="20">✨</text>
      <text x="145" y="60" font-size="20">💖</text>
    </svg>
  `),

  // Oops / Wrong Passcode Reaction Cat
  wrongPasscode: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="#fff0f0"/>
      <circle cx="100" cy="115" r="55" fill="#ffffff" stroke="#ff8fa3" stroke-width="4"/>
      <polygon points="60,85 75,45 95,75" fill="#ffffff" stroke="#ff8fa3" stroke-width="4"/>
      <polygon points="140,85 125,45 105,75" fill="#ffffff" stroke="#ff8fa3" stroke-width="4"/>
      <path d="M75 105 L87 117 M87 105 L75 117" stroke="#d90429" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M113 105 L125 117 M125 105 L113 117" stroke="#d90429" stroke-width="3.5" stroke-linecap="round"/>
      <ellipse cx="100" cy="126" rx="8" ry="5" fill="#d90429"/>
      <path d="M140 90 Q145 98 140 102 Q135 98 140 90" fill="#48cae4"/>
      <rect x="85" y="70" width="30" height="12" rx="3" fill="#ffe5b4" stroke="#ddb892"/>
      <text x="25" y="55" font-size="26">❌</text>
      <text x="145" y="55" font-size="22">❓</text>
    </svg>
  `),

  // Shy Dancing Bunny (Step 3)
  shyDancing: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="120" r="48" fill="#ffffff" stroke="#ffb3c1" stroke-width="4"/>
      <ellipse cx="80" cy="55" rx="14" ry="40" fill="#ffffff" stroke="#ffb3c1" stroke-width="4" transform="rotate(-10 80 55)"/>
      <ellipse cx="80" cy="55" rx="8" ry="28" fill="#ffccd5" transform="rotate(-10 80 55)"/>
      <ellipse cx="120" cy="55" rx="14" ry="40" fill="#ffffff" stroke="#ffb3c1" stroke-width="4" transform="rotate(10 120 55)"/>
      <ellipse cx="120" cy="55" rx="8" ry="28" fill="#ffccd5" transform="rotate(10 120 55)"/>
      <path d="M82 115 Q88 108 94 115" stroke="#33272a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <path d="M106 115 Q112 108 118 115" stroke="#33272a" stroke-width="3.5" fill="none" stroke-linecap="round"/>
      <circle cx="100" cy="122" r="3.5" fill="#ff4d6d"/>
      <circle cx="76" cy="125" r="9" fill="#ff758f" opacity="0.6"/>
      <circle cx="124" cy="125" r="9" fill="#ff758f" opacity="0.6"/>
      <ellipse cx="100" cy="145" rx="12" ry="8" fill="#ffffff" stroke="#ffb3c1" stroke-width="3"/>
      <text x="35" y="80" font-size="20">🌸</text>
      <text x="145" y="80" font-size="20">✨</text>
    </svg>
  `),

  // Pleading/Crying Bear (Step 3 when NO clicked)
  pleadingBear: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="65" cy="70" r="22" fill="#f7d1cd" stroke="#e8a598" stroke-width="4"/>
      <circle cx="135" cy="70" r="22" fill="#f7d1cd" stroke="#e8a598" stroke-width="4"/>
      <circle cx="100" cy="115" r="50" fill="#fff0ed" stroke="#e8a598" stroke-width="4"/>
      <circle cx="80" cy="110" r="14" fill="#2b1e1a"/>
      <circle cx="76" cy="106" r="5" fill="#ffffff"/>
      <circle cx="83" cy="114" r="2" fill="#ffffff"/>
      <circle cx="120" cy="110" r="14" fill="#2b1e1a"/>
      <circle cx="116" cy="106" r="5" fill="#ffffff"/>
      <circle cx="123" cy="114" r="2" fill="#ffffff"/>
      <path d="M72 120 Q65 140 68 150" stroke="#48cae4" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M128 120 Q135 140 132 150" stroke="#48cae4" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M94 130 Q100 126 106 130" stroke="#2b1e1a" stroke-width="3" fill="none" stroke-linecap="round"/>
      <text x="30" y="50" font-size="22">💔</text>
      <text x="145" y="50" font-size="22">🥺</text>
    </svg>
  `),

  // Excited Peeking Character (Step 4)
  excitedPeeking: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="60" cy="75" r="20" fill="#ffe5d9" stroke="#ffcad4" stroke-width="4"/>
      <circle cx="140" cy="75" r="20" fill="#ffe5d9" stroke="#ffcad4" stroke-width="4"/>
      <circle cx="100" cy="115" r="52" fill="#fff5f2" stroke="#ffcad4" stroke-width="4"/>
      <text x="70" y="118" font-size="26" text-anchor="middle">⭐</text>
      <text x="130" y="118" font-size="26" text-anchor="middle">⭐</text>
      <path d="M88 128 Q100 148 112 128 Z" fill="#ff4d6d" stroke="#33272a" stroke-width="2"/>
      <circle cx="70" cy="126" r="8" fill="#ff758f" opacity="0.6"/>
      <circle cx="130" cy="126" r="8" fill="#ff758f" opacity="0.6"/>
      <path d="M106 134 Q130 145 155 130" stroke="#ffd166" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="157" cy="130" r="5" fill="#ff4d6d"/>
      <text x="25" y="45" font-size="24">🎉</text>
      <text x="145" y="45" font-size="24">🚀</text>
    </svg>
  `),

  // Curious Pirate Mascot (Step 5 Hub)
  pirateMascot: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <ellipse cx="100" cy="120" rx="46" ry="50" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="4"/>
      <path d="M50 85 Q100 55 150 85 Q100 95 50 85 Z" fill="#2d3436"/>
      <circle cx="100" cy="76" r="5" fill="#ffffff"/>
      <circle cx="82" cy="115" r="9" fill="#2d3436"/>
      <line x1="60" y1="98" x2="110" y2="128" stroke="#2d3436" stroke-width="2.5"/>
      <circle cx="118" cy="115" r="6" fill="#2d3436"/>
      <circle cx="120" cy="113" r="2" fill="#ffffff"/>
      <polygon points="100,122 95,130 105,130" fill="#e17055"/>
      <text x="35" y="55" font-size="20">🏴‍☠️</text>
      <text x="145" y="55" font-size="20">💎</text>
    </svg>
  `),

  // Cake Mascot with Balloons (Gift 3)
  cakeMascot: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <circle cx="100" cy="120" r="46" fill="#ffffff" stroke="#ffccd5" stroke-width="4"/>
      <ellipse cx="65" cy="115" rx="8" ry="16" fill="#ffffff" stroke="#ffccd5" stroke-width="3" transform="rotate(-15 65 115)"/>
      <ellipse cx="135" cy="115" rx="8" ry="16" fill="#ffffff" stroke="#ffccd5" stroke-width="3" transform="rotate(15 135 115)"/>
      <circle cx="85" cy="115" r="4.5" fill="#33272a"/>
      <circle cx="115" cy="115" r="4.5" fill="#33272a"/>
      <ellipse cx="100" cy="123" rx="4" ry="3" fill="#ff4d6d"/>
      <path d="M96 126 Q100 130 104 126" stroke="#33272a" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <circle cx="75" cy="124" r="7" fill="#ff758f" opacity="0.6"/>
      <circle cx="125" cy="124" r="7" fill="#ff758f" opacity="0.6"/>
      <polygon points="100,60 88,95 112,95" fill="#c77dff"/>
      <circle cx="100" cy="60" r="4" fill="#ffd166"/>
    </svg>
  `),

  // 4 Default Illustrated Polaroid Memories (for Gift 1)
  polaroid1: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#fff0f3"/>
      <circle cx="120" cy="110" r="60" fill="#ffe5ec"/>
      <circle cx="95" cy="115" r="30" fill="#ffffff" stroke="#ff758f" stroke-width="3"/>
      <circle cx="145" cy="115" r="30" fill="#ffffff" stroke="#ff758f" stroke-width="3"/>
      <circle cx="88" cy="112" r="3" fill="#33272a"/>
      <circle cx="102" cy="112" r="3" fill="#33272a"/>
      <circle cx="138" cy="112" r="3" fill="#33272a"/>
      <circle cx="152" cy="112" r="3" fill="#33272a"/>
      <path d="M93 120 Q95 124 97 120" stroke="#33272a" stroke-width="2" fill="none"/>
      <path d="M143 120 Q145 124 147 120" stroke="#33272a" stroke-width="2" fill="none"/>
      <text x="108" y="75" font-size="28">💖</text>
      <text x="30" y="50" font-size="20">✨</text>
      <text x="180" y="50" font-size="20">🌸</text>
    </svg>
  `),

  polaroid2: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#f3eefc"/>
      <circle cx="120" cy="110" r="60" fill="#e8dcff"/>
      <rect x="75" y="95" width="35" height="45" rx="6" fill="#ffffff" stroke="#7b2cbf" stroke-width="3"/>
      <path d="M75 105 C60 105 60 125 75 125" stroke="#7b2cbf" stroke-width="3" fill="none"/>
      <rect x="130" y="95" width="35" height="45" rx="6" fill="#ffffff" stroke="#7b2cbf" stroke-width="3"/>
      <path d="M165 105 C180 105 180 125 165 125" stroke="#7b2cbf" stroke-width="3" fill="none"/>
      <text x="82" y="85" font-size="16">☕</text>
      <text x="138" y="85" font-size="16">🧋</text>
      <text x="110" y="85" font-size="20">✨</text>
      <text x="105" y="175" font-size="22">🎉</text>
    </svg>
  `),

  polaroid3: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#fffcf2"/>
      <circle cx="120" cy="110" r="60" fill="#fef08a" opacity="0.4"/>
      <circle cx="120" cy="110" r="35" fill="#ffffff" stroke="#f59e0b" stroke-width="3"/>
      <text x="102" y="122" font-size="34">📸</text>
      <text x="45" y="70" font-size="26">🌸</text>
      <text x="165" y="70" font-size="26">🌸</text>
      <text x="105" y="175" font-size="22">👭</text>
      <text x="35" y="160" font-size="20">✨</text>
    </svg>
  `),

  polaroid4: svgToUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
      <rect width="240" height="240" fill="#e0f2fe"/>
      <circle cx="120" cy="110" r="60" fill="#bae6fd"/>
      <path d="M40 180 Q120 120 200 180 Z" fill="#86efac"/>
      <circle cx="120" cy="90" r="25" fill="#fbbf24"/>
      <text x="50" y="80" font-size="20">⭐</text>
      <text x="170" y="80" font-size="20">🌙</text>
      <text x="105" y="165" font-size="26">🧺</text>
    </svg>
  `)
};

// ==============================================================================
// 3. SOUND SYNTHESIZER & ROMANTIC ACOUSTIC MUSIC GENERATOR
// ==============================================================================
class AudioManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.timerId = null;
    this.externalAudio = document.getElementById('bgAudio');
    this.btn = document.getElementById('musicToggleBtn');
    this.label = document.getElementById('musicLabel');

    this.initListeners();
  }

  initContext() {
    try {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => { });
      }
    } catch (e) {
      console.warn("AudioContext init skipped until gesture", e);
    }
  }

  initListeners() {
    this.btn.addEventListener('click', () => {
      this.toggleMusic();
    });

    // Start audio on first user touch / interaction
    const unlockAudio = () => {
      this.initContext();
      if (CONFIG.music.autoplay && !this.isPlaying && !this.isMuted) {
        this.startMusic();
      }
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('keydown', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
  }

  toggleMusic() {
    this.initContext();
    if (this.isPlaying) {
      this.stopMusic();
      this.isMuted = true;
    } else {
      this.isMuted = false;
      this.startMusic();
    }
  }

  startMusic() {
    if (CONFIG.music.src) {
      this.externalAudio.src = CONFIG.music.src;
      this.externalAudio.volume = CONFIG.music.volume || 0.6;
      this.externalAudio.play()
        .then(() => {
          this.isPlaying = true;
          this.updateUI(true);
        })
        .catch(() => {
          this.startProceduralAcousticGuitar();
        });
    } else {
      this.startProceduralAcousticGuitar();
    }
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.externalAudio) {
      this.externalAudio.pause();
    }
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.updateUI(false);
  }

  updateUI(playing) {
    if (playing) {
      this.btn.classList.add('playing');
      this.label.textContent = "Music 🎵";
    } else {
      this.btn.classList.remove('playing');
      this.label.textContent = "Muted 🔇";
    }
  }

  startProceduralAcousticGuitar() {
    this.initContext();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.updateUI(true);

    const chords = [
      [130.81, 196.00, 246.94, 261.63, 329.63, 392.00, 493.88],
      [110.00, 164.81, 220.00, 261.63, 329.63, 392.00, 440.00],
      [87.31, 130.81, 174.61, 220.00, 261.63, 329.63, 349.23],
      [98.00, 146.83, 196.00, 261.63, 293.66, 392.00, 440.00]
    ];

    let chordIndex = 0;
    let noteStep = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentChord = chords[chordIndex];
      const pattern = [0, 2, 4, 3, 5, 4, 6, 3];
      const noteFreq = currentChord[pattern[noteStep % pattern.length]];

      this.pluckAcousticString(noteFreq);

      noteStep++;
      if (noteStep % pattern.length === 0) {
        chordIndex = (chordIndex + 1) % chords.length;
      }
    };

    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(playNextNote, 340);
  }

  pluckAcousticString(freq) {
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(350, now + 1.2);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.8);
    } catch (e) { }
  }

  playKeyClick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } catch (e) { }
  }

  playTypewriterClick() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(750 + Math.random() * 250, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.035);

      gain.gain.setValueAtTime(0.045, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) { }
  }

  playSuccessChime() {
    this.initContext();
    if (!this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      setTimeout(() => {
        if (!this.ctx) return;
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now);
          gain.gain.setValueAtTime(0.15, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now);
          osc.stop(now + 0.6);
        } catch (e) { }
      }, i * 90);
    });
  }

  playBlowSound() {
    this.initContext();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) { }
  }
}

// ==============================================================================
// 4. MAIN APP CONTROLLER
// ==============================================================================
class BirthdayApp {
  constructor() {
    this.audio = new AudioManager();
    this.currentStep = 'step1';
    this.unlockedBoxes = new Set();
    this.curtainsOpened = false;

    this.enteredPasscode = '';
    this.typewriterTimer = null;
    this.isTypingFinished = false;

    this.candlesBlown = new Set();
    this.micStream = null;
    this.micAudioCtx = null;
    this.micListening = false;

    this.initDOM();
    this.initAmbientParticles();
    this.initStep1Curtain();
    this.initStep2Passcode();
    this.initStep3Tease();
    this.initStep4Hype();
    this.initStep5Hub();
    this.initGift1Memories();
    this.initGift2Typewriter();
    this.initGift3Cake();
    this.initLightbox();
  }

  initDOM() {
    document.getElementById('passcodeReactionImg').src = DEFAULT_ILLUSTRATIONS.birthdayCat;
    document.getElementById('teaseCharacterImg').src = DEFAULT_ILLUSTRATIONS.shyDancing;
    document.getElementById('hypeCharacterImg').src = DEFAULT_ILLUSTRATIONS.excitedPeeking;
    document.getElementById('hubMascotImg').src = DEFAULT_ILLUSTRATIONS.pirateMascot;
    document.getElementById('typewriterPhoto').src = CONFIG.letter.photoSrc || DEFAULT_ILLUSTRATIONS.birthdayCat;
    document.getElementById('typewriterPhotoCaption').textContent = CONFIG.letter.photoCaption;
    document.getElementById('typewriterDate').textContent = CONFIG.letter.dateStamp;
    document.getElementById('cakeMascotImg').src = DEFAULT_ILLUSTRATIONS.cakeMascot;
    document.getElementById('hintPasscode').textContent = CONFIG.passcode;
    document.getElementById('wishCelebrationText').textContent = CONFIG.cake.wishMessage;

    document.querySelectorAll('.back-to-hub-btn, .return-gifts-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget.getAttribute('data-target') || 'step5';
        this.switchStep(target);
      });
    });
  }

  initAmbientParticles() {
    const container = document.getElementById('ambientParticles');
    const emojis = ['💖', '✨', '🌸', '🎀', '⭐', '🎈'];

    for (let i = 0; i < 16; i++) {
      const span = document.createElement('span');
      span.className = 'floating-particle';
      span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      span.style.left = `${Math.random() * 100}vw`;
      span.style.animationDuration = `${8 + Math.random() * 8}s`;
      span.style.animationDelay = `${Math.random() * 6}s`;
      container.appendChild(span);
    }
  }

  switchStep(stepId) {
    document.querySelectorAll('.step-view').forEach(view => {
      view.classList.remove('active');
      view.style.display = '';
    });

    const nextView = document.getElementById(stepId);
    if (nextView) {
      nextView.classList.add('active');
      nextView.style.display = '';
      this.currentStep = stepId;
      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;

      if (stepId === 'giftView2') {
        this.startTypewriterEffect();
      }
    }
  }

  // ============================================================================
  // STEP 1: MIDNIGHT CURTAIN COUNTDOWN
  // ============================================================================
  initStep1Curtain() {
    const digitalTimer = document.getElementById('digitalTimer');
    const secondHand = document.getElementById('secondHand');
    const minuteHand = document.getElementById('minuteHand');
    const hourHand = document.getElementById('hourHand');
    const skipBtn = document.getElementById('skipCountdownBtn');
    const curtainStage = document.getElementById('step1');

    let currentSecondsRemaining = CONFIG.countdown.startSeconds;
    let secDegrees = (57 / 60) * 360;
    let minDegrees = (59 / 60) * 360 + (57 / 3600) * 360;
    let hourDegrees = (11 / 12) * 360 + (59 / 720) * 360;

    const updateClock = (timeStr, secDeg) => {
      digitalTimer.textContent = timeStr;
      secondHand.style.transform = `rotate(${secDeg}deg)`;
      minuteHand.style.transform = `rotate(${minDegrees}deg)`;
      hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    };

    updateClock('11:59:57', secDegrees);

    const openCurtainsAndProceed = () => {
      if (this.curtainsOpened) return;
      this.curtainsOpened = true;

      if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
      }

      digitalTimer.textContent = '00:00:00';
      secondHand.style.transform = `rotate(360deg)`;
      minuteHand.style.transform = `rotate(360deg)`;
      hourHand.style.transform = `rotate(360deg)`;

      const step2 = document.getElementById('step2');
      if (step2) {
        step2.classList.add('active');
      }

      window.scrollTo(0, 0);
      document.documentElement.scrollLeft = 0;
      document.body.scrollLeft = 0;

      curtainStage.classList.add('curtains-opened');
      this.audio.playSuccessChime();

      if (window.confetti) {
        try {
          confetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.5 },
            colors: ['#ffd166', '#ff4d6d', '#fff']
          });
        } catch (e) { }
      }

      setTimeout(() => {
        curtainStage.style.display = 'none';
        curtainStage.classList.remove('active');
        this.switchStep('step2');
        window.scrollTo(0, 0);
        document.documentElement.scrollLeft = 0;
        document.body.scrollLeft = 0;
      }, 1600);
    };

    this.countdownInterval = setInterval(() => {
      currentSecondsRemaining--;
      secDegrees += 6;

      if (currentSecondsRemaining === 2) {
        updateClock('11:59:58', secDegrees);
      } else if (currentSecondsRemaining === 1) {
        updateClock('11:59:59', secDegrees);
      } else if (currentSecondsRemaining <= 0) {
        openCurtainsAndProceed();
      }
    }, 1000);

    skipBtn.addEventListener('click', () => {
      openCurtainsAndProceed();
    });
  }

  // ============================================================================
  // STEP 2: 4-DIGIT SECRET PASSCODE
  // ============================================================================
  initStep2Passcode() {
    const boxes = document.querySelectorAll('.passcode-box');
    const keypad = document.getElementById('numericKeypad');
    const errorMsg = document.getElementById('passcodeError');
    const tryAgainBtn = document.getElementById('tryAgainBtn');
    const reactionImg = document.getElementById('passcodeReactionImg');
    const polaroidNote = document.getElementById('passcodePolaroidNote');

    const updateBoxes = () => {
      boxes.forEach((box, idx) => {
        if (idx < this.enteredPasscode.length) {
          box.textContent = '●';
          box.classList.add('filled');
        } else {
          box.textContent = '';
          box.classList.remove('filled');
        }

        if (idx === this.enteredPasscode.length) {
          box.classList.add('active');
        } else {
          box.classList.remove('active');
        }
      });
    };

    const handleDigitInput = (digit) => {
      if (this.enteredPasscode.length < 4) {
        this.audio.playKeyClick();
        this.enteredPasscode += digit;
        updateBoxes();

        if (this.enteredPasscode.length === 4) {
          setTimeout(() => verifyPasscode(), 250);
        }
      }
    };

    const handleBackspace = () => {
      if (this.enteredPasscode.length > 0) {
        this.audio.playKeyClick();
        this.enteredPasscode = this.enteredPasscode.slice(0, -1);
        updateBoxes();
        resetErrorState();
      }
    };

    const resetErrorState = () => {
      boxes.forEach(box => box.classList.remove('shake-error'));
      errorMsg.style.display = 'none';
      tryAgainBtn.style.display = 'none';
      reactionImg.src = DEFAULT_ILLUSTRATIONS.birthdayCat;
      polaroidNote.textContent = 'Birthday Girl 💖';
    };

    const verifyPasscode = () => {
      if (this.enteredPasscode === CONFIG.passcode) {
        this.audio.playSuccessChime();
        boxes.forEach(b => {
          b.style.borderColor = '#2ec4b6';
          b.style.color = '#2ec4b6';
        });

        if (window.confetti) {
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) { }
        }

        setTimeout(() => {
          this.switchStep('step3');
        }, 800);
      } else {
        reactionImg.src = DEFAULT_ILLUSTRATIONS.wrongPasscode;
        polaroidNote.textContent = 'Oops! Not that one! 🙈';
        errorMsg.style.display = 'block';
        tryAgainBtn.style.display = 'inline-block';

        boxes.forEach(box => box.classList.add('shake-error'));
      }
    };

    keypad.addEventListener('click', (e) => {
      const target = e.target.closest('.key-btn');
      if (!target) return;
      const key = target.getAttribute('data-key');

      if (key === 'backspace') {
        handleBackspace();
      } else if (key === 'enter') {
        if (this.enteredPasscode.length === 4) {
          verifyPasscode();
        } else {
          this.audio.playKeyClick();
          boxes.forEach(box => box.classList.add('shake-error'));
          setTimeout(() => boxes.forEach(box => box.classList.remove('shake-error')), 400);
        }
      } else if (key !== null) {
        handleDigitInput(key);
      }
    });

    tryAgainBtn.addEventListener('click', () => {
      this.enteredPasscode = '';
      updateBoxes();
      resetErrorState();
    });

    window.addEventListener('keydown', (e) => {
      if (this.currentStep !== 'step2') return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigitInput(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        if (this.enteredPasscode.length === 4) {
          verifyPasscode();
        }
      }
    });
  }

  // ============================================================================
  // STEP 3: PLAYFUL "DO YOU WANNA SEE IT?" TEASE
  // ============================================================================
  initStep3Tease() {
    const yesBtn = document.getElementById('teaseYesBtn');
    const noBtn = document.getElementById('teaseNoBtn');
    const characterImg = document.getElementById('teaseCharacterImg');
    const questionText = document.getElementById('teaseQuestion');

    let noClickCount = 0;
    let yesScale = 1.0;

    const dodgeNoButton = () => {
      noClickCount++;
      yesScale += 0.18;
      yesBtn.style.transform = `scale(${yesScale})`;

      characterImg.src = DEFAULT_ILLUSTRATIONS.pleadingBear;
      questionText.textContent = "Are you sure? 😢 Please say YES! 💔";

      const maxX = 120;
      const maxY = 50;
      const randomX = (Math.random() - 0.5) * maxX * 2;
      const randomY = (Math.random() - 0.5) * maxY * 2;
      const noScale = Math.max(0.65, 1 - noClickCount * 0.1);

      noBtn.style.transition = 'transform 0.2s ease';
      noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${noScale})`;
    };

    noBtn.addEventListener('mouseover', () => {
      if (window.innerWidth > 768) {
        dodgeNoButton();
      }
    });

    noBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dodgeNoButton();
    });

    yesBtn.addEventListener('click', () => {
      this.audio.playKeyClick();
      if (window.confetti) {
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch (e) { }
      }
      this.switchStep('step4');
    });
  }

  // ============================================================================
  // STEP 4: "ARE YOU REALLY EXCITED?" HYPE SCREEN
  // ============================================================================
  initStep4Hype() {
    const yes1 = document.getElementById('hypeYesBtn1');
    const yes2 = document.getElementById('hypeYesBtn2');

    const proceedToHub = () => {
      this.audio.playSuccessChime();
      if (window.confetti) {
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.5 }
          });
        } catch (e) { }
      }
      this.switchStep('step5');
    };

    yes1.addEventListener('click', proceedToHub);
    yes2.addEventListener('click', proceedToHub);
  }

  // ============================================================================
  // STEP 5: 3 HEART MYSTERY BOXES HUB
  // ============================================================================
  initStep5Hub() {
    const boxes = [
      { cardId: 'boxCard1', btnId: 'openBoxBtn1', target: 'giftView1', index: 1 },
      { cardId: 'boxCard2', btnId: 'openBoxBtn2', target: 'giftView2', index: 2 },
      { cardId: 'boxCard3', btnId: 'openBoxBtn3', target: 'giftView3', index: 3 }
    ];

    boxes.forEach(item => {
      const card = document.getElementById(item.cardId);
      const btn = document.getElementById(item.btnId);

      const openGift = () => {
        this.audio.playKeyClick();
        this.unlockedBoxes.add(item.index);
        this.updateHubTracker();

        card.classList.add('opened');
        const badge = document.getElementById(`boxBadge${item.index}`);
        if (badge) {
          badge.textContent = '✨ Opened';
          badge.classList.add('badge-opened');
        }

        if (window.confetti) {
          try {
            confetti({
              particleCount: 50,
              spread: 50,
              origin: { y: 0.6 }
            });
          } catch (e) { }
        }

        setTimeout(() => {
          this.switchStep(item.target);
        }, 300);
      };

      card.addEventListener('click', (e) => {
        if (!e.target.closest('button')) {
          openGift();
        }
      });
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openGift();
      });
    });
  }

  updateHubTracker() {
    const countSpan = document.getElementById('unlockedCount');
    if (countSpan) {
      countSpan.textContent = this.unlockedBoxes.size;
    }
  }

  // ============================================================================
  // GIFT 1: "MEMORIES" POLAROID CLOTHESLINE
  // ============================================================================
  initGift1Memories() {
    const track = document.getElementById('polaroidsTrack');
    const viewport = document.getElementById('clotheslineViewport');
    const prevBtn = document.getElementById('clotheslinePrevBtn');
    const nextBtn = document.getElementById('clotheslineNextBtn');
    const retroCamera = document.getElementById('retroCameraBtn');
    const flashBeam = document.getElementById('cameraFlashBeam');

    let currentSlide = 0;
    const defaultPics = [
      DEFAULT_ILLUSTRATIONS.polaroid1,
      DEFAULT_ILLUSTRATIONS.polaroid2,
      DEFAULT_ILLUSTRATIONS.polaroid3,
      DEFAULT_ILLUSTRATIONS.polaroid4
    ];

    CONFIG.polaroids.forEach((item, index) => {
      const polaroid = document.createElement('div');
      polaroid.className = 'hanging-polaroid';
      polaroid.setAttribute('data-id', item.id);

      const imgSrc = item.src || defaultPics[index % defaultPics.length];

      polaroid.innerHTML = `
        <div class="clothes-pin">
          <span class="pin-bow">🎀</span>
          <div class="pin-wood"></div>
        </div>
        <div class="hanging-img-container">
          <img src="${imgSrc}" class="hanging-photo" alt="${item.caption}">
        </div>
        <div class="hanging-caption">${item.caption}</div>
      `;

      polaroid.addEventListener('click', () => {
        this.openLightbox(item, imgSrc);
      });

      track.appendChild(polaroid);
    });

    const updateCarousel = () => {
      const itemWidth = 228;
      const maxScroll = Math.max(0, CONFIG.polaroids.length * itemWidth - viewport.clientWidth + 20);
      const targetOffset = Math.min(currentSlide * itemWidth, maxScroll);
      track.style.transform = `translateX(-${targetOffset}px)`;
    };

    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
      }
    });

    nextBtn.addEventListener('click', () => {
      if (currentSlide < CONFIG.polaroids.length - 1) {
        currentSlide++;
        updateCarousel();
      }
    });

    let touchStartX = 0;
    let touchEndX = 0;

    viewport.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        if (currentSlide < CONFIG.polaroids.length - 1) {
          currentSlide++;
          updateCarousel();
        }
      } else if (touchEndX - touchStartX > 40) {
        if (currentSlide > 0) {
          currentSlide--;
          updateCarousel();
        }
      }
    }, { passive: true });

    retroCamera.addEventListener('click', () => {
      this.audio.playKeyClick();
      flashBeam.style.opacity = '0.9';
      flashBeam.style.transition = 'none';

      setTimeout(() => {
        flashBeam.style.transition = 'opacity 0.6s ease';
        flashBeam.style.opacity = '0';
      }, 50);

      if (window.confetti) {
        try {
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { x: 0.2, y: 0.8 }
          });
        } catch (e) { }
      }
    });
  }

  // ============================================================================
  // FULLSCREEN POLAROID LIGHTBOX MODAL
  // ============================================================================
  initLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const backdrop = document.getElementById('lightboxBackdrop');

    const closeModal = () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  openLightbox(item, imgSrc) {
    const modal = document.getElementById('lightboxModal');
    document.getElementById('lightboxImg').src = imgSrc;
    document.getElementById('lightboxCaption').textContent = item.caption;
    document.getElementById('lightboxDate').textContent = item.date;
    document.getElementById('lightboxDesc').textContent = item.description;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  // ============================================================================
  // GIFT 2: TYPEWRITER BIRTHDAY LETTER
  // ============================================================================
  initGift2Typewriter() {
    const skipBtn = document.getElementById('skipTypingBtn');
    const replayBtn = document.getElementById('replayTypingBtn');

    skipBtn.addEventListener('click', () => {
      this.skipTypewriter();
    });

    replayBtn.addEventListener('click', () => {
      this.startTypewriterEffect();
    });
  }

  startTypewriterEffect() {
    const typedTextEl = document.getElementById('typedText');
    const cursor = document.getElementById('blinkingCursor');

    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
    }

    typedTextEl.textContent = '';
    cursor.style.display = 'inline';
    this.isTypingFinished = false;

    const fullText = CONFIG.letter.paragraphs.join('\n\n');
    let charIndex = 0;

    this.typewriterTimer = setInterval(() => {
      if (charIndex < fullText.length) {
        typedTextEl.textContent += fullText[charIndex];

        if (charIndex % 3 === 0 && fullText[charIndex] !== ' ') {
          this.audio.playTypewriterClick();
        }

        charIndex++;

        const paper = document.getElementById('typewriterContent');
        if (paper) paper.scrollTop = paper.scrollHeight;
      } else {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
        this.isTypingFinished = true;
      }
    }, 38);
  }

  skipTypewriter() {
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }
    const typedTextEl = document.getElementById('typedText');
    typedTextEl.textContent = CONFIG.letter.paragraphs.join('\n\n');
    this.isTypingFinished = true;
  }

  // ============================================================================
  // GIFT 3: INTERACTIVE "MAKE A WISH" BIRTHDAY CAKE
  // ============================================================================
  initGift3Cake() {
    const candles = document.querySelectorAll('.candle');
    const cakeCenter = document.getElementById('cakeCenterpiece');
    const blowAllBtn = document.getElementById('blowAllBtn');
    const micBtn = document.getElementById('micBlowBtn');
    const relightBtn = document.getElementById('relightCandlesBtn');

    candles.forEach(candle => {
      candle.addEventListener('click', (e) => {
        e.stopPropagation();
        const candleId = candle.getAttribute('data-candle');
        this.extinguishCandle(candleId);
      });
    });

    cakeCenter.addEventListener('click', () => {
      this.extinguishAllCandles();
    });

    blowAllBtn.addEventListener('click', () => {
      this.extinguishAllCandles();
    });

    relightBtn.addEventListener('click', () => {
      this.relightCandles();
    });

    micBtn.addEventListener('click', () => {
      this.toggleMicrophoneBlowDetector();
    });
  }

  extinguishCandle(id) {
    const candle = document.getElementById(`candle${id}`);
    if (candle && !candle.classList.contains('extinguished')) {
      candle.classList.add('extinguished');
      this.candlesBlown.add(id);
      this.audio.playBlowSound();

      if (this.candlesBlown.size === 4) {
        this.handleAllCandlesBlown();
      }
    }
  }

  extinguishAllCandles() {
    [1, 2, 3, 4].forEach(id => {
      const candle = document.getElementById(`candle${id}`);
      if (candle) candle.classList.add('extinguished');
      this.candlesBlown.add(id.toString());
    });
    this.audio.playBlowSound();
    this.handleAllCandlesBlown();
  }

  relightCandles() {
    this.candlesBlown.clear();
    document.querySelectorAll('.candle').forEach(c => {
      c.classList.remove('extinguished');
    });

    document.getElementById('cakeTitle').textContent = "MAKE A WISH 🎂";
    document.getElementById('cakeSubtitle').textContent = "Close your eyes and make a special birthday wish!";
    document.getElementById('wishRevealCard').style.display = 'none';
    document.getElementById('cakeInstructions').style.display = 'block';
  }

  handleAllCandlesBlown() {
    this.audio.playSuccessChime();

    document.getElementById('cakeTitle').textContent = CONFIG.cake.wishHeading;
    document.getElementById('cakeSubtitle').textContent = "Your secret wish has been sent to the stars! ✨";
    document.getElementById('cakeInstructions').style.display = 'none';
    document.getElementById('wishRevealCard').style.display = 'block';

    if (window.confetti) {
      try {
        confetti({
          particleCount: 120,
          spread: 100,
          origin: { y: 0.6 }
        });

        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
          });
        }, 350);

        setTimeout(() => {
          confetti({
            particleCount: 100,
            spread: 120,
            origin: { y: 0.5 },
            shapes: ['circle', 'square']
          });
        }, 700);
      } catch (e) { }
    }
  }

  toggleMicrophoneBlowDetector() {
    const indicator = document.getElementById('micStatusIndicator');
    const statusText = document.getElementById('micStatusText');

    if (this.micListening) {
      if (this.micStream) {
        this.micStream.getTracks().forEach(track => track.stop());
      }
      this.micListening = false;
      indicator.style.display = 'none';
      return;
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Microphone detection is not supported in this browser. You can tap the candles or cake directly! 🎂");
      return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(stream => {
        this.micStream = stream;
        this.micListening = true;
        indicator.style.display = 'block';
        statusText.textContent = "Listening for your breath... Blow into your microphone! 🌬️";

        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.micAudioCtx = new AudioCtx();
        const analyser = this.micAudioCtx.createAnalyser();
        const microphone = this.micAudioCtx.createMediaStreamSource(stream);
        analyser.fftSize = 256;
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        const checkVolume = () => {
          if (!this.micListening) return;

          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const average = sum / dataArray.length;

          if (average > 55) {
            this.extinguishAllCandles();
            if (this.micStream) {
              this.micStream.getTracks().forEach(track => track.stop());
            }
            this.micListening = false;
            indicator.style.display = 'none';
            return;
          }

          requestAnimationFrame(checkVolume);
        };

        checkVolume();
      })
      .catch(err => {
        console.warn("Mic permission denied or error:", err);
        indicator.style.display = 'block';
        statusText.textContent = "Microphone access denied. You can tap the candles or cake instead! 🎂";
      });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.birthdayApp = new BirthdayApp();
});
