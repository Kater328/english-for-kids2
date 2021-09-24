import playSound from './sound';
import Star from './starClass';
import WinWindow from './winWindowClass';
import Button from './playButtonClass';

let currentWord;
let currentNumberWord = 0;
let sequence;
let errors;

function createRandomArray() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7];
    arr.sort(() => Math.random() - 0.5);
    return arr;
}

function endGame() {
    document.querySelector('.repeat_btn').remove();
    document.querySelector('.game').remove();
    document.querySelector('.switch').remove();
    const newWindow = new WinWindow(errors);
    document.querySelector('main').append(newWindow.element);
    playSound(newWindow.audioSrc);
    setTimeout(() => {
        window.location.href = '../src/index.html';
    }, 3000);
}

function pronounceNewWord() {
    playSound(currentWord.audioSrc);
}

function nextWord(playWordsArray) {
    if (currentNumberWord === playWordsArray.length - 1) {
        endGame();
        return;
    }
    currentNumberWord += 1;
    currentWord = playWordsArray[sequence[currentNumberWord]];
    setTimeout(pronounceNewWord, 1000);
}

function checkAnswer(word, element, playWordsArray) {
    if (word === currentWord.word) {
        element.style.opacity = '0.5';
        playSound('../assets/audio/correct.mp3');
        document.querySelector('.stars_block').appendChild(new Star('fill').element);

        let statisticCorrect = localStorage.getItem(`${word}_correct`) || 0;
        statisticCorrect += 1;
        localStorage.setItem(`${word}_correct`, statisticCorrect);
        nextWord(playWordsArray);
    } else {
        if (element.style.opacity === '0.5') return;
        playSound('../assets/audio/error.mp3');
        document.querySelector('.stars_block').appendChild(new Star('no-fill').element);

        let statisticIncorrect = localStorage.getItem(`${currentWord.word}_incorrect`) || 0;
        statisticIncorrect += 1;
        localStorage.setItem(`${currentWord.word}_incorrect`, statisticIncorrect);
        errors += 1;
    }
}

export default function startGame(playWordsArray) {
    const starsBlock = document.createElement('div');
    starsBlock.classList.add('stars_block');
    document.querySelector('.game').prepend(starsBlock);

    document.querySelector('.play_btn').remove();
    const repeatBtn = new Button();
    repeatBtn.createRepeatElement();
    document.querySelector('main').append(repeatBtn.element);
    repeatBtn.element.addEventListener('click', () => {
        pronounceNewWord();
    });

    errors = 0;
    sequence = createRandomArray();
    currentWord = playWordsArray[sequence[currentNumberWord]];
    pronounceNewWord();

    for (let i = 0; i < playWordsArray.length; i += 1) {
        playWordsArray[i].element.addEventListener('click', () => {
            checkAnswer(playWordsArray[i].word, playWordsArray[i].element, playWordsArray);
        });
    }
}
