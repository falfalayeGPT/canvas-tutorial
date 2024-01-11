/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ (() => {

eval("\nconst canvas = document.querySelector(\"canvas\");\nconst c = canvas.getContext(\"2d\");\nlet coords = {\n    x: 0,\n    y: 0,\n};\nconst colors = [\n    \"#0abde3\",\n    \"#feca57\",\n    \"#576574\",\n    \"#341f97\",\n    \"#54a0ff\",\n    \"#ee5253\",\n];\nclass Particle {\n    constructor(x, y, radius) {\n        this.x = x;\n        this.y = y;\n        this.radius = radius;\n        this.color = colors[Math.floor(Math.random() * colors.length)];\n    }\n    draw() {\n        c === null || c === void 0 ? void 0 : c.beginPath();\n        c === null || c === void 0 ? void 0 : c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n        c.shadowColor = this.color;\n        c.shadowBlur = 15;\n        c.fillStyle = this.color;\n        c === null || c === void 0 ? void 0 : c.fill();\n    }\n    update() {\n        this.draw();\n    }\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    if (canvas) {\n        canvas.width = innerWidth;\n        canvas.height = innerHeight;\n    }\n    init();\n    animate();\n});\nwindow.addEventListener(\"resize\", () => {\n    canvas.width = innerWidth;\n    canvas.height = innerHeight;\n    init();\n});\nlet mousedown = false;\naddEventListener(\"mousedown\", () => {\n    mousedown = true;\n});\naddEventListener(\"mouseup\", () => {\n    mousedown = false;\n});\noncontextmenu = (e) => {\n    e.preventDefault();\n};\nwindow.addEventListener(\"mousemove\", ({ x, y }) => {\n    coords = { x, y };\n});\nconst init = () => {\n    const h = canvas.height + 300, w = canvas.width + 300;\n    for (let i = 0; i < 100; i += 1) {\n        const x = Math.random() * w - innerWidth / 2;\n        const y = Math.random() * h - innerHeight / 2;\n        particles.push(new Particle(x, y, 2 * Math.random()));\n    }\n};\nlet particles = [];\nlet inc = 0;\nlet alpha = 1;\nfunction animate() {\n    c.fillStyle = `rgba(10, 10, 10, ${alpha})`;\n    c === null || c === void 0 ? void 0 : c.fillRect(0, 0, innerWidth, innerHeight);\n    c === null || c === void 0 ? void 0 : c.save();\n    c === null || c === void 0 ? void 0 : c.translate(innerWidth / 2, innerHeight / 2);\n    c === null || c === void 0 ? void 0 : c.rotate(inc);\n    particles.forEach((particle) => {\n        particle.update();\n    });\n    c === null || c === void 0 ? void 0 : c.restore();\n    requestAnimationFrame(animate);\n    inc += 0.005;\n    if (mousedown && alpha >= 0.1) {\n        alpha -= 0.01;\n    }\n    else if (!mousedown && alpha < 1) {\n        alpha += 0.01;\n    }\n}\n\n\n//# sourceURL=webpack://canvas-resize/./index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./index.ts"]();
/******/ 	
/******/ })()
;