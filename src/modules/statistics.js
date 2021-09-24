import { removeActiveItem } from './burger';
import FirstLine from './configs/statisticsFirstLineConfig';
import NewLine from './statisticNewLineClass';
import { newRepeatPage } from './newPage';
import { cards, cardsCategories } from './configs/cardsConfig';

export default function generateStatisticPage() {
    document.querySelector('.game').innerHTML = '';
    removeActiveItem();
    document.querySelector('.switch').classList.add('invisible');
    document.querySelector('li:nth-child(10)').classList.add('header_menu_item_active');

    const btnReset = document.createElement('button');
    btnReset.classList.add('statistic_btn');
    btnReset.innerText = 'Reset';
    document.querySelector('.game').appendChild(btnReset);
    document.querySelector('.statistic_btn').addEventListener('click', () => {
        localStorage.clear();
        generateStatisticPage();
    });

    const btnRepeat = document.createElement('button');
    btnRepeat.classList.add('statistic_btn');
    btnRepeat.innerText = 'Repeat';
    document.querySelector('.game').appendChild(btnRepeat);
    document.querySelector('.statistic_btn:nth-child(2)').addEventListener('click', () => {
        newRepeatPage();
    });

    const table = document.createElement('table');
    table.classList.add('statistics_table');
    table.appendChild((new FirstLine()).element);

    for (let category = 0; category < cardsCategories.length; category += 1) {
        for (let cardNumber = 0; cardNumber < cards[`${cardsCategories[0]}`].length; cardNumber += 1) {
            const line = new NewLine(cardsCategories[category], cardNumber);
            table.appendChild(line.element);
        }
    }
    document.querySelector('.game').appendChild(table);
}
