import { searchSetting } from './search';
import { addListeners } from './helpers';

const searchInput = document.querySelector('input[type=search]');
const clearInputButton = document.querySelector('.search-container__clear');

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

export function formChangeKeyWord(e) {
    e.preventDefault();
    searchSetting.currentpageToken = ' ';
    searchSetting.q = searchInput.value.trim();
}

export function addAllInputHandeler() {
    addListeners(searchInput, 'keyup focus', clearButtonHandler);
    addListeners(searchInput, 'blur', hideClearButton);
    addListeners(clearInputButton, 'click', clearButtonClickHandler);
}
