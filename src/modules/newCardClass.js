import { cards } from './configs/cardsConfig';
import playSound from './sound';

const categoryBodyPart = 'Body parts';

export default class Card {
    constructor(category, cardNumber) {
        if (!cardNumber) cardNumber = 0;
        this.word = cards[`${category}`][cardNumber].word;
        this.translation = cards[`${category}`][cardNumber].translation;
        this.image = cards[`${category}`][cardNumber].image;
        this.audioSrc = cards[`${category}`][cardNumber].audioSrc;
        this.category = category;
        this.element = document.createElement('div');
    }

    createMainPageCard() {
        this.element.classList.add('card');
        this.element.id = this.category;

        const img = this.createElementImage();
        img.classList.add('menu_img');
        img.id = this.category;
        this.element.appendChild(img);

        const name = document.createElement('div');
        name.classList.add('title');
        name.innerText = this.category;
        name.id = this.category;
        if (this.category === 'BodyParts') name.innerText = categoryBodyPart;
        this.element.appendChild(name);
    }

    createCategoryPageCard() {
        this.element.classList.add('train_card');

        const frontCard = document.createElement('div');
        frontCard.classList.add('card_face');
        frontCard.classList.add('card_face-front');
        const imgFront = this.createElementImage();
        imgFront.classList.add('train_img');
        frontCard.appendChild(imgFront);

        const turn = document.createElement('img');
        turn.src = '../assets/icons/rotate.svg';
        turn.alt = 'turn icon';
        turn.classList.add('turn_img');

        const frontTitle = document.createElement('div');
        frontTitle.innerText = this.word;
        frontTitle.classList.add('title');
        frontTitle.classList.add('topic_title');
        frontTitle.appendChild(turn);
        frontCard.appendChild(frontTitle);

        const backCard = document.createElement('div');
        backCard.classList.add('card_face');
        backCard.classList.add('card_face-back');
        const imgBack = this.createElementImage();
        imgBack.classList.add('train_img');
        backCard.appendChild(imgBack);

        const backTitle = document.createElement('div');
        backTitle.innerText = this.translation;
        backTitle.classList.add('title');
        backCard.appendChild(backTitle);

        this.element.appendChild(frontCard);
        this.element.appendChild(backCard);
    }

    createElementImage() {
        const img = document.createElement('img');
        img.src = this.image;
        img.alt = `image of ${this.word}`;
        return img;
    }

    createPlayPageCard() {
        this.element.classList.add('play_card');

        const img = this.createElementImage();
        img.classList.add('play_img');
        this.element.appendChild(img);
    }

    addEventListenersToCategoryPageCard(cardNumber) {
        this.element.addEventListener('click', (e) => {
            if (e.target.classList.contains('turn_img') === false && this.element.classList.contains('turning_card') === false) {
                let statisticTrain = localStorage.getItem(`${this.word}_train`) || 0;
                statisticTrain += 1;
                localStorage.setItem(`${this.word}_train`, statisticTrain);
                playSound(this.audioSrc);
            }
        });
        document.querySelector(`.train_card:nth-child(${cardNumber + 1}) > .card_face > .topic_title > .turn_img`).addEventListener('click', () => {
            this.turnCard();
        });
        this.element.addEventListener('mouseleave', () => {
            if (this.element.classList.contains('turning_card')) this.turnCard();
        });
    }

    turnCard() {
        this.element.classList.toggle('turning_card');
    }
}
