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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shuffler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shuffler.js */ "./src/js/shuffler.js");

var clickCount = 0;
var globalClicks = 0;
var currectChoices = 0;
var MAX_CLICKS_ALLOWED = 2;
var MAX_GLOBAL_CLICKS = 1;
var previousTileID = null;
var currentTileID = null;

function initBoard() {
  _shuffler_js__WEBPACK_IMPORTED_MODULE_0__["default"].forEach(function (tileObj) {
    var tileScreen = document.querySelector(".tileScreen");
    var tileContainer = document.createElement("div");
    var tile = document.createElement("div");
    tileContainer.classList.add("tileContainer");
    tile.classList.add("tile");
    tile.classList.add("tileHide");
    tile.setAttribute("id", tileObj.name);
    tile.innerText = tileObj.emoji;
    tileContainer.appendChild(tile);
    tileScreen.appendChild(tileContainer);
    tileContainer.addEventListener("click", handleBoardClicks);
  });
}

function handleBoardClicks(event) {
  var emoji = event.target.innerText;
  var tileID = event.target.id;

  if (globalClicks > MAX_GLOBAL_CLICKS) {
    // stop over clicking STUPID
    return;
  }

  clickCount++;
  globalClicks++;
  currentTileID = tileID;

  if (clickCount === MAX_CLICKS_ALLOWED) {
    // reset the board
    resetBoard();
    clickCount = 0;
    currentTileID = null; // resultScreen.innerText = "\u{1F6D1}";
  }

  currentTileID = tileID;

  if (currentTileID === previousTileID + 2 || currentTileID + 2 === previousTileID) {
    // MATCHED
    var resultScreen = document.querySelector(".results");
    resultScreen.innerText = emoji;
    console.log("MATCHED");
    previousTileID = null;
    currentTileID = null;
    tilesMatched(emoji);
  }

  event.target.classList.add("tileVisible");
  previousTileID = currentTileID;
} // reset all the tiles


function resetBoard() {
  setTimeout(function () {
    var allTiles = document.querySelectorAll(".tile");
    allTiles.forEach(function (tile) {
      tile.classList.remove("tileVisible");
    });
    previousTileID = null;
    globalClicks = 0;
  }, 1000);
}

function tilesMatched(tileEmoji) {
  currectChoices++;
  var allTiles = document.querySelectorAll(".tile");

  if (currectChoices === allTiles.length / 2) {
    console.log("YOU WIN!");
    win();
  }

  allTiles.forEach(function (tile) {
    if (tile.innerText === tileEmoji) {
      tile.classList.remove("tileHide");
      tile.classList.add("matched");
      tile.parentElement.removeEventListener("click", handleBoardClicks);
    }
  });
}

function win() {
  var winnerMessage = document.createElement("div");
  winnerMessage.classList.add("winner");
  winnerMessage.innerText = "Winner Winner Vegan Dinner!";
  var theBody = document.querySelector("body");
  theBody.appendChild(winnerMessage);
  winnerMessage.addEventListener("click", function () {
    theBody.removeChild(winnerMessage);
    restartGame();
    console.log("RESTARTING!!!");
  });
}

function restartGame() {
  window.location.reload(false);
}

initBoard();

/***/ }),

/***/ "./src/js/shuffler.js":
/*!****************************!*\
  !*** ./src/js/shuffler.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tileAssets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tileAssets.js */ "./src/js/tileAssets.js");


function duplicateTileArray(aTileSet) {
  var newTileSet = [];
  aTileSet.forEach(function (tileObject) {
    newTileSet.push(tileObject);
    newTileSet.push({
      name: tileObject.name + "2",
      emoji: tileObject.emoji
    });
  });
  return newTileSet;
}
/* Randomize array in-place using Durstenfeld shuffle algorithm */


function DurstenfeldShuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }

  return array;
}

var shuffledTiles = DurstenfeldShuffle(duplicateTileArray(_tileAssets_js__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (shuffledTiles);

/***/ }),

/***/ "./src/js/tileAssets.js":
/*!******************************!*\
  !*** ./src/js/tileAssets.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ([{
  name: "gorilla",
  emoji: "\uD83E\uDD8D"
}, {
  name: "fox",
  emoji: "\uD83E\uDD8A"
}, {
  name: "tiger",
  emoji: "\uD83D\uDC2F"
}, {
  name: "cow",
  emoji: "\uD83D\uDC2E"
}, {
  name: "monkey",
  emoji: "\uD83D\uDC35"
}, {
  name: "llama",
  emoji: "\uD83E\uDD99"
}, {
  name: "panda",
  emoji: "\uD83D\uDC3C"
}, {
  name: "kangroo",
  emoji: "\uD83E\uDD98"
}, {
  name: "eagle",
  emoji: "\uD83E\uDD85"
}, {
  name: "owl",
  emoji: "\uD83E\uDD89"
}]);

/***/ })

/******/ });
//# sourceMappingURL=main.bundle.js.map