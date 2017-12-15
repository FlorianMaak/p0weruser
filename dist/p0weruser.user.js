// ==UserScript==
// @name		p0weruser
// @namespace	https://github.com/FlorianMaak/p0weruser
// @author		Florian Maak
// @description	Erweitert pr0gramm.com um weitere Funktionen
// @include		/^https?://pr0gramm.com/.*$/
// @icon		https://pr0gramm.com/media/pr0gramm-favicon.png
// @version		0.4.8
// @grant		GM_notification
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @updateURL	https://github.com/FlorianMaak/p0weruser/raw/master/dist/p0weruser.js
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

var	fixUrls = __webpack_require__(9);

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


    static insertAfter(node, reference) {
        reference.parentNode.insertBefore(node, reference.nextSibling);
    }

    static addPrototypes() {
        String.prototype.replaceArray = function(find, replace) {
            let replaceString = this;
            for (let i = 0; i < find.length; i++) {
                replaceString = replaceString.replace(find[i], replace[i]);
            }
            return replaceString;
        };
    }

    // Add constants, related to video-controls
    static addVideoConstants() {
        p.View.Stream.Item.TARGET = {
            NOTHING: 0,
            SEEK_CONTROLS: 1,
            VOLUME_CONTROLS: 2
        };
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Utils;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Settings__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__EventHandler__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__module_WidescreenMode__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__module_RepostMarker__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__module_BenisInNavbar__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bower_components_simplebar_dist_simplebar_css__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__bower_components_simplebar_dist_simplebar_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__bower_components_simplebar_dist_simplebar_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__module_AdvancedComments__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__module_NotificationCenter__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__module_DesktopNotifications__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__module_filterMarks__ = __webpack_require__(33);












class P0weruser {
    constructor() {
        __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].addPrototypes();
        P0weruser.addStyles();
        this.eventHandler = new __WEBPACK_IMPORTED_MODULE_2__EventHandler__["a" /* default */]();
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

        let scrollbar = document.createElement('style');
        scrollbar.innerText = __WEBPACK_IMPORTED_MODULE_6__bower_components_simplebar_dist_simplebar_css___default.a;
        document.getElementsByTagName('head')[0].appendChild(scrollbar);
    }


    static getActivatedModules() {
        let modules = window.localStorage.getItem('activated_modules');

        if (!modules) {
            window.localStorage.setItem('activated_modules', '[]');
            modules = '[]';
        }

        if(modules === '[]') {
            __WEBPACK_IMPORTED_MODULE_0__Settings__["a" /* default */].addHint();
        }

        return JSON.parse(modules);
    }


    static saveActivatedModules(selection) {
        window.localStorage.setItem('activated_modules', JSON.stringify(selection));
    }


    loadModules() {
        let activated = P0weruser.getActivatedModules();

        for (let i = 0; i < activated.length; i++) {
            this.modules[activated[i]].load();
            console.debug(`Loaded module: ${activated[i]}`);
        }
    }


    getModules() {
        if (!this.modules) {
            this.modules = {
                'WidescreenMode': new __WEBPACK_IMPORTED_MODULE_3__module_WidescreenMode__["a" /* default */](),
                'RepostMarker': new __WEBPACK_IMPORTED_MODULE_4__module_RepostMarker__["a" /* default */](),
                'BenisInNavbar': new __WEBPACK_IMPORTED_MODULE_5__module_BenisInNavbar__["a" /* default */](),
                'AdvancedComments': new __WEBPACK_IMPORTED_MODULE_7__module_AdvancedComments__["a" /* default */](),
                'NotificationCenter': new __WEBPACK_IMPORTED_MODULE_8__module_NotificationCenter__["a" /* default */](),
                'DesktopNotifications': new __WEBPACK_IMPORTED_MODULE_9__module_DesktopNotifications__["a" /* default */](),
                'FilterMarks': new __WEBPACK_IMPORTED_MODULE_10__module_filterMarks__["a" /* default */]()
            };
        }

        return this.modules;
    }
}
/* harmony export (immutable) */ __webpack_exports__["default"] = P0weruser;



// Load script
window.p0weruser = new P0weruser();



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * 
 *             SimpleBar.js - v2.4.3
 *             Scrollbars, simpler.
 *             https://grsmto.github.io/simplebar/
 *             
 *             Made by Adrien Grsmto from a fork by Jonathan Nicol
 *             Under MIT License
 *         
 */
!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.SimpleBar=n():t.SimpleBar=n()}(this,function(){return function(t){function n(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return t[r].call(i.exports,i,i.exports,n),i.loaded=!0,i.exports}var e={};return n.m=t,n.c=e,n.p="",n(0)}([function(t,n,e){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(n,"__esModule",{value:!0});var o=function(){function t(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(n,e,r){return e&&t(n.prototype,e),r&&t(n,r),n}}(),c=e(194),s=r(c),u=e(191),a=r(u),f=e(193),l=r(f);e(169),e(174),e(177),e(178),e(172),e(175),e(173),e(176),e(170),e(171),e(113),e(160),e(179),e(180),e(142),e(143),e(144),e(145),e(148),e(146),e(147),e(149),e(150),e(151),e(152),e(154),e(153),e(141),e(168),e(138),e(139),e(140),e(112),e(165),e(163),e(161),e(166),e(167),e(162),e(164),e(155),e(156),e(157),e(159),e(158),e(110),e(111),e(106),e(109),e(108),e(107),e(66),e(132),e(133),e(135),e(134),e(131),e(137),e(136),e(114),e(115),e(116),e(117),e(118),e(119),e(120),e(121),e(122),e(123),e(125),e(124),e(126),e(127),e(128),e(129),e(130),e(181),e(184),e(182),e(183),e(186),e(185),e(189),e(188),e(187),e(192),e(190);var h=function(){function t(n,e){i(this,t),this.el=n,this.flashTimeout,this.contentEl,this.scrollContentEl,this.dragOffset={x:0,y:0},this.isVisible={x:!0,y:!0},this.scrollOffsetAttr={x:"scrollLeft",y:"scrollTop"},this.sizeAttr={x:"offsetWidth",y:"offsetHeight"},this.scrollSizeAttr={x:"scrollWidth",y:"scrollHeight"},this.offsetAttr={x:"left",y:"top"},this.globalObserver,this.mutationObserver,this.resizeObserver,this.currentAxis,this.options=Object.assign({},t.defaultOptions,e),this.classNames=this.options.classNames,this.scrollbarWidth=(0,s.default)(),this.offsetSize=20,this.flashScrollbar=this.flashScrollbar.bind(this),this.onDragY=this.onDragY.bind(this),this.onDragX=this.onDragX.bind(this),this.onScrollY=this.onScrollY.bind(this),this.onScrollX=this.onScrollX.bind(this),this.drag=this.drag.bind(this),this.onEndDrag=this.onEndDrag.bind(this),this.onMouseEnter=this.onMouseEnter.bind(this),this.recalculate=(0,a.default)(this.recalculate,100,{leading:!0,trailing:!1}),this.init()}return o(t,[{key:"init",value:function(){this.el.SimpleBar=this,this.initDOM(),this.scrollbarX=this.trackX.querySelector("."+this.classNames.scrollbar),this.scrollbarY=this.trackY.querySelector("."+this.classNames.scrollbar),this.scrollContentEl.style.paddingRight=(this.scrollbarWidth||this.offsetSize)+"px",this.scrollContentEl.style.marginBottom="-"+(2*this.scrollbarWidth||this.offsetSize)+"px",this.contentEl.style.paddingBottom=(this.scrollbarWidth||this.offsetSize)+"px",0!==this.scrollbarWidth&&(this.contentEl.style.marginRight="-"+this.scrollbarWidth+"px"),this.recalculate(),this.initListeners()}},{key:"initDOM",value:function(){var t=this;if(Array.from(this.el.children).find(function(n){return n.classList.contains(t.classNames.scrollContent)}))this.trackX=this.el.querySelector("."+this.classNames.track+".horizontal"),this.trackY=this.el.querySelector("."+this.classNames.track+".vertical"),this.scrollContentEl=this.el.querySelector("."+this.classNames.scrollContent),this.contentEl=this.el.querySelector("."+this.classNames.content);else{for(this.scrollContentEl=document.createElement("div"),this.contentEl=document.createElement("div"),this.scrollContentEl.classList.add(this.classNames.scrollContent),this.contentEl.classList.add(this.classNames.content);this.el.firstChild;)this.contentEl.appendChild(this.el.firstChild);this.scrollContentEl.appendChild(this.contentEl),this.el.appendChild(this.scrollContentEl)}if(!this.trackX||!this.trackY){var n=document.createElement("div"),e=document.createElement("div");n.classList.add(this.classNames.track),e.classList.add(this.classNames.scrollbar),n.appendChild(e),this.trackX=n.cloneNode(!0),this.trackX.classList.add("horizontal"),this.trackY=n.cloneNode(!0),this.trackY.classList.add("vertical"),this.el.insertBefore(this.trackX,this.el.firstChild),this.el.insertBefore(this.trackY,this.el.firstChild)}this.el.setAttribute("data-simplebar","init")}},{key:"initListeners",value:function(){var t=this;this.options.autoHide&&this.el.addEventListener("mouseenter",this.onMouseEnter),this.scrollbarY.addEventListener("mousedown",this.onDragY),this.scrollbarX.addEventListener("mousedown",this.onDragX),this.scrollContentEl.addEventListener("scroll",this.onScrollY),this.contentEl.addEventListener("scroll",this.onScrollX),"undefined"!=typeof MutationObserver&&(this.mutationObserver=new MutationObserver(function(n){n.forEach(function(n){(t.isChildNode(n.target)||n.addedNodes.length)&&t.recalculate()})}),this.mutationObserver.observe(this.el,{attributes:!0,childList:!0,characterData:!0,subtree:!0})),this.resizeObserver=new l.default(this.recalculate.bind(this)),this.resizeObserver.observe(this.el)}},{key:"removeListeners",value:function(){this.options.autoHide&&this.el.removeEventListener("mouseenter",this.onMouseEnter),this.scrollbarX.removeEventListener("mousedown",this.onDragX),this.scrollbarY.removeEventListener("mousedown",this.onDragY),this.scrollContentEl.removeEventListener("scroll",this.onScrollY),this.contentEl.removeEventListener("scroll",this.onScrollX),this.mutationObserver.disconnect(),this.resizeObserver.disconnect()}},{key:"onDragX",value:function(t){this.onDrag(t,"x")}},{key:"onDragY",value:function(t){this.onDrag(t,"y")}},{key:"onDrag",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"y";t.preventDefault();var e="y"===n?this.scrollbarY:this.scrollbarX,r="y"===n?t.pageY:t.pageX;this.dragOffset[n]=r-e.getBoundingClientRect()[this.offsetAttr[n]],this.currentAxis=n,document.addEventListener("mousemove",this.drag),document.addEventListener("mouseup",this.onEndDrag)}},{key:"drag",value:function(t){var n=void 0,e=void 0,r=void 0;t.preventDefault(),"y"===this.currentAxis?(n=t.pageY,e=this.trackY,r=this.scrollContentEl):(n=t.pageX,e=this.trackX,r=this.contentEl);var i=n-e.getBoundingClientRect()[this.offsetAttr[this.currentAxis]]-this.dragOffset[this.currentAxis],o=i/e[this.sizeAttr[this.currentAxis]],c=o*this.contentEl[this.scrollSizeAttr[this.currentAxis]];r[this.scrollOffsetAttr[this.currentAxis]]=c}},{key:"onEndDrag",value:function(){document.removeEventListener("mousemove",this.drag),document.removeEventListener("mouseup",this.onEndDrag)}},{key:"resizeScrollbar",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y",n=void 0,e=void 0,r=void 0,i=void 0,o=void 0;"x"===t?(n=this.trackX,e=this.scrollbarX,r=this.contentEl[this.scrollOffsetAttr[t]],i=this.contentSizeX,o=this.scrollbarXSize):(n=this.trackY,e=this.scrollbarY,r=this.scrollContentEl[this.scrollOffsetAttr[t]],i=this.contentSizeY,o=this.scrollbarYSize);var c=o/i,s=r/(i-o),u=Math.max(~~(c*(o-2))-2,this.options.scrollbarMinSize),a=~~((o-4-u)*s+2);this.isVisible[t]=o<i,this.isVisible[t]?(n.style.visibility="visible","x"===t?(e.style.left=a+"px",e.style.width=u+"px"):(e.style.top=a+"px",e.style.height=u+"px")):n.style.visibility="hidden"}},{key:"onScrollX",value:function(){this.flashScrollbar("x")}},{key:"onScrollY",value:function(){this.flashScrollbar("y")}},{key:"onMouseEnter",value:function(){this.flashScrollbar("x"),this.flashScrollbar("y")}},{key:"flashScrollbar",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y";this.resizeScrollbar(t),this.showScrollbar(t)}},{key:"showScrollbar",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"y";this.isVisible[t]&&("x"===t?this.scrollbarX.classList.add("visible"):this.scrollbarY.classList.add("visible"),this.options.autoHide&&("number"==typeof this.flashTimeout&&window.clearTimeout(this.flashTimeout),this.flashTimeout=window.setTimeout(this.hideScrollbar.bind(this),1e3)))}},{key:"hideScrollbar",value:function(){this.scrollbarX.classList.remove("visible"),this.scrollbarY.classList.remove("visible"),"number"==typeof this.flashTimeout&&window.clearTimeout(this.flashTimeout)}},{key:"recalculate",value:function(){this.contentSizeX=this.contentEl[this.scrollSizeAttr.x],this.contentSizeY=this.contentEl[this.scrollSizeAttr.y]-(this.scrollbarWidth||this.offsetSize),this.scrollbarXSize=this.trackX[this.sizeAttr.x],this.scrollbarYSize=this.trackY[this.sizeAttr.y],this.resizeScrollbar("x"),this.resizeScrollbar("y"),this.options.autoHide||(this.showScrollbar("x"),this.showScrollbar("y"))}},{key:"getScrollElement",value:function(){return this.scrollContentEl}},{key:"getContentElement",value:function(){return this.contentEl}},{key:"unMount",value:function(){this.removeListeners(),this.el.SimpleBar=null}},{key:"isChildNode",value:function(t){return null!==t&&(t===this.el||this.isChildNode(t.parentNode))}}],[{key:"initHtmlApi",value:function(){this.initDOMLoadedElements=this.initDOMLoadedElements.bind(this),"undefined"!=typeof MutationObserver&&(this.globalObserver=new MutationObserver(function(n){n.forEach(function(n){Array.from(n.addedNodes).forEach(function(n){1===n.nodeType&&(n.hasAttribute("data-simplebar")?!n.SimpleBar&&new t(n,t.getElOptions(n)):Array.from(n.querySelectorAll("[data-simplebar]")).forEach(function(n){!n.SimpleBar&&new t(n,t.getElOptions(n))}))}),Array.from(n.removedNodes).forEach(function(t){1===t.nodeType&&(t.hasAttribute("data-simplebar")?t.SimpleBar&&t.SimpleBar.unMount():Array.from(t.querySelectorAll("[data-simplebar]")).forEach(function(t){t.SimpleBar&&t.SimpleBar.unMount()}))})})}),this.globalObserver.observe(document,{childList:!0,subtree:!0})),"complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll?window.setTimeout(this.initDOMLoadedElements.bind(this)):(document.addEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.addEventListener("load",this.initDOMLoadedElements))}},{key:"getElOptions",value:function(n){var e=Object.keys(t.htmlAttributes).reduce(function(e,r){var i=t.htmlAttributes[r];return n.hasAttribute(i)&&(e[r]=JSON.parse(n.getAttribute(i)||!0)),e},{});return e}},{key:"removeObserver",value:function(){this.globalObserver.disconnect()}},{key:"initDOMLoadedElements",value:function(){document.removeEventListener("DOMContentLoaded",this.initDOMLoadedElements),window.removeEventListener("load",this.initDOMLoadedElements),Array.from(document.querySelectorAll("[data-simplebar]")).forEach(function(n){n.SimpleBar||new t(n,t.getElOptions(n))})}},{key:"defaultOptions",get:function(){return{autoHide:!0,classNames:{content:"simplebar-content",scrollContent:"simplebar-scroll-content",scrollbar:"simplebar-scrollbar",track:"simplebar-track"},scrollbarMinSize:25}}},{key:"htmlAttributes",get:function(){return{autoHide:"data-simplebar-autohide",scrollbarMinSize:"data-simplebar-scrollbar-min-size"}}}]),t}();n.default=h,h.initHtmlApi(),t.exports=n.default},function(t,n,e){var r=e(3),i=e(34),o=e(11),c=e(16),s=e(12),u="prototype",a=function(t,n,e){var f,l,h,v,p=t&a.F,d=t&a.G,y=t&a.S,g=t&a.P,m=t&a.B,b=d?r:y?r[n]||(r[n]={}):(r[n]||{})[u],_=d?i:i[n]||(i[n]={}),w=_[u]||(_[u]={});d&&(e=n);for(f in e)l=!p&&b&&void 0!==b[f],h=(l?b:e)[f],v=m&&l?s(h,r):g&&"function"==typeof h?s(Function.call,h):h,b&&c(b,f,h,t&a.U),_[f]!=h&&o(_,f,v),g&&w[f]!=h&&(w[f]=h)};r.core=i,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,n,e){var r=e(4);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,n){var e=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=e)},function(t,n){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,n,e){var r=e(60)("wks"),i=e(22),o=e(3).Symbol,c="function"==typeof o,s=t.exports=function(t){return r[t]||(r[t]=c&&o[t]||(c?o:i)("Symbol."+t))};s.store=r},function(t,n){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,n,e){var r=e(2),i=e(71),o=e(40),c=Object.defineProperty;n.f=e(9)?Object.defineProperty:function(t,n,e){if(r(t),n=o(n,!0),r(e),i)try{return c(t,n,e)}catch(t){}if("get"in e||"set"in e)throw TypeError("Accessors not supported!");return"value"in e&&(t[n]=e.value),t}},function(t,n,e){var r=e(20),i=Math.min;t.exports=function(t){return t>0?i(r(t),9007199254740991):0}},function(t,n,e){t.exports=!e(6)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,n){var e={}.hasOwnProperty;t.exports=function(t,n){return e.call(t,n)}},function(t,n,e){var r=e(7),i=e(19);t.exports=e(9)?function(t,n,e){return r.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},function(t,n,e){var r=e(17);t.exports=function(t,n,e){if(r(t),void 0===n)return t;switch(e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)}}return function(){return t.apply(n,arguments)}}},function(t,n,e){var r=e(54),i=e(18);t.exports=function(t){return r(i(t))}},function(t,n,e){"use strict";if(e(9)){var r=e(27),i=e(3),o=e(6),c=e(1),s=e(64),u=e(88),a=e(12),f=e(24),l=e(19),h=e(11),v=e(29),p=e(20),d=e(8),y=e(87),g=e(31),m=e(40),b=e(10),_=e(49),w=e(4),S=e(21),x=e(55),E=e(36),O=e(38),M=e(37).f,A=e(65),L=e(22),j=e(5),k=e(33),T=e(48),P=e(61),F=e(66),N=e(26),C=e(44),R=e(46),D=e(47),I=e(67),W=e(7),z=e(15),B=W.f,Y=z.f,X=i.RangeError,G=i.TypeError,V=i.Uint8Array,U="ArrayBuffer",q="Shared"+U,H="BYTES_PER_ELEMENT",K="prototype",J=Array[K],$=u.ArrayBuffer,Q=u.DataView,Z=k(0),tt=k(2),nt=k(3),et=k(4),rt=k(5),it=k(6),ot=T(!0),ct=T(!1),st=F.values,ut=F.keys,at=F.entries,ft=J.lastIndexOf,lt=J.reduce,ht=J.reduceRight,vt=J.join,pt=J.sort,dt=J.slice,yt=J.toString,gt=J.toLocaleString,mt=j("iterator"),bt=j("toStringTag"),_t=L("typed_constructor"),wt=L("def_constructor"),St=s.CONSTR,xt=s.TYPED,Et=s.VIEW,Ot="Wrong length!",Mt=k(1,function(t,n){return Tt(P(t,t[wt]),n)}),At=o(function(){return 1===new V(new Uint16Array([1]).buffer)[0]}),Lt=!!V&&!!V[K].set&&o(function(){new V(1).set({})}),jt=function(t,n){var e=p(t);if(e<0||e%n)throw X("Wrong offset!");return e},kt=function(t){if(w(t)&&xt in t)return t;throw G(t+" is not a typed array!")},Tt=function(t,n){if(!(w(t)&&_t in t))throw G("It is not a typed array constructor!");return new t(n)},Pt=function(t,n){return Ft(P(t,t[wt]),n)},Ft=function(t,n){for(var e=0,r=n.length,i=Tt(t,r);r>e;)i[e]=n[e++];return i},Nt=function(t,n,e){B(t,n,{get:function(){return this._d[e]}})},Ct=function(t){var n,e,r,i,o,c,s=S(t),u=arguments.length,f=u>1?arguments[1]:void 0,l=void 0!==f,h=A(s);if(void 0!=h&&!x(h)){for(c=h.call(s),r=[],n=0;!(o=c.next()).done;n++)r.push(o.value);s=r}for(l&&u>2&&(f=a(f,arguments[2],2)),n=0,e=d(s.length),i=Tt(this,e);e>n;n++)i[n]=l?f(s[n],n):s[n];return i},Rt=function(){for(var t=0,n=arguments.length,e=Tt(this,n);n>t;)e[t]=arguments[t++];return e},Dt=!!V&&o(function(){gt.call(new V(1))}),It=function(){return gt.apply(Dt?dt.call(kt(this)):kt(this),arguments)},Wt={copyWithin:function(t,n){return I.call(kt(this),t,n,arguments.length>2?arguments[2]:void 0)},every:function(t){return et(kt(this),t,arguments.length>1?arguments[1]:void 0)},fill:function(t){return D.apply(kt(this),arguments)},filter:function(t){return Pt(this,tt(kt(this),t,arguments.length>1?arguments[1]:void 0))},find:function(t){return rt(kt(this),t,arguments.length>1?arguments[1]:void 0)},findIndex:function(t){return it(kt(this),t,arguments.length>1?arguments[1]:void 0)},forEach:function(t){Z(kt(this),t,arguments.length>1?arguments[1]:void 0)},indexOf:function(t){return ct(kt(this),t,arguments.length>1?arguments[1]:void 0)},includes:function(t){return ot(kt(this),t,arguments.length>1?arguments[1]:void 0)},join:function(t){return vt.apply(kt(this),arguments)},lastIndexOf:function(t){return ft.apply(kt(this),arguments)},map:function(t){return Mt(kt(this),t,arguments.length>1?arguments[1]:void 0)},reduce:function(t){return lt.apply(kt(this),arguments)},reduceRight:function(t){return ht.apply(kt(this),arguments)},reverse:function(){for(var t,n=this,e=kt(n).length,r=Math.floor(e/2),i=0;i<r;)t=n[i],n[i++]=n[--e],n[e]=t;return n},some:function(t){return nt(kt(this),t,arguments.length>1?arguments[1]:void 0)},sort:function(t){return pt.call(kt(this),t)},subarray:function(t,n){var e=kt(this),r=e.length,i=g(t,r);return new(P(e,e[wt]))(e.buffer,e.byteOffset+i*e.BYTES_PER_ELEMENT,d((void 0===n?r:g(n,r))-i))}},zt=function(t,n){return Pt(this,dt.call(kt(this),t,n))},Bt=function(t){kt(this);var n=jt(arguments[1],1),e=this.length,r=S(t),i=d(r.length),o=0;if(i+n>e)throw X(Ot);for(;o<i;)this[n+o]=r[o++]},Yt={entries:function(){return at.call(kt(this))},keys:function(){return ut.call(kt(this))},values:function(){return st.call(kt(this))}},Xt=function(t,n){return w(t)&&t[xt]&&"symbol"!=typeof n&&n in t&&String(+n)==String(n)},Gt=function(t,n){return Xt(t,n=m(n,!0))?l(2,t[n]):Y(t,n)},Vt=function(t,n,e){return!(Xt(t,n=m(n,!0))&&w(e)&&b(e,"value"))||b(e,"get")||b(e,"set")||e.configurable||b(e,"writable")&&!e.writable||b(e,"enumerable")&&!e.enumerable?B(t,n,e):(t[n]=e.value,t)};St||(z.f=Gt,W.f=Vt),c(c.S+c.F*!St,"Object",{getOwnPropertyDescriptor:Gt,defineProperty:Vt}),o(function(){yt.call({})})&&(yt=gt=function(){return vt.call(this)});var Ut=v({},Wt);v(Ut,Yt),h(Ut,mt,Yt.values),v(Ut,{slice:zt,set:Bt,constructor:function(){},toString:yt,toLocaleString:It}),Nt(Ut,"buffer","b"),Nt(Ut,"byteOffset","o"),Nt(Ut,"byteLength","l"),Nt(Ut,"length","e"),B(Ut,bt,{get:function(){return this[xt]}}),t.exports=function(t,n,e,u){u=!!u;var a=t+(u?"Clamped":"")+"Array",l="get"+t,v="set"+t,p=i[a],g=p||{},m=p&&O(p),b=!p||!s.ABV,S={},x=p&&p[K],A=function(t,e){var r=t._d;return r.v[l](e*n+r.o,At)},L=function(t,e,r){var i=t._d;u&&(r=(r=Math.round(r))<0?0:r>255?255:255&r),i.v[v](e*n+i.o,r,At)},j=function(t,n){B(t,n,{get:function(){return A(this,n)},set:function(t){return L(this,n,t)},enumerable:!0})};b?(p=e(function(t,e,r,i){f(t,p,a,"_d");var o,c,s,u,l=0,v=0;if(w(e)){if(!(e instanceof $||(u=_(e))==U||u==q))return xt in e?Ft(p,e):Ct.call(p,e);o=e,v=jt(r,n);var g=e.byteLength;if(void 0===i){if(g%n)throw X(Ot);if(c=g-v,c<0)throw X(Ot)}else if(c=d(i)*n,c+v>g)throw X(Ot);s=c/n}else s=y(e),c=s*n,o=new $(c);for(h(t,"_d",{b:o,o:v,l:c,e:s,v:new Q(o)});l<s;)j(t,l++)}),x=p[K]=E(Ut),h(x,"constructor",p)):o(function(){p(1)})&&o(function(){new p(-1)})&&C(function(t){new p,new p(null),new p(1.5),new p(t)},!0)||(p=e(function(t,e,r,i){f(t,p,a);var o;return w(e)?e instanceof $||(o=_(e))==U||o==q?void 0!==i?new g(e,jt(r,n),i):void 0!==r?new g(e,jt(r,n)):new g(e):xt in e?Ft(p,e):Ct.call(p,e):new g(y(e))}),Z(m!==Function.prototype?M(g).concat(M(m)):M(g),function(t){t in p||h(p,t,g[t])}),p[K]=x,r||(x.constructor=p));var k=x[mt],T=!!k&&("values"==k.name||void 0==k.name),P=Yt.values;h(p,_t,!0),h(x,xt,a),h(x,Et,!0),h(x,wt,p),(u?new p(1)[bt]==a:bt in x)||B(x,bt,{get:function(){return a}}),S[a]=p,c(c.G+c.W+c.F*(p!=g),S),c(c.S,a,{BYTES_PER_ELEMENT:n}),c(c.S+c.F*o(function(){g.of.call(p,1)}),a,{from:Ct,of:Rt}),H in x||h(x,H,n),c(c.P,a,Wt),R(a),c(c.P+c.F*Lt,a,{set:Bt}),c(c.P+c.F*!T,a,Yt),r||x.toString==yt||(x.toString=yt),c(c.P+c.F*o(function(){new p(1).slice()}),a,{slice:zt}),c(c.P+c.F*(o(function(){return[1,2].toLocaleString()!=new p([1,2]).toLocaleString()})||!o(function(){x.toLocaleString.call([1,2])})),a,{toLocaleString:It}),N[a]=T?k:P,r||T||h(x,mt,P)}}else t.exports=function(){}},function(t,n,e){var r=e(39),i=e(19),o=e(13),c=e(40),s=e(10),u=e(71),a=Object.getOwnPropertyDescriptor;n.f=e(9)?a:function(t,n){if(t=o(t),n=c(n,!0),u)try{return a(t,n)}catch(t){}if(s(t,n))return i(!r.f.call(t,n),t[n])}},function(t,n,e){var r=e(3),i=e(11),o=e(10),c=e(22)("src"),s="toString",u=Function[s],a=(""+u).split(s);e(34).inspectSource=function(t){return u.call(t)},(t.exports=function(t,n,e,s){var u="function"==typeof e;u&&(o(e,"name")||i(e,"name",n)),t[n]!==e&&(u&&(o(e,c)||i(e,c,t[n]?""+t[n]:a.join(String(n)))),t===r?t[n]=e:s?t[n]?t[n]=e:i(t,n,e):(delete t[n],i(t,n,e)))})(Function.prototype,s,function(){return"function"==typeof this&&this[c]||u.call(this)})},function(t,n){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,n){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,n){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},function(t,n){var e=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:e)(t)}},function(t,n,e){var r=e(18);t.exports=function(t){return Object(r(t))}},function(t,n){var e=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++e+r).toString(36))}},function(t,n,e){var r=e(5)("unscopables"),i=Array.prototype;void 0==i[r]&&e(11)(i,r,{}),t.exports=function(t){i[r][t]=!0}},function(t,n){t.exports=function(t,n,e,r){if(!(t instanceof n)||void 0!==r&&r in t)throw TypeError(e+": incorrect invocation!");return t}},function(t,n){var e={}.toString;t.exports=function(t){return e.call(t).slice(8,-1)}},function(t,n){t.exports={}},function(t,n){t.exports=!1},function(t,n,e){var r=e(82),i=e(52);t.exports=Object.keys||function(t){return r(t,i)}},function(t,n,e){var r=e(16);t.exports=function(t,n,e){for(var i in n)r(t,i,n[i],e);return t}},function(t,n,e){var r=e(7).f,i=e(10),o=e(5)("toStringTag");t.exports=function(t,n,e){t&&!i(t=e?t:t.prototype,o)&&r(t,o,{configurable:!0,value:n})}},function(t,n,e){var r=e(20),i=Math.max,o=Math.min;t.exports=function(t,n){return t=r(t),t<0?i(t+n,0):o(t,n)}},function(t,n,e){var r=e(4);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},function(t,n,e){var r=e(12),i=e(54),o=e(21),c=e(8),s=e(91);t.exports=function(t,n){var e=1==t,u=2==t,a=3==t,f=4==t,l=6==t,h=5==t||l,v=n||s;return function(n,s,p){for(var d,y,g=o(n),m=i(g),b=r(s,p,3),_=c(m.length),w=0,S=e?v(n,_):u?v(n,0):void 0;_>w;w++)if((h||w in m)&&(d=m[w],y=b(d,w,g),t))if(e)S[w]=y;else if(y)switch(t){case 3:return!0;case 5:return d;case 6:return w;case 2:S.push(d)}else if(f)return!1;return l?-1:a||f?f:S}}},function(t,n){var e=t.exports={version:"2.5.1"};"number"==typeof __e&&(__e=e)},function(t,n,e){var r=e(22)("meta"),i=e(4),o=e(10),c=e(7).f,s=0,u=Object.isExtensible||function(){return!0},a=!e(6)(function(){return u(Object.preventExtensions({}))}),f=function(t){c(t,r,{value:{i:"O"+ ++s,w:{}}})},l=function(t,n){if(!i(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,r)){if(!u(t))return"F";if(!n)return"E";f(t)}return t[r].i},h=function(t,n){if(!o(t,r)){if(!u(t))return!0;if(!n)return!1;f(t)}return t[r].w},v=function(t){return a&&p.NEED&&u(t)&&!o(t,r)&&f(t),t},p=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:h,onFreeze:v}},function(t,n,e){var r=e(2),i=e(99),o=e(52),c=e(59)("IE_PROTO"),s=function(){},u="prototype",a=function(){var t,n=e(51)("iframe"),r=o.length,i="<",c=">";for(n.style.display="none",e(70).appendChild(n),n.src="javascript:",t=n.contentWindow.document,t.open(),t.write(i+"script"+c+"document.F=Object"+i+"/script"+c),t.close(),a=t.F;r--;)delete a[u][o[r]];return a()};t.exports=Object.create||function(t,n){var e;return null!==t?(s[u]=r(t),e=new s,s[u]=null,e[c]=t):e=a(),void 0===n?e:i(e,n)}},function(t,n,e){var r=e(82),i=e(52).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},function(t,n,e){var r=e(10),i=e(21),o=e(59)("IE_PROTO"),c=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=i(t),r(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?c:null}},function(t,n){n.f={}.propertyIsEnumerable},function(t,n,e){var r=e(4);t.exports=function(t,n){if(!r(t))return t;var e,i;if(n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;if("function"==typeof(e=t.valueOf)&&!r(i=e.call(t)))return i;if(!n&&"function"==typeof(e=t.toString)&&!r(i=e.call(t)))return i;throw TypeError("Can't convert object to primitive value")}},function(t,n,e){"use strict";var r=e(3),i=e(1),o=e(16),c=e(29),s=e(35),u=e(43),a=e(24),f=e(4),l=e(6),h=e(44),v=e(30),p=e(95);t.exports=function(t,n,e,d,y,g){var m=r[t],b=m,_=y?"set":"add",w=b&&b.prototype,S={},x=function(t){var n=w[t];o(w,t,"delete"==t?function(t){return!(g&&!f(t))&&n.call(this,0===t?0:t)}:"has"==t?function(t){return!(g&&!f(t))&&n.call(this,0===t?0:t)}:"get"==t?function(t){return g&&!f(t)?void 0:n.call(this,0===t?0:t)}:"add"==t?function(t){return n.call(this,0===t?0:t),this}:function(t,e){return n.call(this,0===t?0:t,e),this})};if("function"==typeof b&&(g||w.forEach&&!l(function(){(new b).entries().next()}))){var E=new b,O=E[_](g?{}:-0,1)!=E,M=l(function(){E.has(1)}),A=h(function(t){new b(t)}),L=!g&&l(function(){for(var t=new b,n=5;n--;)t[_](n,n);return!t.has(-0)});A||(b=n(function(n,e){a(n,b,t);var r=p(new m,n,b);return void 0!=e&&u(e,y,r[_],r),r}),b.prototype=w,w.constructor=b),(M||L)&&(x("delete"),x("has"),y&&x("get")),(L||O)&&x(_),g&&w.clear&&delete w.clear}else b=d.getConstructor(n,t,y,_),c(b.prototype,e),s.NEED=!0;return v(b,t),S[t]=b,i(i.G+i.W+i.F*(b!=m),S),g||d.setStrong(b,t,y),b}},function(t,n,e){"use strict";var r=e(11),i=e(16),o=e(6),c=e(18),s=e(5);t.exports=function(t,n,e){var u=s(t),a=e(c,u,""[t]),f=a[0],l=a[1];o(function(){var n={};return n[u]=function(){return 7},7!=""[t](n)})&&(i(String.prototype,t,f),r(RegExp.prototype,u,2==n?function(t,n){return l.call(t,this,n)}:function(t){return l.call(t,this)}))}},function(t,n,e){var r=e(12),i=e(76),o=e(55),c=e(2),s=e(8),u=e(65),a={},f={},n=t.exports=function(t,n,e,l,h){var v,p,d,y,g=h?function(){return t}:u(t),m=r(e,l,n?2:1),b=0;if("function"!=typeof g)throw TypeError(t+" is not iterable!");if(o(g)){for(v=s(t.length);v>b;b++)if(y=n?m(c(p=t[b])[0],p[1]):m(t[b]),y===a||y===f)return y}else for(d=g.call(t);!(p=d.next()).done;)if(y=i(d,m,p.value,n),y===a||y===f)return y};n.BREAK=a,n.RETURN=f},function(t,n,e){var r=e(5)("iterator"),i=!1;try{var o=[7][r]();o.return=function(){i=!0},Array.from(o,function(){throw 2})}catch(t){}t.exports=function(t,n){if(!n&&!i)return!1;var e=!1;try{var o=[7],c=o[r]();c.next=function(){return{done:e=!0}},o[r]=function(){return c},t(o)}catch(t){}return e}},function(t,n){n.f=Object.getOwnPropertySymbols},function(t,n,e){"use strict";var r=e(3),i=e(7),o=e(9),c=e(5)("species");t.exports=function(t){var n=r[t];o&&n&&!n[c]&&i.f(n,c,{configurable:!0,get:function(){return this}})}},function(t,n,e){"use strict";var r=e(21),i=e(31),o=e(8);t.exports=function(t){for(var n=r(this),e=o(n.length),c=arguments.length,s=i(c>1?arguments[1]:void 0,e),u=c>2?arguments[2]:void 0,a=void 0===u?e:i(u,e);a>s;)n[s++]=t;return n}},function(t,n,e){var r=e(13),i=e(8),o=e(31);t.exports=function(t){return function(n,e,c){var s,u=r(n),a=i(u.length),f=o(c,a);if(t&&e!=e){for(;a>f;)if(s=u[f++],s!=s)return!0}else for(;a>f;f++)if((t||f in u)&&u[f]===e)return t||f||0;return!t&&-1}}},function(t,n,e){var r=e(25),i=e(5)("toStringTag"),o="Arguments"==r(function(){return arguments}()),c=function(t,n){try{return t[n]}catch(t){}};t.exports=function(t){var n,e,s;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=c(n=Object(t),i))?e:o?r(n):"Object"==(s=r(n))&&"function"==typeof n.callee?"Arguments":s}},function(t,n,e){"use strict";var r=e(7),i=e(19);t.exports=function(t,n,e){n in t?r.f(t,n,i(0,e)):t[n]=e}},function(t,n,e){var r=e(4),i=e(3).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,n){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,n,e){var r=e(5)("match");t.exports=function(t){var n=/./;try{"/./"[t](n)}catch(e){try{return n[r]=!1,!"/./"[t](n)}catch(t){}}return!0}},function(t,n,e){var r=e(25);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,n,e){var r=e(26),i=e(5)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,n){var e=Math.expm1;t.exports=!e||e(10)>22025.465794806718||e(10)<22025.465794806718||e(-2e-17)!=-2e-17?function(t){return 0==(t=+t)?t:t>-1e-6&&t<1e-6?t+t*t/2:Math.exp(t)-1}:e},function(t,n){t.exports=Math.sign||function(t){return 0==(t=+t)||t!=t?t:t<0?-1:1}},function(t,n,e){var r=e(4),i=e(2),o=function(t,n){if(i(t),!r(n)&&null!==n)throw TypeError(n+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,n,r){try{r=e(12)(Function.call,e(15).f(Object.prototype,"__proto__").set,2),r(t,[]),n=!(t instanceof Array)}catch(t){n=!0}return function(t,e){return o(t,e),n?t.__proto__=e:r(t,e),t}}({},!1):void 0),check:o}},function(t,n,e){var r=e(60)("keys"),i=e(22);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,n,e){var r=e(3),i="__core-js_shared__",o=r[i]||(r[i]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,n,e){var r=e(2),i=e(17),o=e(5)("species");t.exports=function(t,n){var e,c=r(t).constructor;return void 0===c||void 0==(e=r(c)[o])?n:i(e)}},function(t,n,e){var r=e(75),i=e(18);t.exports=function(t,n,e){if(r(n))throw TypeError("String#"+e+" doesn't accept regex!");return String(i(t))}},function(t,n,e){var r,i,o,c=e(12),s=e(72),u=e(70),a=e(51),f=e(3),l=f.process,h=f.setImmediate,v=f.clearImmediate,p=f.MessageChannel,d=f.Dispatch,y=0,g={},m="onreadystatechange",b=function(){var t=+this;if(g.hasOwnProperty(t)){var n=g[t];delete g[t],n()}},_=function(t){b.call(t.data)};h&&v||(h=function(t){for(var n=[],e=1;arguments.length>e;)n.push(arguments[e++]);return g[++y]=function(){s("function"==typeof t?t:Function(t),n)},r(y),y},v=function(t){delete g[t]},"process"==e(25)(l)?r=function(t){l.nextTick(c(b,t,1))}:d&&d.now?r=function(t){d.now(c(b,t,1))}:p?(i=new p,o=i.port2,i.port1.onmessage=_,r=c(o.postMessage,o,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",_,!1)):r=m in a("script")?function(t){u.appendChild(a("script"))[m]=function(){u.removeChild(this),b.call(t)}}:function(t){setTimeout(c(b,t,1),0)}),t.exports={set:h,clear:v}},function(t,n,e){for(var r,i=e(3),o=e(11),c=e(22),s=c("typed_array"),u=c("view"),a=!(!i.ArrayBuffer||!i.DataView),f=a,l=0,h=9,v="Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(",");l<h;)(r=i[v[l++]])?(o(r.prototype,s,!0),o(r.prototype,u,!0)):f=!1;t.exports={ABV:a,CONSTR:f,TYPED:s,VIEW:u}},function(t,n,e){var r=e(49),i=e(5)("iterator"),o=e(26);t.exports=e(34).getIteratorMethod=function(t){if(void 0!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,n,e){"use strict";var r=e(23),i=e(78),o=e(26),c=e(13);t.exports=e(77)(Array,"Array",function(t,n){this._t=c(t),this._i=0,this._k=n},function(){var t=this._t,n=this._k,e=this._i++;return!t||e>=t.length?(this._t=void 0,i(1)):"keys"==n?i(0,e):"values"==n?i(0,t[e]):i(0,[e,t[e]])},"values"),o.Arguments=o.Array,r("keys"),r("values"),r("entries")},function(t,n,e){"use strict";var r=e(21),i=e(31),o=e(8);t.exports=[].copyWithin||function(t,n){var e=r(this),c=o(e.length),s=i(t,c),u=i(n,c),a=arguments.length>2?arguments[2]:void 0,f=Math.min((void 0===a?c:i(a,c))-u,c-s),l=1;for(u<s&&s<u+f&&(l=-1,u+=f-1,s+=f-1);f-- >0;)u in e?e[s]=e[u]:delete e[s],s+=l,u+=l;return e}},function(t,n,e){"use strict";var r=e(7).f,i=e(36),o=e(29),c=e(12),s=e(24),u=e(43),a=e(77),f=e(78),l=e(46),h=e(9),v=e(35).fastKey,p=e(32),d=h?"_s":"size",y=function(t,n){var e,r=v(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,a){var f=t(function(t,r){s(t,f,n,"_i"),t._t=n,t._i=i(null),t._f=void 0,t._l=void 0,t[d]=0,void 0!=r&&u(r,e,t[a],t)});return o(f.prototype,{
clear:function(){for(var t=p(this,n),e=t._i,r=t._f;r;r=r.n)r.r=!0,r.p&&(r.p=r.p.n=void 0),delete e[r.i];t._f=t._l=void 0,t[d]=0},delete:function(t){var e=p(this,n),r=y(e,t);if(r){var i=r.n,o=r.p;delete e._i[r.i],r.r=!0,o&&(o.n=i),i&&(i.p=o),e._f==r&&(e._f=i),e._l==r&&(e._l=o),e[d]--}return!!r},forEach:function(t){p(this,n);for(var e,r=c(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!y(p(this,n),t)}}),h&&r(f.prototype,"size",{get:function(){return p(this,n)[d]}}),f},def:function(t,n,e){var r,i,o=y(t,n);return o?o.v=e:(t._l=o={i:i=v(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=o),r&&(r.n=o),t[d]++,"F"!==i&&(t._i[i]=o)),t},getEntry:y,setStrong:function(t,n,e){a(t,n,function(t,e){this._t=p(t,n),this._k=e,this._l=void 0},function(){for(var t=this,n=t._k,e=t._l;e&&e.r;)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?"keys"==n?f(0,e.k):"values"==n?f(0,e.v):f(0,[e.k,e.v]):(t._t=void 0,f(1))},e?"entries":"values",!e,!0),l(n)}}},function(t,n,e){"use strict";var r=e(29),i=e(35).getWeak,o=e(2),c=e(4),s=e(24),u=e(43),a=e(33),f=e(10),l=e(32),h=a(5),v=a(6),p=0,d=function(t){return t._l||(t._l=new y)},y=function(){this.a=[]},g=function(t,n){return h(t.a,function(t){return t[0]===n})};y.prototype={get:function(t){var n=g(this,t);if(n)return n[1]},has:function(t){return!!g(this,t)},set:function(t,n){var e=g(this,t);e?e[1]=n:this.a.push([t,n])},delete:function(t){var n=v(this.a,function(n){return n[0]===t});return~n&&this.a.splice(n,1),!!~n}},t.exports={getConstructor:function(t,n,e,o){var a=t(function(t,r){s(t,a,n,"_i"),t._t=n,t._i=p++,t._l=void 0,void 0!=r&&u(r,e,t[o],t)});return r(a.prototype,{delete:function(t){if(!c(t))return!1;var e=i(t);return e===!0?d(l(this,n)).delete(t):e&&f(e,this._i)&&delete e[this._i]},has:function(t){if(!c(t))return!1;var e=i(t);return e===!0?d(l(this,n)).has(t):e&&f(e,this._i)}}),a},def:function(t,n,e){var r=i(o(n),!0);return r===!0?d(t).set(n,e):r[t._i]=e,t},ufstore:d}},function(t,n,e){var r=e(3).document;t.exports=r&&r.documentElement},function(t,n,e){t.exports=!e(9)&&!e(6)(function(){return 7!=Object.defineProperty(e(51)("div"),"a",{get:function(){return 7}}).a})},function(t,n){t.exports=function(t,n,e){var r=void 0===e;switch(n.length){case 0:return r?t():t.call(e);case 1:return r?t(n[0]):t.call(e,n[0]);case 2:return r?t(n[0],n[1]):t.call(e,n[0],n[1]);case 3:return r?t(n[0],n[1],n[2]):t.call(e,n[0],n[1],n[2]);case 4:return r?t(n[0],n[1],n[2],n[3]):t.call(e,n[0],n[1],n[2],n[3])}return t.apply(e,n)}},function(t,n,e){var r=e(25);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,n,e){var r=e(4),i=Math.floor;t.exports=function(t){return!r(t)&&isFinite(t)&&i(t)===t}},function(t,n,e){var r=e(4),i=e(25),o=e(5)("match");t.exports=function(t){var n;return r(t)&&(void 0!==(n=t[o])?!!n:"RegExp"==i(t))}},function(t,n,e){var r=e(2);t.exports=function(t,n,e,i){try{return i?n(r(e)[0],e[1]):n(e)}catch(n){var o=t.return;throw void 0!==o&&r(o.call(t)),n}}},function(t,n,e){"use strict";var r=e(27),i=e(1),o=e(16),c=e(11),s=e(10),u=e(26),a=e(96),f=e(30),l=e(38),h=e(5)("iterator"),v=!([].keys&&"next"in[].keys()),p="@@iterator",d="keys",y="values",g=function(){return this};t.exports=function(t,n,e,m,b,_,w){a(e,n,m);var S,x,E,O=function(t){if(!v&&t in j)return j[t];switch(t){case d:return function(){return new e(this,t)};case y:return function(){return new e(this,t)}}return function(){return new e(this,t)}},M=n+" Iterator",A=b==y,L=!1,j=t.prototype,k=j[h]||j[p]||b&&j[b],T=k||O(b),P=b?A?O("entries"):T:void 0,F="Array"==n?j.entries||k:k;if(F&&(E=l(F.call(new t)),E!==Object.prototype&&E.next&&(f(E,M,!0),r||s(E,h)||c(E,h,g))),A&&k&&k.name!==y&&(L=!0,T=function(){return k.call(this)}),r&&!w||!v&&!L&&j[h]||c(j,h,T),u[n]=T,u[M]=g,b)if(S={values:A?T:O(y),keys:_?T:O(d),entries:P},w)for(x in S)x in j||o(j,x,S[x]);else i(i.P+i.F*(v||L),n,S);return S}},function(t,n){t.exports=function(t,n){return{value:n,done:!!t}}},function(t,n){t.exports=Math.log1p||function(t){return(t=+t)>-1e-8&&t<1e-8?t-t*t/2:Math.log(1+t)}},function(t,n,e){"use strict";function r(t){var n,e;this.promise=new t(function(t,r){if(void 0!==n||void 0!==e)throw TypeError("Bad Promise constructor");n=t,e=r}),this.resolve=i(n),this.reject=i(e)}var i=e(17);t.exports.f=function(t){return new r(t)}},function(t,n,e){"use strict";var r=e(28),i=e(45),o=e(39),c=e(21),s=e(54),u=Object.assign;t.exports=!u||e(6)(function(){var t={},n={},e=Symbol(),r="abcdefghijklmnopqrst";return t[e]=7,r.split("").forEach(function(t){n[t]=t}),7!=u({},t)[e]||Object.keys(u({},n)).join("")!=r})?function(t,n){for(var e=c(t),u=arguments.length,a=1,f=i.f,l=o.f;u>a;)for(var h,v=s(arguments[a++]),p=f?r(v).concat(f(v)):r(v),d=p.length,y=0;d>y;)l.call(v,h=p[y++])&&(e[h]=v[h]);return e}:u},function(t,n,e){var r=e(10),i=e(13),o=e(48)(!1),c=e(59)("IE_PROTO");t.exports=function(t,n){var e,s=i(t),u=0,a=[];for(e in s)e!=c&&r(s,e)&&a.push(e);for(;n.length>u;)r(s,e=n[u++])&&(~o(a,e)||a.push(e));return a}},function(t,n,e){var r=e(28),i=e(13),o=e(39).f;t.exports=function(t){return function(n){for(var e,c=i(n),s=r(c),u=s.length,a=0,f=[];u>a;)o.call(c,e=s[a++])&&f.push(t?[e,c[e]]:c[e]);return f}}},function(t,n,e){var r=e(37),i=e(45),o=e(2),c=e(3).Reflect;t.exports=c&&c.ownKeys||function(t){var n=r.f(o(t)),e=i.f;return e?n.concat(e(t)):n}},function(t,n,e){var r=e(8),i=e(86),o=e(18);t.exports=function(t,n,e,c){var s=String(o(t)),u=s.length,a=void 0===e?" ":String(e),f=r(n);if(f<=u||""==a)return s;var l=f-u,h=i.call(a,Math.ceil(l/a.length));return h.length>l&&(h=h.slice(0,l)),c?h+s:s+h}},function(t,n,e){"use strict";var r=e(20),i=e(18);t.exports=function(t){var n=String(i(this)),e="",o=r(t);if(o<0||o==1/0)throw RangeError("Count can't be negative");for(;o>0;(o>>>=1)&&(n+=n))1&o&&(e+=n);return e}},function(t,n,e){var r=e(20),i=e(8);t.exports=function(t){if(void 0===t)return 0;var n=r(t),e=i(n);if(n!==e)throw RangeError("Wrong length!");return e}},function(t,n,e){"use strict";function r(t,n,e){var r,i,o,c=Array(e),s=8*e-n-1,u=(1<<s)-1,a=u>>1,f=23===n?B(2,-24)-B(2,-77):0,l=0,h=t<0||0===t&&1/t<0?1:0;for(t=z(t),t!=t||t===I?(i=t!=t?1:0,r=u):(r=Y(X(t)/G),t*(o=B(2,-r))<1&&(r--,o*=2),t+=r+a>=1?f/o:f*B(2,1-a),t*o>=2&&(r++,o/=2),r+a>=u?(i=0,r=u):r+a>=1?(i=(t*o-1)*B(2,n),r+=a):(i=t*B(2,a-1)*B(2,n),r=0));n>=8;c[l++]=255&i,i/=256,n-=8);for(r=r<<n|i,s+=n;s>0;c[l++]=255&r,r/=256,s-=8);return c[--l]|=128*h,c}function i(t,n,e){var r,i=8*e-n-1,o=(1<<i)-1,c=o>>1,s=i-7,u=e-1,a=t[u--],f=127&a;for(a>>=7;s>0;f=256*f+t[u],u--,s-=8);for(r=f&(1<<-s)-1,f>>=-s,s+=n;s>0;r=256*r+t[u],u--,s-=8);if(0===f)f=1-c;else{if(f===o)return r?NaN:a?-I:I;r+=B(2,n),f-=c}return(a?-1:1)*r*B(2,f-n)}function o(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function c(t){return[255&t]}function s(t){return[255&t,t>>8&255]}function u(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function a(t){return r(t,52,8)}function f(t){return r(t,23,4)}function l(t,n,e){M(t[T],n,{get:function(){return this[e]}})}function h(t,n,e,r){var i=+e,o=E(i);if(o+n>t[K])throw D(F);var c=t[H]._b,s=o+t[J],u=c.slice(s,s+n);return r?u:u.reverse()}function v(t,n,e,r,i,o){var c=+e,s=E(c);if(s+n>t[K])throw D(F);for(var u=t[H]._b,a=s+t[J],f=r(+i),l=0;l<n;l++)u[a+l]=f[o?l:n-l-1]}var p=e(3),d=e(9),y=e(27),g=e(64),m=e(11),b=e(29),_=e(6),w=e(24),S=e(20),x=e(8),E=e(87),O=e(37).f,M=e(7).f,A=e(47),L=e(30),j="ArrayBuffer",k="DataView",T="prototype",P="Wrong length!",F="Wrong index!",N=p[j],C=p[k],R=p.Math,D=p.RangeError,I=p.Infinity,W=N,z=R.abs,B=R.pow,Y=R.floor,X=R.log,G=R.LN2,V="buffer",U="byteLength",q="byteOffset",H=d?"_b":V,K=d?"_l":U,J=d?"_o":q;if(g.ABV){if(!_(function(){N(1)})||!_(function(){new N(-1)})||_(function(){return new N,new N(1.5),new N(NaN),N.name!=j})){N=function(t){return w(this,N),new W(E(t))};for(var $,Q=N[T]=W[T],Z=O(W),tt=0;Z.length>tt;)($=Z[tt++])in N||m(N,$,W[$]);y||(Q.constructor=N)}var nt=new C(new N(2)),et=C[T].setInt8;nt.setInt8(0,2147483648),nt.setInt8(1,2147483649),!nt.getInt8(0)&&nt.getInt8(1)||b(C[T],{setInt8:function(t,n){et.call(this,t,n<<24>>24)},setUint8:function(t,n){et.call(this,t,n<<24>>24)}},!0)}else N=function(t){w(this,N,j);var n=E(t);this._b=A.call(Array(n),0),this[K]=n},C=function(t,n,e){w(this,C,k),w(t,N,k);var r=t[K],i=S(n);if(i<0||i>r)throw D("Wrong offset!");if(e=void 0===e?r-i:x(e),i+e>r)throw D(P);this[H]=t,this[J]=i,this[K]=e},d&&(l(N,U,"_l"),l(C,V,"_b"),l(C,U,"_l"),l(C,q,"_o")),b(C[T],{getInt8:function(t){return h(this,1,t)[0]<<24>>24},getUint8:function(t){return h(this,1,t)[0]},getInt16:function(t){var n=h(this,2,t,arguments[1]);return(n[1]<<8|n[0])<<16>>16},getUint16:function(t){var n=h(this,2,t,arguments[1]);return n[1]<<8|n[0]},getInt32:function(t){return o(h(this,4,t,arguments[1]))},getUint32:function(t){return o(h(this,4,t,arguments[1]))>>>0},getFloat32:function(t){return i(h(this,4,t,arguments[1]),23,4)},getFloat64:function(t){return i(h(this,8,t,arguments[1]),52,8)},setInt8:function(t,n){v(this,1,t,c,n)},setUint8:function(t,n){v(this,1,t,c,n)},setInt16:function(t,n){v(this,2,t,s,n,arguments[2])},setUint16:function(t,n){v(this,2,t,s,n,arguments[2])},setInt32:function(t,n){v(this,4,t,u,n,arguments[2])},setUint32:function(t,n){v(this,4,t,u,n,arguments[2])},setFloat32:function(t,n){v(this,4,t,f,n,arguments[2])},setFloat64:function(t,n){v(this,8,t,a,n,arguments[2])}});L(N,j),L(C,k),m(C[T],g.VIEW,!0),n[j]=N,n[k]=C},function(t,n,e){n.f=e(5)},function(t,n,e){var r=e(4),i=e(73),o=e(5)("species");t.exports=function(t){var n;return i(t)&&(n=t.constructor,"function"!=typeof n||n!==Array&&!i(n.prototype)||(n=void 0),r(n)&&(n=n[o],null===n&&(n=void 0))),void 0===n?Array:n}},function(t,n,e){var r=e(90);t.exports=function(t,n){return new(r(t))(n)}},function(t,n,e){"use strict";var r=e(17),i=e(4),o=e(72),c=[].slice,s={},u=function(t,n,e){if(!(n in s)){for(var r=[],i=0;i<n;i++)r[i]="a["+i+"]";s[n]=Function("F,a","return new F("+r.join(",")+")")}return s[n](t,e)};t.exports=Function.bind||function(t){var n=r(this),e=c.call(arguments,1),s=function(){var r=e.concat(c.call(arguments));return this instanceof s?u(n,r.length,r):o(n,r,t)};return i(n.prototype)&&(s.prototype=n.prototype),s}},function(t,n,e){var r=e(28),i=e(45),o=e(39);t.exports=function(t){var n=r(t),e=i.f;if(e)for(var c,s=e(t),u=o.f,a=0;s.length>a;)u.call(t,c=s[a++])&&n.push(c);return n}},function(t,n,e){"use strict";var r=e(2);t.exports=function(){var t=r(this),n="";return t.global&&(n+="g"),t.ignoreCase&&(n+="i"),t.multiline&&(n+="m"),t.unicode&&(n+="u"),t.sticky&&(n+="y"),n}},function(t,n,e){var r=e(4),i=e(58).set;t.exports=function(t,n,e){var o,c=n.constructor;return c!==e&&"function"==typeof c&&(o=c.prototype)!==e.prototype&&r(o)&&i&&i(t,o),t}},function(t,n,e){"use strict";var r=e(36),i=e(19),o=e(30),c={};e(11)(c,e(5)("iterator"),function(){return this}),t.exports=function(t,n,e){t.prototype=r(c,{next:i(1,e)}),o(t,n+" Iterator")}},function(t,n,e){var r=e(57),i=Math.pow,o=i(2,-52),c=i(2,-23),s=i(2,127)*(2-c),u=i(2,-126),a=function(t){return t+1/o-1/o};t.exports=Math.fround||function(t){var n,e,i=Math.abs(t),f=r(t);return i<u?f*a(i/u/c)*u*c:(n=(1+c/o)*i,e=n-(n-i),e>s||e!=e?f*(1/0):f*e)}},function(t,n,e){var r=e(3),i=e(63).set,o=r.MutationObserver||r.WebKitMutationObserver,c=r.process,s=r.Promise,u="process"==e(25)(c);t.exports=function(){var t,n,e,a=function(){var r,i;for(u&&(r=c.domain)&&r.exit();t;){i=t.fn,t=t.next;try{i()}catch(r){throw t?e():n=void 0,r}}n=void 0,r&&r.enter()};if(u)e=function(){c.nextTick(a)};else if(o){var f=!0,l=document.createTextNode("");new o(a).observe(l,{characterData:!0}),e=function(){l.data=f=!f}}else if(s&&s.resolve){var h=s.resolve();e=function(){h.then(a)}}else e=function(){i.call(r,a)};return function(r){var i={fn:r,next:void 0};n&&(n.next=i),t||(t=i,e()),n=i}}},function(t,n,e){var r=e(7),i=e(2),o=e(28);t.exports=e(9)?Object.defineProperties:function(t,n){i(t);for(var e,c=o(n),s=c.length,u=0;s>u;)r.f(t,e=c[u++],n[e]);return t}},function(t,n,e){var r=e(13),i=e(37).f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return i(t)}catch(t){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?s(t):i(r(t))}},function(t,n){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,n,e){var r=e(2),i=e(4),o=e(80);t.exports=function(t,n){if(r(t),i(n)&&n.constructor===t)return n;var e=o.f(t),c=e.resolve;return c(n),e.promise}},function(t,n){t.exports=Object.is||function(t,n){return t===n?0!==t||1/t===1/n:t!=t&&n!=n}},function(t,n,e){var r=e(20),i=e(18);t.exports=function(t){return function(n,e){var o,c,s=String(i(n)),u=r(e),a=s.length;return u<0||u>=a?t?"":void 0:(o=s.charCodeAt(u),o<55296||o>56319||u+1===a||(c=s.charCodeAt(u+1))<56320||c>57343?t?s.charAt(u):o:t?s.slice(u,u+2):(o-55296<<10)+(c-56320)+65536)}}},function(t,n,e){var r=e(3),i=e(34),o=e(27),c=e(89),s=e(7).f;t.exports=function(t){var n=i.Symbol||(i.Symbol=o?{}:r.Symbol||{});"_"==t.charAt(0)||t in n||s(n,t,{value:c.f(t)})}},function(t,n,e){var r=e(1);r(r.P,"Array",{copyWithin:e(67)}),e(23)("copyWithin")},function(t,n,e){var r=e(1);r(r.P,"Array",{fill:e(47)}),e(23)("fill")},function(t,n,e){"use strict";var r=e(1),i=e(33)(6),o="findIndex",c=!0;o in[]&&Array(1)[o](function(){c=!1}),r(r.P+r.F*c,"Array",{findIndex:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),e(23)(o)},function(t,n,e){"use strict";var r=e(1),i=e(33)(5),o="find",c=!0;o in[]&&Array(1)[o](function(){c=!1}),r(r.P+r.F*c,"Array",{find:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),e(23)(o)},function(t,n,e){"use strict";var r=e(12),i=e(1),o=e(21),c=e(76),s=e(55),u=e(8),a=e(50),f=e(65);i(i.S+i.F*!e(44)(function(t){Array.from(t)}),"Array",{from:function(t){var n,e,i,l,h=o(t),v="function"==typeof this?this:Array,p=arguments.length,d=p>1?arguments[1]:void 0,y=void 0!==d,g=0,m=f(h);if(y&&(d=r(d,p>2?arguments[2]:void 0,2)),void 0==m||v==Array&&s(m))for(n=u(h.length),e=new v(n);n>g;g++)a(e,g,y?d(h[g],g):h[g]);else for(l=m.call(h),e=new v;!(i=l.next()).done;g++)a(e,g,y?c(l,d,[i.value,g],!0):i.value);return e.length=g,e}})},function(t,n,e){"use strict";var r=e(1),i=e(50);r(r.S+r.F*e(6)(function(){function t(){}return!(Array.of.call(t)instanceof t)}),"Array",{of:function(){for(var t=0,n=arguments.length,e=new("function"==typeof this?this:Array)(n);n>t;)i(e,t,arguments[t++]);return e.length=n,e}})},function(t,n,e){var r=e(7).f,i=Function.prototype,o=/^\s*function ([^ (]*)/,c="name";c in i||e(9)&&r(i,c,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},function(t,n,e){"use strict";var r=e(68),i=e(32),o="Map";t.exports=e(41)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{get:function(t){var n=r.getEntry(i(this,o),t);return n&&n.v},set:function(t,n){return r.def(i(this,o),0===t?0:t,n)}},r,!0)},function(t,n,e){var r=e(1),i=e(79),o=Math.sqrt,c=Math.acosh;r(r.S+r.F*!(c&&710==Math.floor(c(Number.MAX_VALUE))&&c(1/0)==1/0),"Math",{acosh:function(t){return(t=+t)<1?NaN:t>94906265.62425156?Math.log(t)+Math.LN2:i(t-1+o(t-1)*o(t+1))}})},function(t,n,e){function r(t){return isFinite(t=+t)&&0!=t?t<0?-r(-t):Math.log(t+Math.sqrt(t*t+1)):t}var i=e(1),o=Math.asinh;i(i.S+i.F*!(o&&1/o(0)>0),"Math",{asinh:r})},function(t,n,e){var r=e(1),i=Math.atanh;r(r.S+r.F*!(i&&1/i(-0)<0),"Math",{atanh:function(t){return 0==(t=+t)?t:Math.log((1+t)/(1-t))/2}})},function(t,n,e){var r=e(1),i=e(57);r(r.S,"Math",{cbrt:function(t){return i(t=+t)*Math.pow(Math.abs(t),1/3)}})},function(t,n,e){var r=e(1);r(r.S,"Math",{clz32:function(t){return(t>>>=0)?31-Math.floor(Math.log(t+.5)*Math.LOG2E):32}})},function(t,n,e){var r=e(1),i=Math.exp;r(r.S,"Math",{cosh:function(t){return(i(t=+t)+i(-t))/2}})},function(t,n,e){var r=e(1),i=e(56);r(r.S+r.F*(i!=Math.expm1),"Math",{expm1:i})},function(t,n,e){var r=e(1);r(r.S,"Math",{fround:e(97)})},function(t,n,e){var r=e(1),i=Math.abs;r(r.S,"Math",{hypot:function(t,n){for(var e,r,o=0,c=0,s=arguments.length,u=0;c<s;)e=i(arguments[c++]),u<e?(r=u/e,o=o*r*r+1,u=e):e>0?(r=e/u,o+=r*r):o+=e;return u===1/0?1/0:u*Math.sqrt(o)}})},function(t,n,e){var r=e(1),i=Math.imul;r(r.S+r.F*e(6)(function(){return i(4294967295,5)!=-5||2!=i.length}),"Math",{imul:function(t,n){var e=65535,r=+t,i=+n,o=e&r,c=e&i;return 0|o*c+((e&r>>>16)*c+o*(e&i>>>16)<<16>>>0)}})},function(t,n,e){var r=e(1);r(r.S,"Math",{log10:function(t){return Math.log(t)*Math.LOG10E}})},function(t,n,e){var r=e(1);r(r.S,"Math",{log1p:e(79)})},function(t,n,e){var r=e(1);r(r.S,"Math",{log2:function(t){return Math.log(t)/Math.LN2}})},function(t,n,e){var r=e(1);r(r.S,"Math",{sign:e(57)})},function(t,n,e){var r=e(1),i=e(56),o=Math.exp;r(r.S+r.F*e(6)(function(){return!Math.sinh(-2e-17)!=-2e-17}),"Math",{sinh:function(t){return Math.abs(t=+t)<1?(i(t)-i(-t))/2:(o(t-1)-o(-t-1))*(Math.E/2)}})},function(t,n,e){var r=e(1),i=e(56),o=Math.exp;r(r.S,"Math",{tanh:function(t){var n=i(t=+t),e=i(-t);return n==1/0?1:e==1/0?-1:(n-e)/(o(t)+o(-t))}})},function(t,n,e){var r=e(1);r(r.S,"Math",{trunc:function(t){return(t>0?Math.floor:Math.ceil)(t)}})},function(t,n,e){var r=e(1);r(r.S,"Number",{EPSILON:Math.pow(2,-52)})},function(t,n,e){var r=e(1),i=e(3).isFinite;r(r.S,"Number",{isFinite:function(t){return"number"==typeof t&&i(t)}})},function(t,n,e){var r=e(1);r(r.S,"Number",{isInteger:e(74)})},function(t,n,e){var r=e(1);r(r.S,"Number",{isNaN:function(t){return t!=t}})},function(t,n,e){var r=e(1),i=e(74),o=Math.abs;r(r.S,"Number",{isSafeInteger:function(t){return i(t)&&o(t)<=9007199254740991}})},function(t,n,e){var r=e(1);r(r.S,"Number",{MAX_SAFE_INTEGER:9007199254740991})},function(t,n,e){var r=e(1);r(r.S,"Number",{MIN_SAFE_INTEGER:-9007199254740991})},function(t,n,e){var r=e(1);r(r.S+r.F,"Object",{assign:e(81)})},function(t,n,e){var r=e(1);r(r.S,"Object",{is:e(103)})},function(t,n,e){var r=e(1);r(r.S,"Object",{setPrototypeOf:e(58).set})},function(t,n,e){"use strict";var r,i,o,c,s=e(27),u=e(3),a=e(12),f=e(49),l=e(1),h=e(4),v=e(17),p=e(24),d=e(43),y=e(61),g=e(63).set,m=e(98)(),b=e(80),_=e(101),w=e(102),S="Promise",x=u.TypeError,E=u.process,O=u[S],M="process"==f(E),A=function(){},L=i=b.f,j=!!function(){try{var t=O.resolve(1),n=(t.constructor={})[e(5)("species")]=function(t){t(A,A)};return(M||"function"==typeof PromiseRejectionEvent)&&t.then(A)instanceof n}catch(t){}}(),k=function(t){var n;return!(!h(t)||"function"!=typeof(n=t.then))&&n},T=function(t,n){if(!t._n){t._n=!0;var e=t._c;m(function(){for(var r=t._v,i=1==t._s,o=0,c=function(n){var e,o,c=i?n.ok:n.fail,s=n.resolve,u=n.reject,a=n.domain;try{c?(i||(2==t._h&&N(t),t._h=1),c===!0?e=r:(a&&a.enter(),e=c(r),a&&a.exit()),e===n.promise?u(x("Promise-chain cycle")):(o=k(e))?o.call(e,s,u):s(e)):u(r)}catch(t){u(t)}};e.length>o;)c(e[o++]);t._c=[],t._n=!1,n&&!t._h&&P(t)})}},P=function(t){g.call(u,function(){var n,e,r,i=t._v,o=F(t);if(o&&(n=_(function(){M?E.emit("unhandledRejection",i,t):(e=u.onunhandledrejection)?e({promise:t,reason:i}):(r=u.console)&&r.error&&r.error("Unhandled promise rejection",i)}),t._h=M||F(t)?2:1),t._a=void 0,o&&n.e)throw n.v})},F=function(t){if(1==t._h)return!1;for(var n,e=t._a||t._c,r=0;e.length>r;)if(n=e[r++],n.fail||!F(n.promise))return!1;return!0},N=function(t){g.call(u,function(){var n;M?E.emit("rejectionHandled",t):(n=u.onrejectionhandled)&&n({promise:t,reason:t._v})})},C=function(t){var n=this;n._d||(n._d=!0,n=n._w||n,n._v=t,n._s=2,n._a||(n._a=n._c.slice()),T(n,!0))},R=function(t){var n,e=this;if(!e._d){e._d=!0,e=e._w||e;try{if(e===t)throw x("Promise can't be resolved itself");(n=k(t))?m(function(){var r={_w:e,_d:!1};try{n.call(t,a(R,r,1),a(C,r,1))}catch(t){C.call(r,t)}}):(e._v=t,e._s=1,T(e,!1))}catch(t){C.call({_w:e,_d:!1},t)}}};j||(O=function(t){p(this,O,S,"_h"),v(t),r.call(this);try{t(a(R,this,1),a(C,this,1))}catch(t){C.call(this,t)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=e(29)(O.prototype,{then:function(t,n){var e=L(y(this,O));return e.ok="function"!=typeof t||t,e.fail="function"==typeof n&&n,e.domain=M?E.domain:void 0,this._c.push(e),this._a&&this._a.push(e),this._s&&T(this,!1),e.promise},catch:function(t){return this.then(void 0,t)}}),o=function(){var t=new r;this.promise=t,this.resolve=a(R,t,1),this.reject=a(C,t,1)},b.f=L=function(t){return t===O||t===c?new o(t):i(t)}),l(l.G+l.W+l.F*!j,{Promise:O}),e(30)(O,S),e(46)(S),c=e(34)[S],l(l.S+l.F*!j,S,{reject:function(t){var n=L(this),e=n.reject;return e(t),n.promise}}),l(l.S+l.F*(s||!j),S,{resolve:function(t){return w(s&&this===c?O:this,t)}}),l(l.S+l.F*!(j&&e(44)(function(t){O.all(t).catch(A)})),S,{all:function(t){var n=this,e=L(n),r=e.resolve,i=e.reject,o=_(function(){var e=[],o=0,c=1;d(t,!1,function(t){var s=o++,u=!1;e.push(void 0),c++,n.resolve(t).then(function(t){u||(u=!0,e[s]=t,--c||r(e))},i)}),--c||r(e)});return o.e&&i(o.v),e.promise},race:function(t){var n=this,e=L(n),r=e.reject,i=_(function(){d(t,!1,function(t){n.resolve(t).then(e.resolve,r)})});return i.e&&r(i.v),e.promise}})},function(t,n,e){var r=e(1),i=e(17),o=e(2),c=(e(3).Reflect||{}).apply,s=Function.apply;r(r.S+r.F*!e(6)(function(){c(function(){})}),"Reflect",{apply:function(t,n,e){var r=i(t),u=o(e);return c?c(r,n,u):s.call(r,n,u)}})},function(t,n,e){var r=e(1),i=e(36),o=e(17),c=e(2),s=e(4),u=e(6),a=e(92),f=(e(3).Reflect||{}).construct,l=u(function(){function t(){}return!(f(function(){},[],t)instanceof t)}),h=!u(function(){f(function(){})});r(r.S+r.F*(l||h),"Reflect",{construct:function(t,n){o(t),c(n);var e=arguments.length<3?t:o(arguments[2]);if(h&&!l)return f(t,n,e);if(t==e){switch(n.length){case 0:return new t;case 1:return new t(n[0]);case 2:return new t(n[0],n[1]);case 3:return new t(n[0],n[1],n[2]);case 4:return new t(n[0],n[1],n[2],n[3])}var r=[null];return r.push.apply(r,n),new(a.apply(t,r))}var u=e.prototype,v=i(s(u)?u:Object.prototype),p=Function.apply.call(t,v,n);return s(p)?p:v}})},function(t,n,e){var r=e(7),i=e(1),o=e(2),c=e(40);i(i.S+i.F*e(6)(function(){Reflect.defineProperty(r.f({},1,{value:1}),1,{value:2})}),"Reflect",{defineProperty:function(t,n,e){o(t),n=c(n,!0),o(e);try{return r.f(t,n,e),!0}catch(t){return!1}}})},function(t,n,e){var r=e(1),i=e(15).f,o=e(2);r(r.S,"Reflect",{deleteProperty:function(t,n){var e=i(o(t),n);return!(e&&!e.configurable)&&delete t[n]}})},function(t,n,e){var r=e(15),i=e(1),o=e(2);i(i.S,"Reflect",{getOwnPropertyDescriptor:function(t,n){return r.f(o(t),n)}})},function(t,n,e){var r=e(1),i=e(38),o=e(2);r(r.S,"Reflect",{getPrototypeOf:function(t){return i(o(t))}})},function(t,n,e){function r(t,n){var e,s,f=arguments.length<3?t:arguments[2];return a(t)===f?t[n]:(e=i.f(t,n))?c(e,"value")?e.value:void 0!==e.get?e.get.call(f):void 0:u(s=o(t))?r(s,n,f):void 0}var i=e(15),o=e(38),c=e(10),s=e(1),u=e(4),a=e(2);s(s.S,"Reflect",{get:r})},function(t,n,e){var r=e(1);r(r.S,"Reflect",{has:function(t,n){return n in t}})},function(t,n,e){var r=e(1),i=e(2),o=Object.isExtensible;r(r.S,"Reflect",{isExtensible:function(t){return i(t),!o||o(t)}})},function(t,n,e){var r=e(1);r(r.S,"Reflect",{ownKeys:e(84)})},function(t,n,e){var r=e(1),i=e(2),o=Object.preventExtensions;r(r.S,"Reflect",{preventExtensions:function(t){i(t);try{return o&&o(t),!0}catch(t){return!1}}})},function(t,n,e){var r=e(1),i=e(58);i&&r(r.S,"Reflect",{setPrototypeOf:function(t,n){i.check(t,n);try{return i.set(t,n),!0}catch(t){return!1}}})},function(t,n,e){function r(t,n,e){var u,h,v=arguments.length<4?t:arguments[3],p=o.f(f(t),n);if(!p){if(l(h=c(t)))return r(h,n,e,v);p=a(0)}return s(p,"value")?!(p.writable===!1||!l(v))&&(u=o.f(v,n)||a(0),u.value=e,i.f(v,n,u),!0):void 0!==p.set&&(p.set.call(v,e),!0)}var i=e(7),o=e(15),c=e(38),s=e(10),u=e(1),a=e(19),f=e(2),l=e(4);u(u.S,"Reflect",{set:r})},function(t,n,e){e(9)&&"g"!=/./g.flags&&e(7).f(RegExp.prototype,"flags",{configurable:!0,get:e(94)})},function(t,n,e){e(42)("match",1,function(t,n,e){return[function(e){"use strict";var r=t(this),i=void 0==e?void 0:e[n];return void 0!==i?i.call(e,r):new RegExp(e)[n](String(r))},e]})},function(t,n,e){e(42)("replace",2,function(t,n,e){return[function(r,i){"use strict";var o=t(this),c=void 0==r?void 0:r[n];return void 0!==c?c.call(r,o,i):e.call(String(o),r,i)},e]})},function(t,n,e){e(42)("search",1,function(t,n,e){return[function(e){"use strict";var r=t(this),i=void 0==e?void 0:e[n];return void 0!==i?i.call(e,r):new RegExp(e)[n](String(r))},e]})},function(t,n,e){e(42)("split",2,function(t,n,r){"use strict";var i=e(75),o=r,c=[].push,s="split",u="length",a="lastIndex";if("c"=="abbc"[s](/(b)*/)[1]||4!="test"[s](/(?:)/,-1)[u]||2!="ab"[s](/(?:ab)*/)[u]||4!="."[s](/(.?)(.?)/)[u]||"."[s](/()()/)[u]>1||""[s](/.?/)[u]){var f=void 0===/()??/.exec("")[1];r=function(t,n){var e=String(this);if(void 0===t&&0===n)return[];if(!i(t))return o.call(e,t,n);var r,s,l,h,v,p=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),y=0,g=void 0===n?4294967295:n>>>0,m=new RegExp(t.source,d+"g");for(f||(r=new RegExp("^"+m.source+"$(?!\\s)",d));(s=m.exec(e))&&(l=s.index+s[0][u],!(l>y&&(p.push(e.slice(y,s.index)),!f&&s[u]>1&&s[0].replace(r,function(){for(v=1;v<arguments[u]-2;v++)void 0===arguments[v]&&(s[v]=void 0)}),s[u]>1&&s.index<e[u]&&c.apply(p,s.slice(1)),h=s[0][u],y=l,p[u]>=g)));)m[a]===s.index&&m[a]++;return y===e[u]?!h&&m.test("")||p.push(""):p.push(e.slice(y)),p[u]>g?p.slice(0,g):p}}else"0"[s](void 0,0)[u]&&(r=function(t,n){return void 0===t&&0===n?[]:o.call(this,t,n)});return[function(e,i){var o=t(this),c=void 0==e?void 0:e[n];return void 0!==c?c.call(e,o,i):r.call(String(o),e,i)},r]})},function(t,n,e){"use strict";var r=e(68),i=e(32),o="Set";t.exports=e(41)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(i(this,o),t=0===t?0:t,t)}},r)},function(t,n,e){"use strict";var r=e(1),i=e(104)(!1);r(r.P,"String",{codePointAt:function(t){return i(this,t)}})},function(t,n,e){"use strict";var r=e(1),i=e(8),o=e(62),c="endsWith",s=""[c];r(r.P+r.F*e(53)(c),"String",{endsWith:function(t){var n=o(this,t,c),e=arguments.length>1?arguments[1]:void 0,r=i(n.length),u=void 0===e?r:Math.min(i(e),r),a=String(t);return s?s.call(n,a,u):n.slice(u-a.length,u)===a}})},function(t,n,e){var r=e(1),i=e(31),o=String.fromCharCode,c=String.fromCodePoint;r(r.S+r.F*(!!c&&1!=c.length),"String",{fromCodePoint:function(t){for(var n,e=[],r=arguments.length,c=0;r>c;){if(n=+arguments[c++],i(n,1114111)!==n)throw RangeError(n+" is not a valid code point");e.push(n<65536?o(n):o(((n-=65536)>>10)+55296,n%1024+56320))}return e.join("")}})},function(t,n,e){"use strict";var r=e(1),i=e(62),o="includes";r(r.P+r.F*e(53)(o),"String",{includes:function(t){return!!~i(this,t,o).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},function(t,n,e){var r=e(1),i=e(13),o=e(8);r(r.S,"String",{raw:function(t){for(var n=i(t.raw),e=o(n.length),r=arguments.length,c=[],s=0;e>s;)c.push(String(n[s++])),s<r&&c.push(String(arguments[s]));return c.join("")}})},function(t,n,e){var r=e(1);r(r.P,"String",{repeat:e(86)})},function(t,n,e){"use strict";var r=e(1),i=e(8),o=e(62),c="startsWith",s=""[c];r(r.P+r.F*e(53)(c),"String",{startsWith:function(t){var n=o(this,t,c),e=i(Math.min(arguments.length>1?arguments[1]:void 0,n.length)),r=String(t);return s?s.call(n,r,e):n.slice(e,e+r.length)===r}})},function(t,n,e){"use strict";var r=e(3),i=e(10),o=e(9),c=e(1),s=e(16),u=e(35).KEY,a=e(6),f=e(60),l=e(30),h=e(22),v=e(5),p=e(89),d=e(105),y=e(93),g=e(73),m=e(2),b=e(13),_=e(40),w=e(19),S=e(36),x=e(100),E=e(15),O=e(7),M=e(28),A=E.f,L=O.f,j=x.f,k=r.Symbol,T=r.JSON,P=T&&T.stringify,F="prototype",N=v("_hidden"),C=v("toPrimitive"),R={}.propertyIsEnumerable,D=f("symbol-registry"),I=f("symbols"),W=f("op-symbols"),z=Object[F],B="function"==typeof k,Y=r.QObject,X=!Y||!Y[F]||!Y[F].findChild,G=o&&a(function(){return 7!=S(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a})?function(t,n,e){var r=A(z,n);r&&delete z[n],L(t,n,e),r&&t!==z&&L(z,n,r)}:L,V=function(t){var n=I[t]=S(k[F]);return n._k=t,n},U=B&&"symbol"==typeof k.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof k},q=function(t,n,e){return t===z&&q(W,n,e),m(t),n=_(n,!0),m(e),i(I,n)?(e.enumerable?(i(t,N)&&t[N][n]&&(t[N][n]=!1),e=S(e,{enumerable:w(0,!1)})):(i(t,N)||L(t,N,w(1,{})),t[N][n]=!0),G(t,n,e)):L(t,n,e)},H=function(t,n){m(t);for(var e,r=y(n=b(n)),i=0,o=r.length;o>i;)q(t,e=r[i++],n[e]);return t},K=function(t,n){return void 0===n?S(t):H(S(t),n)},J=function(t){var n=R.call(this,t=_(t,!0));return!(this===z&&i(I,t)&&!i(W,t))&&(!(n||!i(this,t)||!i(I,t)||i(this,N)&&this[N][t])||n)},$=function(t,n){if(t=b(t),n=_(n,!0),t!==z||!i(I,n)||i(W,n)){var e=A(t,n);return!e||!i(I,n)||i(t,N)&&t[N][n]||(e.enumerable=!0),e}},Q=function(t){for(var n,e=j(b(t)),r=[],o=0;e.length>o;)i(I,n=e[o++])||n==N||n==u||r.push(n);return r},Z=function(t){for(var n,e=t===z,r=j(e?W:b(t)),o=[],c=0;r.length>c;)!i(I,n=r[c++])||e&&!i(z,n)||o.push(I[n]);return o};B||(k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),n=function(e){this===z&&n.call(W,e),i(this,N)&&i(this[N],t)&&(this[N][t]=!1),G(this,t,w(1,e))};return o&&X&&G(z,t,{configurable:!0,set:n}),V(t)},s(k[F],"toString",function(){return this._k}),E.f=$,O.f=q,e(37).f=x.f=Q,e(39).f=J,e(45).f=Z,o&&!e(27)&&s(z,"propertyIsEnumerable",J,!0),p.f=function(t){return V(v(t))}),c(c.G+c.W+c.F*!B,{Symbol:k});for(var tt="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;tt.length>nt;)v(tt[nt++]);for(var et=M(v.store),rt=0;et.length>rt;)d(et[rt++]);c(c.S+c.F*!B,"Symbol",{for:function(t){return i(D,t+="")?D[t]:D[t]=k(t)},keyFor:function(t){if(!U(t))throw TypeError(t+" is not a symbol!");for(var n in D)if(D[n]===t)return n},useSetter:function(){X=!0},useSimple:function(){X=!1}}),c(c.S+c.F*!B,"Object",{create:K,defineProperty:q,defineProperties:H,getOwnPropertyDescriptor:$,getOwnPropertyNames:Q,getOwnPropertySymbols:Z}),T&&c(c.S+c.F*(!B||a(function(){var t=k();return"[null]"!=P([t])||"{}"!=P({a:t})||"{}"!=P(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!U(t)){for(var n,e,r=[t],i=1;arguments.length>i;)r.push(arguments[i++]);return n=r[1],"function"==typeof n&&(e=n),!e&&g(n)||(n=function(t,n){if(e&&(n=e.call(this,t,n)),!U(n))return n}),r[1]=n,P.apply(T,r)}}}),k[F][C]||e(11)(k[F],C,k[F].valueOf),l(k,"Symbol"),l(Math,"Math",!0),l(r.JSON,"JSON",!0)},function(t,n,e){"use strict";var r=e(1),i=e(64),o=e(88),c=e(2),s=e(31),u=e(8),a=e(4),f=e(3).ArrayBuffer,l=e(61),h=o.ArrayBuffer,v=o.DataView,p=i.ABV&&f.isView,d=h.prototype.slice,y=i.VIEW,g="ArrayBuffer";r(r.G+r.W+r.F*(f!==h),{ArrayBuffer:h}),r(r.S+r.F*!i.CONSTR,g,{isView:function(t){return p&&p(t)||a(t)&&y in t}}),r(r.P+r.U+r.F*e(6)(function(){return!new h(2).slice(1,void 0).byteLength}),g,{slice:function(t,n){if(void 0!==d&&void 0===n)return d.call(c(this),t);for(var e=c(this).byteLength,r=s(t,e),i=s(void 0===n?e:n,e),o=new(l(this,h))(u(i-r)),a=new v(this),f=new v(o),p=0;r<i;)f.setUint8(p++,a.getUint8(r++));return o}}),e(46)(g)},function(t,n,e){e(14)("Float32",4,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Float64",8,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Int16",2,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Int32",4,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Int8",1,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Uint16",2,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Uint32",4,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Uint8",1,function(t){return function(n,e,r){return t(this,n,e,r)}})},function(t,n,e){e(14)("Uint8",1,function(t){return function(n,e,r){return t(this,n,e,r)}},!0)},function(t,n,e){"use strict";var r,i=e(33)(0),o=e(16),c=e(35),s=e(81),u=e(69),a=e(4),f=e(6),l=e(32),h="WeakMap",v=c.getWeak,p=Object.isExtensible,d=u.ufstore,y={},g=function(t){
return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},m={get:function(t){if(a(t)){var n=v(t);return n===!0?d(l(this,h)).get(t):n?n[this._i]:void 0}},set:function(t,n){return u.def(l(this,h),t,n)}},b=t.exports=e(41)(h,g,m,u,!0,!0);f(function(){return 7!=(new b).set((Object.freeze||Object)(y),7).get(y)})&&(r=u.getConstructor(g,h),s(r.prototype,m),c.NEED=!0,i(["delete","has","get","set"],function(t){var n=b.prototype,e=n[t];o(n,t,function(n,i){if(a(n)&&!p(n)){this._f||(this._f=new r);var o=this._f[t](n,i);return"set"==t?this:o}return e.call(this,n,i)})}))},function(t,n,e){"use strict";var r=e(69),i=e(32),o="WeakSet";e(41)(o,function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},{add:function(t){return r.def(i(this,o),t,!0)}},r,!1,!0)},function(t,n,e){"use strict";var r=e(1),i=e(48)(!0);r(r.P,"Array",{includes:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}}),e(23)("includes")},function(t,n,e){var r=e(1),i=e(83)(!0);r(r.S,"Object",{entries:function(t){return i(t)}})},function(t,n,e){var r=e(1),i=e(84),o=e(13),c=e(15),s=e(50);r(r.S,"Object",{getOwnPropertyDescriptors:function(t){for(var n,e,r=o(t),u=c.f,a=i(r),f={},l=0;a.length>l;)e=u(r,n=a[l++]),void 0!==e&&s(f,n,e);return f}})},function(t,n,e){var r=e(1),i=e(83)(!1);r(r.S,"Object",{values:function(t){return i(t)}})},function(t,n,e){"use strict";var r=e(1),i=e(85);r(r.P,"String",{padEnd:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!1)}})},function(t,n,e){"use strict";var r=e(1),i=e(85);r(r.P,"String",{padStart:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0,!0)}})},function(t,n,e){for(var r=e(66),i=e(28),o=e(16),c=e(3),s=e(11),u=e(26),a=e(5),f=a("iterator"),l=a("toStringTag"),h=u.Array,v={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},p=i(v),d=0;d<p.length;d++){var y,g=p[d],m=v[g],b=c[g],_=b&&b.prototype;if(_&&(_[f]||s(_,f,h),_[l]||s(_,l,g),u[g]=h,m))for(y in r)_[y]||o(_,y,r[y],!0)}},function(t,n,e){var r=e(1),i=e(63);r(r.G+r.B,{setImmediate:i.set,clearImmediate:i.clear})},function(t,n,e){var r=e(3),i=e(1),o=r.navigator,c=[].slice,s=!!o&&/MSIE .\./.test(o.userAgent),u=function(t){return function(n,e){var r=arguments.length>2,i=!!r&&c.call(arguments,2);return t(r?function(){("function"==typeof n?n:Function(n)).apply(this,i)}:n,e)}};i(i.G+i.B+i.F*s,{setTimeout:u(r.setTimeout),setInterval:u(r.setInterval)})},function(t,n){},function(t,n){(function(n){function e(t,n,e){function i(n){var e=d,r=y;return d=y=void 0,E=n,m=t.apply(r,e)}function o(t){return E=t,b=setTimeout(f,n),O?i(t):m}function u(t){var e=t-x,r=t-E,i=n-e;return M?w(i,g-r):i}function a(t){var e=t-x,r=t-E;return void 0===x||e>=n||e<0||M&&r>=g}function f(){var t=S();return a(t)?l(t):void(b=setTimeout(f,u(t)))}function l(t){return b=void 0,A&&d?i(t):(d=y=void 0,m)}function h(){void 0!==b&&clearTimeout(b),E=0,d=x=y=b=void 0}function v(){return void 0===b?m:l(S())}function p(){var t=S(),e=a(t);if(d=arguments,y=this,x=t,e){if(void 0===b)return o(x);if(M)return b=setTimeout(f,n),i(x)}return void 0===b&&(b=setTimeout(f,n)),m}var d,y,g,m,b,x,E=0,O=!1,M=!1,A=!0;if("function"!=typeof t)throw new TypeError(s);return n=c(n)||0,r(e)&&(O=!!e.leading,M="maxWait"in e,g=M?_(c(e.maxWait)||0,n):g,A="trailing"in e?!!e.trailing:A),p.cancel=h,p.flush=v,p}function r(t){var n=typeof t;return!!t&&("object"==n||"function"==n)}function i(t){return!!t&&"object"==typeof t}function o(t){return"symbol"==typeof t||i(t)&&b.call(t)==a}function c(t){if("number"==typeof t)return t;if(o(t))return u;if(r(t)){var n="function"==typeof t.valueOf?t.valueOf():t;t=r(n)?n+"":n}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(f,"");var e=h.test(t);return e||v.test(t)?p(t.slice(2),e?2:8):l.test(t)?u:+t}var s="Expected a function",u=NaN,a="[object Symbol]",f=/^\s+|\s+$/g,l=/^[-+]0x[0-9a-f]+$/i,h=/^0b[01]+$/i,v=/^0o[0-7]+$/i,p=parseInt,d="object"==typeof n&&n&&n.Object===Object&&n,y="object"==typeof self&&self&&self.Object===Object&&self,g=d||y||Function("return this")(),m=Object.prototype,b=m.toString,_=Math.max,w=Math.min,S=function(){return g.Date.now()};t.exports=e}).call(n,function(){return this}())},function(t,n){!function(n){"use strict";function e(t,n,e,r){var o=n&&n.prototype instanceof i?n:i,c=Object.create(o.prototype),s=new v(r||[]);return c._invoke=a(t,e,s),c}function r(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}function i(){}function o(){}function c(){}function s(t){["next","throw","return"].forEach(function(n){t[n]=function(t){return this._invoke(n,t)}})}function u(t){function n(e,i,o,c){var s=r(t[e],t,i);if("throw"!==s.type){var u=s.arg,a=u.value;return a&&"object"==typeof a&&m.call(a,"__await")?Promise.resolve(a.__await).then(function(t){n("next",t,o,c)},function(t){n("throw",t,o,c)}):Promise.resolve(a).then(function(t){u.value=t,o(u)},c)}c(s.arg)}function e(t,e){function r(){return new Promise(function(r,i){n(t,e,r,i)})}return i=i?i.then(r,r):r()}var i;this._invoke=e}function a(t,n,e){var i=O;return function(o,c){if(i===A)throw new Error("Generator is already running");if(i===L){if("throw"===o)throw c;return d()}for(e.method=o,e.arg=c;;){var s=e.delegate;if(s){var u=f(s,e);if(u){if(u===j)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(i===O)throw i=L,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);i=A;var a=r(t,n,e);if("normal"===a.type){if(i=e.done?L:M,a.arg===j)continue;return{value:a.arg,done:e.done}}"throw"===a.type&&(i=L,e.method="throw",e.arg=a.arg)}}}function f(t,n){var e=t.iterator[n.method];if(e===y){if(n.delegate=null,"throw"===n.method){if(t.iterator.return&&(n.method="return",n.arg=y,f(t,n),"throw"===n.method))return j;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return j}var i=r(e,t.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,j;var o=i.arg;return o?o.done?(n[t.resultName]=o.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=y),n.delegate=null,j):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,j)}function l(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function h(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function v(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(l,this),this.reset(!0)}function p(t){if(t){var n=t[_];if(n)return n.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var e=-1,r=function n(){for(;++e<t.length;)if(m.call(t,e))return n.value=t[e],n.done=!1,n;return n.value=y,n.done=!0,n};return r.next=r}}return{next:d}}function d(){return{value:y,done:!0}}var y,g=Object.prototype,m=g.hasOwnProperty,b="function"==typeof Symbol?Symbol:{},_=b.iterator||"@@iterator",w=b.asyncIterator||"@@asyncIterator",S=b.toStringTag||"@@toStringTag",x="object"==typeof t,E=n.regeneratorRuntime;if(E)return void(x&&(t.exports=E));E=n.regeneratorRuntime=x?t.exports:{},E.wrap=e;var O="suspendedStart",M="suspendedYield",A="executing",L="completed",j={},k={};k[_]=function(){return this};var T=Object.getPrototypeOf,P=T&&T(T(p([])));P&&P!==g&&m.call(P,_)&&(k=P);var F=c.prototype=i.prototype=Object.create(k);o.prototype=F.constructor=c,c.constructor=o,c[S]=o.displayName="GeneratorFunction",E.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===o||"GeneratorFunction"===(n.displayName||n.name))},E.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,c):(t.__proto__=c,S in t||(t[S]="GeneratorFunction")),t.prototype=Object.create(F),t},E.awrap=function(t){return{__await:t}},s(u.prototype),u.prototype[w]=function(){return this},E.AsyncIterator=u,E.async=function(t,n,r,i){var o=new u(e(t,n,r,i));return E.isGeneratorFunction(n)?o:o.next().then(function(t){return t.done?t.value:o.next()})},s(F),F[S]="Generator",F[_]=function(){return this},F.toString=function(){return"[object Generator]"},E.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},E.values=p,v.prototype={constructor:v,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=y,this.done=!1,this.delegate=null,this.method="next",this.arg=y,this.tryEntries.forEach(h),!t)for(var n in this)"t"===n.charAt(0)&&m.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=y)},stop:function(){this.done=!0;var t=this.tryEntries[0],n=t.completion;if("throw"===n.type)throw n.arg;return this.rval},dispatchException:function(t){function n(n,r){return o.type="throw",o.arg=t,e.next=n,r&&(e.method="next",e.arg=y),!!r}if(this.done)throw t;for(var e=this,r=this.tryEntries.length-1;r>=0;--r){var i=this.tryEntries[r],o=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=m.call(i,"catchLoc"),s=m.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc<=this.prev&&m.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var i=r;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=n,i?(this.method="next",this.next=i.finallyLoc,j):this.complete(o)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),j},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),h(e),j}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var i=r.arg;h(e)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,e){return this.delegate={iterator:p(t),resultName:n,nextLoc:e},"next"===this.method&&(this.arg=y),j}}}(function(){return this}()||Function("return this")())},function(t,n,e){!function(n,e){t.exports=e()}(this,function(){"use strict";function t(t){return parseFloat(t)||0}function n(n){var e=Array.prototype.slice.call(arguments,1);return e.reduce(function(e,r){var i=n["border-"+r+"-width"];return e+t(i)},0)}function e(n){for(var e=["top","right","bottom","left"],r={},i=0,o=e;i<o.length;i+=1){var c=o[i],s=n["padding-"+c];r[c]=t(s)}return r}function r(t){var n=t.getBBox();return u(0,0,n.width,n.height)}function i(r){var i=r.clientWidth,c=r.clientHeight;if(!i&&!c)return _;var s=getComputedStyle(r),a=e(s),f=a.left+a.right,l=a.top+a.bottom,h=t(s.width),v=t(s.height);if("border-box"===s.boxSizing&&(Math.round(h+f)!==i&&(h-=n(s,"left","right")+f),Math.round(v+l)!==c&&(v-=n(s,"top","bottom")+l)),!o(r)){var p=Math.round(h+f)-i,d=Math.round(v+l)-c;1!==Math.abs(p)&&(h-=p),1!==Math.abs(d)&&(v-=d)}return u(a.left,a.top,h,v)}function o(t){return t===document.documentElement}function c(t){return f?w(t)?r(t):i(t):_}function s(t){var n=t.x,e=t.y,r=t.width,i=t.height,o="undefined"!=typeof DOMRectReadOnly?DOMRectReadOnly:Object,c=Object.create(o.prototype);return b(c,{x:n,y:e,width:r,height:i,top:e,right:n+r,bottom:i+e,left:n}),c}function u(t,n,e,r){return{x:t,y:n,width:e,height:r}}var a=function(){function t(t,n){var e=-1;return t.some(function(t,r){return t[0]===n&&(e=r,!0)}),e}return"undefined"!=typeof Map?Map:function(){function n(){this.__entries__=[]}var e={size:{}};return e.size.get=function(){return this.__entries__.length},n.prototype.get=function(n){var e=t(this.__entries__,n),r=this.__entries__[e];return r&&r[1]},n.prototype.set=function(n,e){var r=t(this.__entries__,n);~r?this.__entries__[r][1]=e:this.__entries__.push([n,e])},n.prototype.delete=function(n){var e=this.__entries__,r=t(e,n);~r&&e.splice(r,1)},n.prototype.has=function(n){return!!~t(this.__entries__,n)},n.prototype.clear=function(){this.__entries__.splice(0)},n.prototype.forEach=function(t,n){void 0===n&&(n=null);for(var e=0,r=this.__entries__;e<r.length;e+=1){var i=r[e];t.call(n,i[1],i[0])}},Object.defineProperties(n.prototype,e),n}()}(),f="undefined"!=typeof window&&"undefined"!=typeof document&&window.document===document,l=function(){return"function"==typeof requestAnimationFrame?requestAnimationFrame:function(t){return setTimeout(function(){return t(Date.now())},1e3/60)}}(),h=2,v=function(t,n){function e(){o&&(o=!1,t()),c&&i()}function r(){l(e)}function i(){var t=Date.now();if(o){if(t-s<h)return;c=!0}else o=!0,c=!1,setTimeout(r,n);s=t}var o=!1,c=!1,s=0;return i},p=20,d=["top","right","bottom","left","width","height","size","weight"],y="undefined"!=typeof navigator&&/Trident\/.*rv:11/.test(navigator.userAgent),g="undefined"!=typeof MutationObserver&&!y,m=function(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=v(this.refresh.bind(this),p)};m.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},m.prototype.removeObserver=function(t){var n=this.observers_,e=n.indexOf(t);~e&&n.splice(e,1),!n.length&&this.connected_&&this.disconnect_()},m.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},m.prototype.updateObservers_=function(){var t=this.observers_.filter(function(t){return t.gatherActive(),t.hasActive()});return t.forEach(function(t){return t.broadcastActive()}),t.length>0},m.prototype.connect_=function(){f&&!this.connected_&&(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),g?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},m.prototype.disconnect_=function(){f&&this.connected_&&(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},m.prototype.onTransitionEnd_=function(t){var n=t.propertyName,e=d.some(function(t){return!!~n.indexOf(t)});e&&this.refresh()},m.getInstance=function(){return this.instance_||(this.instance_=new m),this.instance_},m.instance_=null;var b=function(t,n){for(var e=0,r=Object.keys(n);e<r.length;e+=1){var i=r[e];Object.defineProperty(t,i,{value:n[i],enumerable:!1,writable:!1,configurable:!0})}return t},_=u(0,0,0,0),w=function(){return"undefined"!=typeof SVGGraphicsElement?function(t){return t instanceof SVGGraphicsElement}:function(t){return t instanceof SVGElement&&"function"==typeof t.getBBox}}(),S=function(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=u(0,0,0,0),this.target=t};S.prototype.isActive=function(){var t=c(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},S.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t};var x=function(t,n){var e=s(n);b(this,{target:t,contentRect:e})},E=function(t,n,e){if("function"!=typeof t)throw new TypeError("The callback provided as parameter 1 is not a function.");this.activeObservations_=[],this.observations_=new a,this.callback_=t,this.controller_=n,this.callbackCtx_=e};E.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;n.has(t)||(n.set(t,new S(t)),this.controller_.addObserver(this),this.controller_.refresh())}},E.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if("undefined"!=typeof Element&&Element instanceof Object){if(!(t instanceof Element))throw new TypeError('parameter 1 is not of type "Element".');var n=this.observations_;n.has(t)&&(n.delete(t),n.size||this.controller_.removeObserver(this))}},E.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},E.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(n){n.isActive()&&t.activeObservations_.push(n)})},E.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,n=this.activeObservations_.map(function(t){return new x(t.target,t.broadcastRect())});this.callback_.call(t,n,t),this.clearActive()}},E.prototype.clearActive=function(){this.activeObservations_.splice(0)},E.prototype.hasActive=function(){return this.activeObservations_.length>0};var O="undefined"!=typeof WeakMap?new WeakMap:new a,M=function(t){if(!(this instanceof M))throw new TypeError("Cannot call a class as a function");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var n=m.getInstance(),e=new E(t,n,this);O.set(this,e)};["observe","unobserve","disconnect"].forEach(function(t){M.prototype[t]=function(){return(n=O.get(this))[t].apply(n,arguments);var n}});var A=function(){return"undefined"!=typeof ResizeObserver?ResizeObserver:M}();return A})},function(t,n,e){var r,i,o;/*! scrollbarWidth.js v0.1.0 | felixexter | MIT | https://github.com/felixexter/scrollbarWidth */
!function(e,c){i=[],r=c,o="function"==typeof r?r.apply(n,i):r,!(void 0!==o&&(t.exports=o))}(this,function(){"use strict";function t(){var t,n=document.body,e=document.createElement("div"),r=e.style;return r.position="absolute",r.top=r.left="-9999px",r.width=r.height="100px",r.overflow="scroll",n.appendChild(e),t=e.offsetWidth-e.clientWidth,n.removeChild(e),t}return t})}])});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__template_settingsTab_html__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings_less__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__style_settings_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__style_settings_less__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Utils__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__P0weruser__ = __webpack_require__(3);





class Settings {
    constructor(app) {
        this.style = __WEBPACK_IMPORTED_MODULE_1__style_settings_less___default.a;
        this.app = app;
        this.tabs = {};
        this.tabContent = {};

        this.addListeners();
    }


    static clearSettings() {
        // clear module settings
        window.localStorage.setItem('activated_modules', '[]');

        // Reload pr0gramm
        p.reload();
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

        // Add listener to clear-button
        let clearButton = this.tabContent.getElementsByClassName('clear-settings-button')[0];
        clearButton.addEventListener('click', () => {
            if (window.confirm('Einstellungen wirklich zurücksetzen?')) {
                Settings.clearSettings();
            }
        });

        // Add save-button
        let saveButton = this.tabContent.querySelectorAll('#save-addon-settings')[0];
        saveButton.addEventListener('click', () => {
            Settings.saveSettings(moduleList);
        })
    }

    static addHint() {
        let header = document.getElementById('head-content');
        let hint = document.createElement('div');
        hint.id = 'settings_hint';
        hint.innerText = 'Bitte öffne die Einstellungen um p0weruser zu konfigurieren!';

        header.appendChild(hint);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Settings;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "<div class=form-section> <h2>Addon Einstellungen</h2> <h3>Aktionen</h3> <div class=form-row> <a class=\"action clear-settings-button\">Einstellungen zurücksetzen</a> </div> <h3>Verfügbare Module</h3> <div id=addon-list></div> <div class=form-row> <input type=submit id=save-addon-settings value=\"Einstellungen speichern\" class=\"confirm settings-save\"> </div> </div> ";

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(8);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#addon-list label {\n  margin-bottom: 10px;\n}\n#addon-list label span {\n  display: block;\n  color: #888;\n}\n#settings_hint {\n  background-color: var(--theme-main-color);\n  text-align: center;\n  position: absolute;\n  top: 52px;\n  width: 100%;\n  padding: 10px;\n}\n", ""]);

// exports


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class EventHandler {
    constructor() {
        this.settingsLoaded = new Event('settingsLoaded');
        this.commentsLoaded = new Event('commentsLoaded');
        this.locationChange = new Event('locationChange');
        this.beforeLocationChange = new Event('beforeLocationChange');
        this.userSync = new Event('userSync');

        this.addEvents();
    }


    addEvents() {
        let _this = this;

        // Add settings-event
        (function (render) {
            p.View.Settings.prototype.render = function (params) {
                render.call(this, params);
                window.dispatchEvent(_this.settingsLoaded);
            };
        }(p.View.Settings.prototype.render));

        // Add locationchange event
        (function (navigate) {
            p.navigateTo = function (location, mode) {
                _this.beforeLocationChange.mode = mode;
                window.dispatchEvent(_this.beforeLocationChange);

                // Call original
                navigate.call(this, location, mode);

                _this.locationChange.mode = mode;
                window.dispatchEvent(_this.locationChange);
            };
        }(p.navigateTo));

        // Add commentsloaded-event
        (function(render) {
            p.View.Stream.Comments.prototype.render = function() {
                render.call(this);
                window.dispatchEvent(_this.commentsLoaded);

            };
        }(p.View.Stream.Comments.prototype.render));

        (function (syncCallback) {
            p.User.prototype.syncCallback = function (response) {
                _this.userSync.data = response;
                syncCallback.call(this, response);
                window.dispatchEvent(_this.userSync);
            };
        }(p.User.prototype.syncCallback));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventHandler;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Utils__ = __webpack_require__(2);



class WidescreenMode {
    constructor() {
        this.name = 'Widescreen Mode';
        this.container = {};
        this.commentsContainer = {};
        this.resized = false;
        this.listenerAdded = false;
        this.description = 'Stellt das pr0 im Breitbildmodus dar.'
    }

    handleWheelChange(e) {
        if(this.hasUnsentComments()) {
            let state = window.confirm('Du hast noch nicht abgeschickte Kommentare! Willst du dieses Medium wirklich verlassen?');

            if(! state) {
                return false;
            }
        }

        let el = {};
        if (e.deltaY < 0) {
            el = document.getElementsByClassName('stream-prev')[0];
        } else {
            el = document.getElementsByClassName('stream-next')[0];
        }

        el.click();
    }

    load() {
        this.comments = [];
        this.commentsWide = window.localStorage.getItem('comments_wide') === 'true';
        this.styles = __webpack_require__(12);
        this.header = document.getElementById('head-content');
        this.logoLink = document.getElementById('pr0gramm-logo-link');
        this.nav = {
            button: null,
            links: null,
            container: document.getElementById('footer-links')
        };

        this.overrideViews();
        this.addNavigation();
        this.modifyLogo();
    }

    modifyLogo() {
        this.logoLink.href = '/new';
        this.logoLink.isNew = false;

        this.logoLink.addEventListener('click', () => {
            if(this.logoLink.isNew) {
                p.reload();
            }
        });

        window.addEventListener('beforeLocationChange', (e) => {
            if(e.srcElement.location.href.endsWith(this.logoLink.href)) {
                e.preventDefault();
                this.logoLink.isNew = true;

                return false;
            } else {
                this.logoLink.isNew = false;
            }
        });
    }

    overrideViews() {
        // Override Item-View
        let _this = this;

        p.View.Stream.Item = p.View.Stream.Item.extend({
            template: __webpack_require__(14),
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);

                _this.addItemListener(this.$image, itemData);
                document.body.classList.add('fixed');
            },
            remove: function () {
                this.parent();
                document.body.classList.remove('fixed');
            }
        });

        // Fix audio-controls
        __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].addVideoConstants();

        // Extend comments-rendering and template
        p.View.Stream.Comments = p.View.Stream.Comments.extend({
            template: __webpack_require__(15),
            render: function () {
                this.parent();
                _this.comments = [this.$commentForm.find('textarea')[0]];
                _this.commentsContainer = this.$container;
                _this.commentsContainer[0].classList.toggle('wide', _this.commentsWide);
                new __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js___default.a(this.$container[0]);

                let commentSwitch = this.$container.find('.comments-switch')[0];
                commentSwitch.addEventListener('click', () => {
                    this.$container[0].classList.add('toggled');
                    this.$container[0].classList.toggle('wide');
                    _this.commentsWide = this.$container[0].classList.contains('wide');

                    window.localStorage.setItem('comments_wide', _this.commentsWide);
                });
            },
            focusComment(comment) {
                let target = this.$container.find('#' + comment);
                if (target.length) {
                    __WEBPACK_IMPORTED_MODULE_1__Utils__["a" /* default */].waitForElement('.simplebar-scroll-content').then((el) => {
                        this.$scrollContainer = $(el[0]);
                        let jumpPos = target.offset().top - this.$scrollContainer.offset().top - CONFIG.HEADER_HEIGHT - 80;
                        this.$scrollContainer.scrollTop(jumpPos);
                        target.highlight(180, 180, 180, 1);
                    });
                }
            },
            showReplyForm(ev) {
                this.parent(ev);
                let id = ev.currentTarget.href.split(':comment')[1];
                _this.comments.push(document.querySelectorAll(`#comment${id} textarea`)[0]);
            }
        });

        // Handle stream-building
        p.View.Stream.Main.prototype.buildItemRows = function (items) {
            let result = '';
            for (let i = 0; i < items.length; i++) {
                result += this.buildItem(items[i]);
            }

            return `<div class="item-row">${result}</div>`;
        };
    }

    addItemListener(image, itemData) {
        this.img = image;
        this.container = this.img[0].parentNode;
        this.resized = (itemData.height > this.container.offsetHeight || itemData.width > this.container.offsetWidth);
        this.container.classList.toggle('resized', this.resized);

        // Enable draggable
        if (this.resized) {
            this.container.classList.add('oversize');
            this.img.draggable();
            this.img.draggable('disable');
        }

        // Handle wheel-change
        this.container.addEventListener('mousewheel', (e) => {
            e.preventDefault();

            this.handleWheelChange(e);
        });

        if (!this.listenerAdded) {
            this.listenerAdded = true;
            document.addEventListener('keydown', (e) => {
                if (document.activeElement.tagName !== 'TEXTAREA' && document.activeElement.tagName !== 'INPUT') {
                    this.handleKeypress(e);
                }
            });

            window.addEventListener('locationChange', (e) => {
                if (e.mode === 0) {
                    document.body.classList.remove('fixed');
                }
            })
        }
    }

    handleKeypress(e) {
        switch (e.code) {
            case 'Space':
                e.preventDefault();
                this.toggleMove();
                break;
            case 'Escape':
                if (this.resized && p.currentView.$itemContainer) {
                    p.currentView.hideItem();
                }
                break;
            case 'ArrowUp':
            case 'ArrowDown':
                if (this.isMoveable) {
                    this.img.animate({
                        top: e.code === 'ArrowDown' ? '-=20' : '+=20'
                    }, 0);
                } else {
                    let elem = this.commentsContainer.find('.simplebar-content');
                    if (!elem.is(':focus')) {
                        elem.attr('tabindex', -1).focus();
                    }
                }
                break;
        }
    }

    hasUnsentComments() {
        for(let i = 0; i < this.comments.length; i++) {
            if(this.comments[i].value !== '') {
                return true;
            }
        }

        return false;
    }

    toggleMove() {
        if (this.resized) {
            this.img.unbind('click');
            this.container.classList.toggle('resized');
            this.isMoveable = !this.container.classList.contains('resized');
            this.img.draggable(this.isMoveable ? 'enable' : 'disable');
            this.img.attr('tabindex', -1).focus();

            if (!this.img.resizeInit) {
                this.container.style.alignItems = 'flex-start';
            }

            this.img.resizeInit = true;
        }
    }

    addNavigation() {
        this.nav.button = document.createElement('a');
        this.nav.links = this.nav.container.querySelectorAll('a');
        this.nav.button.className = 'fa fa-bars sidebar-toggle';
        this.header.insertBefore(this.nav.button, this.header.firstChild);

        this.nav.button.addEventListener('click', () => {
            this.toggleNavigation();
        });

        for(let i = 0; i < this.nav.links.length; i++) {
            this.nav.links[i].addEventListener('click', () => {
                this.toggleNavigation();
            });
        }

        // Init additional menuitems
        this.addMenuItem('pr0p0ll', 'https://pr0p0ll.com', ' fa-bar-chart');
    }


    toggleNavigation() {
        this.nav.container.classList.toggle('open');
        this.nav.button.classList.toggle('active');
    }


    addMenuItem(name, url, faClass) {
        let elem = document.createElement('a');
        elem.className = faClass;
        elem.innerText = name;
        elem.href = url;
        elem.target = '_blank';
        this.nav.container.firstElementChild.appendChild(elem);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WidescreenMode;



/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "body[class].fixed {\n  overflow: hidden;\n}\nbody[class] > .side-wide-skyscraper {\n  display: none;\n}\nbody[class] #page.desktop,\nbody[class] #page #head {\n  padding: 0 20px;\n  width: 100% !important;\n}\nbody[class] #page.desktop #pr0-miner,\nbody[class] #page #head #pr0-miner {\n  display: none;\n}\nbody[class] #page #stream {\n  text-align: center;\n}\nbody[class] #page #stream a.thumb {\n  display: inline-block;\n  float: none;\n}\nbody[class] #page #head {\n  background: rgba(0, 0, 0, 0.8);\n}\nbody[class] #page #head #head-content {\n  background: none;\n  display: flex;\n  align-items: center;\n}\nbody[class] #page #head #head-content #loader {\n  left: -20px;\n  right: -20px;\n}\nbody[class] #page #head #head-content #filter-menu {\n  left: calc(50% - 135px);\n}\nbody[class] #page #head #head-content > .user-info {\n  order: 20;\n  margin: 0;\n}\nbody[class] #page #head #head-content > #head-menu {\n  padding: 0;\n  order: 3;\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nbody[class] #page #head #head-content > #pr0gramm-logo-link {\n  order: 1;\n  height: 24px;\n  margin: 0;\n}\nbody[class] #page #head #head-content a[id*=\"badge\"] {\n  order: 2;\n  position: relative;\n  top: 0;\n  left: 0;\n  margin-left: 5px;\n  transform: scale(0.75);\n}\nbody[class] #page #head #head-content .sidebar-toggle {\n  order: 0;\n  color: #fff;\n  font-size: 20px;\n  margin-right: 10px;\n}\nbody[class] #page #head #head-content .sidebar-toggle.active {\n  color: #ee4d2e;\n}\nbody[class] > #footer-links {\n  width: 250px;\n  left: -250px !important;\n  position: fixed;\n  margin: 0;\n  top: 52px;\n  border-right: 3px solid #2a2e31;\n  background: #161618;\n  transition: left .2s linear;\n  z-index: 500;\n}\nbody[class] > #footer-links.open {\n  left: 0 !important;\n  box-shadow: 2px 0 10px #000;\n}\nbody[class] > #footer-links a {\n  color: #fff;\n  display: block;\n  text-align: left;\n  padding: 10px 20px;\n  margin-right: 0;\n  font-size: 16px;\n}\nbody[class] > #footer-links a:hover {\n  color: #ee4d2e;\n}\nbody[class] > #footer-links a:before {\n  font-family: 'FontAwesome';\n  margin-right: 10px;\n  display: inline-block;\n  width: 20px;\n}\nbody[class] > #footer-links a[href=\"/faq\"]:before {\n  content: \"\\F059\";\n}\nbody[class] > #footer-links a[href=\"/contact\"]:before {\n  content: \"\\F0E0\";\n}\nbody[class] > #footer-links a[href*=\"//miner.pr0gramm.com\"]:before {\n  content: \"\\F15A\";\n}\nbody[class] > #footer-links a[href=\"http://app.pr0gramm.com\"]:before {\n  content: \"\\F10B\";\n}\nbody[class] > #footer-links a[href=\"https://twitter.com/pr0gramm\"]:before {\n  content: \"\\F099\";\n}\n#stream .item-container {\n  margin: 0;\n  max-height: calc(100vh - 52px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(0, 0, 0, 0.9);\n  position: fixed;\n  top: 52px;\n  right: 0;\n  left: -20px;\n  bottom: -20px;\n  padding: 0;\n  z-index: 10;\n}\n#stream .item-container .item-pointer {\n  display: none;\n}\n#stream .item-container .item-container-content {\n  display: flex;\n  height: 100%;\n  width: 100%;\n}\n#stream .item-container .item-container-content .image-main {\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n}\n#stream .item-container .item-container-content .image-main .item-info {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: 100px;\n}\n#stream .item-container .item-container-content .image-main .item-info > div {\n  position: relative;\n  display: flex;\n  width: 90%;\n  max-width: 980px;\n}\n#stream .item-container .item-container-content .image-main .item-info > div .item-details,\n#stream .item-container .item-container-content .image-main .item-info > div .item-tags {\n  padding: 5px 20px 5px 40px;\n}\n#stream .item-container .item-container-content .image-main .item-info > div .item-vote {\n  display: flex;\n  align-items: center;\n  left: 0;\n  top: 0;\n  position: relative;\n}\n#stream .item-container .item-container-content .image-main .item-info > div .item-vote .vote-fav {\n  position: relative;\n  margin-left: 20px;\n  font-size: 32px;\n  left: 0;\n  top: 0;\n}\n#stream .item-container .item-container-content .image-main .item-info > div .item-vote .score {\n  position: relative;\n  top: 0;\n  left: 10px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper {\n  flex-grow: 1;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 40px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls {\n  height: 64px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls .audio-controls {\n  left: 20px;\n  bottom: 20px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper.resized .item-image {\n  max-height: calc(100vh - 200px);\n  top: auto !important;\n  left: auto !important;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper.oversize:not(.resized) .item-image {\n  cursor: move;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-prev,\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-next {\n  display: flex;\n  height: 50px;\n  align-items: center;\n  justify-content: center;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-prev span:before,\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-next span:before {\n  opacity: .2;\n  font-size: 70px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-prev:hover span:before,\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-next:hover span:before {\n  opacity: .6;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-prev {\n  padding: 0 0 0 20px !important;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .stream-next {\n  right: 20px;\n  padding: 0 5px !important;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls {\n  width: 100% !important;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .video-controls .video-position-bar-background {\n  min-height: 2px;\n}\n#stream .item-container .item-container-content .image-main .item-image-wrapper .item-image {\n  height: auto !important;\n  width: auto !important;\n  outline: none;\n}\n#stream .item-container .item-container-content .item-comments {\n  background: #161618;\n  width: 30vw;\n  flex-grow: 0;\n  flex-shrink: 0;\n  padding-top: 30px;\n  border-right: 3px solid #2a2e31;\n}\n#stream .item-container .item-container-content .item-comments.toggled {\n  transition: width 0.2s ease-out;\n}\n#stream .item-container .item-container-content .item-comments.wide {\n  width: 40vw;\n}\n#stream .item-container .item-container-content .item-comments.wide .comments-switch:before {\n  content: \"\\F053\";\n}\n#stream .item-container .item-container-content .item-comments.wide .comment-count {\n  width: 40vw;\n}\n#stream .item-container .item-container-content .item-comments .comments-head {\n  padding: 10px 10px 10px 30px;\n}\n#stream .item-container .item-container-content .item-comments .comments-head .comment-content,\n#stream .item-container .item-container-content .item-comments .comments-head .comment-foot,\n#stream .item-container .item-container-content .item-comments .comments-head .comment {\n  max-width: 100%;\n}\n#stream .item-container .item-container-content .item-comments .comment-count {\n  display: flex;\n  align-items: center;\n  background-color: #2a2e31;\n  text-align: left;\n  padding: 10px 10px 10px 35px;\n  transition: width 0.2s ease-out;\n  z-index: 400;\n  position: fixed;\n  top: 52px;\n  width: 30vw;\n}\n#stream .item-container .item-container-content .item-comments .comment-count > div:first-child {\n  flex-grow: 1;\n}\n#stream .item-container .item-container-content .item-comments .comment-count .comments-switch {\n  cursor: pointer;\n}\n#stream .item-container .item-container-content .item-comments textarea {\n  transition: height 0.2s ease-out;\n}\n#stream .item-container .item-container-content .item-comments textarea.comment:focus,\n#stream .item-container .item-container-content .item-comments textarea.comment:valid,\n#stream .item-container .item-container-content .item-comments textarea.reply {\n  height: 75px;\n}\n#stream .item-container .item-container-content .item-comments .simplebar-scrollbar {\n  background: #2a2e31;\n  border-radius: 0;\n  right: 0;\n}\n#stream .item-container .item-container-content .item-comments .simplebar-scrollbar.visible {\n  opacity: 1;\n}\n#stream .item-container .item-container-content .item-comments .simplebar-content {\n  outline: none;\n}\n", ""]);

// exports


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = "<div class=item-pointer></div> <div class=item-container-content> <?js if( p.user.admin ) {?> <svg class=\"flags flags-{item.flags}\" viewBox=\"0 0 10 10\"> <polygon points=\"0,0 10,0 0,10\"></polygon> </svg> <?js } ?> <div class=item-comments data-simplebar></div> <div class=image-main> <div class=item-image-wrapper> <?js if( item.video ) { ?> <?js if(supportsAutoplay) {?> <video class=item-image src={item.image} type=video/mp4 loop autoplay preload=auto></video> <?js } else { ?> <video class=item-image webkit-playsinline playsinline poster={item.thumb} src={item.image} type=video/mp4 loop preload=metadata></video> <svg class=video-play-button viewBox=\"0 0 200 200\"> <circle cx=100 cy=100 r=90 fill=none stroke-width=15 stroke=#fff></circle> <polygon points=\"70, 55 70, 145 145, 100\" fill=#fff></polygon> </svg> <?js } ?> <div class=\"video-controls<?js if(item.audio){?> has-audio<?js}?>\"> <div class=video-position-bar-background> <div class=video-position></div> </div> <?js if(item.audio) {?> <div class=audio-controls> <svg class=audio-state viewBox=\"0 0 75 75\"> <polygon class=audio-speaker points=\"39.389,13.769 22.235,28.606 6,28.606 6,47.699 21.989,47.699 39.389,62.75 39.389,13.769\"/> <g class=audio-x> <path d=\"M 49,50 69,26\"/> <path d=\"M 69,50 49,26\"/> </g> <g class=audio-wave> <path class=audio-wave-1 d=\"M 48,49 C 50,46 51,42 51,38 C 51,34 50,31 48,28\"/> <path class=audio-wave-2 d=\"M 55,21 C 59,26 61,32 61,38 C 61,45 59,51 55,56\"/> <path class=audio-wave-3 d=\"M 62,63 C 67,56 70,48 70,38 C 70,29 67,21 62,14\"/> </g> </svg> <div class=audio-volume-controls> <div class=audio-volume-bar></div> <div class=audio-volume-slider></div> </div> </div> <?js } ?> </div> <?js } else { ?> <img class=item-image src={item.image} /> <?js if(item.fullsize) { ?> <a href={item.fullsize} target=_blank class=item-fullsize-link>+</a> <?js } ?> <?js } ?> <?js if( p.user.showAds ) { ?> <div class=stream-prev title=Neuer> <span class=\"fa fa-angle-left\"></span> </div> <div class=stream-next title=Älter> <span class=\"fa fa-angle-right\"></span> </div> <?js } else { ?> <div class=\"stream-prev arrow pict\" title=Neuer>&lt;</div> <div class=\"stream-next arrow pict\" title=Älter>&gt;</div> <?js } ?> </div> <div class=item-info> <div> <div class=item-vote{p.voteClass(item.vote)}> <div> <span class=\"pict vote-up\">+</span> <span class=\"pict vote-down\">-</span> </div> <span class=\"score<?js if(!p.olderThanMinAge(item)){?> score-young<?js}?>\" title=\"{item.up} up, {item.down} down\"> <?js print(item.up - item.down)?> </span> <?js if( item.user != p.user.name ) {?> <span class=\"pict vote-fav{p.favClass(item.vote)}\">*</span> <?js } ?> </div> <div> <div class=item-details> <a class=time title={item.date.readableTime()} href=/new/{item.id}>{item.date.relativeTime(true)}</a> <span class=time>von</span> <a href=#user/{item.user} class=\"user um{item.mark}\">{item.user}</a> <span class=item-source> <?js if( item.source ) {?> <span class=pict>s</span>&nbsp;<a href={{item.source}} target=_blank>{{item.source.hostName()}}</a> <?js } else { ?> <span class=pict>s</span>upload</span> <?js } ?>  <?js if( !item.video ) {?> <span class=item-google-search> <span class=pict>g</span>&nbsp; <a href=\"https://www.google.com/searchbyimage?hl=en&amp;safe=off&amp;site=search&amp;image_url=http:{item.image}\" target=_blank> Bild googeln </a> </span> <?js } ?> <?js if( p.user.admin ) { ?> [<span class=action id=item-delete data-id={item.id}>del</span>] [<a href=/new/phash.{item.id}.12>phash</a>] <?js } ?> </div> <div class=item-tags></div> </div> </div> </div> </div> </div> ";

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = "<div class=comment-count> <div><span class=pict>c</span> {\"Kommentar\".inflect(commentCount)}</div> <div class=\"comments-switch fa fa-chevron-right\"></div> </div> <div class=comments-head> <form class=comment-form method=post> <textarea class=comment name=comment required placeholder=\"Kommentar schreiben…\"></textarea> <input type=hidden name=parentId value=0 /> <input type=hidden name=itemId value={params.id} /> <div> <input type=submit value=Abschicken /> <input type=button value=Abbrechen class=cancel /> </div> </form> <form class=comment-edit-form method=post> <textarea class=comment required name=comment></textarea> <input type=hidden name=commentId value=0 /> <div> <input type=submit value=Abschicken /> <input type=button value=Abbrechen class=cancel /> </div> </form> <div class=comments> <?js var recurseComments = function( comments, level ) { ?> <div class=comment-box> <?js for( var i = 0; i < comments.length; i++ ) { var c = comments[i]; ?> <div class=comment-box-inner> <div class=comment{p.voteClass(c.vote)} id=comment{c.id}> <div class=comment-vote> <span class=\"pict vote-up\">+</span> <span class=\"pict vote-down\">-</span> </div> <div class=comment-content> {c.content.format()}</div> <div class=comment-foot> <?js if(c.name == itemUser){?> <span class=user-comment-op>OP</span> <?js}?> <a href=#user/{c.name} class=\"user um{c.mark}\">{c.name}</a> <span class=score title=\"{c.up} up, {c.down} down\">{\"Punkt\".inflect(c.score)}</span> <a href=#{tab}/{itemId}:comment{c.id} class=\"time permalink\">{c.date.relativeTime(true)}</a> <?js if( level < CONFIG.COMMENTS_MAX_LEVELS ) {?> <a href=#{tab}/{itemId}:comment{c.id} class=\"comment-reply-link action\"> <span class=pict>r</span> antworten </a> <?js } ?> <?js if (c.children.length > 0) {?> <span class=\"fold fold-in action\" title=\"Kommentare einklappen\">[–]</span> <span class=\"fold fold-out action\" title=\"Kommentare ausklappen\">[+]</span> <span class=folded-comments-message> (<span class=folded-comments-count></span> eingeklappt) </span> <?js } ?> <?js if( p.user.admin ) {?> [ <span class=\"comment-delete action\">del</span> / <a href=#{tab}/{itemId}:comment{c.id} class=\"comment-edit-link action\">edit</a> ] <?js } ?> </div> </div> <?js if( c.children.length ) { recurseComments(c.children, level+1); } ?> </div> <?js } ?> </div> <?js }; ?> <?js recurseComments(comments, 1); ?> </div> </div> ";

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);


// Inspired by Mopsalarms repost-script
// https://github.com/mopsalarm/pr0gramm-reposts-userscript
class RepostMarker {
    constructor() {
        this.name = 'Repost Markierung';
        this.description = 'Markiert Reposts in der Übersicht'
    }


    static markRepost(id) {
        let elem = document.getElementById('item-' + id);

        if (elem) {
            elem.classList.add('repost');
        }
    }


    load() {
        this.styles = __webpack_require__(17);
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
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(18);
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".repost {\n  position: relative;\n}\n.repost:after {\n  content: \"rep0st\";\n  position: absolute;\n  color: #fff;\n  z-index: 4;\n  left: 0;\n  font-weight: bold;\n  font-size: 18px;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n", ""]);

// exports


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);


class BenisInNavbar {
    constructor() {
        this.name = 'Benis in Navigation';
        this.description = 'Zeigt deinen aktuellen Benis in der Headerleiste an';
    }


    load() {
        this.benis = '-';
        this.styles = __webpack_require__(20);
        this.target = document.getElementById('user-profile-name');
        this.addListener();

        this.addBenis();
    }

    addBenis() {
        this.target.innerText = this.benis;
    }

    addListener() {
        window.addEventListener('userSync', (e) => {
            this.benis = e.data.score;

            this.addBenis();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BenisInNavbar;



/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./benisInNavbar.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./benisInNavbar.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#user-profile-name:before {\n  font-family: 'FontAwesome';\n  margin-right: 5px;\n  content: '\\F2BE';\n}\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(23);
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
		module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/dist/cjs.js!./simplebar.css", function() {
			var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/less-loader/dist/cjs.js!./simplebar.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "/*!\n * \n *             SimpleBar.js - v2.4.3\n *             Scrollbars, simpler.\n *             https://grsmto.github.io/simplebar/\n *             \n *             Made by Adrien Grsmto from a fork by Jonathan Nicol\n *             Under MIT License\n *         \n */\n[data-simplebar] {\n  position: relative;\n  z-index: 0;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n}\n[data-simplebar=init] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n.simplebar-scroll-content {\n  overflow-x: hidden;\n  overflow-y: scroll;\n  min-width: 100%;\n  box-sizing: content-box;\n}\n.simplebar-content {\n  overflow-x: scroll;\n  overflow-y: hidden;\n  box-sizing: border-box;\n  min-height: 100%;\n}\n.simplebar-track {\n  z-index: 1;\n  position: absolute;\n  right: 0;\n  bottom: 0;\n  width: 11px;\n}\n.simplebar-scrollbar {\n  position: absolute;\n  right: 2px;\n  border-radius: 7px;\n  min-height: 10px;\n  width: 7px;\n  opacity: 0;\n  transition: opacity .2s linear;\n  background: #000;\n  background-clip: padding-box;\n}\n.simplebar-track:hover .simplebar-scrollbar {\n  opacity: .5;\n  transition: opacity 0 linear;\n}\n.simplebar-track .simplebar-scrollbar.visible {\n  opacity: 0.5;\n}\n.simplebar-track.horizontal {\n  left: 0;\n  width: auto;\n  height: 11px;\n}\n.simplebar-track.vertical {\n  top: 0;\n}\n.horizontal.simplebar-track .simplebar-scrollbar {\n  right: auto;\n  top: 2px;\n  height: 7px;\n  min-height: 0;\n  min-width: 10px;\n  width: auto;\n}\n", ""]);

// exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);


class AdvancedComments {
    constructor() {
        this.name = 'Erweiterte Kommentare';
        this.description = 'Erweitert die Kommentare um Farben und weitere Funktionen';
    }


    load() {
        this.styles = __webpack_require__(25);

        this.prepareComments();
    }

    static handleMouseover(pId, source) {
        const elem = document.querySelectorAll(`#${pId} .comment-content`);
        source.title = elem[0].innerText;
    }


    prepareComments() {
        p.shouldShowScore = () => {
            return true;
        };

        window.addEventListener('commentsLoaded', () => {
            const comments = $('.comments .comment-box .comment');
            comments.tooltip();
            for(let i = 0; i < comments.length; i++) {
                const container = $(comments[i]);
                const comment = $(container.parents('.comment-box')[0]).prev('.comment');
                const userHref = container.find('.comment-foot > a.user')[0].href;
                const isOwnComment = userHref.substr(userHref.lastIndexOf('/') + 1) === p.user.name;

                if(comment[0]) {
                    const pId = comment[0].id;
                    let elem = document.createElement('a');
                    elem.href = `#${pId}`;
                    elem.className = 'fa fa-level-up action preview-link';
                    container.find('.comment-foot').append(elem);

                    if(isOwnComment) {
                        container[0].classList.add('own-comment');
                    }

                    elem.addEventListener('mouseover', () => {
                        AdvancedComments.handleMouseover(pId, elem);
                    });
                }
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AdvancedComments;



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(26);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./advancedComments.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./advancedComments.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".comments .comment + .comment-box {\n  padding-left: 0;\n}\n.comments .comment + .comment-box > div > .comment {\n  border-left-style: solid;\n  border-color: #ee4d2e;\n  padding-left: 5px;\n}\n.comments .comment + .comment-box > div > .comment > .comment-vote {\n  left: 10px;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #1db992;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #bfbc06;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #008fff;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #ff0082;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #ee2e2e;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #f7ea19;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #19f7a6;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #ee4d2e;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #8c19f7;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #19f743;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #b9791d;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #1db9b3;\n}\n.comments .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment + .comment-box > div > .comment {\n  border-color: #fff;\n}\n.comments .comment.own-comment {\n  color: #ee4d2e;\n}\n.ui-tooltip {\n  position: absolute;\n  z-index: 9999;\n  padding: 10px;\n  background-color: #2a2e31;\n  border: 2px solid #252525;\n  max-width: 30vw;\n}\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js__);


class NotificationCenter {
    constructor() {
        this.name = 'Nachriten Schnellzugriff';
        this.description = 'Öffnet neue Benachrichtigungen in einem kleinen Menü';
    }


    load() {
        this.menuOpen = false;
        this.template = __webpack_require__(28);
        this.templateEntry = __webpack_require__(29);
        this.style = __webpack_require__(30);
        this.icon = $('#inbox-link');
        this.elem = document.createElement('div');
        this.elem.innerHTML = this.template;

        this.elem.id = 'notification-center';
        document.querySelectorAll('.user-info.user-only')[0].appendChild(this.elem);
        this.messageContainer = document.getElementById('new-messages');

        this.addListener();
    }


    addListener() {
        this.icon.unbind('click');
        this.icon[0].addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMenu();
        });

        window.addEventListener('click', (e) => {
            if(this.menuOpen) {
                if(! $(e.target).parents('#notification-center')[0]) {
                    e.preventDefault();
                    this.toggleMenu();
                }
            }
        });
    }


    toggleMenu() {
        this.menuOpen = !this.menuOpen;
        this.icon[0].classList.toggle('active');
        this.elem.classList.toggle('visible');
        this.messageContainer.innerHTML = '<span class="fa fa-spinner fa-spin"></span>';
        this.messageContainer.classList.add('loading');

        this.getNotifications(true).then((notifications) => {
            let messages = notifications.messages;
            this.messageContainer.innerHTML = '';
            this.messageContainer.classList.remove('loading');
            p.user.setInboxLink(0);

            if(messages.length <= 0) {
                let elem = document.createElement('li');
                elem.innerText = 'Keine neuen Benachrichtigungen!';
                elem.className = 'no-notifications';
                this.messageContainer.appendChild(elem);
                return false;
            }

            for(let i = 0; i < messages.length; i++) {
                this.addEntry(NotificationCenter.getTitle(
                    messages[i]),
                    messages[i].name,
                    messages[i].created,
                    messages[i].thumb,
                    messages[i].mark,
                    messages[i].itemId,
                    messages[i].id,
                    messages[i].message
                );
            }
            new __WEBPACK_IMPORTED_MODULE_0__bower_components_simplebar_dist_simplebar_js___default.a(this.messageContainer);

            this.getNotifications(false).then((notifications) => {
                let messages = notifications.messages;

                if(messages.length <= 0) {
                    return false;
                }

                for(let i = 0; i < messages.length; i++) {
                    console.log($(this.messageContainer).find(`notification-${messages[i].id}`));
                    $(this.messageContainer).find(`#notification-${messages[i].id}`)[0].classList.add('new');
                }
            });
        });
    }


    static getTitle(message) {
        return message.thumb === null ? 'Private Nachricht' : 'Kommentar';
    }


    getNotifications(all = false) {
        return new Promise((resolve, reject) => {
            p.api.get(all ? 'inbox.all' : 'inbox.unread', {}, resolve, reject);
        });
    }


    addEntry(title, user, date, image, mark, id, cId, msg) {
        let elem = document.createElement('li');
        elem.id = `notification-${cId}`;
        let img = '<img src="//thumb.pr0gramm.com/##THUMB##" class="comment-thumb">';
        let url = image ? `/new/${id}:comment${cId}` : `/inbox/messages`;

        if(! image) {
            img = '<span class="message fa fa-envelope-open"></span>';
        } else {
            img = img.replace('##THUMB', image);
        }

        elem.innerHTML = this.templateEntry.replaceArray(
            ['##TITLE##', '##USER##', '##TIME##', '##THUMB##', '##URL##', '##MARK##', '##TEXT##'],
            [title, user, new Date(date * 1000).relativeTime(), img, url, mark, msg]
        );

        this.messageContainer.appendChild(elem);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotificationCenter;



/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "<ul id=new-messages> </ul> <div> <a href=/inbox/all class=action>Alle Benachrichtigungen</a> </div> ";

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = "<div> ##THUMB## </div> <a href=##URL## class=content> <div class=headline>##TITLE##</div> <div class=text>##TEXT##</div> <span class=\"user um##MARK##\">##USER##</span> <span class=\"time permalink\">##TIME##</span> </a> ";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./notificationCenter.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./notificationCenter.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, "#inbox-link {\n  position: relative;\n}\n#inbox-link.active {\n  color: var(--theme-main-color);\n}\n#notification-center {\n  display: none;\n  position: fixed;\n  right: 20px;\n  top: 52px;\n  z-index: 100;\n  border: 3px solid #2a2e31;\n  background-color: #161618;\n  box-shadow: 2px 0 10px #000;\n  min-width: 300px;\n  max-height: 50vh;\n  flex-direction: column;\n}\n#notification-center.visible {\n  display: flex;\n}\n#notification-center > div {\n  padding: 10px;\n  text-align: center;\n  border-top: 1px solid #252525;\n}\n#notification-center #new-messages {\n  padding-left: 10px;\n  margin: 0;\n}\n#notification-center #new-messages.loading {\n  text-align: center;\n  justify-content: center;\n  padding: 10px;\n}\n#notification-center #new-messages.loading .fa-spin {\n  font-size: 24px;\n}\n#notification-center #new-messages .simplebar-scrollbar {\n  background: #2a2e31;\n  right: 0;\n  border-radius: 0;\n}\n#notification-center #new-messages .simplebar-scrollbar.visible {\n  opacity: 1;\n}\n#notification-center #new-messages li {\n  align-items: center;\n  justify-content: center;\n  display: flex;\n  opacity: .5;\n}\n#notification-center #new-messages li:not(:last-child) {\n  border-bottom: 1px solid #252525;\n}\n#notification-center #new-messages li:hover {\n  opacity: 1;\n}\n#notification-center #new-messages li:hover .headline {\n  color: var(--theme-main-color);\n}\n#notification-center #new-messages li.new {\n  opacity: 1;\n}\n#notification-center #new-messages li.new .message:before {\n  content: '\\F0E0';\n}\n#notification-center #new-messages li.no-notifications {\n  text-align: center;\n  width: 100%;\n  padding: 10px;\n}\n#notification-center #new-messages li .headline {\n  color: #fff;\n  font-weight: bold;\n}\n#notification-center #new-messages li .comment-thumb {\n  height: 42px;\n  width: 42px;\n}\n#notification-center #new-messages li .content {\n  padding: 10px;\n  flex-grow: 1;\n}\n#notification-center #new-messages li .content small {\n  display: block;\n  font-size: 12px;\n  font-weight: normal;\n  color: #666;\n}\n#notification-center #new-messages li .content .time {\n  float: right;\n}\n#notification-center #new-messages li .content .text {\n  text-overflow: ellipsis;\n  max-width: 200px;\n  color: #666;\n  white-space: nowrap;\n  overflow: hidden;\n}\n#notification-center #new-messages li .content span {\n  font-size: 12px;\n}\n#notification-center #new-messages li .message {\n  width: 42px;\n  margin-left: 4px;\n  font-size: 34px;\n  margin-right: -4px;\n}\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Inspired by komas pr0gramm Desktop-Notification
// https://greasyfork.org/de/scripts/9984-pr0gramm-desktop-notification/code
class DesktopNotifications {
    constructor() {
        this.name = 'Desktop Notifications';
        this.description = 'Informiert bei neuen Benachrichtigungen';
        this.notifications = 0;
    }


    load() {
        window.addEventListener('userSync', (e) => {
            if(e.data.inboxCount > this.notifications) {
                GM_notification(
                    'Du hast ' + (e.data.inboxCount === 1 ? 'eine ungelesene Nachricht!' : e.data.inboxCount + ' ungelesene Nachrichten!'),
                    'pr0gramm',
                    'http://pr0gramm.com/media/pr0gramm-favicon.png',
                    function() {
                        window.focus();
                        window.location.href = '/inbox/unread';
                    }
                );
            }

            this.notifications = e.data.inboxCount;
        })
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DesktopNotifications;



/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Utils__ = __webpack_require__(2);


class FilterMarks {
    constructor() {
        this.name = 'Filtermarkierung';
        this.description = 'Markiert Medien entsprechend ihres Filters.'
    }


    load() {
        this.styles = __webpack_require__(34);
        this.overrideViews();
    }


    overrideViews() {
        let _this = this;

        // Handle detail-view
        p.View.Stream.Item = p.View.Stream.Item.extend({
            show: function (rowIndex, itemData, defaultHeight, jumpToComment) {
                this.parent(rowIndex, itemData, defaultHeight, jumpToComment);
                FilterMarks.displayFilterLabel(itemData, this.$container);
            }
        });

        // Fix audio-controls
        __WEBPACK_IMPORTED_MODULE_0__Utils__["a" /* default */].addVideoConstants();
    }


    static displayFilterLabel(itemData, $container) {
        let filter = FilterMarks.getFilter(itemData);
        let badge = document.createElement('span');
        badge.className = 'badge';

        badge.classList.toggle(filter);
        badge.innerText = filter.toUpperCase();

        $container.find('.item-details')[0].appendChild(badge);
    }


    static getFilter(itemData) {
        switch(itemData.flags) {
            case 1:
                return 'sfw';
            case 2:
                return 'nsfw';
            case 4:
                return 'nsfl';
            case 8:
                return 'nsfp';
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FilterMarks;



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
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
		module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./filterMarks.less", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/less-loader/dist/cjs.js!./filterMarks.less");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(undefined);
// imports


// module
exports.push([module.i, ".item-details .badge {\n  padding: 3px 5px;\n  font-size: 10px;\n  margin-left: 10px;\n  border-radius: 3px;\n}\n.item-details .badge.sfw {\n  background-color: #5cb85c;\n}\n.item-details .badge.nsfw {\n  background-color: #f0ad4e;\n}\n.item-details .badge.nsfl {\n  background-color: #d9534f;\n}\n.item-details .badge.nsfp {\n  background-color: #ee4d2e;\n}\n", ""]);

// exports


/***/ })
/******/ ]);