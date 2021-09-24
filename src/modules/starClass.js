export default class Star {
    constructor(str) {
        this.fillStar(str);
        this.element = this.createElement();
    }

    fillStar(str) {
        if (str === 'fill') {
            this.image = '../assets/icons/star-win.svg';
        } else {
            this.image = '../assets/icons/star.svg';
        }
    }

    createElement() {
        const star = document.createElement('img');
        star.src = this.image;
        star.alt = 'image of game star';
        star.classList.add('star_img');
        return star;
    }
}
