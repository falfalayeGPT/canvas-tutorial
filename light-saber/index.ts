import gsap from "gsap";
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
let coords: { x: number; y: number } = {
  x: 0,
  y: 0,
};

let angle = 0;

class Particle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public d: number
  ) {}
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c!.fillStyle = this.color;
    c?.fill();
  }
  public update() {
    this.draw();
    this.x = canvas!.width / 2 + this.d * Math.cos(angle);
    this.y = canvas!.height / 2 + this.d * Math.sin(-angle);
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
  gsap.to(coords, { x: x - canvas!.width / 2, y: y - canvas!.height / 2 });
  angle = Math.atan2(coords.x, coords.y);
});
const init = () => {
  for (let i = 0; i < 400; i += 1) {
    const x = canvas!.width / 2 + i * Math.cos(Math.PI);
    const y = canvas!.height / 2 + i * Math.sin(-Math.PI);
    particles.push(new Particle(x, y, 5, `hsl(${1.8 * i}, 50%, 50%)`, i));
  }
};

let particles: Particle[] = [];

function animate() {
  c!.fillStyle = "rgba(0, 0, 0, .01)";
  c?.fillRect(0, 0, innerWidth, innerHeight);
  particles.forEach((particle) => {
    particle.update();
  });
  requestAnimationFrame(animate);
}
