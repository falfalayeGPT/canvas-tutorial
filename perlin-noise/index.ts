// @ts-ignore
import { noise } from "@chriscourses/perlin-noise";
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

class Circle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public offset: number
  ) {}
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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
  for (let i = 0; i < 20; i++) {
    circles.push(
      new Circle(
        -30,
        -30,
        noise(i) * 20,
        `hsl(${Math.random() * 255}, 100%, 50%)`,
        i * 0.01
      )
    );
  }
};

// const circle: Circle = new Circle(innerWidth * 0.5, innerHeight * 0.5, 20);
const circles: Circle[] = [];
init();
let time = 0;

function animate() {
  c!.fillStyle = "rgba(155, 155, 155, .01)";
  c?.fillRect(0, 0, innerWidth, innerHeight);
  circles.forEach((circle) => {
    circle.x = noise(time + circle.offset + 20) * innerWidth;
    circle.y = noise(time + circle.offset) * innerHeight;
    circle.draw();
  });
  time += 0.005;
  // circle.draw();
  requestAnimationFrame(animate);
}
