const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
let coords: { x: number; y: number } = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

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
  public radians: number = Math.PI * Math.random();
  public velocity: number = 0.05;
  public distanceFromCenter: number;
  public current: { x: number; y: number } = { x: 1, y: 1 };
  constructor(public x: number, public y: number, public radius: number) {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.current = {
      x: this.x,
      y: this.y,
    };
    this.distanceFromCenter = randomIntFromRange(50, 120);
  }
  public draw(lastPoint: { x: number; y: number }) {
    c?.beginPath();
    c!.strokeStyle = this.color;
    c!.lineWidth = this.radius;
    c?.moveTo(lastPoint.x, lastPoint.y);
    c?.lineTo(this.x, this.y);
    c?.stroke();
  }
  public update() {
    const { x, y } = this;
    this.radians += this.velocity;
    this.current.x += (coords.x - x) * 0.05;
    this.current.y += (coords.y - y) * 0.05;
    this.x = this.current.x + Math.cos(this.radians) * this.distanceFromCenter;
    this.y = this.current.y + Math.sin(this.radians) * this.distanceFromCenter;
    this.draw({ x, y });
    // this.current = {
    //   x: this.current.x + (coords.x - x) * 0.05,
    //   y: this.current.y + (coords.y - y) * 0.05,
    // };
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

window.addEventListener("mousemove", ({ x, y }) => {
  coords = { x, y };
});
const init = () => {
  for (let i = 1; i <= 50; i += 1) {
    const r = Math.random() * 2 + 1;
    particles.push(new Particle(canvas!.width / 2, canvas!.height / 2, r));
  }
};

let particles: Particle[] = [];

function animate() {
  requestAnimationFrame(animate);
  c!.fillStyle = "rgba(255, 255, 255, 0.05)";
  c?.fillRect(0, 0, canvas!.width, canvas!.height);
  particles.forEach((particle) => {
    particle.update();
  });
}
