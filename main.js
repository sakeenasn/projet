const canvas = document.getElementById('solarCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let zoom = 1;
let speedFactor = 0.01;

const sun = { x: canvas.width/2, y: canvas.height/2, radius: 50, color: 'yellow' };

const planets = [
  { name:"Mercure", dist:100, radius:10, angle:0, speed:0.04, color:"gray" },
  { name:"Vénus", dist:150, radius:15, angle:0, speed:0.015, color:"orange" },
  { name:"Terre", dist:200, radius:18, angle:0, speed:0.01, color:"blue" },
  { name:"Mars", dist:250, radius:14, angle:0, speed:0.008, color:"red" },
  { name:"Jupiter", dist:350, radius:35, angle:0, speed:0.004, color:"orange" },
  { name:"Saturne", dist:450, radius:30, angle:0, speed:0.003, color:"beige", ring:true },
  { name:"Uranus", dist:550, radius:25, angle:0, speed:0.002, color:"lightblue" },
  { name:"Neptune", dist:650, radius:25, angle:0, speed:0.001, color:"blue" }
];

const infoBox = document.getElementById('infoBox');
const speedSlider = document.getElementById('speedSlider');
const zoomSlider = document.getElementById('zoomSlider');

speedSlider.addEventListener('input', () => {
  speedFactor = parseFloat(speedSlider.value);
});
zoomSlider.addEventListener('input', () => {
  zoom = parseFloat(zoomSlider.value);
});

canvas.addEventListener('click', (e) => {
  const mx = e.clientX;
  const my = e.clientY;
  planets.forEach(p => {
    const x = sun.x + Math.cos(p.angle)*p.dist*zoom;
    const y = sun.y + Math.sin(p.angle)*p.dist*zoom;
    const dx = mx - x;
    const dy = my - y;
    if (Math.sqrt(dx*dx + dy*dy) < p.radius*zoom) {
      infoBox.style.display = 'block';
      infoBox.innerHTML = `<strong>${p.name}</strong><br>
                           Distance: ${p.dist} unités<br>
                           Taille: ${p.radius}<br>
                           Vitesse: ${p.speed}`;
    }
  });
});

// --- Animation ---
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Soleil
  ctx.beginPath();
  ctx.arc(sun.x, sun.y, sun.radius*zoom, 0, Math.PI*2);
  ctx.fillStyle = sun.color;
  ctx.fill();

  planets.forEach(p => {
    p.angle += p.speed * speedFactor;

    const x = sun.x + Math.cos(p.angle) * p.dist * zoom;
    const y = sun.y + Math.sin(p.angle) * p.dist * zoom;

    // Orbite
    ctx.beginPath();
    ctx.arc(sun.x, sun.y, p.dist*zoom, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.stroke();

    // Planète
    ctx.beginPath();
    ctx.arc(x, y, p.radius*zoom, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.fill();

    // Anneau Saturne
    if(p.ring){
      ctx.beginPath();
      ctx.ellipse(x, y, p.radius*zoom + 10, p.radius*zoom + 5, 0, 0, 2*Math.PI);
      ctx.strokeStyle = 'rgba(200,180,120,0.6)';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });

  requestAnimationFrame(draw);
}

draw();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
