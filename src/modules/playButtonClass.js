import startGame from './playGame';

const initGame = 'Start Game';
const repeatWordIcon = 'repeat';

function playGameListener(element, playWordsArray) {
    startGame(playWordsArray);
    element.target.removeEventListener('click', playGameListener);
}

export default class Button {
    constructor() {
        this.element = document.createElement('button');
    }

    createStartElement() {
        this.element.classList.add('play_btn');
        this.element.innerText = initGame;
    }

    addEventListenersToStartButton(playWordsArray) {
        this.element.addEventListener('click', playGameListener.bind(null, event, playWordsArray));
    }

    createRepeatElement() {
        this.element.classList.add('repeat_btn');

        const img = document.createElement('img');
        img.src = `../assets/icons/${repeatWordIcon}.svg`;
        img.alt = `image of ${repeatWordIcon}`;
        img.classList.add('repeat_img');

        this.element.appendChild(img);
    }
}
