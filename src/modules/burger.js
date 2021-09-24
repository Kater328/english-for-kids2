import { newCategoryPage, newMainPage } from './newPage';
import generateStatisticPage from './statistics';
import { topics } from './configs/cardsConfig';
import MenuLine from './menuLineClass';

const hamburger = document.querySelector('.hamburger');
const headerMenu = document.querySelector('.header_menu');
const menuList = [];

export function showMenu() {
    hamburger.classList.toggle('show_close');
    headerMenu.classList.toggle('show_header_menu');
    if (hamburger.classList.contains('show_close')) {
        document.querySelector('body').addEventListener('click', listenerCloseBurger);
    } else {
        document.querySelector('body').removeEventListener('click', listenerCloseBurger);
    }
}

const listenerCloseBurger = function listenCloseBurger(e) {
    if (e.target !== hamburger) showMenu();
};

function addMenuListener() {
    document.querySelector('.header_menu_list').addEventListener('click', (e) => {
        if (e.target.tagName !== 'LI') return;
        document.querySelector('.switch').classList.remove('invisible');
        removeActiveItem();
        showMenu();
        let currentCategory = e.target.innerText;
        if (currentCategory === 'Body parts') currentCategory = 'BodyParts';
        
        if (e.target === document.querySelector('.header_menu_list > li:nth-child(1)')) {
            newMainPage();
        } else if (e.target === document.querySelector('.header_menu_list > li:nth-child(10)')) {
            generateStatisticPage();
        } else {
            newCategoryPage(currentCategory);
        }
    });
}

export function removeActiveItem() {
    menuList.forEach((item) => {
        if (item.classList.contains('header_menu_item_active')) item.classList.remove('header_menu_item_active');
    });
}

export function createMenu() {
    for (let topic = 0; topic < topics.length; topic += 1) {
        const line = new MenuLine(topics[topic]);
        document.querySelector('.header_menu_list').appendChild(line.element);
        menuList.push(line.element);
    }
    addMenuListener();
}
