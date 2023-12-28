const canvas = document.querySelector("canvas");
if (canvas) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const c = canvas?.getContext("2d");
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
let x = 200;
function animate(c: CanvasRenderingContext2D | null) {
  if (x === 400) {
    return;
  }
  c?.clearRect(0, 0, innerWidth, innerHeight);
  c?.beginPath();
  c?.arc(x, 200, 30, 0, 2 * Math.PI * 2);
  c?.stroke();
  x += 1;
  requestAnimationFrame(() => animate(c));
}
