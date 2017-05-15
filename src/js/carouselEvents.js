import { getNextVideos } from './search';
import { carouselSetting, carouselContainer, carouselChangeCurrentSlide } from './carouselCalculations';
import { addListeners } from './helpers';
import { paginationHandler } from './pagination';

const swipeSetting = {
    touchStartCoord: {},
    touchEndCoord: {},
    startTime: 0,
    endTime: 0,
    minXDistance: 50,
    maxYDistance: 50,
    maxTime: 1000,
};

function swipeStart(e) {
    const event = ('changedTouches' in e) ? e.changedTouches[0] : e;
    swipeSetting.startTime = new Date().getTime();
    swipeSetting.touchStartCoord.x = event.pageX;
    swipeSetting.touchStartCoord.y = event.pageY;
}

function swipeMove(e) {
    e.preventDefault();
}

function swipeEnd(e) {
    const event = ('changedTouches' in e) ? e.changedTouches[0] : e;
    swipeSetting.endTime = new Date().getTime();
    swipeSetting.touchEndCoord.x = event.pageX - swipeSetting.touchStartCoord.x;
    swipeSetting.touchEndCoord.y = event.pageY - swipeSetting.touchStartCoord.y;

    if (swipeSetting.endTime - swipeSetting.startTime <= swipeSetting.maxTime) {
        if (Math.abs(swipeSetting.touchEndCoord.x) >= swipeSetting.minXDistance
          && Math.abs(swipeSetting.touchEndCoord.y) <= swipeSetting.maxYDistance) {
            const paginationContainer = document.querySelector('.carousel-pagination__container');
            const paginationItems = paginationContainer.getElementsByTagName('button');
            const activeItem = document.querySelector('.active');
            const activeItemIndex = activeItem.innerHTML;
            const lastIndex = paginationItems[paginationItems.length - 1].innerHTML;

            if (swipeSetting.touchEndCoord.x < 0) {
                if (activeItemIndex < 4) {
                    paginationHandler(paginationItems[activeItemIndex], paginationContainer);
                } else if (activeItemIndex >= 4 && lastIndex - activeItemIndex > 0) {
                    paginationHandler(paginationItems[3], paginationContainer);
                }
            } else if (carouselSetting.currentSlide > 0) {
                if (activeItemIndex < 4) {
                    paginationHandler(paginationItems[activeItemIndex - 2], paginationContainer);
                } else if (activeItemIndex >= 4 && lastIndex - activeItemIndex > 0) {
                    paginationHandler(paginationItems[1], paginationContainer);
                }
            }
        }
    }
}

export function resizeCarouselHandler(oldAmoundOfElements) {
    if (oldAmoundOfElements !== carouselSetting.amountOfElements) {
        if (carouselSetting.slideQuantity - carouselSetting.currentSlide ===
            carouselSetting.slideBefoneNextRequest) {
            getNextVideos(carouselContainer);
        }
        const newCurrentSlide =
            Math.ceil((carouselSetting.firstItemIndex / carouselSetting.amountOfElements) - 1);

        carouselSetting.firstItemIndex =
            (newCurrentSlide * carouselSetting.amountOfElements) + 1;
    }
    carouselChangeCurrentSlide(0);
}

export function addSwipeListeners() {
    addListeners(carouselContainer, 'mousedown touchstart', swipeStart);
    addListeners(carouselContainer, 'mousemove touchmove', swipeMove);
    addListeners(carouselContainer, 'mouseup touchend', swipeEnd);
}
