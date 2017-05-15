import { carouselSetting, carouselContainer, carouselChangeCurrentSlide, calcSlideQuantity } from './carouselCalculations';
import { getNextVideos } from './search';

export const paginationButtons = {};

export function changeElementIndex(num) {
    paginationButtons.leftElement.innerHTML =
        Number(paginationButtons.leftElement.innerHTML) + num;
    paginationButtons.middleElement.innerHTML =
        Number(paginationButtons.middleElement.innerHTML) + num;
    paginationButtons.rightElement.innerHTML =
        Number(paginationButtons.rightElement.innerHTML) + num;
}

function setElementIndex(num) {
    paginationButtons.leftElement.innerHTML = num;
    paginationButtons.middleElement.innerHTML = num + 1;
    paginationButtons.rightElement.innerHTML = num + 2;
}

export function pagiantionIntit(container) {
    paginationButtons.leftEmptyButton = container.querySelector('.disabled:first-of-type');
    paginationButtons.rightEmptyButton = container.querySelector('.disabled:last-of-type');
    paginationButtons.firstElement = container.querySelector(':first-child');
    paginationButtons.lastElement = container.querySelector(':last-child');
    paginationButtons.leftElement = container.querySelector(':not(.disabled):nth-of-type(2)');
    paginationButtons.middleElement = container.querySelector(':not(.disabled):nth-of-type(3)');
    paginationButtons.rightElement = container.querySelector(':not(.disabled):nth-of-type(4)');
    setElementIndex(2);
}

export function changeEmptyButtonsState() {
    if (Number(paginationButtons.leftElement.innerHTML) > 2) {
        paginationButtons.leftEmptyButton.classList.add('visible');
    } else if (Number(paginationButtons.leftElement.innerHTML) <= 2) {
        paginationButtons.leftEmptyButton.classList.remove('visible');
    }
    if (Number(paginationButtons.lastElement.innerHTML)
        - Number(paginationButtons.rightElement.innerHTML) <= 1) {
        paginationButtons.rightEmptyButton.classList.remove('visible');
    } else {
        paginationButtons.rightEmptyButton.classList.add('visible');
    }
}

function changeActiveItemClass(element, oldElement) {
    if (paginationButtons.leftEmptyButton.classList.contains('visible')
      && paginationButtons.rightEmptyButton.classList.contains('visible')) {
        oldElement.classList.remove('active');
        paginationButtons.middleElement.classList.add('active');
    } else {
        oldElement.classList.remove('active');
        element.classList.add('active');
    }
}

export function nextButtons() {
    changeElementIndex(1);
}

export function prevButtons() {
    changeElementIndex(-1);
}

function toFirstButton(leftEmptyButtonClassList, ...rest) {
    if (leftEmptyButtonClassList.contains('visible')) {
        setElementIndex(2);
    }
    changeEmptyButtonsState();
    changeActiveItemClass(...rest);
}

function toLastButton(lastElementIndex, paginataonContainer, ...rest) {
    return getNextVideos(carouselContainer).then(() => {
        setElementIndex(lastElementIndex - 1);
        calcSlideQuantity();
        paginationButtons.lastElement.innerHTML = carouselSetting.slideQuantity;
        changeEmptyButtonsState();
        changeActiveItemClass(...rest);
        paginationButtons.lastElement.classList.remove('active');
        const pageIndex = paginataonContainer.querySelector('.active').innerHTML;
        carouselSetting.firstItemIndex = 1 + (carouselSetting.amountOfElements * (pageIndex - 1));
        carouselChangeCurrentSlide(0.3);
    });
}

export function paginationHandler(element, paginataonContainer) {
    const elementIndex = Number(element.innerHTML);
    const oldActiveElement = paginataonContainer.querySelector('.active');

    if (Number.isInteger(elementIndex) && element !== oldActiveElement) {
        const leftEmptyButtonClassList = paginationButtons.leftEmptyButton.classList;
        const rightEmptyButtonClassList = paginationButtons.rightEmptyButton.classList;
        const lastElementIndex = Number(paginationButtons.lastElement.innerHTML);
        const middleElementIndex = Number(paginationButtons.middleElement.innerHTML);

        if (paginationButtons.leftElement === element && middleElementIndex > 3) {
            prevButtons();
        } else if (paginationButtons.rightElement === element
          && lastElementIndex - middleElementIndex > 2) {
            nextButtons();
        } else if (paginationButtons.firstElement === element) {
            toFirstButton(paginationButtons.leftEmptyButton.classList, element, oldActiveElement);
        } else if (paginationButtons.lastElement === element) {
            toLastButton(lastElementIndex, paginataonContainer, element, oldActiveElement);
            return;
        }

        const isButtonLeftWasVisible = leftEmptyButtonClassList.contains('visible');
        const isButtonRightWasVisible = rightEmptyButtonClassList.contains('visible');

        changeEmptyButtonsState();

        if (!((!leftEmptyButtonClassList.contains('visible') && isButtonLeftWasVisible)
         || (!rightEmptyButtonClassList.contains('visible') && isButtonRightWasVisible))) {
            changeActiveItemClass(element, oldActiveElement);
        }

        const pageIndex = paginataonContainer.querySelector('.active').innerHTML;
        carouselSetting.firstItemIndex = 1 + (carouselSetting.amountOfElements * (pageIndex - 1));
        if (carouselSetting.slideQuantity - carouselSetting.currentSlide ===
             carouselSetting.slideBefoneNextRequest) {
            toLastButton((lastElementIndex - 1), paginataonContainer, element, oldActiveElement)
                .then(() => paginationButtons.rightElement.classList.remove('active'));
            return;
        }
        carouselChangeCurrentSlide(0.3);
    }
}

export function resizePaginationHandler(oldAmoundOfElements) {
    if (oldAmoundOfElements !== carouselSetting.amountOfElements) {
        calcSlideQuantity();
        paginationButtons.lastElement.innerHTML = carouselSetting.slideQuantity;

        const paginationContainer = document.querySelector('.carousel-pagination__container');
        const paginationItems = paginationContainer.getElementsByTagName('button');
        const oldActive = paginationContainer.querySelector('.active');
        const leftEmptyButtonClassList = paginationButtons.leftEmptyButton.classList;
        const lastItemIndex = Number(paginationButtons.lastElement.innerHTML);

        if (carouselSetting.currentSlide <= 2) {
            if (leftEmptyButtonClassList.contains('visible')) {
                leftEmptyButtonClassList.remove('visible');
                setElementIndex(2);
            }
            changeActiveItemClass(paginationItems[carouselSetting.currentSlide], oldActive);
        } else if (carouselSetting.currentSlide > 2
            && lastItemIndex - carouselSetting.currentSlide > 2) {
            // console.log(lastItemIndex - carouselSetting.currentSlide)
            setElementIndex(carouselSetting.currentSlide);
        } else if (lastItemIndex - carouselSetting.currentSlide <= 2) {
            setElementIndex((lastItemIndex - 3));
        }

        changeEmptyButtonsState();
    }
}
