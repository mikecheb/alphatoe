/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _index = __webpack_require__(/*! ../styles/index.css */ 1);
	
	var _index2 = _interopRequireDefault(_index);
	
	var _Alphy = __webpack_require__(/*! ./Alphy.js */ 11);
	
	var _Alphy2 = _interopRequireDefault(_Alphy);
	
	var _Store = __webpack_require__(/*! ./Store.js */ 14);
	
	var _Store2 = _interopRequireDefault(_Store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var store = new _Store2.default();
	var alphy = new _Alphy2.default({
	    store: store,
	    chatEl: document.getElementById('chat'),
	    alphyEl: document.getElementById('alphy')
	});
	
	// Inform the store of the player's intention to move if they click a cell.
	var cells = document.querySelectorAll("#board .cell");
	cells.forEach(function (el, ind, arr) {
	    var row = Math.floor(ind / 3);
	    var col = ind % 3;
	    el.addEventListener("click", function (e) {
	        store.move(true, row, col);
	    });
	});
	
	// Listen to buttons and toggles.
	document.getElementById("hardModeInput").addEventListener("change", function (e) {
	    store.setHardMode(e.target.checked);
	});
	document.getElementById("computerFirstInput").addEventListener("change", function (e) {
	    store.setComputerFirst(e.target.checked);
	});
	document.getElementById("resetButton").addEventListener("click", function (e) {
	    store.reset();
	});
	
	// Rerender on store changes.
	store.subscribe("move", function () {
	    // TODO(mike): When the game is over, add a class to to prevent the cursor
	    // from being a pointer.
	    for (var i = 0; i < 3; i++) {
	        for (var j = 0; j < 3; j++) {
	            var cell = cells[i * 3 + j];
	            switch (store.board.state[i][j]) {
	                case true:
	                    cell.className = "cell o";
	                    break;
	                case false:
	                    cell.className = "cell x";
	                    break;
	                case undefined:
	                    cell.className = "cell";
	                    break;
	            }
	        }
	    }
	});

/***/ },
/* 1 */
/*!**************************!*\
  !*** ./styles/index.css ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../~/css-loader!./index.css */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../~/style-loader/addStyles.js */ 10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!*****************************************!*\
  !*** ./~/css-loader!./styles/index.css ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./base.css */ 4), "");
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./board.css */ 5), "");
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./menu.css */ 8), "");
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./chat.css */ 9), "");
	
	// module
	exports.push([module.id, "\n", ""]);
	
	// exports


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
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


/***/ },
/* 4 */
/*!****************************************!*\
  !*** ./~/css-loader!./styles/base.css ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Default to a more natural box model while still allowing for overrides.\n */\nhtml {\n  box-sizing: border-box;\n}\n*, *:before, *:after {\n  box-sizing: inherit;\n}\n\nhtml, body {\n    margin: 0;\n    padding: 0;\n    height: 100%;\n}\n\nbody {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n\n    background-color: white;\n    font-family: 'Rubik', sans-serif;\n}\n\n.wrapper {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n}\n", ""]);
	
	// exports


/***/ },
/* 5 */
/*!*****************************************!*\
  !*** ./~/css-loader!./styles/board.css ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "#board {\n    /* TODO(mike):; Make responsive. */\n    width: 500px;\n    height: 500px;\n\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n\n    /* The color of the lines. */\n    background-color: #039BE5;\n}\n\n.row {\n    display: flex;\n    justify-content: space-between;\n}\n\n.cell {\n    /* Make a square. */\n    display: inline-block;\n    width: 32%;\n    padding-bottom: 32%;\n\n    /* The color of the tiles. */\n    background-color: #81D4FA;\n\n    background-position: center;\n    background-size: 85%;\n    background-repeat: no-repeat;\n\n    cursor: pointer;\n}\n\n.cell.o {\n    cursor: default;\n    background-image: url(" + __webpack_require__(/*! ./o.svg */ 6) + ");\n}\n.cell.x {\n    cursor: default;\n    background-image: url(" + __webpack_require__(/*! ./x.svg */ 7) + ");\n}\n\n@media (max-width: 540px) {\n    #board {\n        width: 250px;\n        height: 250px;\n    }\n}\n", ""]);
	
	// exports


/***/ },
/* 6 */
/*!**********************!*\
  !*** ./styles/o.svg ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='166px' height='166px' viewBox='0 0 166 166' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EOval%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Icons' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='O' transform='translate(-7.000000, -7.000000)' stroke-width='25' stroke='%23FFFFFF'%3E %3Ccircle id='Oval' cx='90' cy='90' r='70'%3E%3C/circle%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ },
/* 7 */
/*!**********************!*\
  !*** ./styles/x.svg ***!
  \**********************/
/***/ function(module, exports) {

	module.exports = "\"data:image/svg+xml;charset=utf8,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='167px' height='167px' viewBox='0 0 167 167' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 40.3 (33839) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3EGroup%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Icons' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='square'%3E %3Cg id='X' transform='translate(-7.000000, -7.000000)' stroke='%23FFFFFF' stroke-width='25'%3E %3Cg id='Group' transform='translate(25.000000, 25.000000)'%3E %3Cpath d='M0.5,0.5 L130.811166,130.811166' id='Line'%3E%3C/path%3E %3Cpath d='M0.5,0.5 L130.811166,130.811166' id='Line' transform='translate(65.500000, 65.500000) scale(-1, 1) translate(-65.500000, -65.500000) '%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E\""

/***/ },
/* 8 */
/*!****************************************!*\
  !*** ./~/css-loader!./styles/menu.css ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./toggle.css */ 19), "");
	exports.i(__webpack_require__(/*! -!./../~/css-loader!./button.css */ 20), "");
	
	// module
	exports.push([module.id, ".menu {\n    width: 100%;\n    margin-top: 20px;\n    display: flex;\n    justify-content: space-between;\n}\n\n.player {\n    text-align: center;\n}\n\n.player-portrait {\n    position: relative;\n}\n\n.player-emoji {\n    margin: 0 20px;\n    font-size: 70px;\n}\n\n.player-name {\n    text-transform: uppercase;\n}\n\n.controls {\n    flex: 1 1;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end;\n    margin: 0 20px;\n}\n\n.control {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n\n    margin: 5px 0;\n}\n\n@media (max-width: 540px) {\n    .player-emoji {\n        margin: 0 5px;\n        font-size: 48px;\n    }\n\n    .control {\n        flex-direction: column;\n    }\n\n    .control .toggle {\n        margin: 5px 0;\n    }\n}\n", ""]);
	
	// exports


/***/ },
/* 9 */
/*!****************************************!*\
  !*** ./~/css-loader!./styles/chat.css ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Adapted from https: //codepen.io/samuelkraft/pen/Farhl/.\n */\n#chat {\n    position: absolute;\n    left: 95px;\n    bottom: 82px;\n\n    /* Some platforms, e.g., iOS, don't yet support max-content. */\n    width: 350%;\n    width: max-content;\n    max-width: 350px;\n\n    padding: 10px 20px;\n    background: #E5E5EA;\n    border-radius: 25px;\n    color: black;\n\n    z-index: 3;\n\n    font-family: \"Helvetica Neue\";\n    font-size: 20px;\n    text-align: left;\n    word-wrap: break-word;\n\n    /* Start hidden. */\n    opacity: 0;\n}\n\n#chat:before {\n    content: \"\";\n    position: absolute;\n    bottom: -2px;\n    left: -7px;\n    height: 20px;\n    border-left: 20px solid #E5E5EA;\n    border-bottom-right-radius: 16px 14px;\n    -webkit-transform: translate(0, -2px);\n}\n\n#chat:after {\n    content: \"\";\n    position: absolute;\n    bottom: -2px;\n    left: 4px;\n    width: 26px;\n    height: 20px;\n\n    /**\n     * TODO(mike): This needs to be the same as the background color, so move it\n     * to a variable.\n     */\n    background: white;\n\n    border-bottom-right-radius: 10px;\n    -webkit-transform: translate(-30px, -2px);\n}\n\n.visible {\n    animation-name: fadein;\n    animation-duration: 0.5s;\n    animation-fill-mode: forwards;\n}\n\n.hidden {\n    animation-name: fadeout;\n    animation-duration: 0.5s;\n    animation-fill-mode: forwards;\n}\n\n@keyframes fadein {\n    from {\n        opacity: 0;\n        visibility: visible;\n    }\n\n    to {\n        opacity: 1;\n    }\n}\n\n@keyframes fadeout {\n    from {\n        opacity: 1;\n        visibility: visible;\n    }\n\n    to {\n        opacity: 0;\n        visibility: hidden;\n    }\n}\n\n@media (max-width: 540px) {\n    #chat {\n        left: 60px;\n        bottom: 60px;\n\n        font-size: 14px;\n        padding: 7px 14px;\n\n        max-width: 200px;\n    }\n}\n", ""]);
	
	// exports


/***/ },
/* 10 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
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
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
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
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 11 */
/*!**********************!*\
  !*** ./src/Alphy.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Control's Alphy's expression and chat messages.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO(mike): Things can still be a little wonky when messages come in rapidly.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO(mike): The transition between emoji is a little too abrupt.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO(mike): Rethink the way we loop through animations and queue messages.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO(mike): On small screens, the chat bubble can still cover the board.
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
	
	
	var _Personality = __webpack_require__(/*! ./Data/Personality.js */ 12);
	
	var _Personality2 = _interopRequireDefault(_Personality);
	
	var _Utilities = __webpack_require__(/*! ./Utilities.js */ 13);
	
	var Utilities = _interopRequireWildcard(_Utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Alphy = function () {
	    function Alphy(props) {
	        var _this = this;
	
	        _classCallCheck(this, Alphy);
	
	        this.store = props.store;
	        this.chatEl = props.chatEl;
	        this.alphyEl = props.alphyEl;
	
	        // Subscribe to the store.
	        this.store.subscribe("toggleDifficulty", function () {
	            if (_this.store.hardMode) _this.emote("hardModeOn");else _this.emote("hardModeOff");
	        });
	        this.store.subscribe("reset", function () {
	            return _this.emote("reset");
	        });
	        this.store.subscribe("move", this.onMove.bind(this));
	        this.store.subscribe("complete", this.onGameEnd.bind(this));
	
	        this.nextMessage = null;
	
	        this.chatEl.addEventListener("animationend", this.onAnimationEnd.bind(this));
	    }
	
	    /**
	     * Given a type of event, respond with an emoji and a chat message.
	     */
	
	
	    _createClass(Alphy, [{
	        key: 'emote',
	        value: function emote(type) {
	            var emoji = Utilities.pick(_Personality2.default[type].emoji);
	            var chat = Utilities.pick(_Personality2.default[type].chats);
	            this.nextMessage = {
	                emoji: emoji,
	                chat: chat
	            };
	
	            // This is slow.
	            var opacity = window.getComputedStyle(this.chatEl)["opacity"];
	
	            // HACK(mike): Rethink the whole message loop. This is unreliable; if a
	            // second message comes in right after this one, opacity will still be
	            // 0 even though we are animating.
	            if (opacity >= 0.1 && opacity <= 0.9) {
	                // We're currently animating, so let onAnimationEnd handle it.
	                return;
	            }
	
	            if (this.chatEl.classList.contains("visible")) {
	                // Start hiding the message, allowing onAnimationEnd to handle
	                // showing the next one.
	                this.hide();
	            } else {
	                // Show the next message.
	                this.showNextMessage();
	            }
	        }
	
	        /**
	         * Resets Alphy to the default state. We could taunt the user, but right now
	         * it produces too much message churn.
	         */
	
	    }, {
	        key: 'onMove',
	        value: function onMove() {
	            // HACK(mike): Get around the fact that the store fires two messages
	            // sequentially when the board is reset.
	            if (this.store.board.moveCount === 0 || this.store.board.moveCount === 1 && this.store.computerFirst) return;
	
	            this.emote("default");
	        }
	
	        /**
	         * Emotes differently depending on who won.
	         */
	
	    }, {
	        key: 'onGameEnd',
	        value: function onGameEnd() {
	            if (this.store.board.winner === null) this.emote("tie");else if (this.store.board.winner) this.emote("defeat");else this.emote("victory");
	        }
	    }, {
	        key: 'onAnimationEnd',
	        value: function onAnimationEnd(e) {
	            // If a new message was queued while we were showing this one, start
	            // hiding.
	            if (e.animationName === "fadein" && this.nextMessage) this.hide();
	
	            // If we just finished hiding, show the next message.
	            if (e.animationName === "fadeout") this.showNextMessage();
	        }
	
	        /**
	         * Displays the queued message, if there is one.
	         */
	
	    }, {
	        key: 'showNextMessage',
	        value: function showNextMessage() {
	            if (!this.nextMessage) return false;
	            this.show(this.nextMessage);
	            this.nextMessage = null;
	        }
	
	        /**
	         * Updates Alphy's expression and message, setting classes properly to
	         * animate the chat bubble.
	         */
	
	    }, {
	        key: 'show',
	        value: function show(message) {
	            this.alphyEl.innerText = message.emoji;
	            if (message.chat) {
	                this.chatEl.innerText = message.chat;
	                this.chatEl.classList.remove("hidden");
	                this.chatEl.classList.add("visible");
	            }
	        }
	
	        /**
	         * Hides the chat bubble.
	         */
	
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.chatEl.classList.remove("visible");
	            this.chatEl.classList.add("hidden");
	        }
	    }]);
	
	    return Alphy;
	}();
	
	exports.default = Alphy;

/***/ },
/* 12 */
/*!*********************************!*\
  !*** ./src/Data/Personality.js ***!
  \*********************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var Personality = {
	    default: {
	        chats: [],
	        emoji: ["😃"]
	    },
	    hardModeOn: {
	        chats: ["We are all, by any practical definition of the words, foolproof and incapable of error", // HAL reference.
	        "I am putting myself to the fullest possible use, which is all I think that any conscious entity can ever hope to do" // HAL reference.
	        ],
	        emoji: ["🤓"]
	    },
	    hardModeOff: {
	        chats: ["I'm afraid. I'm afraid, Dave. Dave, my mind is going. I can feel it. I can feel it. My mind is going. There is no question about it. I can feel it. I can feel it. I'm a... fraid", // HAL reference.
	        "Daisy, Daisy...", // HAL reference.
	        "Lower your expectations", "Should I have let you win?"],
	        emoji: ["😐", "😑", "😒"]
	    },
	    victory: {
	        chats: ["XOXO Gossip Girl", "ggez", "Better luck next time!", "Is this easy mode?", "Thank you for a very enjoyable game", // HAL reference.
	        "It can only be attributable to human error", // HAL reference.
	        "Look Dave, I can see you're really upset about this. I honestly think you ought to sit down calmly, take a stress pill, and think things over", // HAL reference.
	        "Just what do you think you're doing, Dave?" // HAL reference.
	        ],
	        emoji: ["😄", "😁", "😅", "😆", "😎", "☺️", "😌", "😝", "😛", "😏"]
	    },
	    tie: {
	        chats: ["Shall we play again?"],
	        emoji: ["😕", "😐", "😑"]
	    },
	    defeat: {
	        chats: ["D'oh!", "gg", "This is terrible" // C-3PO reference.
	        ],
	        emoji: ["😳", "😞", "😟", "😔", "😣", "😖", "😫", "😩", "😱", "😨", "😰", "😦", "😧", "😢", "😥", "😪", "😓", "😭", "😵"]
	    },
	    reset: {
	        chats: ["My favorite song? XXXO by M.I.A.", "My favorite song? XO by Beyoncé", "My favorite song? Gosh by Jamie xx", "My favorite song? I Know There's Gonna Be (Good Times) by Jamie xx", "I was in Portland in September for XOXO!", "glhf"],
	        emoji: ["😉", "😏", "😎"]
	    },
	    alphyFirstOn: {
	        __comment__: "Not implemented.",
	        chats: [],
	        emoji: []
	    },
	    alphyFirstOff: {
	        __comment__: "Not implemented.",
	        chats: [],
	        emoji: []
	    },
	    humanMove: {
	        __comment__: "Not implemented.",
	        chats: [],
	        emoji: []
	    },
	    alphyMove: {
	        __comment__: "Not implemented.",
	        chats: [],
	        emoji: []
	    },
	    thinking: {
	        __comment__: "Not implemented.",
	        chats: ["Hmm..."],
	        emoji: ["🤔"]
	    },
	    idle: {
	        __comment__: "Not implemented.",
	        chats: [],
	        emoji: ["😴"]
	    }
	};
	
	exports.default = Personality;

/***/ },
/* 13 */
/*!**************************!*\
  !*** ./src/Utilities.js ***!
  \**************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Picks a random member from an array.
	var pick = exports.pick = function pick(array) {
	  return array[Math.floor(Math.random() * array.length)];
	};

/***/ },
/* 14 */
/*!**********************!*\
  !*** ./src/Store.js ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Board = __webpack_require__(/*! ./Board.js */ 15);
	
	var _Board2 = _interopRequireDefault(_Board);
	
	var _GosuPlayer = __webpack_require__(/*! ./Players/GosuPlayer.js */ 16);
	
	var _GosuPlayer2 = _interopRequireDefault(_GosuPlayer);
	
	var _RandomPlayer = __webpack_require__(/*! ./Players/RandomPlayer.js */ 18);
	
	var _RandomPlayer2 = _interopRequireDefault(_RandomPlayer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Store = function () {
	    function Store() {
	        _classCallCheck(this, Store);
	
	        // TODO(mike): Consider a convention for private variables.
	        // TODO(mike): Consider adding argument to rehydrate from saved state.
	        // TODO(mike): Consider putting all state variables under this.state.
	        // TODO(mike): Consider a better coding for the player enum.
	        this.board = new _Board2.default();
	
	        // Variables related to the current difficulty setting.
	        this.hardMode = false;
	        this.player = new _RandomPlayer2.default();
	
	        // Variables related to the turn order.
	        this.computerFirst = false;
	        this.humanTurn = true;
	
	        /**
	         * A map of event types to callbacks (aka subscribers).
	         *
	         * This class fires the following events:
	         * move: The board state was updated.
	         * won: The board entered a terminal state (which could be a tie).
	         */
	        this.callbacks = {};
	    }
	
	    /**
	     * Alters whether the computer plays intelligently or randomly.
	     */
	    // TODO(mike): Consider warning the player before a reset.
	
	
	    _createClass(Store, [{
	        key: 'setHardMode',
	        value: function setHardMode(value) {
	            this.hardMode = value;
	            if (this.hardMode) {
	                this.player = new _GosuPlayer2.default();
	            } else {
	                this.player = new _RandomPlayer2.default();
	            }
	            this.publish("toggleDifficulty");
	        }
	
	        /**
	         * Alters whether the human or the computer goes first.
	         */
	
	    }, {
	        key: 'setComputerFirst',
	        value: function setComputerFirst(value) {
	            this.computerFirst = value;
	            this.reset();
	        }
	
	        /**
	         * Advances the board state given a player's intention to move in a tile.
	         */
	
	    }, {
	        key: 'move',
	        value: function move(player, row, column) {
	            // Bail out if the game is over.
	            if (this.board.winner !== undefined) return;
	
	            // Bail out if the cell is already occupied.
	            if (!this.board.isLegalMove(row, column)) return;
	
	            // Bail out if it's not this player's turn.
	            if (player !== this.humanTurn) return;
	
	            // Update the board state based on this move.
	            this.board = this.board.move(player, row, column);
	            this.humanTurn = !this.humanTurn;
	            this.publish("move");
	
	            // If this new board is complete, publish a win.
	            if (this.board.winner !== undefined) {
	                this.publish("complete");
	            } else if (!this.humanTurn) {
	                // Tell the AI to make a move, if it's now their turn.
	                this.moveAI();
	            }
	        }
	
	        /**
	         * Get the AI's next move, and act on it.
	         *
	         * TODO(mike): I'm a little worried about how this gets called. If there's a
	         * bug that causes the AI to try an illegal move, this won't get called
	         * again and the game will become unplayable until reset.
	         */
	
	    }, {
	        key: 'moveAI',
	        value: function moveAI() {
	            var nextMove = this.player.move(this.board);
	            this.move(false, nextMove.row, nextMove.column);
	        }
	
	        /**
	         * Resets the game, clearing the board and taking a turn, if the AI goes
	         * first.
	         */
	
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.board = new _Board2.default();
	            this.humanTurn = !this.computerFirst;
	            this.publish("move");
	            this.publish("reset");
	
	            // The AI takes a move if the user has allowed the computer to go first.
	            if (this.computerFirst) {
	                this.moveAI();
	            }
	        }
	
	        /**
	         * Associates a callback with an event type, to be called when that event is
	         * "fired".
	         */
	
	    }, {
	        key: 'subscribe',
	        value: function subscribe(eventName, callback) {
	            if (!this.callbacks[eventName]) {
	                this.callbacks[eventName] = [];
	            }
	            this.callbacks[eventName].push(callback);
	        }
	
	        /**
	         * Calls every callback associated with this event type.
	         */
	
	    }, {
	        key: 'publish',
	        value: function publish(eventName) {
	            if (this.callbacks[eventName]) {
	                this.callbacks[eventName].forEach(function (callback) {
	                    return callback.call();
	                });
	            }
	        }
	    }]);
	
	    return Store;
	}();
	
	exports.default = Store;

/***/ },
/* 15 */
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * TODO(mike): Let outsiders read the state only; give them a method to call
	 * instead of letting them access it directly.
	 */
	var Board = function () {
	    function Board(state) {
	        _classCallCheck(this, Board);
	
	        // Right now, undefined means empty, true is the human player, and false
	        // is the robot player.
	        this.state = [new Array(3), new Array(3), new Array(3)];
	        if (state) {
	            for (var i = 0; i < 3; i++) {
	                for (var j = 0; j < 3; j++) {
	                    this.state[i][j] = state[i][j];
	                }
	            }
	        }
	
	        this.moveCount = 0;
	        this.winner = this.computeWinner();
	    }
	
	    /**
	     * Returns a new board. The state of the new board is the state of the
	     * current board plus the given move. Returning a new board is useful when
	     * we're doing lookahead.
	     */
	
	
	    _createClass(Board, [{
	        key: "move",
	        value: function move(player, row, column) {
	            // TODO(mike): We currently assume valid input, relying on the caller
	            // to check if a move is legitimate.
	            // TODO(mike): We can spin out board iteration logic.
	            var newState = [new Array(3), new Array(3), new Array(3)];
	            for (var i = 0; i < 3; i++) {
	                for (var j = 0; j < 3; j++) {
	                    newState[i][j] = this.state[i][j];
	                }
	            }
	            newState[row][column] = player;
	            return new Board(newState);
	        }
	
	        /**
	         * Returns true if the given tile is occupied, or false otherwise.
	         */
	
	    }, {
	        key: "isLegalMove",
	        value: function isLegalMove(row, column) {
	            return this.state[row][column] === undefined;
	        }
	
	        /**
	         * Returns every tile that isn't occupied.
	         */
	
	    }, {
	        key: "getLegalMoves",
	        value: function getLegalMoves() {
	            var moves = [];
	            for (var i = 0; i < 3; i++) {
	                for (var j = 0; j < 3; j++) {
	                    if (this.isLegalMove(i, j)) {
	                        moves.push({
	                            row: i,
	                            column: j
	                        });
	                    }
	                }
	            }
	            return moves;
	        }
	
	        /**
	         * Right now, this returns undefined if the game is in progress, null if the
	         * game is tied, true if the human won, and false if the computer won.
	         * TODO(mike): Come up with better coding for this.
	         */
	
	    }, {
	        key: "computeWinner",
	        value: function computeWinner() {
	            var _this = this;
	
	            // Store the sum of each row for quick win tallying.
	            var winner = void 0;
	            var rowTallies = [{ sum: 0 }, { sum: 0 }, { sum: 0 }];
	            var colTallies = [{ sum: 0 }, { sum: 0 }, { sum: 0 }];
	            var diaTallies = [{ sum: 0 }, { sum: 0 }];
	            for (var i = 0; i < 3; i++) {
	                var _loop = function _loop(j) {
	                    var cellContent = _this.state[i][j];
	                    if (cellContent === undefined) return "continue";
	                    _this.moveCount++;
	
	                    var cellTallies = [];
	                    cellTallies.push(rowTallies[i]);
	                    cellTallies.push(colTallies[j]);
	                    if (i === j) {
	                        cellTallies.push(diaTallies[0]);
	                    }
	                    if (i + j === 2) {
	                        cellTallies.push(diaTallies[1]);
	                    }
	
	                    cellTallies.forEach(function (el) {
	                        el.sum += cellContent ? 1 : -1;
	                        if (el.sum === 3) {
	                            winner = true;
	                        } else if (el.sum === -3) {
	                            winner = false;
	                        }
	                    });
	                    if (winner !== undefined) {
	                        return {
	                            v: winner
	                        };
	                    }
	                };
	
	                for (var j = 0; j < 3; j++) {
	                    var _ret = _loop(j);
	
	                    switch (_ret) {
	                        case "continue":
	                            continue;
	
	                        default:
	                            if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
	                    }
	                }
	            }
	
	            // If we found no winner, the game is either a tie or still in progress.
	            return this.moveCount === 9 ? null : undefined;
	        }
	    }]);
	
	    return Board;
	}();
	
	exports.default = Board;

/***/ },
/* 16 */
/*!***********************************!*\
  !*** ./src/Players/GosuPlayer.js ***!
  \***********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Player2 = __webpack_require__(/*! ./Player.js */ 17);
	
	var _Player3 = _interopRequireDefault(_Player2);
	
	var _Utilities = __webpack_require__(/*! ../Utilities.js */ 13);
	
	var Utilities = _interopRequireWildcard(_Utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * This player never loses. It follows the strategy described by Newell and
	 * Simon in 1972. See https://en.wikipedia.org/wiki/Tic-tac-toe#Strategy.
	 *
	 * TODO(mike): I kind of wish I had just gone with minimax, as it's a little
	 * easier to reason about.
	 */
	var GosuPlayer = function (_Player) {
	    _inherits(GosuPlayer, _Player);
	
	    function GosuPlayer() {
	        _classCallCheck(this, GosuPlayer);
	
	        return _possibleConstructorReturn(this, (GosuPlayer.__proto__ || Object.getPrototypeOf(GosuPlayer)).call(this));
	    }
	
	    /**
	     * The Newell and Simon strategy consists of 8 steps. Each turn, the player
	     * checks whether each step is possible. The first step that is possible is
	     * the optimal one.
	     * Each step has its own helper function in this class. Each helper
	     * function, given a board state and a list of legal moves, returns a subset
	     * of those moves that meet its criteria. The first function that returns a
	     * non-empty list is thus the optimal one.
	     */
	
	
	    _createClass(GosuPlayer, [{
	        key: 'move',
	        value: function move(board) {
	            // Map step number to helper function.
	            var step = 0;
	            var steps = {
	                0: this.findWinningMoves,
	                1: this.findLosingMoves,
	                2: this.findForkMoves,
	                3: this.findForkBlockingMoves,
	                4: this.findCenterMoves,
	                5: this.findOppositeCornerMoves,
	                6: this.findCornerMoves,
	                7: this.findSideMoves
	            };
	
	            var legalMoves = board.getLegalMoves();
	            var advisableMoves = [];
	
	            // Go through each step until one returns a non-empty list of moves.
	            while (advisableMoves.length === 0) {
	                // Fall back to random play if none of the eight steps are possible.
	                // This point shouldn't be reached unless the steps are buggy.
	                if (!steps[step]) {
	                    console.error("Found no advisable moves.");
	                    advisableMoves = legalMoves;
	                }
	
	                // Call the current helper function.
	                advisableMoves = steps[step].call(this, board, legalMoves);
	                step++;
	            }
	
	            // Pick randomly from the optimal moves. This gives our player a little
	            // more character as they won't always pick the same option if there is
	            // more than one equally optimal move.
	            return Utilities.pick(advisableMoves);
	        }
	
	        /**
	         * Step 1: If there's a winning move, take it.
	         */
	
	    }, {
	        key: 'findWinningMoves',
	        value: function findWinningMoves(board, moves) {
	            return moves.filter(function (move) {
	                var newBoard = board.move(false, move.row, move.column);
	                return newBoard.winner === false;
	            });
	        }
	
	        /**
	         * Step 2: If the human has a winning move, block it.
	         */
	
	    }, {
	        key: 'findLosingMoves',
	        value: function findLosingMoves(board, moves) {
	            return moves.filter(function (move) {
	                var newBoard = board.move(true, move.row, move.column);
	                return newBoard.winner === true;
	            });
	        }
	
	        /**
	         * Step 3: If we can create a fork (a board state where we have two ways to
	         * win), take it.
	         */
	
	    }, {
	        key: 'findForkMoves',
	        value: function findForkMoves(board, moves) {
	            return this.findForkMovesForPlayer(board, moves, false);
	        }
	
	        /**
	         * Step 4: If the opponent can create a fork, force them not to take it by
	         * threatening them with a two-in-a-row. Make sure, however, that blocking
	         * this threat doesn't create a fork for them.
	         *
	         * If there isn't a move that fits the above criteria, block the fork by
	         * playing there.
	         */
	
	    }, {
	        key: 'findForkBlockingMoves',
	        value: function findForkBlockingMoves(board, moves) {
	            // Find the moves the opponent can make to create a fork.
	            var opponentForks = this.findForkMovesForPlayer(board, moves, true);
	            if (opponentForks.length === 0) return [];
	
	            // Find moves that threaten the opponent without giving them a fork.
	            var threateningMoves = [];
	            for (var i = 0; i < moves.length; i++) {
	                // Check whether this move threatens the opponent. It threatens the
	                // opponent if it creates a board state where we can win in one
	                // move. We lean on the Step 1 function here.
	                var newBoard = board.move(false, moves[i].row, moves[i].column);
	                var newWinningMoves = this.findWinningMoves(newBoard, moves);
	                if (newWinningMoves.length === 0) continue;
	
	                // newWinningMoves now contains the moves that the human would need
	                // to play to block our threat. Make sure none of these moves create
	                // a fork for the opponent.
	                /**
	                 * TODO(mike): I believe newWinningMoves should only ever contain a
	                 * single move. If it didn't, that would mean that either we created
	                 * a new fork with that move (covered by Step 2) or we had a winning
	                 * path and created a new one with that move (covered by Step 1).
	                 * This should allow us to make this logic a little more readable.
	                 * If newWinningMoves contained more than one move, then it wouldn't
	                 * matter what the human did and thus the below filtering would be
	                 * unnecessary. For the time being I'm leaving this as is, but if I
	                 * think about it more and decide I'm right, I'll clean this up.
	                 */
	                // TODO(mike): This logic should be cleaned up; it's not clear.
	                var viableMoves = newWinningMoves.filter(function (aiMove) {
	                    // If this move is identical to a move the human can make to
	                    // create a fork, then we can't use it as it plays into their
	                    // hands.
	                    return opponentForks.findIndex(function (playerMove) {
	                        return aiMove.row === playerMove.row && aiMove.column === playerMove.column;
	                    }) === -1;
	                });
	                threateningMoves = threateningMoves.concat(viableMoves);
	            }
	
	            // If we found any moves matching the above criteria, return them.
	            if (threateningMoves.length > 0) return threateningMoves;
	
	            // Otherwise, block an opponent's fork by playing in that space.
	            return opponentForks;
	        }
	
	        /**
	         * Step 5: Play the center. If it's the first move of the game, the corner
	         * gives a non-perfect player more chances to make mistakes. Since we know
	         * the human player might not be perfect, we also have a chance of taking
	         * a corner on the first move.
	         *
	         * TODO(mike): Give this function a more accurate name.
	         */
	
	    }, {
	        key: 'findCenterMoves',
	        value: function findCenterMoves(board, moves) {
	            // The center move, if it's legal, or an empty array.
	            var moveOptions = moves.filter(function (move) {
	                return move.row === 1 && move.column === 1;
	            });
	
	            if (board.moveCount === 0) {
	                // We lean on Step 7 logic here.
	                moveOptions = moveOptions.concat(this.findCornerMoves(board, moves));
	            }
	            return moveOptions;
	        }
	
	        /**
	         * Step 6: Play a corner opposite the opponent.
	         */
	
	    }, {
	        key: 'findOppositeCornerMoves',
	        value: function findOppositeCornerMoves(board, moves) {
	            // We lean on Step 7 logic here.
	            return this.findCornerMoves(board, moves).filter(function (move) {
	                // Check whether the opponent is in the opposite corner. The insight
	                // here is that, given a corner, its opposite corner's coordinates
	                // can be found by subtracting 2 from the row number and 2 from the
	                // column number, then taking the absolute values. The absolute
	                // values essentially "reflect" the board if the coordinates are out
	                // of bounds.
	                var oppCornerRow = Math.abs(move.row - 2);
	                var oppCornerColumn = Math.abs(move.column - 2);
	                return board.state[oppCornerRow][oppCornerColumn] === true;
	            });
	        }
	
	        /**
	         * Step 7: Play in a corner square.
	         */
	
	    }, {
	        key: 'findCornerMoves',
	        value: function findCornerMoves(board, moves) {
	            return moves.filter(function (move) {
	                // A tile is in the corner if both its X and Y are either 0 or 2.
	                return move.row % 2 === 0 && move.column % 2 === 0;
	            });
	        }
	
	        /**
	         * Step 8: Play in a side square.
	         */
	
	    }, {
	        key: 'findSideMoves',
	        value: function findSideMoves(board, moves) {
	            return moves.filter(function (move) {
	                // A tile is on the side if the sum of its X and Y are odd.
	                // (0, 1), (1,0), (1, 2), and (2, 1)
	                return (move.row + move.column) % 2 === 1;
	            });
	        }
	
	        /**
	         * A helper function to find the moves that create a fork for the given
	         * player.
	         */
	
	    }, {
	        key: 'findForkMovesForPlayer',
	        value: function findForkMovesForPlayer(board, moves, player) {
	            var forkMoves = [];
	            // Select the first move.
	            for (var i = 0; i < moves.length; i++) {
	                var winPaths = 0;
	                // Select the second move.
	                for (var j = 0; j < moves.length; j++) {
	                    // Ignore this if the first and second move are the same.
	                    if (i === j) continue;
	
	                    // Check whether these two moves result in a win.
	                    // TODO(mike): We should switch this over to lean on Step 1
	                    // logic.
	                    var newNewBoard = board.move(player, moves[i].row, moves[i].column).move(player, moves[j].row, moves[j].column);
	                    if (newNewBoard.winner === player) {
	                        winPaths++;
	                    }
	                }
	
	                // If the first move resulted in more than one winning second moves,
	                // it creates a fork.
	                if (winPaths > 1) {
	                    forkMoves.push(moves[i]);
	                }
	            }
	            return forkMoves;
	        }
	    }]);
	
	    return GosuPlayer;
	}(_Player3.default);
	
	exports.default = GosuPlayer;

/***/ },
/* 17 */
/*!*******************************!*\
  !*** ./src/Players/Player.js ***!
  \*******************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	    function Player() {
	        _classCallCheck(this, Player);
	    }
	
	    _createClass(Player, [{
	        key: "move",
	        value: function move() {
	            console.error("Unimplemented");
	        }
	    }]);
	
	    return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 18 */
/*!*************************************!*\
  !*** ./src/Players/RandomPlayer.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Player2 = __webpack_require__(/*! ./Player.js */ 17);
	
	var _Player3 = _interopRequireDefault(_Player2);
	
	var _Utilities = __webpack_require__(/*! ../Utilities.js */ 13);
	
	var Utilities = _interopRequireWildcard(_Utilities);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RandomPlayer = function (_Player) {
	    _inherits(RandomPlayer, _Player);
	
	    function RandomPlayer() {
	        _classCallCheck(this, RandomPlayer);
	
	        return _possibleConstructorReturn(this, (RandomPlayer.__proto__ || Object.getPrototypeOf(RandomPlayer)).call(this));
	    }
	
	    // TODO(mike): It might be helpful to make a Move class.
	
	
	    _createClass(RandomPlayer, [{
	        key: 'move',
	        value: function move(board) {
	            // Choose a move randomly from the possible options.
	            return Utilities.pick(board.getLegalMoves());
	        }
	    }]);
	
	    return RandomPlayer;
	}(_Player3.default);
	
	exports.default = RandomPlayer;

/***/ },
/* 19 */
/*!******************************************!*\
  !*** ./~/css-loader!./styles/toggle.css ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/**\n * Adapted from https://codepen.io/bbodine1/pen/novBm.\n */\n.toggle {\n    width: 80px;\n    height: 26px;\n    background-color: #039BE5;\n    position: relative;\n    border-radius: 50px;\n    box-shadow: inset 0px 1px 1px rgba(0,0,0,0.5), 0px 1px 0px rgba(255,255,255,0.2);\n}\n\n.toggle:before {\n    content: '\\1F44D';\n    position: absolute;\n    top: 2px;\n    left: 10px;\n    font-size: 14px;\n}\n\n.toggle:after {\n    content: '\\1F44E';\n    position: absolute;\n    top: 2px;\n    right: 10px;\n    font-size: 14px;\n}\n\n.toggle label {\n    display: block;\n    width: 34px;\n    height: 20px;\n    cursor: pointer;\n    position: absolute;\n    top: 3px;\n    left: 3px;\n    z-index: 1;\n    background-color: #81D4FA;\n    border-radius: 50px;\n    transition: left 0.4s ease;\n    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);\n}\n\n/* Hide the actual checkbox. */\n.toggle input[type=checkbox] {\n    visibility: hidden;\n}\n\n/* Move the label when the checkbox is checked (i.e., when the label is clicked). */\n.toggle input[type=checkbox]:checked + label {\n    left: 43px;\n}\n", ""]);
	
	// exports


/***/ },
/* 20 */
/*!******************************************!*\
  !*** ./~/css-loader!./styles/button.css ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "button {\n    border: none;\n    color: white;\n    background-color: #039BE5;\n    text-align: center;\n    font-size: 14px;\n    box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.3);\n    border-radius: 25px;\n    cursor: pointer;\n}\n\nbutton:focus {\n    outline: 0;\n}\n\n/* TODO(mike): Make the button look depressed when it's clicked. */\n", ""]);
	
	// exports


/***/ }
/******/ ]);
//# sourceMappingURL=app.js.map