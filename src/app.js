import { addAllInputHandeler, formChangeKeyWord } from './js/form';
import { getVideos } from './js/search';
import { setCarouselInitState, carouselContainer, carouselSetting, calcSlideQuantity, calculateAmount } from './js/carouselCalculations';
import { renderNewVideos, renderCarouselPagination } from './js/render';
import { paginationHandler, pagiantionIntit, changeEmptyButtonsState, resizePaginationHandler } from './js/pagination';
import { resizeCarouselHandler, addSwipeListeners } from './js/carouselEvents';
import { debounce } from './js/helpers';

const form = document.querySelector('.search-container__form');

form.addEventListener('submit', (e) => {
    formChangeKeyWord(e);
    carouselSetting.itemsQuantity = 0;
    getVideos().then((videosArr) => {
        setCarouselInitState();
        renderNewVideos(carouselContainer, videosArr);
    }).then(() => {
        const carouselWrapper = document.querySelector('.carousel-section');
        carouselSetting.itemWidth = document.querySelector('.carousel-item').offsetWidth;
        const paginationContainer = document.querySelector('.carousel-pagination');

        if (paginationContainer) {
            carouselWrapper.removeChild(paginationContainer);
        }
        calcSlideQuantity();
        addSwipeListeners();
        renderCarouselPagination(carouselWrapper, carouselSetting.slideQuantity);
        const pagination = document.querySelector('.carousel-pagination__container');
        pagiantionIntit(pagination);
        changeEmptyButtonsState();
        pagination.addEventListener('click', (event) => {
            paginationHandler(event.target, pagination);
        });
    });
});

addAllInputHandeler();

const resizeHandler = debounce(() => {
    const item = document.querySelector('.carousel-item');
    if (item) {
        carouselSetting.itemWidth = item.offsetWidth;
        const oldAmoundOfElements = carouselSetting.amountOfElements;
        calculateAmount(carouselContainer.childNodes[0]);
        resizeCarouselHandler(oldAmoundOfElements);
        resizePaginationHandler(oldAmoundOfElements);
    }
}, 50);

window.addEventListener('resize', resizeHandler);
