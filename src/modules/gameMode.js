import { topics } from './configs/cardsConfig';
import { newCategoryPage, deleteAdditionalButtons } from './newPage';

const switchLabel = document.querySelector('.label_switch');
const playMode = 'PLAY';
const trainMode = 'TRAIN';
let isPlayMode = false;

export function changeGameMode() {
    isPlayMode = !isPlayMode;
    if (switchLabel.innerText === trainMode) {
        switchLabel.innerText = playMode;
    } else {
        switchLabel.innerText = trainMode;
    }
    if (document.querySelector('li.header_menu_item_active').innerText === topics[0]
        || document.querySelector('li.header_menu_item_active').innerText === topics[topics.length - 1]) return;
    deleteAdditionalButtons();
    let currentCategory = document.querySelector('li.header_menu_item_active').innerText;
    if (currentCategory === 'Body parts') currentCategory = 'BodyParts';
    newCategoryPage(currentCategory);
}

export { isPlayMode };
