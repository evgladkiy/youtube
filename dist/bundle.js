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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.changeCarouselContainerPositionX = changeCarouselContainerPositionX;
exports.setCarouselInitState = setCarouselInitState;
exports.calculateAmount = calculateAmount;
exports.calcSlideQuantity = calcSlideQuantity;
exports.carouselChangeCurrentSlide = carouselChangeCurrentSlide;
var carouselSetting = exports.carouselSetting = {
    firstItemIndex: 1,
    currentSlide: 0,
    slideBefoneNextRequest: 2,
    itemsQuantity: 0,
    amountOfElements: null,
    slideQuantity: null,
    itemWidth: null
};

var carouselContainer = exports.carouselContainer = document.querySelector('.carousel-section__container');

function changeCarouselContainerPositionX(position, duration) {
    if (Number.parseFloat(carouselContainer.style.transitionDuration) !== duration) {
        carouselContainer.style.transitionDuration = duration + 's';
    }
    carouselContainer.style.transform = 'translateX(' + position + 'px)';
}

function setCarouselInitState() {
    carouselSetting.firstItemIndex = 1;
    carouselSetting.currentSlide = 0;
    carouselContainer.innerHTML = '';
    changeCarouselContainerPositionX(0, 0);
}

function calculateAmount() {
    carouselSetting.amountOfElements = Math.round(carouselContainer.offsetWidth / carouselSetting.itemWidth);
}

function calcSlideQuantity() {
    calculateAmount();
    carouselSetting.slideQuantity = Math.round(carouselSetting.itemsQuantity / carouselSetting.amountOfElements);
}

function carouselChangeCurrentSlide(duration) {
    carouselSetting.currentSlide = Math.round((carouselSetting.firstItemIndex - 1) / carouselSetting.amountOfElements);

    var translateXdistance = -carouselSetting.currentSlide * carouselContainer.offsetWidth;
    changeCarouselContainerPositionX(translateXdistance, duration);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.searchSetting = undefined;
exports.getVideos = getVideos;
exports.getNextVideos = getNextVideos;

var _carouselCalculations = __webpack_require__(1);

var _render = __webpack_require__(0);

var searchSetting = exports.searchSetting = {
    apiKey: 'AIzaSyDE7Byt1p9U5ns81OaG5_jjO6gyMiOkSMM',
    searchVideoUrl: 'https://www.googleapis.com/youtube/v3/search',
    searchStatisticsUrl: 'https://www.googleapis.com/youtube/v3/videos',
    searchVideoPart: 'snippet, id',
    searchStatsPart: 'statistics',
    currentpageToken: '',
    maxResults: '15',
    type: 'video',
    q: null
};

function objectToParameters(obj) {
    return Object.keys(obj).reduce(function (acc, item, index) {
        var params = acc;
        if (item !== '' && index > 0) {
            params += '&';
        }
        params += item + '=' + encodeURIComponent(obj[item]);
        return params;
    }, '');
}

function httpGetData(url, parameters) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url + '?' + objectToParameters(parameters), true);

        xhr.onload = function xhrLoadHandler() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                var error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = function () {
            reject(new Error('Network Error'));
        };

        xhr.send();
    });
}

function getStatistics(videosArr) {
    var idString = videosArr.map(function (item) {
        return item.id.videoId;
    }).join(',');
    var searchStatsParam = {
        key: searchSetting.apiKey,
        part: searchSetting.searchStatsPart,
        id: idString
    };

    return httpGetData(searchSetting.searchStatisticsUrl, searchStatsParam);
}

function addStatistics(videosArr, statistics) {
    var statsArr = JSON.parse(statistics).items;

    return videosArr.map(function (video, index) {
        var item = video;
        item.statistics = statsArr[index].statistics;
        return item;
    });
}

function getVideos() {
    var searchVideoParams = {
        key: searchSetting.apiKey,
        part: searchSetting.searchVideoPart,
        maxResults: searchSetting.maxResults,
        pageToken: searchSetting.currentpageToken,
        type: searchSetting.type,
        q: searchSetting.q
    };
    var videosArr = void 0;

    return httpGetData(searchSetting.searchVideoUrl, searchVideoParams).then(function (response) {
        var responseObj = JSON.parse(response);
        videosArr = responseObj.items;
        _carouselCalculations.carouselSetting.itemsQuantity += videosArr.length;
        searchSetting.currentpageToken = responseObj.nextPageToken;
        return getStatistics(videosArr);
    }).then(function (statistics) {
        return addStatistics(videosArr, statistics);
    });
}

function getNextVideos(container) {
    return getVideos().then(function (videos) {
        return (0, _render.renderNewVideos)(container, videos);
    });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addListeners = addListeners;
exports.debounce = debounce;
function addListeners(elem, events, func) {
    events.split(' ').forEach(function (event) {
        return elem.addEventListener(event, func, false);
    });
}

function debounce(func, ms) {
    var state = true;
    var isCooldown = false;

    return function () {
        if (isCooldown) {
            return;
        }
        func();
        isCooldown = state;
        setTimeout(function () {
            isCooldown = null;
        }, ms);
    };
}

/***/ }),
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paginationButtons = undefined;
exports.changeElementIndex = changeElementIndex;
exports.pagiantionIntit = pagiantionIntit;
exports.changeEmptyButtonsState = changeEmptyButtonsState;
exports.nextButtons = nextButtons;
exports.prevButtons = prevButtons;
exports.paginationHandler = paginationHandler;
exports.resizePaginationHandler = resizePaginationHandler;

var _carouselCalculations = __webpack_require__(1);

var _search = __webpack_require__(2);

var paginationButtons = exports.paginationButtons = {};

function changeElementIndex(num) {
    paginationButtons.leftElement.innerHTML = Number(paginationButtons.leftElement.innerHTML) + num;
    paginationButtons.middleElement.innerHTML = Number(paginationButtons.middleElement.innerHTML) + num;
    paginationButtons.rightElement.innerHTML = Number(paginationButtons.rightElement.innerHTML) + num;
}

function setElementIndex(num) {
    paginationButtons.leftElement.innerHTML = num;
    paginationButtons.middleElement.innerHTML = num + 1;
    paginationButtons.rightElement.innerHTML = num + 2;
}

function pagiantionIntit(container) {
    paginationButtons.leftEmptyButton = container.querySelector('.disabled:first-of-type');
    paginationButtons.rightEmptyButton = container.querySelector('.disabled:last-of-type');
    paginationButtons.firstElement = container.querySelector(':first-child');
    paginationButtons.lastElement = container.querySelector(':last-child');
    paginationButtons.leftElement = container.querySelector(':not(.disabled):nth-of-type(2)');
    paginationButtons.middleElement = container.querySelector(':not(.disabled):nth-of-type(3)');
    paginationButtons.rightElement = container.querySelector(':not(.disabled):nth-of-type(4)');
    setElementIndex(2);
}

function changeEmptyButtonsState() {
    if (Number(paginationButtons.leftElement.innerHTML) > 2) {
        paginationButtons.leftEmptyButton.classList.add('visible');
    } else if (Number(paginationButtons.leftElement.innerHTML) <= 2) {
        paginationButtons.leftEmptyButton.classList.remove('visible');
    }
    if (Number(paginationButtons.lastElement.innerHTML) - Number(paginationButtons.rightElement.innerHTML) <= 1) {
        paginationButtons.rightEmptyButton.classList.remove('visible');
    } else {
        paginationButtons.rightEmptyButton.classList.add('visible');
    }
}

function changeActiveItemClass(element, oldElement) {
    if (paginationButtons.leftEmptyButton.classList.contains('visible') && paginationButtons.rightEmptyButton.classList.contains('visible')) {
        oldElement.classList.remove('active');
        paginationButtons.middleElement.classList.add('active');
    } else {
        oldElement.classList.remove('active');
        element.classList.add('active');
    }
}

function nextButtons() {
    changeElementIndex(1);
}

function prevButtons() {
    changeElementIndex(-1);
}

function toFirstButton(leftEmptyButtonClassList) {
    if (leftEmptyButtonClassList.contains('visible')) {
        setElementIndex(2);
    }
    changeEmptyButtonsState();

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
    }

    changeActiveItemClass.apply(undefined, rest);
}

function toLastButton(lastElementIndex, paginataonContainer) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        rest[_key2 - 2] = arguments[_key2];
    }

    return (0, _search.getNextVideos)(_carouselCalculations.carouselContainer).then(function () {
        setElementIndex(lastElementIndex - 1);
        (0, _carouselCalculations.calcSlideQuantity)();
        paginationButtons.lastElement.innerHTML = _carouselCalculations.carouselSetting.slideQuantity;
        changeEmptyButtonsState();
        changeActiveItemClass.apply(undefined, rest);
        paginationButtons.lastElement.classList.remove('active');
        var pageIndex = paginataonContainer.querySelector('.active').innerHTML;
        _carouselCalculations.carouselSetting.firstItemIndex = 1 + _carouselCalculations.carouselSetting.amountOfElements * (pageIndex - 1);
        (0, _carouselCalculations.carouselChangeCurrentSlide)(0.3);
    });
}

function paginationHandler(element, paginataonContainer) {
    var elementIndex = Number(element.innerHTML);
    var oldActiveElement = paginataonContainer.querySelector('.active');

    if (Number.isInteger(elementIndex) && element !== oldActiveElement) {
        var leftEmptyButtonClassList = paginationButtons.leftEmptyButton.classList;
        var rightEmptyButtonClassList = paginationButtons.rightEmptyButton.classList;
        var lastElementIndex = Number(paginationButtons.lastElement.innerHTML);
        var middleElementIndex = Number(paginationButtons.middleElement.innerHTML);

        if (paginationButtons.leftElement === element && middleElementIndex > 3) {
            prevButtons();
        } else if (paginationButtons.rightElement === element && lastElementIndex - middleElementIndex > 2) {
            nextButtons();
        } else if (paginationButtons.firstElement === element) {
            toFirstButton(paginationButtons.leftEmptyButton.classList, element, oldActiveElement);
        } else if (paginationButtons.lastElement === element) {
            toLastButton(lastElementIndex, paginataonContainer, element, oldActiveElement);
            return;
        }

        var isButtonLeftWasVisible = leftEmptyButtonClassList.contains('visible');
        var isButtonRightWasVisible = rightEmptyButtonClassList.contains('visible');

        changeEmptyButtonsState();

        if (!(!leftEmptyButtonClassList.contains('visible') && isButtonLeftWasVisible || !rightEmptyButtonClassList.contains('visible') && isButtonRightWasVisible)) {
            changeActiveItemClass(element, oldActiveElement);
        }

        var pageIndex = paginataonContainer.querySelector('.active').innerHTML;
        _carouselCalculations.carouselSetting.firstItemIndex = 1 + _carouselCalculations.carouselSetting.amountOfElements * (pageIndex - 1);
        if (_carouselCalculations.carouselSetting.slideQuantity - _carouselCalculations.carouselSetting.currentSlide === _carouselCalculations.carouselSetting.slideBefoneNextRequest) {
            toLastButton(lastElementIndex - 1, paginataonContainer, element, oldActiveElement).then(function () {
                return paginationButtons.rightElement.classList.remove('active');
            });
            return;
        }
        (0, _carouselCalculations.carouselChangeCurrentSlide)(0.3);
    }
}

function resizePaginationHandler(oldAmoundOfElements) {
    if (oldAmoundOfElements !== _carouselCalculations.carouselSetting.amountOfElements) {
        (0, _carouselCalculations.calcSlideQuantity)();
        paginationButtons.lastElement.innerHTML = _carouselCalculations.carouselSetting.slideQuantity;

        var paginationContainer = document.querySelector('.carousel-pagination__container');
        var paginationItems = paginationContainer.getElementsByTagName('button');
        var oldActive = paginationContainer.querySelector('.active');
        var leftEmptyButtonClassList = paginationButtons.leftEmptyButton.classList;
        var lastItemIndex = Number(paginationButtons.lastElement.innerHTML);

        if (_carouselCalculations.carouselSetting.currentSlide <= 2) {
            if (leftEmptyButtonClassList.contains('visible')) {
                leftEmptyButtonClassList.remove('visible');
                setElementIndex(2);
            }
            changeActiveItemClass(paginationItems[_carouselCalculations.carouselSetting.currentSlide], oldActive);
        } else if (_carouselCalculations.carouselSetting.currentSlide > 2 && lastItemIndex - _carouselCalculations.carouselSetting.currentSlide > 2) {
            // console.log(lastItemIndex - carouselSetting.currentSlide)
            setElementIndex(_carouselCalculations.carouselSetting.currentSlide);
        } else if (lastItemIndex - _carouselCalculations.carouselSetting.currentSlide <= 2) {
            setElementIndex(lastItemIndex - 3);
        }

        changeEmptyButtonsState();
    }
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resizeCarouselHandler = resizeCarouselHandler;
exports.addSwipeListeners = addSwipeListeners;

var _search = __webpack_require__(2);

var _carouselCalculations = __webpack_require__(1);

var _helpers = __webpack_require__(3);

var _pagination = __webpack_require__(5);

var swipeSetting = {
    touchStartCoord: {},
    touchEndCoord: {},
    startTime: 0,
    endTime: 0,
    minXDistance: 50,
    maxYDistance: 50,
    maxTime: 1000
};

function swipeStart(e) {
    var event = 'changedTouches' in e ? e.changedTouches[0] : e;
    swipeSetting.startTime = new Date().getTime();
    swipeSetting.touchStartCoord.x = event.pageX;
    swipeSetting.touchStartCoord.y = event.pageY;
}

function swipeMove(e) {
    e.preventDefault();
}

function swipeEnd(e) {
    var event = 'changedTouches' in e ? e.changedTouches[0] : e;
    swipeSetting.endTime = new Date().getTime();
    swipeSetting.touchEndCoord.x = event.pageX - swipeSetting.touchStartCoord.x;
    swipeSetting.touchEndCoord.y = event.pageY - swipeSetting.touchStartCoord.y;

    if (swipeSetting.endTime - swipeSetting.startTime <= swipeSetting.maxTime) {
        if (Math.abs(swipeSetting.touchEndCoord.x) >= swipeSetting.minXDistance && Math.abs(swipeSetting.touchEndCoord.y) <= swipeSetting.maxYDistance) {
            var paginationContainer = document.querySelector('.carousel-pagination__container');
            var paginationItems = paginationContainer.getElementsByTagName('button');
            var activeItem = document.querySelector('.active');
            var activeItemIndex = activeItem.innerHTML;
            var lastIndex = paginationItems[paginationItems.length - 1].innerHTML;

            if (swipeSetting.touchEndCoord.x < 0) {
                if (activeItemIndex < 4) {
                    (0, _pagination.paginationHandler)(paginationItems[activeItemIndex], paginationContainer);
                } else if (activeItemIndex >= 4 && lastIndex - activeItemIndex > 1) {
                    (0, _pagination.paginationHandler)(paginationItems[3], paginationContainer);
                } else if (activeItemIndex >= 4 && lastIndex - activeItemIndex === 1) {
                    (0, _pagination.paginationHandler)(paginationItems[4], paginationContainer);
                }
            } else if (_carouselCalculations.carouselSetting.currentSlide > 0) {
                if (activeItemIndex < 4) {
                    (0, _pagination.paginationHandler)(paginationItems[activeItemIndex - 2], paginationContainer);
                } else if (activeItemIndex >= 4 && lastIndex - activeItemIndex > 0) {
                    (0, _pagination.paginationHandler)(paginationItems[1], paginationContainer);
                }
            }
        }
    }
}

function resizeCarouselHandler(oldAmoundOfElements) {
    if (oldAmoundOfElements !== _carouselCalculations.carouselSetting.amountOfElements) {
        if (_carouselCalculations.carouselSetting.slideQuantity - _carouselCalculations.carouselSetting.currentSlide === _carouselCalculations.carouselSetting.slideBefoneNextRequest) {
            (0, _search.getNextVideos)(_carouselCalculations.carouselContainer);
        }
        var newCurrentSlide = Math.ceil(_carouselCalculations.carouselSetting.firstItemIndex / _carouselCalculations.carouselSetting.amountOfElements - 1);

        _carouselCalculations.carouselSetting.firstItemIndex = newCurrentSlide * _carouselCalculations.carouselSetting.amountOfElements + 1;
    }
    (0, _carouselCalculations.carouselChangeCurrentSlide)(0);
}

function addSwipeListeners() {
    (0, _helpers.addListeners)(_carouselCalculations.carouselContainer, 'mousedown touchstart', swipeStart);
    (0, _helpers.addListeners)(_carouselCalculations.carouselContainer, 'mousemove touchmove', swipeMove);
    (0, _helpers.addListeners)(_carouselCalculations.carouselContainer, 'mouseup touchend', swipeEnd);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formChangeKeyWord = formChangeKeyWord;
exports.addAllInputHandeler = addAllInputHandeler;

var _search = __webpack_require__(2);

var _helpers = __webpack_require__(3);

var searchInput = document.querySelector('input[type=search]');
var clearInputButton = document.querySelector('.search-container__clear');

function setClearButtonStules(newVisibility, newOpacity) {
    if (clearInputButton.style.visibility !== newVisibility) {
        clearInputButton.style.visibility = newVisibility;
        clearInputButton.style.opacity = newOpacity;
    }
}

function showClearButton() {
    setClearButtonStules('visible', 1);
}

function hideClearButton() {
    setClearButtonStules('hidden', 0);
}

function clearButtonHandler() {
    if (searchInput.value === '') {
        hideClearButton();
    } else showClearButton();
}

function clearButtonClickHandler() {
    searchInput.value = '';
    searchInput.focus();
    hideClearButton();
}

function formChangeKeyWord(e) {
    e.preventDefault();
    _search.searchSetting.currentpageToken = ' ';
    _search.searchSetting.q = searchInput.value.trim();
}

function addAllInputHandeler() {
    (0, _helpers.addListeners)(searchInput, 'keyup focus', clearButtonHandler);
    (0, _helpers.addListeners)(searchInput, 'blur', hideClearButton);
    (0, _helpers.addListeners)(clearInputButton, 'click', clearButtonClickHandler);
}

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _form = __webpack_require__(7);

var _search = __webpack_require__(2);

var _carouselCalculations = __webpack_require__(1);

var _render = __webpack_require__(0);

var _pagination = __webpack_require__(5);

var _carouselEvents = __webpack_require__(6);

var _helpers = __webpack_require__(3);

var form = document.querySelector('.search-container__form');

form.addEventListener('submit', function (e) {
    (0, _form.formChangeKeyWord)(e);
    _carouselCalculations.carouselSetting.itemsQuantity = 0;
    (0, _search.getVideos)().then(function (videosArr) {
        (0, _carouselCalculations.setCarouselInitState)();
        (0, _render.renderNewVideos)(_carouselCalculations.carouselContainer, videosArr);
    }).then(function () {
        var carouselWrapper = document.querySelector('.carousel-section');
        _carouselCalculations.carouselSetting.itemWidth = document.querySelector('.carousel-item').offsetWidth;
        var paginationContainer = document.querySelector('.carousel-pagination');

        if (paginationContainer) {
            carouselWrapper.removeChild(paginationContainer);
        }
        (0, _carouselCalculations.calcSlideQuantity)();
        (0, _carouselEvents.addSwipeListeners)();
        (0, _render.renderCarouselPagination)(carouselWrapper, _carouselCalculations.carouselSetting.slideQuantity);
        var pagination = document.querySelector('.carousel-pagination__container');
        (0, _pagination.pagiantionIntit)(pagination);
        (0, _pagination.changeEmptyButtonsState)();
        pagination.addEventListener('click', function (event) {
            (0, _pagination.paginationHandler)(event.target, pagination);
        });
    });
});

(0, _form.addAllInputHandeler)();

var resizeHandler = (0, _helpers.debounce)(function () {
    var item = document.querySelector('.carousel-item');
    if (item) {
        _carouselCalculations.carouselSetting.itemWidth = item.offsetWidth;
        var oldAmoundOfElements = _carouselCalculations.carouselSetting.amountOfElements;
        (0, _carouselCalculations.calculateAmount)(_carouselCalculations.carouselContainer.childNodes[0]);
        (0, _carouselEvents.resizeCarouselHandler)(oldAmoundOfElements);
        (0, _pagination.resizePaginationHandler)(oldAmoundOfElements);
    }
}, 50);

window.addEventListener('resize', resizeHandler);

/***/ })
/******/ ]);