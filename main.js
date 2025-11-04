const canvas = document.getElementById('solarCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zoom = 1;
let speedFactor = 0.01;

// --- Soleil ---
const sun = { 
  x: canvas.width/2, 
  y: canvas.height/2, 
  radius: 50, 
  color: 'yellow',
  glowColor: 'rgba(255, 255, 100, 0.4)'
};

// --- Planètes ---
const planets = [
  { el: document.querySelector('.mercury'), dist: 70, speed: 0.04, angle: 0 },
  { el: document.querySelector('.venus'),   dist: 100, speed: 0.015, angle: 0 },
  { el: document.querySelector('.earth'),   dist: 130, speed: 0.01, angle: 0 },
  { el: document.querySelector('.mars'),    dist: 160, speed: 0.008, angle: 0 },
  { el: document.querySelector('.jupiter'), dist: 200, speed: 0.004, angle: 0 },
  { el: document.querySelector('.saturne'), dist: 240, speed: 0.003, angle: 0 },
  { el: document.querySelector('.uranus'),  dist: 280, speed: 0.002, angle: 0 },
  { el: document.querySelector('.neptune'), dist: 320, speed: 0.001, angle: 0 }
];

const sunX = window.innerWidth / 2;
const sunY = window.innerHeight / 2;

function animate() {
  planets.forEach(p => {
    p.angle += p.speed;
    const x = sunX + Math.cos(p.angle) * p.dist;
    const y = sunY + Math.sin(p.angle) * p.dist;
    p.el.style.transform = `translate(${x}px, ${y}px)`;
  });
  requestAnimationFrame(animate);
}

animate();
const infoBox = document.getElementById('infoBox');
const speedSlider = document.getElementById('speedSlider');
const zoomSlider = document.getElementById('zoomSlider');

speedSlider.addEventListener('input', () => { speedFactor = parseFloat(speedSlider.value); });
zoomSlider.addEventListener('input', () => { zoom = parseFloat(zoomSlider.value); });

// --- étoiles aléatoires ---
const stars = [];
for(let i=0;i<300;i++){
  stars.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    radius: Math.random()*1.5,
    opacity: Math.random()
  });
}

// --- interaction clic ---
canvas.addEventListener('click', (e) => {
  const mx = e.clientX;
  const my = e.clientY;
  planets.forEach(p => {
    const x = sun.x + Math.cos(p.angle)*p.dist*zoom;
    const y = sun.y + Math.sin(p.angle)*p.dist*zoom;
    const dx = mx - x;
    const dy = my - y;
    if(Math.sqrt(dx*dx+dy*dy) < p.radius*zoom){
      infoBox.style.display = 'block';
      infoBox.innerHTML = `<strong>${p.name}</strong><br>
                           Distance: ${p.dist} unités<br>
                           Taille: ${p.radius}<br>
                           Vitesse: ${p.speed}`;
    }
  });
});

// --- fonction pour dessiner un dégradé sphérique pour les planètes ---
function drawPlanet(x, y, radius, color1, color2){
  const gradient = ctx.createRadialGradient(x-radius*0.3, y-radius*0.3, radius*0.1, x, y, radius);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = gradient;
  ctx.fill();
}

// --- animation ---
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // fond étoilé
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI*2);
    ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
    ctx.fill();
  });

  // Soleil avec halo
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius*zoom, 0, Math.PI*2);
  ctx.fillStyle = sun.color;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius*1.8*zoom, 0, Math.PI*2);
  ctx.fillStyle = sun.glowColor;
  ctx.fill();

  planets.forEach(p => {
    p.angle += p.speed*speedFactor;
    const x = sun.x + Math.cos(p.angle)*p.dist*zoom;
    const y = sun.y + Math.sin(p.angle)*p.dist*zoom;

    // orbite
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, p.dist*zoom, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();

    // planète
    drawPlanet(x, y, p.radius*zoom, p.color1, p.color2);

    // anneau Saturne
    if(p.ring){
      ctx.beginPath();
      ctx.ellipse(x, y, p.radius*zoom + 12, p.radius*zoom + 6, 0, 0, 2*Math.PI);
      ctx.strokeStyle = 'rgba(200,180,120,0.6)';
      ctx.lineWidth = 4;
      ctx.stroke();
    }
  });

  requestAnimationFrame(draw);
}

draw();

// --- resize ---
window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  sun.x = canvas.width/2;
  sun.y = canvas.height/2;
});
