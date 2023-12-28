var canvas = document.querySelector("canvas");
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var c = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
    c.fillStyle = "blue";
    // c?.fillRect(100, 100, 100, 100);
    // for (let i = 0; i < 10; i++) {
    //   c?.fillRect(100 * i, 100 * i, 100, 100);
    // }
    c === null || c === void 0 ? void 0 : c.beginPath();
    c === null || c === void 0 ? void 0 : c.moveTo(100, 100);
    c === null || c === void 0 ? void 0 : c.lineTo(300, 400);
    c === null || c === void 0 ? void 0 : c.lineTo(400, 500);
    c.strokeStyle = "red";
    // c?.stroke();
    for (var i = 1; i < 500; i += 1) {
        c === null || c === void 0 ? void 0 : c.beginPath();
        // c!.fillStyle = "rgba(255, 0, 0, .5)";
        var x = Math.random() * window.innerWidth;
        var y = Math.random() * window.innerHeight;
        var o = Math.random() * 1;
        c.fillStyle = "rgba(".concat((i * 100 + x - y) % 255, ", ").concat((i * 10 + x) % 255, ", ").concat((i * 5 + y) % 255, ", ").concat(o, ")");
        c === null || c === void 0 ? void 0 : c.arc(x, y, 30, 0, 2 * Math.PI * 2);
        c === null || c === void 0 ? void 0 : c.fill();
    }
}
// c?.strokeStyle()
