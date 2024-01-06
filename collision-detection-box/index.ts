const canvas = document.querySelector("canvas");
let c = canvas?.getContext("2d");

const colors = [
  "#1abc9c",
  "#341f97",
  "#7f8c8d",
  "#34495e",
  "#54a0ff",
  "#f1c40f",
  "#0abde3",
  "#ee5253",
  "#e74c3c",
  "#576574",
  "#8e44ad",
  "#feca57",
  "#2c3e50",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#2980b9",
  "#16a085",
  "#27ae60",
  "#e67e22",
];

function randomIntFromRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function resolveCollision(
  particle: {
    x: number;
    y: number;
    velocity: { x: number; y: number };
    mass: number;
  },
  otherParticle: {
    x: number;
    y: number;
    velocity: { x: number; y: number };
    mass: number;
  }
): void {
  const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
  const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

  const xDist = otherParticle.x - particle.x;
  const yDist = otherParticle.y - particle.y;

  // Prevent accidental overlap of particles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding particles
    const angle = -Math.atan2(
      otherParticle.y - particle.y,
      otherParticle.x - particle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    // Velocity before equation
    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);

    // Swap particle velocities for realistic bounce effect
    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
  }
}

function rotate(
  velocity: { x: number; y: number },
  angle: number
): { x: number; y: number } {
  const rotatedVelocities = {
    x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
    y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
  };

  return rotatedVelocities;
}

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

function init() {}

function animate() {
  requestAnimationFrame(animate);
  c!.fillStyle = colors[3];
  c?.fillRect(0, 0, innerWidth, innerHeight);
  // red
  c!.fillStyle = colors[7];
  const { x, y } = mouse;
  c?.fillRect(x, y, 100, 100);
  if (
    x + 100 >= innerWidth / 2 - 50 &&
    x <= innerWidth / 2 - 50 + 100 &&
    y + 100 >= innerHeight / 2 - 50 &&
    y <= innerHeight / 2 - 50 + 100
  ) {
    console.log("coliding...");
  }
  // blue
  c!.fillStyle = colors[6];
  c?.fillRect(innerWidth / 2 - 50, innerHeight / 2 - 50, 100, 100);
}

animate();
init();
