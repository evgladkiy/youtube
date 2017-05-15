import { formSectionInner, carouselSectionInner, createCarouselItemInner, createCarouselPaginationInner } from './tmpls';

export function createMainMarkup() {
    const mainContainer = document.createElement('div');
    const formSection = document.createElement('section');
    const carouselSection = formSection.cloneNode();

    mainContainer.className += 'main-container';
    formSection.className += 'search-container section';
    carouselSection.className += 'carousel-section section';
    formSection.innerHTML = formSectionInner;
    carouselSection.innerHTML = carouselSectionInner;
    mainContainer.appendChild(formSection);
    mainContainer.appendChild(carouselSection);
    document.body.prepend(mainContainer);
    const script = document.createElement('script');
    script.src = './dist/bundle.js';
    document.body.appendChild(script);
}

export function renderNewVideos(container, videos) {
    videos.forEach((video) => {
        const newElement = document.createElement('div');
        newElement.className += 'carousel-item';
        newElement.innerHTML = createCarouselItemInner(video);
        container.appendChild(newElement);
    });
}

export function renderCarouselPagination(container, slideQuantity) {
    const newElement = document.createElement('div');
    newElement.className += 'carousel-pagination';
    newElement.innerHTML = createCarouselPaginationInner(slideQuantity);
    container.append(newElement);
}
