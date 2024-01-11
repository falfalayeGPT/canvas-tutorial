const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
let coords: { x: number; y: number } = {
  x: 0,
  y: 0,
};

const colors = [
  "#0abde3",
  "#feca57",
  "#576574",
  "#341f97",
  "#54a0ff",
  "#ee5253",
];

class Particle {
  public color: string;
  constructor(public x: number, public y: number, public radius: number) {
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c!.shadowColor = this.color;
    c!.shadowBlur = 15;
    c!.fillStyle = this.color;
    c?.fill();
  }
  public update() {
    this.draw();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  init();
  animate();
});
window.addEventListener("resize", () => {
  canvas!.width = innerWidth;
  canvas!.height = innerHeight;
  init();
});

let mousedown = false;

addEventListener("mousedown", () => {
  mousedown = true;
});
addEventListener("mouseup", () => {
  mousedown = false;
});
oncontextmenu = (e) => {
  e.preventDefault();
};

window.addEventListener("mousemove", ({ x, y }) => {
  coords = { x, y };
});
const init = () => {
  const h = canvas!.height + 300,
    w = canvas!.width + 300;
  for (let i = 0; i < 100; i += 1) {
    const x = Math.random() * w - innerWidth / 2;
    const y = Math.random() * h - innerHeight / 2;
    particles.push(new Particle(x, y, 2 * Math.random()));
  }
};

let particles: Particle[] = [];
let inc = 0;
let alpha = 1;

function animate() {
  c!.fillStyle = `rgba(10, 10, 10, ${alpha})`;
  c?.fillRect(0, 0, innerWidth, innerHeight);
  c?.save();
  c?.translate(innerWidth / 2, innerHeight / 2);
  c?.rotate(inc);
  particles.forEach((particle) => {
    particle.update();
  });
  c?.restore();
  requestAnimationFrame(animate);
  inc += 0.005;
  if (mousedown && alpha >= 0.1) {
    alpha -= 0.01;
  } else if (!mousedown && alpha < 1) {
    alpha += 0.01;
  }
}
