export const formSectionInner = `
<form class="search-container__form" action="">
    <input class="search-container__input" type="search" placeholder="Search">
    <i class="fa fa-times search-container__clear" aria-hidden="true"></i>
    <button class="search-container__sumbit" type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
</form>
`;

export const carouselSectionInner = `
<div class="carousel-section__wrapper">
    <div class="carousel-section__container"></div>
</div>
`;

export function createCarouselItemInner(video) {
    const date = video.snippet.publishedAt.slice(0, 10)
    .split('-')
    .reverse()
    .join('.');
    return `
    <a class="carousel-item__image" href="https://www.youtube.com/watch?v=${video.id.videoId}" style="background-image:url(${video.snippet.thumbnails.high.url})"></a>
    <div class="carousel-item__info-container">
        <a class="carousel-item__caption" href="https://www.youtube.com/watch?v=${video.id.videoId}" class="carousel-item__link">${video.snippet.title}</a>
        <div class="carousel-item__info carousel-item__info_channel"><i class="fa fa-user" aria-hidden="true"></i><span>${video.snippet.channelTitle}</span></div>
        <div class="carousel-item__info carousel-item__info_views"><i class="fa fa-eye" aria-hidden="true"></i><span>${video.statistics.viewCount}</span></div>
        <div class="carousel-item__info carousel-item__info_date"><i class="fa fa-calendar" aria-hidden="true"></i><span>${date}</span></div>
        <p class="carousel-item__description"><b>Description:</b> ${video.snippet.description}</p>
    </div>
    `;
}

export function createCarouselPaginationInner(lastSlideIndex) {
    return `
    <div class="carousel-pagination__container">
        <button  class="carousel-pagination__item active">1</button>
        <div class ="carousel-pagination__item disabled">...</div>
        <button class="carousel-pagination__item">2</button>
        <button class="carousel-pagination__item">3</button>
        <button class="carousel-pagination__item">4</button>
        <div class ="carousel-pagination__item disabled">...</div>
        <button class="carousel-pagination__item">${lastSlideIndex}</button>
    </div>
    `;
}
