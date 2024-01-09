// why is the particles are not moving in a ring and in a random order, then falling down like fireworks in real life?
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

const gravity = 0.005;
const friction = 0.99;

class Particle {
  public color: string;
  public alpha: number = 1;
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public velocity: { x: number; y: number }
  ) {
    this.color = colors[Math.floor(Math.random() * colors.length)];
  }
  public draw() {
    c?.save();
    c!.globalAlpha = this.alpha;
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c!.fillStyle = this.color;
    c?.fill();
    c?.closePath();
    c?.restore();
  }
  public update() {
    this.velocity.x *= friction;
    this.velocity.y *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.05;
    this.draw();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  animate();
});
addEventListener("resize", () => {
  canvas!.width = innerWidth;
  canvas!.height = innerHeight;
  init();
});

const init = () => {
  particles = [];
};

let particles: Particle[] = [];
init();

// addEventListener("click", ({ clientX: x, clientY: y }) => {
//   coords = { x, y };
//   const r = 5;
//   const particleCount = 400;
//   for (let i = 0; i < particleCount; i += 1) {
//     const velocityMagnitude = Math.random() * 5 + 1; // Vary the velocity magnitude
//     const angle = Math.random() * Math.PI * 2; // Randomize the angle
//     particles.push(
//       new Particle(coords.x, coords.y, r, {
//         x: Math.cos(angle) * velocityMagnitude,
//         y: Math.sin(angle) * velocityMagnitude,
//       })
//     );
//   }
// });

addEventListener("click", ({ clientX: x, clientY: y }) => {
  coords = { x, y };
  const r = 5;
  const particleCount = 400;
  for (let i = 0; i < particleCount; i += 1) {
    const angleIncrement = (Math.random() * (Math.PI * 2)) / particleCount;
    const velocityMagnitude = Math.random() * 5 + 1;
    particles.push(
      new Particle(coords.x, coords.y, r, {
        x: Math.cos(angleIncrement * i) * velocityMagnitude,
        y: Math.sin(angleIncrement * i) * velocityMagnitude,
      })
    );
  }
});

function animate() {
  c!.fillStyle = "rgba(0, 0, 0, .005)";
  c?.fillRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle, i) => {
    if (particle.alpha >= 0) {
      particle.update();
    } else {
      particles.splice(i, 1);
    }
  });
  requestAnimationFrame(animate);
}
