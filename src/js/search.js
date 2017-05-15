import { carouselSetting } from './carouselCalculations';
import { renderNewVideos } from './render';

export const searchSetting = {
    apiKey: 'AIzaSyDE7Byt1p9U5ns81OaG5_jjO6gyMiOkSMM',
    searchVideoUrl: 'https://www.googleapis.com/youtube/v3/search',
    searchStatisticsUrl: 'https://www.googleapis.com/youtube/v3/videos',
    searchVideoPart: 'snippet, id',
    searchStatsPart: 'statistics',
    currentpageToken: '',
    maxResults: '15',
    type: 'video',
    q: null,
};

function objectToParameters(obj) {
    return Object.keys(obj).reduce((acc, item, index) => {
        let params = acc;
        if (item !== '' && index > 0) {
            params += '&';
        }
        params += `${item}=${encodeURIComponent(obj[item])}`;
        return params;
    }, '');
}


function httpGetData(url, parameters) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', `${url}?${objectToParameters(parameters)}`, true);

        xhr.onload = function xhrLoadHandler() {
            if (this.status === 200) {
                resolve(this.response);
            } else {
                const error = new Error(this.statusText);
                error.code = this.status;
                reject(error);
            }
        };

        xhr.onerror = () => {
            reject(new Error('Network Error'));
        };

        xhr.send();
    });
}

function getStatistics(videosArr) {
    const idString = videosArr.map(item => item.id.videoId).join(',');
    const searchStatsParam = {
        key: searchSetting.apiKey,
        part: searchSetting.searchStatsPart,
        id: idString,
    };

    return httpGetData(searchSetting.searchStatisticsUrl, searchStatsParam);
}

function addStatistics(videosArr, statistics) {
    const statsArr = JSON.parse(statistics).items;

    return videosArr.map((video, index) => {
        const item = video;
        item.statistics = statsArr[index].statistics;
        return item;
    });
}

export function getVideos() {
    const searchVideoParams = {
        key: searchSetting.apiKey,
        part: searchSetting.searchVideoPart,
        maxResults: searchSetting.maxResults,
        pageToken: searchSetting.currentpageToken,
        type: searchSetting.type,
        q: searchSetting.q,
    };
    let videosArr;

    return httpGetData(searchSetting.searchVideoUrl, searchVideoParams)
        .then((response) => {
            const responseObj = JSON.parse(response);
            videosArr = responseObj.items;
            carouselSetting.itemsQuantity += videosArr.length;
            searchSetting.currentpageToken = responseObj.nextPageToken;
            return getStatistics(videosArr);
        })
        .then(statistics => addStatistics(videosArr, statistics));
}

export function getNextVideos(container) {
    return getVideos().then(videos => renderNewVideos(container, videos));
}
