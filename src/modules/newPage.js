import Card from './newCardClass';
import { isPlayMode } from './gameMode';
import { removeActiveItem } from './burger';
import { cards, cardsCategories } from './configs/cardsConfig';
import Button from './playButtonClass';

const game = document.querySelector('.game');

export function deleteAdditionalButtons() {
    game.innerHTML = '';
    if (document.querySelector('.play_btn')) document.querySelector('.play_btn').remove();
    if (document.querySelector('.repeat_btn')) document.querySelector('.repeat_btn').remove();
}

export function newMainPage() {
    removeActiveItem();
    deleteAdditionalButtons();
    document.querySelector('.header_menu_list > li').classList.add('header_menu_item_active');
    for (let categoryWord = 0; categoryWord < cardsCategories.length; categoryWord += 1) {
        const newCard = new Card(cardsCategories[categoryWord]);
        newCard.createMainPageCard();
        game.append(newCard.element);
    }
}

export function newPlayPage(category) {
    const playWordsArray = [];
    for (let cardNumber = 0; cardNumber < cards[`${category}`].length; cardNumber += 1) {
        const newCard = new Card(category, cardNumber);
        newCard.createPlayPageCard();
        game.append(newCard.element);
        playWordsArray.push(newCard);
    }
    const playBtn = new Button();
    playBtn.createStartElement();
    document.querySelector('main').append(playBtn.element);
    playBtn.addEventListenersToStartButton(playWordsArray);
}

export function newCategoryPage(category) {
    removeActiveItem();
    deleteAdditionalButtons();
    const categoryNumber = cardsCategories.indexOf(category) + 1;
    document.querySelector(`.header_menu_list > li:nth-child(${categoryNumber + 1})`).classList.add('header_menu_item_active');
    if (isPlayMode) {
        newPlayPage(category);
        return;
    }

    for (let cardNumber = 0; cardNumber < cards[`${category}`].length; cardNumber += 1) {
        const newCard = new Card(category, cardNumber);
        newCard.createCategoryPageCard();
        game.append(newCard.element);
        newCard.addEventListenersToCategoryPageCard(cardNumber);
    }
}

export function newRepeatPage() {
    game.innerHTML = '';
    let repeatCards = [];
    for (let categories = 0; categories < cardsCategories.length; categories += 1) {
        for (let words = 0; words < cards[`${cardsCategories[0]}`].length; words += 1) {
            const currentCategory = cardsCategories[categories];
            const currentWord = cards[`${currentCategory}`][words].word;
            const statistics = localStorage.getItem(`${currentWord}_incorrect`) || 0;
            if (statistics === 0) continue;
            repeatCards.push([currentCategory, words]);
        }
    }
    if (repeatCards.length > cardsCategories.length) {
        repeatCards = repeatCards.slice(0, cardsCategories.length);
    }
    for (let cardNumber = 0; cardNumber < repeatCards.length; cardNumber += 1) {
        const newCard = new Card(repeatCards[cardNumber][0], repeatCards[cardNumber][1]);
        newCard.createCategoryPageCard();
        game.append(newCard.element);
        newCard.addEventListenersToCategoryPageCard(cardNumber);
    }
}
