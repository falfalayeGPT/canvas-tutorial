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
var Particle = /** @class */ (function () {
    function Particle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5,
        };
        this.mass = 1;
        this.opacity = 0;
    }
    Particle.prototype.draw = function () {
        c === null || c === void 0 ? void 0 : c.beginPath();
        c === null || c === void 0 ? void 0 : c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.strokeStyle = this.color;
        c === null || c === void 0 ? void 0 : c.save();
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;
        c === null || c === void 0 ? void 0 : c.fill();
        c === null || c === void 0 ? void 0 : c.restore();
        c === null || c === void 0 ? void 0 : c.stroke();
        c === null || c === void 0 ? void 0 : c.closePath();
    };
    Particle.prototype.update = function (particles) {
        for (var _i = 0, particles_1 = particles; _i < particles_1.length; _i++) {
            var p = particles_1[_i];
            if (this === p) {
                continue;
            }
            var d = getDistance(this.x, this.y, p.x, p.y);
            if (d - p.radius * 2 < 0) {
                resolveCollision(this, p);
            }
            var dist = getDistance(mouse.x, mouse.y, this.x, this.y);
            if (dist < 120 && this.opacity < 0.2) {
                this.opacity += 0.02;
            }
            else if (this.opacity > 0) {
                this.opacity -= 0.02;
                this.opacity = Math.max(0, this.opacity);
            }
        }
        if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y - this.radius <= 0 || this.y + this.radius >= innerHeight) {
            this.velocity.y = -this.velocity.y;
        }
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.draw();
    };
    return Particle;
}());
var particles = [];
function init() {
    for (var i = 0; i < 150; i += 1) {
        var r = 20;
        var x = randomIntFromRange(r, innerWidth - r);
        var y = randomIntFromRange(r, innerHeight - r);
        if (i >= 1) {
            for (var j = 0; j < particles.length; j += 1) {
                var d = getDistance(x, y, particles[j].x, particles[j].y);
                if (d - particles[j].radius * 2 < 0) {
                    x = randomIntFromRange(r, innerWidth - r);
                    y = randomIntFromRange(r, innerHeight - r);
                    j = -1;
                }
            }
        }
        var color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, r, color));
    }
}
function getDistance(x1, y1, x2, y2) {
    var xDistance = x2 - x1;
    var yDistance = y2 - y1;
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
init();
animate();
function animate() {
    requestAnimationFrame(animate);
    c === null || c === void 0 ? void 0 : c.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (particle) {
        particle.update(particles);
    });
}
