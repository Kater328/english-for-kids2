export default class FirstLine {
    constructor() {
        this.element = this.createElement();
    }

    createElement() {
        const line = document.createElement('tr');
        const category = document.createElement('td');
        category.innerText = 'Categories';
        line.appendChild(category);

        const word = document.createElement('td');
        word.innerText = 'Words';
        line.appendChild(word);

        const translate = document.createElement('td');
        translate.innerText = 'Translation';
        line.appendChild(translate);

        const train = document.createElement('td');
        train.innerText = 'Trained';
        line.appendChild(train);

        const correct = document.createElement('td');
        correct.innerText = 'Correct';
        line.appendChild(correct);

        const incorrect = document.createElement('td');
        incorrect.innerText = 'Incorrect';
        line.appendChild(incorrect);

        const percent = document.createElement('td');
        percent.innerText = '%';
        line.appendChild(percent);

        return line;
    }
}
