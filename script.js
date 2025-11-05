// Sélectionne toutes les planètes
const planets = document.querySelectorAll('.planet');

// Fonction d'orbite avec Anime.js
function orbit(planet, distance, duration) {
  anime({
    targets: planet,
    rotate: '1turn',
    duration: duration,
    easing: 'linear',
    loop: true,
    update: anim => {
      const angle = anim.progress / 100 * 2 * Math.PI;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      planet.style.transform = `translate(${x}px, ${y}px)`;
    }
  });
}

// Orbites pour chaque planète
orbit(document.querySelector('.mercury'), 100, 4000);
orbit(document.querySelector('.venus'),   150, 7000);
orbit(document.querySelector('.earth'),   210, 10000);
orbit(document.querySelector('.mars'),    260, 13000);
orbit(document.querySelector('.jupiter'), 330, 20000);
orbit(document.querySelector('.saturn'),  400, 25000);
orbit(document.querySelector('.uranus'),  470, 30000);
orbit(document.querySelector('.neptune'), 540, 35000);

// Ajoute des étoiles aléatoires
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

// Informations sur les planètes
const planetInfo = {
  Mercure: "Plus proche du Soleil, température extrême entre -180°C et +430°C.",
  Vénus: "Atmosphère très dense et chaude, souvent appelée sœur de la Terre.",
  Terre: "Notre planète bleue, seule connue à abriter la vie.",
  Mars: "Planète rouge, possiblement habitable dans le futur.",
  Jupiter: "La plus grande planète du système solaire, une géante gazeuse.",
  Saturne: "Célèbre pour ses magnifiques anneaux de glace et de poussière.",
  Uranus: "Planète inclinée sur le côté, d’un bleu pâle caractéristique.",
  Neptune: "La plus lointaine, aux vents les plus violents du système solaire."
};

// Boîte d’infos
const infoBox = document.getElementById('info-box');
const planetName = document.getElementById('planet-name');
const planetText = document.getElementById('planet-info');
const closeBtn = document.getElementById('close-btn');

// Interaction : clic sur planète
planets.forEach(planet => {
  planet.addEventListener('click', () => {
    const name = planet.dataset.name;
    planetName.textContent = name;
    planetText.textContent = planetInfo[name] || "Informations indisponibles.";
    infoBox.classList.remove('hidden');
  });
});

// Fermer la boîte d’infos
closeBtn.addEventListener('click', () => {
  infoBox.classList.add('hidden');
});
