import { cards } from './configs/cardsConfig';

const categoryBodyPart = 'Body parts';

export default class NewLine {
    constructor(category, cardNumber) {
        this.category = category;
        this.word = cards[`${category}`][cardNumber].word;
        this.translate = cards[`${category}`][cardNumber].translation;
        this.element = this.createElement();
    }

    createElement() {
        const line = document.createElement('tr');
        const currentCategory = document.createElement('td');
        currentCategory.innerText = this.category;
        if (this.category === 'BodyParts') currentCategory.innerText = categoryBodyPart;
        line.appendChild(currentCategory);

        const word = document.createElement('td');
        word.innerText = this.word;
        line.appendChild(word);

        const translate = document.createElement('td');
        translate.innerText = this.translate;
        line.appendChild(translate);

        const train = document.createElement('td');
        train.innerText = localStorage.getItem(`${this.word}_train`) || 0;
        line.appendChild(train);

        const correct = document.createElement('td');
        correct.innerText = localStorage.getItem(`${this.word}_correct`) || 0;
        line.appendChild(correct);

        const incorrect = document.createElement('td');
        incorrect.innerText = localStorage.getItem(`${this.word}_incorrect`) || 0;
        line.appendChild(incorrect);

        const percent = document.createElement('td');
        percent.innerText = this.calculatePercent();
        line.appendChild(percent);

        return line;
    }

    calculatePercent() {
        const correct = Number(localStorage.getItem(`${this.word}_correct`)) || 0;
        const incorrect = Number(localStorage.getItem(`${this.word}_incorrect`)) || 0;
        const sum = correct + incorrect;
        const result = (sum === 0) ? '-' : Math.round(correct / (sum * 100));
        localStorage.setItem(`${this.word}_statistics`, result);
        return result;
    }
}
