// why this is not showing anything?:
const canvas = document.querySelector("canvas");
const c = canvas!.getContext("2d");
let coords: { x: number; y: number } = {
  x: 0,
  y: 0,
};

const MAX_RADIUS = 40;
// const MIN_RADIUS = 2;

const colors = [
  "#0abde3",
  "#feca57",
  "#576574",
  "#341f97",
  "#54a0ff",
  "#ee5253",
];

class Circle {
  public color: string;
  public minRadius: number;
  constructor(
    public x: number,
    public y: number,
    public dx: number,
    public dy: number,
    public radius: number
  ) {
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.minRadius = this.radius;
  }
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c!.fillStyle = this.color;
    c?.fill();
  }
  public update() {
    if (this.x + this.radius >= innerWidth || this.x - this.radius <= 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
    if (
      coords.x - this.x < 50 &&
      coords.x - this.x > -50 &&
      coords.y - this.y < 50 &&
      coords.y - this.y > -50
    ) {
      if (this.radius <= MAX_RADIUS) {
        this.radius += 1;
      }
    } else {
      if (this.radius > this.minRadius) {
        this.radius -= 1;
      }
    }
    this.draw();
  }
}
document.addEventListener("DOMContentLoaded", function () {
  // Your existing code here
  if (canvas) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  animate();
  // var c = canvas.getContext("2d");
  // ... rest of your code ...
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
  circles = [];
  for (let i = 0; i < 800; i++) {
    let r = Math.random() * 3 + 1;
    let x = Math.random() * (innerWidth - r * 2) + r;
    let y = Math.random() * (innerHeight - r * 2) + r;
    let dx = (Math.random() - 0.5) * 8;
    let dy = (Math.random() - 0.5) * 8;
    circles.push(new Circle(x, y, dx, dy, r));
  }
};

let circles: Circle[] = [];
init();

// const circle = new Circle(200, 200, 2, 3, 30);

function animate() {
  c?.clearRect(0, 0, innerWidth, innerHeight);
  circles.forEach((circle) => {
    circle.update();
  });
  requestAnimationFrame(animate);
}
