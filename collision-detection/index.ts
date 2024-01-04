const canvas = document.querySelector("canvas");
let c = canvas?.getContext("2d");

document.addEventListener("DOMContentLoaded", () => {
  canvas!.height = innerHeight;
  canvas!.width = innerWidth;
});

let mouse: {
  x: number;
  y: number;
} = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", ({ x, y }) => {
  mouse = { x, y };
});

class Cirlcle {
  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string
  ) {}
  public draw() {
    c?.beginPath();
    c?.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    c!.fillStyle = this.color;
    c?.fill();
    c?.closePath();
  }
  public update() {
    this.draw();
  }
}

let circ1: Cirlcle;
let circ2: Cirlcle;

function init() {
  circ1 = new Cirlcle(300, 300, 100, "#000");
  circ2 = new Cirlcle(NaN, NaN, 100, "#F00");
}

function getDistance(x1: number, y1: number, x2: number, y2: number) {
  let xDistance: number = x2 - x1;
  let yDistance: number = y2 - y1;

  return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

init();

animate();

function animate() {
  requestAnimationFrame(animate);
  c?.clearRect(0, 0, canvas!.width, canvas!.height);
  circ1.update();
  circ2.x = mouse.x;
  circ2.y = mouse.y;
  let { x: x1, y: y1 } = circ1;
  let { x: x2, y: y2 } = circ2;
  const d = getDistance(x1, y1, x2, y2);
  if (d < circ1.radius + circ2.radius) {
    circ1.color = "blue";
  } else {
    circ1.color = "black";
  }
  circ2.update();
}
