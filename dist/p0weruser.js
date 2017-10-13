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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(8);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__EventHandler__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_WidescreenMode__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module_RepostMarker__ = __webpack_require__(13);





class P0weruser {
    constructor() {
        P0weruser.addStyles();
        this.eventHandler = new __WEBPACK_IMPORTED_MODULE_1__EventHandler__["a" /* default */]();
        this.modules = this.getModules();
        this.settings = new __WEBPACK_IMPORTED_MODULE_0__Settings__["a" /* default */](this);

        // Load activated modules
        this.loadModules();
    }


    static addStyles() {
        // FontAwesome (Icons)
        let fa = document.createElement('link');
        fa.type = 'text/css';
        fa.rel = 'stylesheet';
        fa.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css';
        document.getElementsByTagName('head')[0].appendChild(fa);
    }


    loadModules() {
        let activated = P0weruser.getActivatedModules();

        for (let i = 0; i < activated.length; i++) {
            this.modules[activated[i]].load();
        }
    }


    getModules() {
        if (!this.modules) {
            this.modules = {
                'WidescreenMode': new __WEBPACK_IMPORTED_MODULE_2__module_WidescreenMode__["a" /* default */](),
                'RepostMarker': new __WEBPACK_IMPORTED_MODULE_3__module_RepostMarker__["a" /* default */]()
            };
        }

        return this.modules;
    }


    static getActivatedModules() {
        let modules = window.localStorage.getItem('activated_modules');

        if (!modules) {
            window.localStorage.setItem('activated_modules', '[]');
            modules = '[]';
        }

        return JSON.parse(modules);
    }


    static saveActivatedModules(selection) {
        window.localStorage.setItem('activated_modules', JSON.stringify(selection));
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = P0weruser;


window.p0weruser = new P0weruser();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Utils {
    static waitForElement(selector) {
        return new Promise((resolve, reject) => {
            let element = [];
            let check = () => {
                if (!element[0]) {
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


    static getUrlParams(url) {
        let result = {};
        url = url.split('?');
        let params = url[1].split('&');

        for (let i = 0; i < params.length; i++) {
            let param = params[i].split('=');
            result[param[0]] = param[1];
        }

        return {
            url: url[0],
            params: result
        };
    }


    static getUrlFromParams(url, params) {
        let result = url + '?';

        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                if (result !== url + '?') {
                    result += '&';
                }
                result += key + '=' + params[key];
            }
        }

        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings_less__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_settings_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__P0weruser__ = __webpack_require__(2);





class Settings {
    constructor(app) {
        this.style = __WEBPACK_IMPORTED_MODULE_1__style_settings_less___default.a;
        this.app = app;
        this.tabs = {};
        this.tabContent = {};

        this.addListeners();
    }


    addListeners() {
        window.addEventListener('settingsLoaded', () => {
            this.addSettingsTab();
        })
    }


    addSettingsTab() {
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
        __WEBPACK_IMPORTED_MODULE_2__Utils__["a" /* default */].changeLocation('/settings/addons');
        let moduleList = document.createElement('div');
        let modules = this.app.modules;

        this.tabContent.innerHTML = __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html___default.a;
        let list = this.tabContent.querySelectorAll('#addon-list')[0];

        // Add list of modules
        Object.keys(modules).forEach((key) => {
            let checked = __WEBPACK_IMPORTED_MODULE_3__P0weruser__["default"].getActivatedModules().indexOf(key) !== -1;

            // Build module-row
            moduleList.innerHTML += `
                <input type="checkbox" 
                       class="box-from-label"
                       name="${key}" 
                       id="${key}" 
                       data-module="${key}" ${checked ? ' checked="checked"' : ''}>
                <label for="${key}">
                    ${modules[key].name}
                    <span>${modules[key].description}</span>
                </label>`;
        });

        list.appendChild(moduleList);
        this.tabs.getElementsByClassName('active')[0].classList.remove('active');
        button.classList.add('active');

        // Add save-button
        let saveButton = this.tabContent.querySelectorAll('#save-addon-settings')[0];
        saveButton.addEventListener('click', () => {
            Settings.saveSettings(moduleList);
        })
    }

    static saveSettings(moduleList) {
        let result = [];
        let actives = moduleList.querySelectorAll(':checked');

        // Get list of checked modules
        for (let i = 0; i < actives.length; i++) {
            result.push(actives[i].dataset.module);
        }
        __WEBPACK_IMPORTED_MODULE_3__P0weruser__["default"].saveActivatedModules(result);

        // Reload pr0gramm
        p.reload();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "<div class=form-section> <h2>Addon Einstellungen</h2> <div id=addon-list></div> <div class=form-row> <input type=submit id=save-addon-settings value=\"Einstellungen speichern\" class=\"confirm settings-save\"> </div> </div> ";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./settings.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./settings.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#addon-list label {\n  margin-bottom: 10px;\n}\n#addon-list label span {\n  display: block;\n  color: #888;\n}\n", ""]);

// exports


/***/ }),
/* 8 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 9 */
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



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.description = 'Stellt das pr0 im Breitbildmodus dar.'
    }


    load() {
        this.styles = __webpack_require__(11);
        this.header = document.getElementById('head-content');
        this.nav = {
            button: null,
            container: document.getElementById('footer-links')
        };
        WidescreenMode.overrideTemplates();
        this.addNavigation();
    }


    static overrideTemplates() {
        // Replace templates
        p.View.Stream.Item.prototype.template = __webpack_require__(16);
        p.View.Stream.Comments.prototype.template = __webpack_require__(17);


        p.View.Stream.Item = p.View.Stream.Item.extend({
            showItem: function($item, scrollTo) {
                this.parent($item, scrollTo);
            }
        });


        p.View.Stream.Main.prototype.buildItemRows = function (items) {
            let result = '';
            for (let i = 0; i < items.length; i++) {
                result += this.buildItem(items[i]);
            }

            return `<div class="item-row">${result}</div>`;
        };
    }


    addNavigation() {
        this.nav.button = document.createElement('a');
        this.nav.button.className = 'fa fa-bars sidebar-toggle';
        this.header.insertBefore(this.nav.button, this.header.firstChild);

        this.nav.button.addEventListener('click', () => {
            this.toggleNavigation();
        })
    }


    toggleNavigation() {
        this.nav.container.classList.toggle('open');
        this.nav.button.classList.toggle('active');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WidescreenMode;



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./widescreenMode.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./widescreenMode.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body.one-sidebar > .side-wide-skyscraper,\nbody.two-sidebars > .side-wide-skyscraper {\n  display: none;\n}\nbody.one-sidebar #page.desktop,\nbody.two-sidebars #page.desktop,\nbody.one-sidebar #page #head,\nbody.two-sidebars #page #head {\n  padding: 0 20px;\n  width: 100% !important;\n}\nbody.one-sidebar #page.desktop #pr0-miner,\nbody.two-sidebars #page.desktop #pr0-miner,\nbody.one-sidebar #page #head #pr0-miner,\nbody.two-sidebars #page #head #pr0-miner {\n  display: none;\n}\nbody.one-sidebar #page #stream,\nbody.two-sidebars #page #stream {\n  text-align: center;\n}\nbody.one-sidebar #page #stream a.thumb,\nbody.two-sidebars #page #stream a.thumb {\n  display: inline-block;\n  float: none;\n}\nbody.one-sidebar #page #head,\nbody.two-sidebars #page #head {\n  background: rgba(0, 0, 0, 0.8);\n}\nbody.one-sidebar #page #head #head-content,\nbody.two-sidebars #page #head #head-content {\n  background: none;\n  display: flex;\n  align-items: center;\n}\nbody.one-sidebar #page #head #head-content > .user-info,\nbody.two-sidebars #page #head #head-content > .user-info {\n  order: 3;\n  margin: 0;\n}\nbody.one-sidebar #page #head #head-content > #head-menu,\nbody.two-sidebars #page #head #head-content > #head-menu {\n  padding: 0;\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nbody.one-sidebar #page #head #head-content > #pr0gramm-logo-link,\nbody.two-sidebars #page #head #head-content > #pr0gramm-logo-link {\n  height: 24px;\n  margin: 0;\n}\nbody.one-sidebar #page #head #head-content .sidebar-toggle,\nbody.two-sidebars #page #head #head-content .sidebar-toggle {\n  color: #fff;\n  font-size: 20px;\n  margin-right: 10px;\n}\nbody.one-sidebar #page #head #head-content .sidebar-toggle.active,\nbody.two-sidebars #page #head #head-content .sidebar-toggle.active {\n  color: #ee4d2e;\n}\nbody.one-sidebar #footer-links,\nbody.two-sidebars #footer-links {\n  width: 250px;\n  left: -250px !important;\n  position: fixed;\n  margin: 0;\n  top: 52px;\n  border-right: 3px solid #2a2e31;\n  background: #161618;\n  transition: left .2s linear;\n  z-index: 500;\n}\nbody.one-sidebar #footer-links.open,\nbody.two-sidebars #footer-links.open {\n  left: 0 !important;\n  box-shadow: 2px 0 10px #000;\n}\nbody.one-sidebar #footer-links a,\nbody.two-sidebars #footer-links a {\n  color: #fff;\n  display: block;\n  text-align: left;\n  padding: 10px 20px;\n  margin-right: 0;\n  font-size: 16px;\n}\nbody.one-sidebar #footer-links a:hover,\nbody.two-sidebars #footer-links a:hover {\n  color: #ee4d2e;\n}\n#stream .item-container {\n  margin: 0;\n  max-height: calc(100vh - 52px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.9);\n  position: fixed;\n  top: 52px;\n  right: -20px;\n  left: -20px;\n  bottom: -20px;\n  padding: 0;\n  z-index: 400;\n}\n#stream .item-container .item-container-content {\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n#stream .item-container .item-container-content .image-main {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper {\n  flex-grow: 1;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls {\n  width: 100% !important;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls .video-position-bar-background {\n  min-height: 2px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .item-image {\n  height: auto !important;\n  width: auto !important;\n}\n#stream .item-container .item-container-content .item-comments {\n  background: #161618;\n  overflow-y: scroll;\n  width: 30vw;\n  flex-grow: 0;\n  flex-shrink: 0;\n}\n#stream .item-container .item-container-content .item-comments .comment-count {\n  display: block;\n  background-color: #1B1E1F;\n  text-align: left;\n  position: sticky;\n  padding: 10px 20px;\n  top: 0;\n  z-index: 400;\n}\n", ""]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(3);


// Inspired by Mopsalarms repost-script
// https://github.com/mopsalarm/pr0gramm-reposts-userscript
class RepostMarker {
    constructor() {
        this.name = 'Repost Markierung';
        this.description = 'Markiert Reposts in der Übersicht'
    }


    load() {
        this.styles = __webpack_require__(14);
        this.overrideBuildItem();

        // Get reposts, if not searched before
        $(document).ajaxComplete((event, request, settings) => {
            this.handleAjax(settings.url).then((data) => {
                for (let id of data) {
                    RepostMarker.markRepost(id);
                }
            });
        });
    }


    overrideBuildItem() {
        let mainView = p.View.Stream.Main;

        p.View.Stream.Main = mainView.extend({
            buildItem: this.buildItem
        });

        p.currentView.buildItem = this.buildItem;
    }


    static markRepost(id) {
        let elem = document.getElementById('item-' + id);

        if (elem) {
            elem.classList.add('repost');
        }
    }


    buildItem(item) {
        return `<a class="silent thumb" id="item-${item.id}" href="${this.baseURL}${item.id}"><img src="${item.thumb}"/></a>`;
    }


    handleAjax(url) {
        return new Promise((resolve, reject) => {
            if (url.indexOf('/api/items/get') === -1 || url.indexOf('repost') !== -1) {
                return false
            }

            // Prepare url
            url = __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].getUrlParams(url);
            let params = url.params;
            if (!params.tags) {
                params.tags = 'repost';
            } else {
                params.tags += ' repost';
            }

            // Send manipulated request
            let xhr = new XMLHttpRequest();
            xhr.open('GET', __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].getUrlFromParams(url.url, params));
            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    let response = JSON.parse(xhr.responseText);
                    resolve(response.items.map((item) => {
                        return item.id;
                    }));
                } else {
                    reject('error!');
                }
            });

            xhr.send();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RepostMarker;



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./repostMarker.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./repostMarker.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".repost {\n  position: relative;\n}\n.repost:after {\n  content: \"rep0st\";\n  position: absolute;\n  color: #fff;\n  z-index: 10;\n  left: 0;\n  font-weight: bold;\n  font-size: 18px;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = "<div class=item-pointer></div> <div class=item-container-content> <?js if( p.user.admin ) {?> <svg class=\"flags flags-{item.flags}\" viewBox=\"0 0 10 10\"> <polygon points=\"0,0 10,0 0,10\"></polygon> </svg> <?js } ?> <div class=item-comments></div> <div class=image-main> <div class=item-image-wrapper> <?js if( item.video ) { ?> <?js if(supportsAutoplay) {?> <video class=item-image src={item.image} type=video/mp4 loop autoplay preload=auto></video> <?js } else { ?> <video class=item-image webkit-playsinline playsinline poster={item.thumb} src={item.image} type=video/mp4 loop preload=metadata></video> <svg class=video-play-button viewBox=\"0 0 200 200\"> <circle cx=100 cy=100 r=90 fill=none stroke-width=15 stroke=#fff></circle> <polygon points=\"70, 55 70, 145 145, 100\" fill=#fff></polygon> </svg> <?js } ?> <div class=\"video-controls<?js if(item.audio){?> has-audio<?js}?>\"> <div class=video-position-bar-background> <div class=video-position></div> </div> <?js if(item.audio) {?> <div class=audio-controls> <svg class=audio-state viewBox=\"0 0 75 75\"> <polygon class=audio-speaker points=\"39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769\"/> <g class=audio-x> <path d=\"M 49,50 69,26\"/> <path d=\"M 69,50 49,26\"/> </g> <g class=audio-wave> <path class=audio-wave-1 d=\"M 48,49 C 50,46 51,42 51,38 C 51,34 50,31 48,28\"/> <path class=audio-wave-2 d=\"M 55,21 C 59,26 61,32 61,38 C 61,45 59,51 55,56\"/> <path class=audio-wave-3 d=\"M 62,63 C 67,56 70,48 70,38 C 70,29 67,21 62,14\"/> </g> </svg> <div class=audio-volume-controls> <div class=audio-volume-bar></div> <div class=audio-volume-slider></div> </div> </div> <?js } ?> </div> <?js } else { ?> <img class=item-image src={item.image} /> <?js if(item.fullsize) { ?> <a href={item.fullsize} target=_blank class=item-fullsize-link>+</a> <?js } ?> <?js } ?> <?js if( p.user.showAds ) { ?> <div class=stream-prev title=Neuer> <span class=stream-prev-icon></span> </div> <div class=stream-next title=Älter> <span class=stream-next-icon></span> </div> <?js } else { ?> <div class=\"stream-prev arrow pict\" title=Neuer>&lt;</div> <div class=\"stream-next arrow pict\" title=Älter>&gt;</div> <?js } ?> </div> <div class=item-info> <div class=item-vote{p.voteClass(item.vote)}> <span class=\"pict vote-up\">+</span> <span class=\"pict vote-down\">-</span> <?js if( p.shouldShowScore(item) ) {?> <span class=\"score<?js if(!p.olderThanMinAge(item)){?> score-young<?js}?>\" title=\"{item.up} up, {item.down} down\"> <?js print(item.up - item.down)?> </span> <?js } else { ?> <span class=score-hidden title=\"Score noch unsichtbar\">●●●</span> <?js } ?> </div> <?js if( item.user != p.user.name ) {?> <span class=\"pict vote-fav{p.favClass(item.vote)}\">*</span> <?js } ?> <div class=item-details> <a class=time title={item.date.readableTime()} href=/new/{item.id}>{item.date.relativeTime(true)}</a> <span class=time>von</span> <a href=#user/{item.user} class=\"user um{item.mark}\">{item.user}</a> <span class=item-source> <?js if( item.source ) {?> <span class=pict>s</span>&nbsp;<a href={{item.source}} target=_blank>{{item.source.hostName()}}</a> <?js } else { ?> <span class=pict>s</span>upload</span> <?js } ?>  <?js if( !item.video ) {?> <span class=item-google-search> <span class=pict>g</span>&nbsp; <a href=\"https://www.google.com/searchbyimage?hl=en&amp;safe=off&amp;site=search&amp;image_url=http:{item.image}\" target=_blank> Bild googeln </a> </span> <?js } ?> <?js if( p.user.admin ) { ?> [<span class=action id=item-delete data-id={item.id}>del</span>] [<a href=/new/phash.{item.id}.12>phash</a>] <?js } ?> </div> <div class=item-tags></div> </div> </div> </div> ";

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "<div class=comment-count> <span class=pict>c</span> {\"Kommentar\".inflect(commentCount)} </div> <div class=comments-head> <form class=comment-form method=post> <textarea class=comment name=comment required placeholder=\"Kommentar schreiben…\">\r\n        </textarea> <input type=hidden name=parentId value=0 /> <input type=hidden name=itemId value={params.id} /> <div> <input type=submit value=Abschicken /> <input type=button value=Abbrechen class=cancel /> </div> </form> <form class=comment-edit-form method=post> <textarea class=comment required name=comment></textarea> <input type=hidden name=commentId value=0 /> <div> <input type=submit value=Abschicken /> <input type=button value=Abbrechen class=cancel /> </div> </form> <div class=comments> <?js var recurseComments = function( comments, level ) { ?> <div class=comment-box> <?js for( var i = 0; i < comments.length; i++ ) { var c = comments[i]; ?> <div class=comment-box-inner> <div class=comment{p.voteClass(c.vote)} id=comment{c.id}> <div class=comment-vote> <span class=\"pict vote-up\">+</span> <span class=\"pict vote-down\">-</span> </div> <div class=comment-content> {c.content.format()}</div> <div class=comment-foot> <?js if(c.name == itemUser){?> <span class=user-comment-op>OP</span> <?js}?> <a href=#user/{c.name} class=\"user um{c.mark}\">{c.name}</a> <?js if( p.shouldShowScore(c) ) {?> <span class=score title=\"{c.up} up, {c.down} down\">{\"Punkt\".inflect(c.score)}</span> <?js } else { ?> <span class=score-hidden title=\"Score noch unsichtbar\">●●●</span> <?js } ?> <a href=#{tab}/{itemId}:comment{c.id} class=\"time permalink\" title={c.date.readableTime()}>{c.date.relativeTime(true)}</a> <?js if( level < CONFIG.COMMENTS_MAX_LEVELS ) {?> <a href=#{tab}/{itemId}:comment{c.id} class=\"comment-reply-link action\"> <span class=pict>r</span> antworten </a> <?js } ?> <?js if (c.children.length > 0) {?> <span class=\"fold fold-in action\" title=\"Kommentare einklappen\">[–]</span> <span class=\"fold fold-out action\" title=\"Kommentare ausklappen\">[+]</span> <span class=folded-comments-message> (<span class=folded-comments-count></span> eingeklappt) </span> <?js } ?> <?js if( p.user.admin ) {?> [ <span class=\"comment-delete action\">del</span> / <a href=#{tab}/{itemId}:comment{c.id} class=\"comment-edit-link action\">edit</a> ] <?js } ?> </div> </div> <?js if( c.children.length ) { recurseComments(c.children, level+1); } ?> </div> <?js } ?> </div> <?js }; ?> <?js recurseComments(comments, 1); ?> </div> </div> ";

/***/ })
/******/ ]);