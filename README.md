# 🦀 Grab the Crab — Beach Whack-a-Mole Arcade

<p align="center">
  <strong>A sun-drenched, high-speed reflex arcade game set on a tropical sandy shore! Catch cute crabs popping out of sand burrows while avoiding prickly pufferfish hazards.</strong>
</p>

<p align="center">
  <a href="https://mahesh-yennam.github.io/Gamility/"><img src="https://img.shields.io/badge/Live_Portal-Gamility-0ea5e9?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Gamility Portal" /></a>
  <img src="https://img.shields.io/badge/Arcade-Whack--a--Mole-f59e0b?style=for-the-badge&logo=target" alt="Whack a Mole" />
  <img src="https://img.shields.io/badge/Audio-Web_Audio_API-10b981?style=for-the-badge&logo=sound" alt="Web Audio" />
  <img src="https://img.shields.io/badge/Zero_Build-Vanilla_JS-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="Vanilla JS" />
</p>

---

## 🌊 Game Overview

Step onto the sunny beach shore! Cute, energetic crabs randomly peek out of 9 sand burrows along the water's edge for mere fractions of a second before scurrying back underground. 

Test your reflexes, build high-score combo multipliers, catch rare Golden Crabs, and watch out for **Spiky Pufferfish** that inflate and sting if whacked!

---

## ✨ Features & Gameplay Mechanics

- **🏖️ Aerial Beach & Shoreline Layout**:
  - **Top Shore (~16%)**: Pristine turquoise ocean tide with animated breaking surf waves, sea foam, and procedural ocean soundscapes.
  - **Open Sand Shore (~84%)**: Warm golden sand shore where creatures pop up randomly anywhere on the open sand—no fixed holes!
- **🦀 Cute Animated Crabs**:
  - Bouncy cartoon crabs with welcoming raised claws, glossy cartoon eyes, and rosy cheeks modeled directly on tropical cartoon art.
  - Scurry in and out with smooth scuttle transitions.
- **🌟 Rare Golden Crab**:
  - Pops up quickly, granting a massive `+300 points` score boost and extended combo multiplier!
- **🐡 Spiky Pufferfish Hazard (Option A)**:
  - Prickly blowfish character that puffs up with sharp quills.
  - Whacking it results in a sharp sting, a life loss, and an electric shock screen flash!
- **🔥 Combo Multiplier & Beach Frenzy**:
  - Catching crabs consecutively without missing ramps up combos from `x1.5` up to `x3.0 Beach Frenzy`!
- **🔊 Procedural Web Audio Engine**:
  - Zero external MP3 downloads. Real-time synthesized rolling ocean waves, joyful cartoon pops, snappy crab splashes, hazard buzzer, and victory jingles.
- **💾 Local High Score Tracking**:
  - Automatically saves your best score, longest combo, total crabs grabbed, and accuracy in `localStorage`.
- **📱 Touch & Mouse Optimized**:
  - Custom beach scoop cursor on desktop; responsive single-thumb and multi-finger tap precision on mobile.

---

## 🕹️ Controls & Rules

| Input | Action |
| :--- | :--- |
| **Tap / Left Click** | Grab the crab or hit burrow |
| **Spacebar** | Pause / Resume game |
| **R** | Quick restart match |

- **❤️ 3 Hearts / Lives**: You start with 3 lives. Hitting a Spiky Pufferfish costs 1 heart. Catching 30 crabs recovers 1 heart (up to 3 max).
- **⏱️ Reaction Time**: As your score increases, crabs scurry faster (from 1.2s down to 0.5s) and multiple creatures pop simultaneously!

---

## 📁 Repository Structure

```
games/grab-the-crab/
├── index.html          # Semantic HTML layout, beach canvas, HUD & modal overlays
├── style.css           # Beach aesthetic, animated surf waves, burrows & animations
├── game.js             # Game loop, burrow scheduler, audio synthesis & high scores
├── favicon.svg         # Bespoke cute crab vector icon
├── site.webmanifest    # Progressive Web App manifest
├── robots.txt          # Crawler indexing rules
├── sitemap.xml         # XML sitemap
├── .gitignore          # Version control ignore rules
└── README.md           # Documentation & user guide
```

---

## 📜 Copyright & Terms

Copyright © 2026 [Gamility](https://mahesh-yennam.github.io/Gamility/). All rights reserved.  
Part of the [Gamility Platform](https://mahesh-yennam.github.io/Gamility/).
