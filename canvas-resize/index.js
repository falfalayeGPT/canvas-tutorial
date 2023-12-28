var canvas = document.querySelector("canvas");
if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var c = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("2d");
    // c!.fillStyle = "blue";
    // // c?.fillRect(100, 100, 100, 100);
    // // for (let i = 0; i < 10; i++) {
    // //   c?.fillRect(100 * i, 100 * i, 100, 100);
    // // }
    // c?.beginPath();
    // c?.moveTo(100, 100);
    // c?.lineTo(300, 400);
    // c?.lineTo(400, 500);
    // c!.strokeStyle = "red";
    // // c?.stroke();
    // for (let i = 1; i < 500; i += 1) {
    //   c?.beginPath();
    //   // c!.fillStyle = "rgba(255, 0, 0, .5)";
    //   let x = Math.random() * window.innerWidth;
    //   let y = Math.random() * window.innerHeight;
    //   let o = Math.random() * 1;
    //   c!.fillStyle = `rgba(${(i * 100 + x - y) % 255}, ${(i * 10 + x) % 255}, ${
    //     (i * 5 + y) % 255
    //   }, ${o})`;
    //   c?.fill();
    // }
    animate(c);
}
var x = 200;
function animate(c) {
    if (x === 400) {
        return;
    }
    c === null || c === void 0 ? void 0 : c.clearRect(0, 0, innerWidth, innerHeight);
    c === null || c === void 0 ? void 0 : c.beginPath();
    c === null || c === void 0 ? void 0 : c.arc(x, 200, 30, 0, 2 * Math.PI * 2);
    c === null || c === void 0 ? void 0 : c.stroke();
    x += 1;
    requestAnimationFrame(function () { return animate(c); });
}
