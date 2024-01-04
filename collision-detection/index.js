var canvas = document.querySelector("canvas");
var c = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
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
var Cirlcle = /** @class */ (function () {
    function Cirlcle(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    Cirlcle.prototype.draw = function () {
        c === null || c === void 0 ? void 0 : c.beginPath();
        c === null || c === void 0 ? void 0 : c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = this.color;
        c === null || c === void 0 ? void 0 : c.fill();
        c === null || c === void 0 ? void 0 : c.closePath();
    };
    Cirlcle.prototype.update = function () {
        this.draw();
    };
    return Cirlcle;
}());
var circ1;
var circ2;
function init() {
    circ1 = new Cirlcle(300, 300, 100, "#000");
    circ2 = new Cirlcle(NaN, NaN, 100, "#F00");
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
    circ1.update();
    circ2.x = mouse.x;
    circ2.y = mouse.y;
    var x1 = circ1.x, y1 = circ1.y;
    var x2 = circ2.x, y2 = circ2.y;
    var d = getDistance(x1, y1, x2, y2);
    if (d < circ1.radius + circ2.radius) {
        circ1.color = "blue";
    }
    else {
        circ1.color = "black";
    }
    circ2.update();
}
