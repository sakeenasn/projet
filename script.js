// Sélection des éléments
const planets = document.querySelectorAll('.planet');
const sun = document.querySelector('.sun');

// Tableau pour stocker les animations
const planetOrbits = [];
let globalSpeed = 1;

// Fonction d'orbite
function orbit(planet, distance, duration) {
  const anim = anime({
    targets: planet,
    rotate: '1turn',
    duration: duration,
    easing: 'linear',
    loop: true,
    autoplay: true,
    update: anim => {
      const angle = anim.progress / 100 * 2 * Math.PI;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      planet.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
  planetOrbits.push({ planet, anim, baseDuration: duration });
}

// Crée les orbites des planètes
orbit(document.querySelector('.mercury'), 100, 4000);
orbit(document.querySelector('.venus'),   150, 7000);
orbit(document.querySelector('.earth'),   210, 10000);
orbit(document.querySelector('.mars'),    260, 13000);
orbit(document.querySelector('.jupiter'), 330, 20000);
orbit(document.querySelector('.saturn'),  400, 25000);
orbit(document.querySelector('.uranus'),  470, 30000);
orbit(document.querySelector('.neptune'), 540, 35000);

// Ajout des étoiles
const space = document.querySelector('.space');
for (let i = 0; i < 100; i++) {
  const star = document.createElement('div');
  star.style.position = 'absolute';
  star.style.width = '2px';
  star.style.height = '2px';
  star.style.background = 'white';
  star.style.borderRadius = '50%';
  star.style.top = Math.random() * 100 + '%';
  star.style.left = Math.random() * 100 + '%';
  star.style.opacity = Math.random();
  space.appendChild(star);
}

// Informations enrichies sur les planètes
const planetInfo = {
  Soleil: `
    🌞 <b>Type :</b> Étoile naine jaune (G2V)<br>
    🌡️ <b>Température de surface :</b> ~5 500 °C<br>
    ⚡ <b>Âge :</b> 4,6 milliards d'années<br>
    🌍 <b>Rôle :</b> Source d’énergie et de lumière du système solaire
  `,
  Mercure: `
    🪐 <b>Distance du Soleil :</b> 58 millions km<br>
    🌡️ <b>Température :</b> de -180°C à +430°C<br>
    ⏱️ <b>Révolution :</b> 88 jours terrestres<br>
    🧱 <b>Composition :</b> Roche métallique
  `,
  Vénus: `
    🪐 <b>Distance du Soleil :</b> 108 millions km<br>
    🌡️ <b>Température moyenne :</b> 465°C<br>
    ⏱️ <b>Révolution :</b> 225 jours terrestres<br>
    🌫️ <b>Atmosphère :</b> très dense, riche en dioxyde de carbone
  `,
  Terre: `
    🌍 <b>Distance du Soleil :</b> 150 millions km<br>
    🌡️ <b>Température moyenne :</b> 15°C<br>
    ⏱️ <b>Révolution :</b> 365 jours<br>
    💧 <b>Spécificité :</b> seule planète connue avec de la vie
  `,
  Mars: `
    🔴 <b>Distance du Soleil :</b> 228 millions km<br>
    🌡️ <b>Température moyenne :</b> -60°C<br>
    ⏱️ <b>Révolution :</b> 687 jours terrestres<br>
    🧱 <b>Surface :</b> poussière de fer rougeâtre, possible glace d’eau
  `,
  Jupiter: `
    🌕 <b>Distance du Soleil :</b> 778 millions km<br>
    🌡️ <b>Température :</b> -110°C<br>
    ⏱️ <b>Révolution :</b> 12 ans terrestres<br>
    💨 <b>Composition :</b> Hydrogène et hélium — planète géante gazeuse
  `,
  Saturne: `
    💍 <b>Distance du Soleil :</b> 1,4 milliard km<br>
    🌡️ <b>Température :</b> -140°C<br>
    ⏱️ <b>Révolution :</b> 29 ans terrestres<br>
    💠 <b>Anneaux :</b> formés de glace et de poussière
  `,
  Uranus: `
    💎 <b>Distance du Soleil :</b> 2,9 milliards km<br>
    🌡️ <b>Température :</b> -195°C<br>
    ⏱️ <b>Révolution :</b> 84 ans terrestres<br>
    🌀 <b>Particularité :</b> axe de rotation incliné à 98°
  `,
  Neptune: `
    🌊 <b>Distance du Soleil :</b> 4,5 milliards km<br>
    🌡️ <b>Température :</b> -200°C<br>
    ⏱️ <b>Révolution :</b> 165 ans terrestres<br>
    💨 <b>Vent :</b> plus de 2 000 km/h
  `
};

// Zone d'information
const planetName = document.getElementById('planet-name');
const planetText = document.getElementById('planet-info');

// Clic sur planète
planets.forEach(planet => {
  planet.addEventListener('click', () => {
    const name = planet.dataset.name;
    planetName.textContent = name;
    planetText.innerHTML = planetInfo[name] || "Informations indisponibles.";
  });
});

// Clic sur le soleil
sun.addEventListener('click', () => {
  planetName.textContent = "Soleil";
  planetText.innerHTML = planetInfo["Soleil"];
});

// Slider de vitesse
const speedRange = document.getElementById('speed-range');
speedRange.addEventListener('input', e => {
  globalSpeed = parseFloat(e.target.value);
  planetOrbits.forEach(({ anim, baseDuration }) => {
    anim.duration = baseDuration / globalSpeed;
  });
});
