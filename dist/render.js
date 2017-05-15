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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMainMarkup = createMainMarkup;
exports.renderNewVideos = renderNewVideos;
exports.renderCarouselPagination = renderCarouselPagination;

var _tmpls = __webpack_require__(4);

function createMainMarkup() {
    var mainContainer = document.createElement('div');
    var formSection = document.createElement('section');
    var carouselSection = formSection.cloneNode();

    mainContainer.className += 'main-container';
    formSection.className += 'search-container section';
    carouselSection.className += 'carousel-section section';
    formSection.innerHTML = _tmpls.formSectionInner;
    carouselSection.innerHTML = _tmpls.carouselSectionInner;
    mainContainer.appendChild(formSection);
    mainContainer.appendChild(carouselSection);
    document.body.prepend(mainContainer);
    var script = document.createElement('script');
    script.src = './dist/bundle.js';
    document.body.appendChild(script);
}

function renderNewVideos(container, videos) {
    videos.forEach(function (video) {
        var newElement = document.createElement('div');
        newElement.className += 'carousel-item';
        newElement.innerHTML = (0, _tmpls.createCarouselItemInner)(video);
        container.appendChild(newElement);
    });
}

function renderCarouselPagination(container, slideQuantity) {
    var newElement = document.createElement('div');
    newElement.className += 'carousel-pagination';
    newElement.innerHTML = (0, _tmpls.createCarouselPaginationInner)(slideQuantity);
    container.append(newElement);
}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createCarouselItemInner = createCarouselItemInner;
exports.createCarouselPaginationInner = createCarouselPaginationInner;
var formSectionInner = exports.formSectionInner = '\n<form class="search-container__form" action="">\n    <input class="search-container__input" type="search" placeholder="Search">\n    <i class="fa fa-times search-container__clear" aria-hidden="true"></i>\n    <button class="search-container__sumbit" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>\n</form>\n';

var carouselSectionInner = exports.carouselSectionInner = '\n<div class="carousel-section__wrapper">\n    <div class="carousel-section__container"></div>\n</div>\n';

function createCarouselItemInner(video) {
    var date = video.snippet.publishedAt.slice(0, 10).split('-').reverse().join('.');
    return '\n    <a class="carousel-item__image" href="https://www.youtube.com/watch?v=' + video.id.videoId + '" style="background-image:url(' + video.snippet.thumbnails.high.url + ')"></a>\n    <div class="carousel-item__info-container">\n        <a class="carousel-item__caption" href="https://www.youtube.com/watch?v=' + video.id.videoId + '" class="carousel-item__link">' + video.snippet.title + '</a>\n        <div class="carousel-item__info carousel-item__info_channel"><i class="fa fa-user" aria-hidden="true"></i><span>' + video.snippet.channelTitle + '</span></div>\n        <div class="carousel-item__info carousel-item__info_views"><i class="fa fa-eye" aria-hidden="true"></i><span>' + video.statistics.viewCount + '</span></div>\n        <div class="carousel-item__info carousel-item__info_date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + date + '</span></div>\n        <p class="carousel-item__description"><b>Description:</b> ' + video.snippet.description + '</p>\n    </div>\n    ';
}

function createCarouselPaginationInner(lastSlideIndex) {
    return '\n    <div class="carousel-pagination__container">\n        <button  class="carousel-pagination__item active">1</button>\n        <div class ="carousel-pagination__item disabled">...</div>\n        <button class="carousel-pagination__item">2</button>\n        <button class="carousel-pagination__item">3</button>\n        <button class="carousel-pagination__item">4</button>\n        <div class ="carousel-pagination__item disabled">...</div>\n        <button class="carousel-pagination__item">' + lastSlideIndex + '</button>\n    </div>\n    ';
}

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _render = __webpack_require__(0);

__webpack_require__(8);

document.addEventListener('DOMContentLoaded', function () {
  return (0, _render.createMainMarkup)();
});

/***/ })
/******/ ]);