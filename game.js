/**
 * GRAB THE CRAB — Beach Whack-a-Mole Arcade
 * Pure Vanilla JavaScript Game Engine & Web Audio Synthesizer
 * Free-Coordinate Open Sand Spawning & Cute Cartoon Vector Characters
 * Copyright © 2026 Gamility (All Rights Reserved)
 */

(function () {
  'use strict';

  /* ==========================================================================
     VECTOR SVG CHARACTER BLUEPRINTS (MATCHING CUTE USER REFERENCE)
     ========================================================================== */

  // 1. Cute Red Crab 🦀 (Modeled after reference image: round coral shell, raised welcoming claws, glossy eyes, rosy cheeks)
  const CRAB_SVG = `
    <svg class="crab-svg" viewBox="0 0 100 95" width="100%" height="100%">
      <defs>
        <!-- Coral Red Shell Gradient -->
        <linearGradient id="crabShellGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff6b81"/>
          <stop offset="40%" stop-color="#ff4757"/>
          <stop offset="100%" stop-color="#ee5253"/>
        </linearGradient>
        <!-- Inner Claw Pad Gradient -->
        <linearGradient id="clawInnerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ff9f89"/>
          <stop offset="100%" stop-color="#ff7675"/>
        </linearGradient>
      </defs>

      <!-- Ambient Blue Sparkles (from reference art) -->
      <path d="M19 46 L21 50 L25 51 L21 52 L19 56 L17 52 L13 51 L17 50 Z" fill="#38bdf8" opacity="0.85"/>
      <circle cx="12" cy="44" r="2" fill="#38bdf8" opacity="0.7"/>
      <circle cx="16" cy="59" r="1.5" fill="#38bdf8" opacity="0.7"/>
      <path d="M81 46 L83 50 L87 51 L83 52 L81 56 L79 52 L75 51 L79 50 Z" fill="#38bdf8" opacity="0.85"/>
      <circle cx="88" cy="44" r="2" fill="#38bdf8" opacity="0.7"/>
      <circle cx="84" cy="59" r="1.5" fill="#38bdf8" opacity="0.7"/>

      <!-- Left Walking Legs (3 curved legs pointing down & out) -->
      <g class="legs-left">
        <path d="M30 62 C20 62 14 68 18 80 C20 83 23 79 24 74" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M32 67 C24 70 18 78 22 90 C24 93 27 89 28 82" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M36 71 C30 76 26 84 32 94 C34 97 37 93 37 86" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
      </g>

      <!-- Right Walking Legs (3 curved legs pointing down & out) -->
      <g class="legs-right">
        <path d="M70 62 C80 62 86 68 82 80 C80 83 77 79 76 74" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M68 67 C76 70 82 78 78 90 C76 93 73 89 72 82" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
        <path d="M64 71 C70 76 74 84 68 94 C66 97 63 93 63 86" fill="#ee5253" stroke="#c0392b" stroke-width="1.2" stroke-linejoin="round"/>
      </g>

      <!-- Left Arm & Big Raised Claw (Pointing Upwards in "V" Pose) -->
      <path d="M34 52 C24 48 22 36 26 30 C30 38 36 44 38 48 Z" fill="#ff4757" stroke="#c0392b" stroke-width="1.2"/>
      <path d="M26 30 C20 25 24 14 36 12 C44 11 48 16 40 24 C34 30 28 32 26 30 Z" fill="url(#crabShellGrad)" stroke="#c0392b" stroke-width="1.2"/>
      <path d="M28 26 C24 22 28 17 35 15 C38 18 35 24 28 26 Z" fill="url(#clawInnerGrad)"/>
      <path d="M36 14 C42 13 44 16 38 21" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.8"/>

      <!-- Right Arm & Big Raised Claw (Pointing Upwards in "V" Pose) -->
      <path d="M66 52 C76 48 78 36 74 30 C70 38 64 44 62 48 Z" fill="#ff4757" stroke="#c0392b" stroke-width="1.2"/>
      <path d="M74 30 C80 25 76 14 64 12 C56 11 52 16 60 24 C66 30 72 32 74 30 Z" fill="url(#crabShellGrad)" stroke="#c0392b" stroke-width="1.2"/>
      <path d="M72 26 C76 22 72 17 65 15 C62 18 65 24 72 26 Z" fill="url(#clawInnerGrad)"/>
      <path d="M64 14 C58 13 56 16 62 21" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" fill="none" opacity="0.8"/>

      <!-- Main Shell Body (Carapace - Smooth Cute Round/Oval Shape) -->
      <ellipse cx="50" cy="56" rx="27" ry="19" fill="url(#crabShellGrad)" stroke="#c0392b" stroke-width="1.5"/>
      <ellipse cx="50" cy="48" rx="17" ry="8" fill="#ff7675" opacity="0.45"/>

      <!-- Rosy Cute Cheeks -->
      <circle cx="36" cy="58" r="4.2" fill="#fab1a0" opacity="0.9"/>
      <circle cx="64" cy="58" r="4.2" fill="#fab1a0" opacity="0.9"/>

      <!-- Big Dark Cartoon Eyes with Double Specular Shine Highlights -->
      <circle cx="42" cy="48" r="5.5" fill="#1e293b"/>
      <circle cx="40.5" cy="46" r="2.2" fill="#ffffff"/>
      <circle cx="43.5" cy="49.5" r="1.1" fill="#ffffff"/>

      <circle cx="58" cy="48" r="5.5" fill="#1e293b"/>
      <circle cx="56.5" cy="46" r="2.2" fill="#ffffff"/>
      <circle cx="59.5" cy="49.5" r="1.1" fill="#ffffff"/>

      <!-- Cute Curved Smile -->
      <path d="M47 57 Q50 63 53 57" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>
  `;

  // 2. Rare Golden Crab 🌟🦀
  const GOLDEN_CRAB_SVG = `
    <svg class="crab-svg" viewBox="0 0 100 95" width="100%" height="100%">
      <defs>
        <linearGradient id="crabGoldGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="40%" stop-color="#facc15"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
        <linearGradient id="goldInnerGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fef9c3"/>
          <stop offset="100%" stop-color="#fde047"/>
        </linearGradient>
      </defs>

      <!-- Sparkle Stars -->
      <path d="M19 46 L21 50 L25 51 L21 52 L19 56 L17 52 L13 51 L17 50 Z" fill="#fef08a"/>
      <circle cx="12" cy="44" r="2" fill="#fef08a"/>
      <path d="M81 46 L83 50 L87 51 L83 52 L81 56 L79 52 L75 51 L79 50 Z" fill="#fef08a"/>
      <circle cx="88" cy="44" r="2" fill="#fef08a"/>

      <!-- Left Walking Legs -->
      <g class="legs-left">
        <path d="M30 62 C20 62 14 68 18 80 C20 83 23 79 24 74" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
        <path d="M32 67 C24 70 18 78 22 90 C24 93 27 89 28 82" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
        <path d="M36 71 C30 76 26 84 32 94 C34 97 37 93 37 86" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
      </g>

      <!-- Right Walking Legs -->
      <g class="legs-right">
        <path d="M70 62 C80 62 86 68 82 80 C80 83 77 79 76 74" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
        <path d="M68 67 C76 70 82 78 78 90 C76 93 73 89 72 82" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
        <path d="M64 71 C70 76 74 84 68 94 C66 97 63 93 63 86" fill="#ca8a04" stroke="#854d0e" stroke-width="1.2"/>
      </g>

      <!-- Left Raised Claw -->
      <path d="M34 52 C24 48 22 36 26 30 C30 38 36 44 38 48 Z" fill="#eab308" stroke="#854d0e" stroke-width="1.2"/>
      <path d="M26 30 C20 25 24 14 36 12 C44 11 48 16 40 24 C34 30 28 32 26 30 Z" fill="url(#crabGoldGrad)" stroke="#854d0e" stroke-width="1.2"/>
      <path d="M28 26 C24 22 28 17 35 15 C38 18 35 24 28 26 Z" fill="url(#goldInnerGrad)"/>

      <!-- Right Raised Claw -->
      <path d="M66 52 C76 48 78 36 74 30 C70 38 64 44 62 48 Z" fill="#eab308" stroke="#854d0e" stroke-width="1.2"/>
      <path d="M74 30 C80 25 76 14 64 12 C56 11 52 16 60 24 C66 30 72 32 74 30 Z" fill="url(#crabGoldGrad)" stroke="#854d0e" stroke-width="1.2"/>
      <path d="M72 26 C76 22 72 17 65 15 C62 18 65 24 72 26 Z" fill="url(#goldInnerGrad)"/>

      <!-- Main Shell Body -->
      <ellipse cx="50" cy="56" rx="27" ry="19" fill="url(#crabGoldGrad)" stroke="#854d0e" stroke-width="1.5"/>
      <ellipse cx="50" cy="48" rx="17" ry="8" fill="#ffffff" opacity="0.45"/>

      <!-- Golden Crown Sparkle -->
      <path d="M50 28 L52 33 L57 34 L53 37 L54 42 L50 39 L46 42 L47 37 L43 34 L48 33 Z" fill="#ffffff"/>

      <!-- Cheeks -->
      <circle cx="36" cy="58" r="4.2" fill="#fef08a" opacity="0.9"/>
      <circle cx="64" cy="58" r="4.2" fill="#fef08a" opacity="0.9"/>

      <!-- Eyes -->
      <circle cx="42" cy="48" r="5.5" fill="#1e293b"/>
      <circle cx="40.5" cy="46" r="2.2" fill="#ffffff"/>
      <circle cx="43.5" cy="49.5" r="1.1" fill="#ffffff"/>

      <circle cx="58" cy="48" r="5.5" fill="#1e293b"/>
      <circle cx="56.5" cy="46" r="2.2" fill="#ffffff"/>
      <circle cx="59.5" cy="49.5" r="1.1" fill="#ffffff"/>

      <!-- Smile -->
      <path d="M47 57 Q50 63 53 57" stroke="#451a03" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>
  `;

  // 3. Spiky Pufferfish Hazard (Option A) 🐡 (Harmonized Cute Vector Style)
  const PUFFERFISH_SVG = `
    <svg class="puffer-svg" viewBox="0 0 100 95" width="100%" height="100%">
      <defs>
        <radialGradient id="pufferGrad" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="55%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </radialGradient>
      </defs>

      <!-- Danger Warning Badge -->
      <circle cx="50" cy="12" r="7" fill="#ef4444" stroke="#ffffff" stroke-width="1.5"/>
      <text x="50" y="16" font-family="'Outfit', sans-serif" font-weight="900" font-size="11" fill="#ffffff" text-anchor="middle">!</text>

      <!-- Warning Spikes Radiating Around Body -->
      <polygon points="50,18 45,30 55,30" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="32,22 34,34 43,30" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="68,22 57,30 66,34" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="16,38 28,40 26,48" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="84,38 72,40 74,48" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="18,60 28,54 30,64" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="82,60 72,54 70,64" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="34,80 42,68 46,76" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="66,80 54,76 58,68" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>
      <polygon points="50,84 45,72 55,72" fill="#ea580c" stroke="#9a3412" stroke-width="1.5"/>

      <!-- Tail Fin -->
      <path d="M16 52 C8 44 6 60 16 56 Z" fill="#f97316" stroke="#9a3412" stroke-width="1.5"/>

      <!-- Puffed Balloon Round Body -->
      <circle cx="50" cy="52" r="26" fill="url(#pufferGrad)" stroke="#9a3412" stroke-width="2.5"/>

      <!-- Puffer Belly Dots -->
      <circle cx="36" cy="62" r="2" fill="#ea580c" opacity="0.6"/>
      <circle cx="43" cy="66" r="2.2" fill="#ea580c" opacity="0.6"/>
      <circle cx="50" cy="68" r="2.2" fill="#ea580c" opacity="0.6"/>
      <circle cx="57" cy="66" r="2.2" fill="#ea580c" opacity="0.6"/>
      <circle cx="64" cy="62" r="2" fill="#ea580c" opacity="0.6"/>

      <!-- Big Dizzy Cartoon Eyes with Crosses -->
      <circle cx="40" cy="46" r="6.5" fill="#ffffff" stroke="#9a3412" stroke-width="1.5"/>
      <path d="M37 43 L43 49 M43 43 L37 49" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round"/>

      <circle cx="60" cy="46" r="6.5" fill="#ffffff" stroke="#9a3412" stroke-width="1.5"/>
      <path d="M57 43 L63 49 M63 43 L57 49" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round"/>

      <!-- Pouting Mouth -->
      <ellipse cx="50" cy="56" rx="4.5" ry="3.5" fill="#7c2d12" stroke="#451a03" stroke-width="1.5"/>
    </svg>
  `;

  /* ==========================================================================
     GAME CONFIGURATION & CONSTANTS
     ========================================================================== */
  const STORAGE_KEY_HIGHSCORE = 'gamility_grab_crab_high_score';

  const CONFIG = {
    initialLives: 3,
    maxLives: 3,
    baseScoreCrab: 100,
    baseScoreGolden: 300,
    crabsForExtraLife: 30,

    // Free Sand Playfield Bounds (Percentage)
    minX: 14,
    maxX: 86,
    minY: 24,
    maxY: 88,
    minSeparationDistance: 18, // Minimum percentage distance between concurrent creatures

    // Timing & Spawn Scaling
    baseIntervalMs: 1100,
    minIntervalMs: 460,
    baseUpDurationMs: 1250,
    minUpDurationMs: 520,

    // Creature Probabilities
    probGoldenCrab: 0.12,
    probHazardPuffer: 0.19
  };

  /* ==========================================================================
     GAME STATE
     ========================================================================== */
  let STATE = {
    status: 'IDLE', // 'IDLE' | 'PLAYING' | 'PAUSED' | 'GAMEOVER'
    score: 0,
    highScore: 0,
    lives: CONFIG.initialLives,
    combo: 1,
    bestCombo: 1,
    crabsCaught: 0,
    totalCrabsSpawned: 0,
    totalHits: 0,
    totalClicks: 0,
    isMuted: false,

    // Free Spawning Active Creatures Map (id -> { id, type, x, y, element, timerId })
    activeCreatures: new Map(),

    // Spawn Loop Timer
    spawnTimer: null
  };

  /* ==========================================================================
     DOM ELEMENTS
     ========================================================================== */
  const DOM = {
    // HUD
    hudScore: document.getElementById('hudScore'),
    hudHighScore: document.getElementById('hudHighScore'),
    hudComboBadge: document.getElementById('hudComboBadge'),
    hudHearts: document.getElementById('hudHearts'),
    btnToggleAudio: document.getElementById('btnToggleAudio'),
    audioIcon: document.getElementById('audioIcon'),
    btnPauseGame: document.getElementById('btnPauseGame'),

    // Beach Stage & Playfield
    beachStage: document.getElementById('beachStage'),
    creaturePlayfield: document.getElementById('creaturePlayfield'),
    particleOverlay: document.getElementById('particleOverlay'),
    shockFlashScreen: document.getElementById('shockFlashScreen'),

    // Overlays
    startOverlay: document.getElementById('startOverlay'),
    btnStartGame: document.getElementById('btnStartGame'),

    pauseOverlay: document.getElementById('pauseOverlay'),
    btnResumeGame: document.getElementById('btnResumeGame'),
    btnRestartFromPause: document.getElementById('btnRestartFromPause'),

    gameOverOverlay: document.getElementById('gameOverOverlay'),
    finalScoreVal: document.getElementById('finalScoreVal'),
    finalCrabsCaught: document.getElementById('finalCrabsCaught'),
    finalBestCombo: document.getElementById('finalBestCombo'),
    finalAccuracy: document.getElementById('finalAccuracy'),
    finalHighScoreVal: document.getElementById('finalHighScoreVal'),
    btnPlayAgain: document.getElementById('btnPlayAgain')
  };

  /* ==========================================================================
     PROCEDURAL WEB AUDIO SYNTHESIZER
     ========================================================================== */
  let audioCtx = null;
  let ambientSurfGain = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) audioCtx = new AudioClass();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Procedural Beach Surf Ocean Wave Generator
  function startAmbientOceanSurf() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const bufferSize = audioCtx.sampleRate * 3;
      const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2 + white * 0.5362) * 0.04;
      }

      const whiteNoise = audioCtx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, audioCtx.currentTime);

      ambientSurfGain = audioCtx.createGain();
      ambientSurfGain.gain.setValueAtTime(0.08, audioCtx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(ambientSurfGain);
      ambientSurfGain.connect(audioCtx.destination);
      whiteNoise.start();
    } catch (e) {}
  }

  // 2. Creature Pop-up SFX
  function playPopUpSound() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.09);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  // 3. Crab Grabbed / Splashed SFX
  function playGrabSound(isGolden = false) {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      if (isGolden) {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.setValueAtTime(1174.66, now + 0.06);
        osc.frequency.setValueAtTime(1479.98, now + 0.12);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.38);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(460, now);
        osc.frequency.exponentialRampToValueAtTime(920, now + 0.05);

        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch (e) {}
  }

  // 4. Pufferfish Sting / Hazard Buzzer SFX
  function playHazardStingSound() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.setValueAtTime(85, now + 0.1);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.32);
    } catch (e) {}
  }

  // 5. Game Over Fanfare
  function playGameOverFanfare() {
    if (STATE.isMuted || !audioCtx) return;
    try {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(392, now);
      osc.frequency.setValueAtTime(349.23, now + 0.2);
      osc.frequency.setValueAtTime(329.63, now + 0.4);
      osc.frequency.setValueAtTime(261.63, now + 0.6);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 1.15);
    } catch (e) {}
  }

  /* ==========================================================================
     HIGH SCORE & PERSISTENCE
     ========================================================================== */
  function loadHighScore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGHSCORE);
      if (saved) {
        STATE.highScore = parseInt(saved, 10) || 0;
      }
    } catch (e) {}
    DOM.hudHighScore.textContent = STATE.highScore.toLocaleString();
  }

  function saveHighScore() {
    if (STATE.score > STATE.highScore) {
      STATE.highScore = STATE.score;
      try {
        localStorage.setItem(STORAGE_KEY_HIGHSCORE, STATE.highScore.toString());
      } catch (e) {}
      DOM.hudHighScore.textContent = STATE.highScore.toLocaleString();
    }
  }

  /* ==========================================================================
     GAME LIFECYCLE (START, PAUSE, RESUME, GAMEOVER)
     ========================================================================== */
  function startGame() {
    initAudio();
    startAmbientOceanSurf();

    STATE.status = 'PLAYING';
    STATE.score = 0;
    STATE.lives = CONFIG.initialLives;
    STATE.combo = 1;
    STATE.bestCombo = 1;
    STATE.crabsCaught = 0;
    STATE.totalCrabsSpawned = 0;
    STATE.totalHits = 0;
    STATE.totalClicks = 0;

    clearAllCreatures();
    updateHud();

    // Hide all overlays
    DOM.startOverlay.classList.remove('active');
    DOM.startOverlay.style.display = 'none';

    DOM.pauseOverlay.classList.remove('active');
    DOM.pauseOverlay.style.display = 'none';

    DOM.gameOverOverlay.classList.remove('active');
    DOM.gameOverOverlay.style.display = 'none';

    // Start Spawn Loop
    scheduleNextSpawn();
  }

  function pauseGame() {
    if (STATE.status !== 'PLAYING') return;

    STATE.status = 'PAUSED';
    clearTimeout(STATE.spawnTimer);

    // Freeze active creature timers
    STATE.activeCreatures.forEach((creature) => {
      clearTimeout(creature.timerId);
    });

    DOM.pauseOverlay.style.display = 'flex';
    requestAnimationFrame(() => DOM.pauseOverlay.classList.add('active'));
  }

  function resumeGame() {
    if (STATE.status !== 'PAUSED') return;

    STATE.status = 'PLAYING';
    DOM.pauseOverlay.classList.remove('active');
    setTimeout(() => {
      DOM.pauseOverlay.style.display = 'none';
    }, 200);

    // Resume existing creatures with standard retreat
    STATE.activeCreatures.forEach((creature, id) => {
      creature.timerId = setTimeout(() => {
        retreatCreature(id, false);
      }, 700);
    });

    scheduleNextSpawn();
  }

  function triggerGameOver(reasonText) {
    STATE.status = 'GAMEOVER';
    clearTimeout(STATE.spawnTimer);
    clearAllCreatures();
    saveHighScore();
    playGameOverFanfare();

    const accuracy = STATE.totalClicks > 0
      ? Math.round((STATE.totalHits / STATE.totalClicks) * 100)
      : 0;

    document.getElementById('gameOverReason').textContent = reasonText || 'The tide has washed out!';
    DOM.finalScoreVal.textContent = STATE.score.toLocaleString();
    DOM.finalCrabsCaught.textContent = STATE.crabsCaught;
    DOM.finalBestCombo.textContent = `${STATE.bestCombo}x`;
    DOM.finalAccuracy.textContent = `${accuracy}%`;
    DOM.finalHighScoreVal.textContent = STATE.highScore.toLocaleString();

    DOM.gameOverOverlay.style.display = 'flex';
    requestAnimationFrame(() => DOM.gameOverOverlay.classList.add('active'));
  }

  /* ==========================================================================
     OPEN SAND SPATIAL SPAWNER (FREE-COORDINATE RANDOM DISTRIBUTION)
     ========================================================================== */
  function scheduleNextSpawn() {
    if (STATE.status !== 'PLAYING') return;

    // Difficulty scaling: speed increases as score rises
    const speedFactor = Math.min(1, STATE.score / 4000);
    const interval = Math.round(CONFIG.baseIntervalMs - (CONFIG.baseIntervalMs - CONFIG.minIntervalMs) * speedFactor);

    STATE.spawnTimer = setTimeout(() => {
      spawnCreature();
      scheduleNextSpawn();
    }, interval);
  }

  // Max concurrent creatures based on score
  function getMaxConcurrentCreatures() {
    if (STATE.score >= 3500) return 3;
    if (STATE.score >= 1200) return 2;
    return 1;
  }

  // Find non-overlapping coordinates on the sand playfield
  function findValidSpawnCoordinate() {
    for (let attempt = 0; attempt < 25; attempt++) {
      const x = CONFIG.minX + Math.random() * (CONFIG.maxX - CONFIG.minX);
      const y = CONFIG.minY + Math.random() * (CONFIG.maxY - CONFIG.minY);

      let tooClose = false;
      for (const [_, c] of STATE.activeCreatures) {
        const dx = x - c.x;
        const dy = y - c.y;
        const dist = Math.hypot(dx, dy);
        if (dist < CONFIG.minSeparationDistance) {
          tooClose = true;
          break;
        }
      }

      if (!tooClose) {
        return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
      }
    }
    return null;
  }

  function spawnCreature() {
    if (STATE.status !== 'PLAYING') return;

    if (STATE.activeCreatures.size >= getMaxConcurrentCreatures()) {
      return;
    }

    const pos = findValidSpawnCoordinate();
    if (!pos) return;

    // Determine Creature Type
    const rand = Math.random();
    let type = 'crab';
    let svgHtml = CRAB_SVG;

    if (rand < CONFIG.probHazardPuffer) {
      type = 'pufferfish';
      svgHtml = PUFFERFISH_SVG;
    } else if (rand < CONFIG.probHazardPuffer + CONFIG.probGoldenCrab) {
      type = 'golden';
      svgHtml = GOLDEN_CRAB_SVG;
    }

    if (type !== 'pufferfish') {
      STATE.totalCrabsSpawned++;
    }

    const creatureId = `c_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Create Dynamic DOM Node
    const nodeEl = document.createElement('div');
    nodeEl.className = `creature-node creature-${type}`;
    nodeEl.id = creatureId;
    nodeEl.setAttribute('data-id', creatureId);
    nodeEl.setAttribute('data-type', type);
    nodeEl.style.left = `${pos.x}%`;
    nodeEl.style.top = `${pos.y}%`;

    // Sand Shadow ring underneath creature
    const shadowEl = document.createElement('div');
    shadowEl.className = 'creature-sand-shadow';
    nodeEl.appendChild(shadowEl);

    // SVG Artwork
    const svgWrap = document.createElement('div');
    svgWrap.innerHTML = svgHtml.trim();
    nodeEl.appendChild(svgWrap.firstElementChild);

    DOM.creaturePlayfield.appendChild(nodeEl);

    // Sound and Pop-up animation
    playPopUpSound();
    requestAnimationFrame(() => {
      nodeEl.classList.add('up');
    });

    // Duration up scaling
    const speedFactor = Math.min(1, STATE.score / 4000);
    let upDuration = Math.round(CONFIG.baseUpDurationMs - (CONFIG.baseUpDurationMs - CONFIG.minUpDurationMs) * speedFactor);
    if (type === 'golden') upDuration *= 0.8;

    const retreatTimer = setTimeout(() => {
      retreatCreature(creatureId, false);
    }, upDuration);

    STATE.activeCreatures.set(creatureId, {
      id: creatureId,
      type: type,
      x: pos.x,
      y: pos.y,
      element: nodeEl,
      timerId: retreatTimer
    });
  }

  function retreatCreature(creatureId, wasHit) {
    const creature = STATE.activeCreatures.get(creatureId);
    if (!creature) return;

    clearTimeout(creature.timerId);
    const el = creature.element;

    if (!wasHit && creature.type !== 'pufferfish') {
      resetCombo();
    }

    el.classList.remove('up');
    el.classList.add('down');

    setTimeout(() => {
      if (el.parentNode) el.remove();
      STATE.activeCreatures.delete(creatureId);
    }, 240);
  }

  function clearAllCreatures() {
    STATE.activeCreatures.forEach((c) => {
      clearTimeout(c.timerId);
      if (c.element && c.element.parentNode) {
        c.element.remove();
      }
    });
    STATE.activeCreatures.clear();
  }

  /* ==========================================================================
     HIT DETECTION & COMBOS
     ========================================================================== */
  function handlePlayfieldClick(e) {
    if (STATE.status !== 'PLAYING') return;

    STATE.totalClicks++;

    const creatureEl = e.target.closest('.creature-node');
    if (!creatureEl || creatureEl.classList.contains('hit') || creatureEl.classList.contains('down')) {
      return;
    }

    const creatureId = creatureEl.getAttribute('data-id');
    const type = creatureEl.getAttribute('data-type');
    const creature = STATE.activeCreatures.get(creatureId);
    if (!creature) return;

    STATE.totalHits++;
    creatureEl.classList.add('hit');

    // Splash particle coordinates relative to beach stage
    const rect = creatureEl.getBoundingClientRect();
    const stageRect = DOM.beachStage.getBoundingClientRect();
    const splashX = rect.left + rect.width / 2 - stageRect.left;
    const splashY = rect.top + rect.height / 3 - stageRect.top;

    if (type === 'pufferfish') {
      // 🐡 HIT PUFFERFISH HAZARD!
      handleHazardHit(splashX, splashY);
      retreatCreature(creatureId, true);
    } else {
      // 🦀 HIT CRAB!
      const isGolden = type === 'golden';
      handleCrabHit(isGolden, splashX, splashY);
      retreatCreature(creatureId, true);
    }
  }

  function handleCrabHit(isGolden, x, y) {
    STATE.crabsCaught++;
    incrementCombo();

    const basePoints = isGolden ? CONFIG.baseScoreGolden : CONFIG.baseScoreCrab;
    const earnedPoints = Math.round(basePoints * getComboMultiplier());
    STATE.score += earnedPoints;

    if (STATE.crabsCaught % CONFIG.crabsForExtraLife === 0 && STATE.lives < CONFIG.maxLives) {
      STATE.lives++;
      spawnScoreSplash('❤️ +1 LIFE!', x, y - 20, false);
    }

    playGrabSound(isGolden);
    spawnScoreSplash(`+${earnedPoints}`, x, y, isGolden);

    updateHud();
    saveHighScore();
  }

  function handleHazardHit(x, y) {
    STATE.lives--;
    resetCombo();
    playHazardStingSound();

    triggerScreenFlash();
    spawnScoreSplash('OUCH! -1 ❤️', x, y, false, true);

    updateHud();

    if (STATE.lives <= 0) {
      setTimeout(() => {
        triggerGameOver('Those spiky pufferfish got the best of you! Watch out for the spines on the sand next time.');
      }, 450);
    }
  }

  /* ==========================================================================
     COMBO ENGINE
     ========================================================================== */
  function incrementCombo() {
    STATE.combo++;
    if (STATE.combo > STATE.bestCombo) {
      STATE.bestCombo = STATE.combo;
    }
  }

  function resetCombo() {
    STATE.combo = 1;
    updateComboBadge();
  }

  function getComboMultiplier() {
    if (STATE.combo >= 10) return 3.0;
    if (STATE.combo >= 6) return 2.0;
    if (STATE.combo >= 3) return 1.5;
    return 1.0;
  }

  function updateComboBadge() {
    const mult = getComboMultiplier();
    if (mult > 1.0) {
      DOM.hudComboBadge.textContent = `${mult}x 🔥`;
      DOM.hudComboBadge.style.display = 'inline-block';
    } else {
      DOM.hudComboBadge.style.display = 'none';
    }
  }

  /* ==========================================================================
     HUD & VISUAL EFFECTS
     ========================================================================== */
  function updateHud() {
    DOM.hudScore.textContent = STATE.score.toLocaleString();
    updateComboBadge();

    const hearts = DOM.hudHearts.children;
    for (let i = 0; i < CONFIG.maxLives; i++) {
      if (i < STATE.lives) {
        hearts[i].classList.add('active');
      } else {
        hearts[i].classList.remove('active');
      }
    }
  }

  function spawnScoreSplash(text, x, y, isGold = false, isOuch = false) {
    const bubble = document.createElement('div');
    bubble.className = `score-bubble ${isGold ? 'gold' : ''} ${isOuch ? 'ouch' : ''}`;
    bubble.textContent = text;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;

    DOM.particleOverlay.appendChild(bubble);
    setTimeout(() => bubble.remove(), 850);
  }

  function triggerScreenFlash() {
    DOM.shockFlashScreen.classList.add('flash');
    setTimeout(() => {
      DOM.shockFlashScreen.classList.remove('flash');
    }, 180);
  }

  /* ==========================================================================
     AUDIO MUTE TOGGLE
     ========================================================================== */
  function toggleAudio() {
    STATE.isMuted = !STATE.isMuted;
    DOM.audioIcon.textContent = STATE.isMuted ? '🔇' : '🔊';

    if (STATE.isMuted) {
      if (ambientSurfGain) ambientSurfGain.gain.setValueAtTime(0, audioCtx.currentTime);
    } else {
      initAudio();
      if (ambientSurfGain) ambientSurfGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      else startAmbientOceanSurf();
    }
  }

  /* ==========================================================================
     EVENT LISTENERS & BINDINGS
     ========================================================================== */
  function bindEvents() {
    DOM.btnStartGame.addEventListener('click', startGame);
    DOM.btnPlayAgain.addEventListener('click', startGame);
    DOM.btnPauseGame.addEventListener('click', pauseGame);
    DOM.btnResumeGame.addEventListener('click', resumeGame);
    DOM.btnRestartFromPause.addEventListener('click', startGame);

    DOM.btnToggleAudio.addEventListener('click', toggleAudio);

    // Open Sand Playfield Clicks & Touch Taps
    DOM.creaturePlayfield.addEventListener('pointerdown', handlePlayfieldClick);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (STATE.status === 'PLAYING') pauseGame();
        else if (STATE.status === 'PAUSED') resumeGame();
        else if (STATE.status === 'IDLE' || STATE.status === 'GAMEOVER') startGame();
      } else if (e.key.toLowerCase() === 'r') {
        if (STATE.status === 'PLAYING' || STATE.status === 'PAUSED' || STATE.status === 'GAMEOVER') {
          startGame();
        }
      }
    });

    // Page Visibility change auto-pause
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && STATE.status === 'PLAYING') {
        pauseGame();
      }
    });
  }

  /* ==========================================================================
     INITIALIZATION
     ========================================================================== */
  function init() {
    loadHighScore();
    bindEvents();
    updateHud();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
