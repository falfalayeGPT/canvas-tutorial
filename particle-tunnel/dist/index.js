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

eval("\nconst canvas = document.querySelector(\"canvas\");\nconst c = canvas.getContext(\"2d\");\nconst { sin, cos } = Math;\nlet coords = {\n    x: innerWidth / 2,\n    y: innerHeight / 2,\n};\nconst colors = [\n    \"#0abde3\",\n    \"#feca57\",\n    \"#576574\",\n    \"#341f97\",\n    \"#54a0ff\",\n    \"#ee5253\",\n];\nclass Particle {\n    constructor(x, y, radius, v, color) {\n        this.x = x;\n        this.y = y;\n        this.radius = radius;\n        this.v = v;\n        this.color = color;\n        this.ttl = 1000;\n    }\n    draw() {\n        c === null || c === void 0 ? void 0 : c.beginPath();\n        c === null || c === void 0 ? void 0 : c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n        c.fillStyle = this.color;\n        c === null || c === void 0 ? void 0 : c.fill();\n    }\n    update() {\n        this.draw();\n        this.x += this.v.x;\n        this.y += this.v.y;\n    }\n}\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    if (canvas) {\n        canvas.width = innerWidth;\n        canvas.height = innerHeight;\n    }\n    init();\n    animate();\n    generateRing();\n});\nwindow.addEventListener(\"resize\", () => {\n    canvas.width = innerWidth;\n    canvas.height = innerHeight;\n    init();\n});\nwindow.addEventListener(\"mousemove\", ({ x, y }) => {\n    coords = { x, y };\n});\nconst init = () => {\n    particles = [];\n    const r = 30;\n    for (let i = 0; i < 400; i += 1) {\n        const radian = (Math.PI * 2) / 30;\n        const x = coords.x;\n        const y = coords.y;\n        particles[i] = new Particle(x, y, 5, {\n            x: cos(radian * i) * r,\n            y: sin(radian * i) * r,\n        }, `#0000`);\n    }\n};\nlet hueRadians = 0;\nfunction generateRing() {\n    setTimeout(generateRing, 1000);\n    const r = 30;\n    const particleCount = 20;\n    for (let i = 0; i < particleCount; i += 1) {\n        const radian = (Math.PI * 2) / particleCount;\n        const x = coords.x;\n        const y = coords.y;\n        particles[i] = new Particle(x, y, 5, {\n            x: cos(radian * i) * r,\n            y: sin(radian * i) * r,\n        }, `hsl(${Math.abs(sin(hueRadians) * 360)}, 50%, 50%)`);\n    }\n    hueRadians += 0.01;\n}\nlet particles = [];\nfunction animate() {\n    c.fillStyle = \"rgba(0, 0, 0, .1)\";\n    c === null || c === void 0 ? void 0 : c.fillRect(0, 0, innerWidth, innerHeight);\n    particles.forEach((particle, i) => {\n        if (particle.ttl === 0) {\n            particles.splice(i, 1);\n        }\n        else {\n            particle.update();\n        }\n    });\n    requestAnimationFrame(animate);\n}\n\n\n//# sourceURL=webpack://canvas-resize/./index.ts?");

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