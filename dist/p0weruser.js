// ==UserScript==
// @name         pr0gramm Framew0rk
// @namespace    http://pr0gramm.com
// @version      0.1
// @description  Enables some additional features and provides plugin-api
// @author       eWar Development
// @match        http://pr0gramm.com/*
// @match        https://pr0gramm.com/*
// ==/UserScript==

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__module_Settings_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventHandler_js__ = __webpack_require__(13);



class P0weruser {
    constructor() {
        this.eventHandler = new __WEBPACK_IMPORTED_MODULE_1__EventHandler_js__["a" /* default */]();
        this.settings = new __WEBPACK_IMPORTED_MODULE_0__module_Settings_js__["a" /* default */]();
    }
}

window.p0weruser = new P0weruser();


/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils {
    static waitForElement(selector) {
        return new Promise((resolve, reject) => {
            let element = [];
            let check = () => {
                if(! element[0]) {
                    element = document.querySelectorAll(selector);

                    setTimeout(() => {
                        check();
                    }, 10);
                } else {
                    resolve(element);
                }
            };

            check();
        });
    }

    static changeLocation(newLocation) {
        p.location = newLocation;
        window.history.pushState({}, 'pr0gramm.com', newLocation);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils_js__ = __webpack_require__(8);



class Settings {
    constructor() {
        this.tabs = {};
        this.tabContent = {};

        this.addListeners();
    }


    addListeners() {
        window.addEventListener('settingsLoaded', (e) => {
            this.addSettingsTab();
        })
    }


    addSettingsTab(tabName) {
        this.tabContent = document.querySelectorAll('.pane.form-page')[0];
        this.tabs = document.getElementsByClassName('tab-bar')[0];

        // Create button-element
        let button = document.createElement('a');
        button.innerText = 'Addons';
        button.href = '/settings/addons';

        // Add listener
        button.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleSettingsTab(button);
        });

        // Append element to tab-lsit
        this.tabs.appendChild(button);
    }


    toggleSettingsTab(button) {
        __WEBPACK_IMPORTED_MODULE_1__Utils_js__["a" /* default */].changeLocation('/settings/addons');

        this.tabContent.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html___default.a;
        this.tabs.getElementsByClassName('active')[0].classList.remove('active');
        button.classList.add('active');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "<div class=form-section> <h2>Addon Einstellungen</h2> <h3>Core</h3> <div> <input type=checkbox class=box-from-label name=addon_1 id=addon_1 /> <label class=radio for=addon_1>Addon 1</label> </div> <div class=form-row> <input type=submit value=\"Einstellungen speichern\" class=\"confirm settings-save\"> </div> </div> ";

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');

        this.addEvents();
    }

    addEvents() {
        let _this = this;

        // Add settings-event
        (function(render) {
            p.View.Settings.prototype.render = function(params) {
                render.call(this, params);
                window.dispatchEvent(_this.settingsLoaded);
            };
        }(p.View.Settings.prototype.render));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventHandler;



/***/ })
/******/ ]);