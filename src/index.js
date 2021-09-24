import { showMenu, createMenu } from './modules/burger';
import { cardsCategories } from './modules/configs/cardsConfig';
import { newMainPage, newCategoryPage } from './modules/newPage';
import { changeGameMode } from './modules/gameMode';

const game = document.querySelector('.game');
createMenu();
document.querySelector('.hamburger').addEventListener('click', () => {
    showMenu();
});

newMainPage(cardsCategories.length);

document.querySelector('#switch').addEventListener('change', changeGameMode);

game.addEventListener('click', (event) => {
    const { target } = event;
    if (target.className === 'game') return;
    if (game.querySelector('.card')) newCategoryPage(target.id);
});
