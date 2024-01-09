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

/***/ "./node_modules/@chriscourses/perlin-noise/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@chriscourses/perlin-noise/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   noise: () => (/* binding */ noise),\n/* harmony export */   noiseDetail: () => (/* binding */ noiseDetail),\n/* harmony export */   noiseSeed: () => (/* binding */ noiseSeed)\n/* harmony export */ });\n//////////////////////////////////////////////////////////////\n\n// http://mrl.nyu.edu/~perlin/noise/\n// Adapting from PApplet.java\n// which was adapted from toxi\n// which was adapted from the german demo group farbrausch\n// as used in their demo \"art\": http://www.farb-rausch.de/fr010src.zip\n\n// someday we might consider using \"improved noise\"\n// http://mrl.nyu.edu/~perlin/paper445.pdf\n// See: https://github.com/shiffman/The-Nature-of-Code-Examples-p5.js/\n//      blob/main/introduction/Noise1D/noise.js\n\n/**\n * @module Math\n * @submodule Noise\n * @for p5\n * @requires core\n */\n\nconst PERLIN_YWRAPB = 4\nconst PERLIN_YWRAP = 1 << PERLIN_YWRAPB\nconst PERLIN_ZWRAPB = 8\nconst PERLIN_ZWRAP = 1 << PERLIN_ZWRAPB\nconst PERLIN_SIZE = 4095\n\nlet perlin_octaves = 4 // default to medium smooth\nlet perlin_amp_falloff = 0.5 // 50% reduction/octave\n\nconst scaled_cosine = (i) => 0.5 * (1.0 - Math.cos(i * Math.PI))\n\nlet perlin // will be initialized lazily by noise() or noiseSeed()\n\n/**\n * Returns the Perlin noise value at specified coordinates. Perlin noise is\n * a random sequence generator producing a more naturally ordered, harmonic\n * succession of numbers compared to the standard <b>random()</b> function.\n * It was invented by Ken Perlin in the 1980s and been used since in\n * graphical applications to produce procedural textures, natural motion,\n * shapes, terrains etc.<br /><br /> The main difference to the\n * <b>random()</b> function is that Perlin noise is defined in an infinite\n * n-dimensional space where each pair of coordinates corresponds to a\n * fixed semi-random value (fixed only for the lifespan of the program; see\n * the <a href=\"#/p5/noiseSeed\">noiseSeed()</a> function). p5.js can compute 1D, 2D and 3D noise,\n * depending on the number of coordinates given. The resulting value will\n * always be between 0.0 and 1.0. The noise value can be animated by moving\n * through the noise space as demonstrated in the example above. The 2nd\n * and 3rd dimension can also be interpreted as time.<br /><br />The actual\n * noise is structured similar to an audio signal, in respect to the\n * function's use of frequencies. Similar to the concept of harmonics in\n * physics, perlin noise is computed over several octaves which are added\n * together for the final result. <br /><br />Another way to adjust the\n * character of the resulting sequence is the scale of the input\n * coordinates. As the function works within an infinite space the value of\n * the coordinates doesn't matter as such, only the distance between\n * successive coordinates does (eg. when using <b>noise()</b> within a\n * loop). As a general rule the smaller the difference between coordinates,\n * the smoother the resulting noise sequence will be. Steps of 0.005-0.03\n * work best for most applications, but this will differ depending on use.\n *\n * @method noise\n * @param  {Number} x   x-coordinate in noise space\n * @param  {Number} [y] y-coordinate in noise space\n * @param  {Number} [z] z-coordinate in noise space\n * @return {Number}     Perlin noise value (between 0 and 1) at specified\n *                      coordinates\n * @example\n * <div>\n * <code>\n * let xoff = 0.0;\n *\n * function draw() {\n *   background(204);\n *   xoff = xoff + 0.01;\n *   let n = noise(xoff) * width;\n *   line(n, 0, n, height);\n * }\n * </code>\n * </div>\n * <div>\n * <code>let noiseScale=0.02;\n *\n * function draw() {\n *   background(0);\n *   for (let x=0; x < width; x++) {\n *     let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);\n *     stroke(noiseVal*255);\n *     line(x, mouseY+noiseVal*80, x, height);\n *   }\n * }\n * </code>\n * </div>\n *\n * @alt\n * vertical line moves left to right with updating noise values.\n * horizontal wave pattern effected by mouse x-position & updating noise values.\n */\n\nconst noise = function(x, y = 0, z = 0) {\n  if (perlin == null) {\n    perlin = new Array(PERLIN_SIZE + 1)\n    for (let i = 0; i < PERLIN_SIZE + 1; i++) {\n      perlin[i] = Math.random()\n    }\n  }\n\n  if (x < 0) {\n    x = -x\n  }\n  if (y < 0) {\n    y = -y\n  }\n  if (z < 0) {\n    z = -z\n  }\n\n  let xi = Math.floor(x),\n    yi = Math.floor(y),\n    zi = Math.floor(z)\n  let xf = x - xi\n  let yf = y - yi\n  let zf = z - zi\n  let rxf, ryf\n\n  let r = 0\n  let ampl = 0.5\n\n  let n1, n2, n3\n\n  for (let o = 0; o < perlin_octaves; o++) {\n    let of = xi + (yi << PERLIN_YWRAPB) + (zi << PERLIN_ZWRAPB)\n\n    rxf = scaled_cosine(xf)\n    ryf = scaled_cosine(yf)\n\n    n1 = perlin[of & PERLIN_SIZE]\n    n1 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n1)\n    n2 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]\n    n2 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2)\n    n1 += ryf * (n2 - n1)\n\n    of += PERLIN_ZWRAP\n    n2 = perlin[of & PERLIN_SIZE]\n    n2 += rxf * (perlin[(of + 1) & PERLIN_SIZE] - n2)\n    n3 = perlin[(of + PERLIN_YWRAP) & PERLIN_SIZE]\n    n3 += rxf * (perlin[(of + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n3)\n    n2 += ryf * (n3 - n2)\n\n    n1 += scaled_cosine(zf) * (n2 - n1)\n\n    r += n1 * ampl\n    ampl *= perlin_amp_falloff\n    xi <<= 1\n    xf *= 2\n    yi <<= 1\n    yf *= 2\n    zi <<= 1\n    zf *= 2\n\n    if (xf >= 1.0) {\n      xi++\n      xf--\n    }\n    if (yf >= 1.0) {\n      yi++\n      yf--\n    }\n    if (zf >= 1.0) {\n      zi++\n      zf--\n    }\n  }\n  return r\n}\n\n/**\n *\n * Adjusts the character and level of detail produced by the Perlin noise\n * function. Similar to harmonics in physics, noise is computed over\n * several octaves. Lower octaves contribute more to the output signal and\n * as such define the overall intensity of the noise, whereas higher octaves\n * create finer grained details in the noise sequence.\n *\n * By default, noise is computed over 4 octaves with each octave contributing\n * exactly half than its predecessor, starting at 50% strength for the 1st\n * octave. This falloff amount can be changed by adding an additional function\n * parameter. Eg. a falloff factor of 0.75 means each octave will now have\n * 75% impact (25% less) of the previous lower octave. Any value between\n * 0.0 and 1.0 is valid, however note that values greater than 0.5 might\n * result in greater than 1.0 values returned by <b>noise()</b>.\n *\n * By changing these parameters, the signal created by the <b>noise()</b>\n * function can be adapted to fit very specific needs and characteristics.\n *\n * @method noiseDetail\n * @param {Number} lod number of octaves to be used by the noise\n * @param {Number} falloff falloff factor for each octave\n * @example\n * <div>\n * <code>\n * let noiseVal;\n * let noiseScale = 0.02;\n *\n * function setup() {\n *   createCanvas(100, 100);\n * }\n *\n * function draw() {\n *   background(0);\n *   for (let y = 0; y < height; y++) {\n *     for (let x = 0; x < width / 2; x++) {\n *       noiseDetail(2, 0.2);\n *       noiseVal = noise((mouseX + x) * noiseScale, (mouseY + y) * noiseScale);\n *       stroke(noiseVal * 255);\n *       point(x, y);\n *       noiseDetail(8, 0.65);\n *       noiseVal = noise(\n *         (mouseX + x + width / 2) * noiseScale,\n *         (mouseY + y) * noiseScale\n *       );\n *       stroke(noiseVal * 255);\n *       point(x + width / 2, y);\n *     }\n *   }\n * }\n * </code>\n * </div>\n *\n * @alt\n * 2 vertical grey smokey patterns affected my mouse x-position and noise.\n */\nconst noiseDetail = function(lod, falloff) {\n  if (lod > 0) {\n    perlin_octaves = lod\n  }\n  if (falloff > 0) {\n    perlin_amp_falloff = falloff\n  }\n}\n\n/**\n * Sets the seed value for <b>noise()</b>. By default, <b>noise()</b>\n * produces different results each time the program is run. Set the\n * <b>value</b> parameter to a constant to return the same pseudo-random\n * numbers each time the software is run.\n *\n * @method noiseSeed\n * @param {Number} seed   the seed value\n * @example\n * <div>\n * <code>let xoff = 0.0;\n *\n * function setup() {\n *   noiseSeed(99);\n *   stroke(0, 10);\n * }\n *\n * function draw() {\n *   xoff = xoff + .01;\n *   let n = noise(xoff) * width;\n *   line(n, 0, n, height);\n * }\n * </code>\n * </div>\n *\n * @alt\n * vertical grey lines drawing in pattern affected by noise.\n */\nconst noiseSeed = function(seed) {\n  // Linear Congruential Generator\n  // Variant of a Lehman Generator\n  const lcg = (() => {\n    // Set to values from http://en.wikipedia.org/wiki/Numerical_Recipes\n    // m is basically chosen to be large (as it is the max period)\n    // and for its relationships to a and c\n    const m = 4294967296\n    // a - 1 should be divisible by m's prime factors\n    const a = 1664525\n    // c and m should be co-prime\n    const c = 1013904223\n    let seed, z\n    return {\n      setSeed(val) {\n        // pick a random seed if val is undefined or null\n        // the >>> 0 casts the seed to an unsigned 32-bit integer\n        z = seed = (val == null ? Math.random() * m : val) >>> 0\n      },\n      getSeed() {\n        return seed\n      },\n      rand() {\n        // define the recurrence relationship\n        z = (a * z + c) % m\n        // return a float in [0, 1)\n        // if z = m then z / m = 0 therefore (z % m) / m < 1 always\n        return z / m\n      }\n    }\n  })()\n\n  lcg.setSeed(seed)\n  perlin = new Array(PERLIN_SIZE + 1)\n  for (let i = 0; i < PERLIN_SIZE + 1; i++) {\n    perlin[i] = lcg.rand()\n  }\n}\n\n\n//# sourceURL=webpack://canvas-resize/./node_modules/@chriscourses/perlin-noise/index.js?");

/***/ }),

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\n// @ts-ignore\nvar perlin_noise_1 = __webpack_require__(/*! @chriscourses/perlin-noise */ \"./node_modules/@chriscourses/perlin-noise/index.js\");\nvar canvas = document.querySelector(\"canvas\");\nvar c = canvas.getContext(\"2d\");\nvar coords = {\n    x: 0,\n    y: 0,\n};\nvar colors = [\n    \"#0abde3\",\n    \"#feca57\",\n    \"#576574\",\n    \"#341f97\",\n    \"#54a0ff\",\n    \"#ee5253\",\n];\nvar Circle = /** @class */ (function () {\n    function Circle(x, y, radius, color, offset) {\n        this.x = x;\n        this.y = y;\n        this.radius = radius;\n        this.color = color;\n        this.offset = offset;\n    }\n    Circle.prototype.draw = function () {\n        c === null || c === void 0 ? void 0 : c.beginPath();\n        c === null || c === void 0 ? void 0 : c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);\n        c.fillStyle = this.color;\n        c === null || c === void 0 ? void 0 : c.fill();\n    };\n    Circle.prototype.update = function () {\n        this.draw();\n    };\n    return Circle;\n}());\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n    if (canvas) {\n        canvas.width = innerWidth;\n        canvas.height = innerHeight;\n    }\n    animate();\n});\nwindow.addEventListener(\"resize\", function () {\n    canvas.width = innerWidth;\n    canvas.height = innerHeight;\n    init();\n});\nwindow.addEventListener(\"mousemove\", function (_a) {\n    var x = _a.x, y = _a.y;\n    coords = { x: x, y: y };\n});\nvar init = function () {\n    for (var i = 0; i < 20; i++) {\n        circles.push(new Circle(-30, -30, (0, perlin_noise_1.noise)(i) * 20, \"hsl(\".concat(Math.random() * 255, \", 100%, 50%)\"), i * 0.01));\n    }\n};\n// const circle: Circle = new Circle(innerWidth * 0.5, innerHeight * 0.5, 20);\nvar circles = [];\ninit();\nvar time = 0;\nfunction animate() {\n    c.fillStyle = \"rgba(155, 155, 155, .01)\";\n    c === null || c === void 0 ? void 0 : c.fillRect(0, 0, innerWidth, innerHeight);\n    circles.forEach(function (circle) {\n        circle.x = (0, perlin_noise_1.noise)(time + circle.offset + 20) * innerWidth;\n        circle.y = (0, perlin_noise_1.noise)(time + circle.offset) * innerHeight;\n        circle.draw();\n    });\n    time += 0.005;\n    // circle.draw();\n    requestAnimationFrame(animate);\n}\n\n\n//# sourceURL=webpack://canvas-resize/./index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.ts");
/******/ 	
/******/ })()
;