var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");
var coords = {
    x: innerWidth / 2,
    y: innerHeight / 2,
};
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var colors = [
    "#0abde3",
    "#feca57",
    "#576574",
    "#341f97",
    "#54a0ff",
    "#ee5253",
];
var Particle = /** @class */ (function () {
    function Particle(x, y, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.radians = Math.PI * Math.random();
        this.velocity = 0.05;
        this.current = { x: 1, y: 1 };
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.current = {
            x: this.x,
            y: this.y,
        };
        this.distanceFromCenter = randomIntFromRange(50, 120);
    }
    Particle.prototype.draw = function (lastPoint) {
        c === null || c === void 0 ? void 0 : c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius;
        c === null || c === void 0 ? void 0 : c.moveTo(lastPoint.x, lastPoint.y);
        c === null || c === void 0 ? void 0 : c.lineTo(this.x, this.y);
        c === null || c === void 0 ? void 0 : c.stroke();
    };
    Particle.prototype.update = function () {
        var _a = this, x = _a.x, y = _a.y;
        this.radians += this.velocity;
        this.current.x += (coords.x - x) * 0.05;
        this.current.y += (coords.y - y) * 0.05;
        this.x = this.current.x + Math.cos(this.radians) * this.distanceFromCenter;
        this.y = this.current.y + Math.sin(this.radians) * this.distanceFromCenter;
        this.draw({ x: x, y: y });
        // this.current = {
        //   x: this.current.x + (coords.x - x) * 0.05,
        //   y: this.current.y + (coords.y - y) * 0.05,
        // };
    };
    return Particle;
}());
document.addEventListener("DOMContentLoaded", function () {
    if (canvas) {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    }
    init();
    animate();
});
window.addEventListener("resize", function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});
window.addEventListener("mousemove", function (_a) {
    var x = _a.x, y = _a.y;
    coords = { x: x, y: y };
});
var init = function () {
    for (var i = 1; i <= 50; i += 1) {
        var r = Math.random() * 2 + 1;
        particles.push(new Particle(canvas.width / 2, canvas.height / 2, r));
    }
};
var particles = [];
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(255, 255, 255, 0.05)";
    c === null || c === void 0 ? void 0 : c.fillRect(0, 0, canvas.width, canvas.height);
    particles.forEach(function (particle) {
        particle.update();
    });
}
