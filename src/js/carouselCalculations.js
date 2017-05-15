export const carouselSetting = {
    firstItemIndex: 1,
    currentSlide: 0,
    slideBefoneNextRequest: 2,
    itemsQuantity: 0,
    amountOfElements: null,
    slideQuantity: null,
    itemWidth: null,
};

export const carouselContainer = document.querySelector('.carousel-section__container');

export function changeCarouselContainerPositionX(position, duration) {
    if (Number.parseFloat(carouselContainer.style.transitionDuration) !== duration) {
        carouselContainer.style.transitionDuration = `${duration}s`;
    }
    carouselContainer.style.transform = `translateX(${position}px)`;
}

export function setCarouselInitState() {
    carouselSetting.firstItemIndex = 1;
    carouselSetting.currentSlide = 0;
    carouselContainer.innerHTML = '';
    changeCarouselContainerPositionX(0, 0);
}

export function calculateAmount() {
    carouselSetting.amountOfElements =
        Math.round(carouselContainer.offsetWidth / carouselSetting.itemWidth);
}

export function calcSlideQuantity() {
    calculateAmount();
    carouselSetting.slideQuantity =
        Math.round(carouselSetting.itemsQuantity / carouselSetting.amountOfElements);
}

export function carouselChangeCurrentSlide(duration) {
    carouselSetting.currentSlide =
        Math.round((carouselSetting.firstItemIndex - 1) / carouselSetting.amountOfElements);

    const translateXdistance = -carouselSetting.currentSlide * carouselContainer.offsetWidth;
    changeCarouselContainerPositionX(translateXdistance, duration);
}
