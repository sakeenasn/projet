// ---------------------------
// Sélection des planètes et du Soleil
// ---------------------------
const planets = document.querySelectorAll('.planet');
const sun = document.querySelector('.sun');
const space = document.querySelector('.space');
const planetOrbits = [];

let globalSpeed = 1;
let zoomLevel = 1;

// pour le bouton on/off son des planètes
let muteMode = false; // ON/OFF temporaire du son 
let audioUnlocked = false;
let systemPaused = false;

// ---------------------------
// Fonction d'orbite
// ---------------------------
function orbit(planet, distance, duration) {
  const anim = anime({
    targets: planet,
    rotate: '1turn',
    duration: duration,
    easing: 'linear',
    loop: true,
    autoplay: true,
    update: (anim) => {
      const angle = (anim.progress / 100) * 2 * Math.PI;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      planet.style.transform = `translate(${x}px, ${y}px)`;
    },
  });
  planetOrbits.push({ anim, baseDuration: duration });
}

// ---------------------------
// Crée les orbites
// ---------------------------
orbit(document.querySelector('.mercury'), 100, 4000);
orbit(document.querySelector('.venus'),   150, 7000);
orbit(document.querySelector('.earth'),   210, 10000);
orbit(document.querySelector('.mars'),    260, 13000);
orbit(document.querySelector('.jupiter'), 330, 20000);
orbit(document.querySelector('.saturn'),  400, 25000);
orbit(document.querySelector('.uranus'),  470, 30000);
orbit(document.querySelector('.neptune'), 540, 35000);

// ---------------------------
// Ajoute des étoiles
// ---------------------------
for (let i = 0; i < 150; i++) {
  const star = document.createElement("div");
  star.className = "star";
  star.style.top = Math.random() * 100 + "%";
  star.style.left = Math.random() * 100 + "%";
  star.style.animationDuration = (2 + Math.random() * 4) + "s";
  space.appendChild(star);
}

// ---------------------------
// Infos planètes
// ---------------------------
const planetInfo = {
  Soleil: `
    ⭐ <b>Type :</b> Étoile naine jaune (G2V)<br>
    🌡️ <b>Température surface :</b> 5 500 °C<br>
    ⚡ <b>Âge :</b> 4,6 milliards d'années<br>
    💥 <b>Rôle :</b> Source d'énergie et de gravité du système solaire
  `,
  Mercure: `
    🟠 <b>Distance du Soleil :</b> 58 millions km<br>
    ⏱️ <b>Année :</b> 88 jours terrestres<br>
    🌡️ <b>Température :</b> -180°C à +430°C<br>
    🧱 <b>Composition :</b> Roche métallique
  `,
  Vénus: `
    💨 <b>Distance du Soleil :</b> 108 millions km<br>
    ⏱️ <b>Année :</b> 225 jours terrestres<br>
    🌫️ <b>Atmosphère :</b> CO₂ et nuages d'acide sulfurique<br>
    🌡️ <b>Température moyenne :</b> 465°C
  `,
  Terre: `
    🌍 <b>Distance du Soleil :</b> 150 millions km<br>
    ⏱️ <b>Année :</b> 365 jours<br>
    🌡️ <b>Température moyenne :</b> 15°C<br>
    💧 <b>Spécificité :</b> Présence d'eau liquide et de vie
    <br>🌙 <b>La lune :</b> Satellite naturel de la Terre<br>
  `,
  Mars: `
    🔴 <b>Distance du Soleil :</b> 228 millions km<br>
    ⏱️ <b>Année :</b> 687 jours terrestres<br>
    🌡️ <b>Température moyenne :</b> -60°C<br>
    🧱 <b>Surface :</b> poussière de fer rougeâtre, calottes de glace
  `,
  Jupiter: `
    🌕 <b>Distance du Soleil :</b> 778 millions km<br>
    ⏱️ <b>Année :</b> 12 ans terrestres<br>
    💨 <b>Atmosphère :</b> Hydrogène et hélium<br>
    ⚡ <b>Particularité :</b> La plus grande planète, grande tache rouge
  `,
  Saturne: `
    ❄️ <b>Distance du Soleil :</b> 1,4 milliard km<br>
    ⏱️ <b>Année :</b> 29 ans terrestres<br>
    💠 <b>Anneaux :</b> Glace et poussière<br>
    🌡️ <b>Température :</b> -140°C
  `,
  Uranus: `
    💎 <b>Distance du Soleil :</b> 2,9 milliards km<br>
    ⏱️ <b>Année :</b> 84 ans terrestres<br>
    🌀 <b>Inclinaison :</b> 98° sur le côté<br>
    🌡️ <b>Température :</b> -195°C
  `,
  Neptune: `
    🌊 <b>Distance du Soleil :</b> 4,5 milliards km<br>
    ⏱️ <b>Année :</b> 165 ans terrestres<br>
    💨 <b>Vents :</b> > 2 000 km/h<br>
    🌡️ <b>Température :</b> -200°C
  `
};

// ---------------------------
// Sélection du panneau info
// ---------------------------
const planetName = document.getElementById('planet-name');
const planetText = document.getElementById('planet-info');

// ---------------------------
// Slider vitesse
// ---------------------------
const speedRange = document.getElementById('speed-range');
const speedValue = document.getElementById('speed-value');
speedRange.addEventListener('input', e => {
  globalSpeed = parseFloat(e.target.value);
  speedValue.textContent = globalSpeed.toFixed(1) + "x";
  planetOrbits.forEach(({ anim, baseDuration }) => {
    anim.duration = baseDuration / globalSpeed;
  });
});

// ---------------------------
// Slider zoom
// ---------------------------
const zoomRange = document.getElementById('zoom-range');
const zoomValue = document.getElementById('zoom-value');
zoomRange.addEventListener('input', e => {
  zoomLevel = parseFloat(e.target.value);
  zoomValue.textContent = zoomLevel.toFixed(1) + "x";
  space.style.transform = `scale(${zoomLevel})`;
});

// Zoom à la molette
window.addEventListener('wheel', e => {
  e.preventDefault();
  zoomLevel += e.deltaY * -0.001;
  zoomLevel = Math.min(Math.max(0.5, zoomLevel), 2.5);
  space.style.transform = `scale(${zoomLevel})`;
  zoomRange.value = zoomLevel;
  zoomValue.textContent = zoomLevel.toFixed(1) + "x";
}, { passive: false });

// ---------------------------
// Sons des planètes
// ---------------------------
const planetSounds = {
  Soleil: new Audio("sun.mp3"),
  Mercure: new Audio("mercury.mp3"),
  Vénus: new Audio("venus.mp3"),
  Terre: new Audio("earth.mp3"),
  Mars: new Audio("mars.mp3"),
  Jupiter: new Audio("jupiter.mp3"),
  Saturne: new Audio("saturn.mp3"),
  Uranus: new Audio("uranus.mp3"),
  Neptune: new Audio("neptune.mp3")
};

// Débloquer audio iPhone / Safari
function unlockAudio() {
  if (audioUnlocked) return;
  Object.values(planetSounds).forEach(sound => {
    sound.play().catch(()=>{});
    sound.pause();
    sound.currentTime = 0;
  });
  audioUnlocked = true;
  console.log("Audio débloqué 🎧");
}
window.addEventListener("touchstart", unlockAudio, { once: true });
window.addEventListener("click", unlockAudio, { once: true });

// ---------------------------
// Fonction playSound classique (respecte soundEnabled)
// ---------------------------
let soundEnabled = true; // bouton Son ON/OFF

function playSound(name) {
  if (!soundEnabled) return;
  if (!planetSounds[name]) return;

  // Arrêter tous les autres sons
  Object.values(planetSounds).forEach(s => {
    s.pause();
    s.currentTime = 0;
  });

  // Jouer le son
  planetSounds[name].play().catch(e => console.warn("Audio bloqué:", e));
}

// ---------------------------
// Clic sur planètes et Soleil
// ---------------------------
planets.forEach(p => {
  p.addEventListener("click", () => {
    const name = p.dataset.name;
    planetName.textContent = name;
    planetText.innerHTML = planetInfo[name];
    playSound(name);
  });
});

sun.addEventListener("click", () => {
  planetName.textContent = "Soleil";
  planetText.innerHTML = planetInfo["Soleil"];
  playSound("Soleil");
});

// ---------------------------
// Lune autour de la Terre
// ---------------------------
const earth = document.querySelector('.earth');
const moon = document.createElement("div");
moon.className = "moon";
earth.appendChild(moon);

let moonAnim = anime({
  targets: moon,
  rotate: "1turn",
  duration: 2500,
  loop: true,
  easing: "linear",
  update: anim => {
    const angle = (anim.progress/100)*2*Math.PI;
    const x = Math.cos(angle)*28;
    const y = Math.sin(angle)*28;
    moon.style.transform = `translate(${x}px,${y}px)`;
  }
});

// ---------------------------
// Bouton Stop son
// ---------------------------
document.getElementById("stop-sound").addEventListener("click", () => {
  Object.values(planetSounds).forEach(s => {
    s.pause();
    s.currentTime = 0;
  });
  muteMode = true; // mode muet temporaire
});

// ---------------------------
// Bouton Son ON/OFF
// ---------------------------
const toggleSoundBtn = document.getElementById("toggle-sound");
toggleSoundBtn.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  toggleSoundBtn.textContent = soundEnabled ? "🔊 Son : ON" : "🔇 Son : OFF";
  toggleSoundBtn.classList.toggle("off", !soundEnabled);

  if (!soundEnabled) {
    Object.values(planetSounds).forEach(s => {
      s.pause();
      s.currentTime = 0;
    });
  }
});

// ---------------------------
// Bouton Pause / Reprendre le système solaire
// ---------------------------
const toggleSystemBtn = document.getElementById("toggle-system");
toggleSystemBtn.addEventListener("click", () => {
  systemPaused = !systemPaused;

  if (systemPaused) {
    planetOrbits.forEach(({ anim }) => anim.pause());
    if (moonAnim) moonAnim.pause();
    toggleSystemBtn.textContent = "▶ Reprendre système";
    toggleSystemBtn.classList.add("paused");
  } else {
    planetOrbits.forEach(({ anim }) => anim.play());
    if (moonAnim) moonAnim.play();
    toggleSystemBtn.textContent = "⏸️ Pause système";
    toggleSystemBtn.classList.remove("paused");
  }
});
