const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
const { sin, cos } = Math;
let coords: { x: number; y: number } = {
  x: innerWidth / 2,
  y: innerHeight / 2,
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
  public ttl: number = 1000;
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public v: { x: number; y: number },
    public color: string
  ) {}
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c!.fillStyle = this.color;
    c?.fill();
  }
  public update() {
    this.draw();
    this.x += this.v.x;
    this.y += this.v.y;
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  init();
  animate();
  generateRing();
});
window.addEventListener("resize", () => {
  canvas!.width = innerWidth;
  canvas!.height = innerHeight;
  init();
});

window.addEventListener("mousemove", ({ x, y }) => {
  coords = { x, y };
});
const init = () => {
  particles = [];
  const r = 30;
  for (let i = 0; i < 400; i += 1) {
    const radian = (Math.PI * 2) / 30;
    const x = coords.x;
    const y = coords.y;
    particles[i] = new Particle(
      x,
      y,
      5,
      {
        x: cos(radian * i) * r,
        y: sin(radian * i) * r,
      },
      `#0000`
    );
  }
};

let hueRadians = 0;

function generateRing() {
  setTimeout(generateRing, 1000);
  const r = 30;
  const particleCount = 20;
  for (let i = 0; i < particleCount; i += 1) {
    const radian = (Math.PI * 2) / particleCount;
    const x = coords.x;
    const y = coords.y;
    particles[i] = new Particle(
      x,
      y,
      5,
      {
        x: cos(radian * i) * r,
        y: sin(radian * i) * r,
      },
      `hsl(${Math.abs(sin(hueRadians) * 360)}, 50%, 50%)`
    );
  }
  hueRadians += 0.01;
}

let particles: Particle[] = [];

function animate() {
  c!.fillStyle = "rgba(0, 0, 0, .1)";
  c?.fillRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle, i) => {
    if (particle.ttl === 0) {
      particles.splice(i, 1);
    } else {
      particle.update();
    }
  });
  requestAnimationFrame(animate);
}
