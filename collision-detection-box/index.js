var canvas = document.querySelector("canvas");
var c = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
var colors = [
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
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function resolveCollision(particle, otherParticle) {
    var xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    var yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;
    var xDist = otherParticle.x - particle.x;
    var yDist = otherParticle.y - particle.y;
    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        // Grab angle between the two colliding particles
        var angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
        // Store mass in var for better readability in collision equation
        var m1 = particle.mass;
        var m2 = otherParticle.mass;
        // Velocity before equation
        var u1 = rotate(particle.velocity, angle);
        var u2 = rotate(otherParticle.velocity, angle);
        // Velocity after 1d collision equation
        var v1 = {
            x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
            y: u1.y,
        };
        var v2 = {
            x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
            y: u2.y,
        };
        // Final velocity after rotating axis back to original location
        var vFinal1 = rotate(v1, -angle);
        var vFinal2 = rotate(v2, -angle);
        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;
        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}
function rotate(velocity, angle) {
    var rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle),
    };
    return rotatedVelocities;
}
document.addEventListener("DOMContentLoaded", function () {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
});
var mouse = {
    x: 0,
    y: 0,
};
window.addEventListener("mousemove", function (_a) {
    var x = _a.x, y = _a.y;
    mouse = { x: x, y: y };
});
function init() { }
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = colors[3];
    c === null || c === void 0 ? void 0 : c.fillRect(0, 0, innerWidth, innerHeight);
    // red
    c.fillStyle = colors[7];
    var x = mouse.x, y = mouse.y;
    c === null || c === void 0 ? void 0 : c.fillRect(x, y, 100, 100);
    if (x + 100 >= innerWidth / 2 - 50 &&
        x <= innerWidth / 2 - 50 + 100 &&
        y + 100 >= innerHeight / 2 - 50 &&
        y <= innerHeight / 2 - 50 + 100) {
        console.log("coliding...");
    }
    // blue
    c.fillStyle = colors[6];
    c === null || c === void 0 ? void 0 : c.fillRect(innerWidth / 2 - 50, innerHeight / 2 - 50, 100, 100);
}
animate();
init();
