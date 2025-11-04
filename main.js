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
  { name:"Mercure", dist:100, radius:8, angle:0, speed:0.04, color1:"#a5a5a5", color2:"#555555" },
  { name:"Vénus", dist:150, radius:14, angle:0, speed:0.015, color1:"#f5deb3", color2:"#cfa86c" },
  { name:"Terre", dist:200, radius:16, angle:0, speed:0.01, color1:"#3399ff", color2:"#0066cc" },
  { name:"Mars", dist:250, radius:12, angle:0, speed:0.008, color1:"#ff6f61", color2:"#aa2e20" },
  { name:"Jupiter", dist:350, radius:32, angle:0, speed:0.004, color1:"#d9a066", color2:"#8b5a2b" },
  { name:"Saturne", dist:450, radius:28, angle:0, speed:0.003, color1:"#f5e0b7", color2:"#c8a265", ring:true },
  { name:"Uranus", dist:550, radius:22, angle:0, speed:0.002, color1:"#a0e0ff", color2:"#50b0cc" },
  { name:"Neptune", dist:650, radius:22, angle:0, speed:0.001, color1:"#2a60ff", color2:"#103380" }
];

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
