const winWindowConfig = {

    win: {
        audioSrc: '../assets/audio/success.mp3',
        imageSrc: '../assets/img/success.jpg',
        text: 'WIN',
    },

    fail: {
        audioSrc: '../assets/audio/failure.mp3',
        imageSrc: '../assets/img/failure.jpg',
    },
};

export default class WinWindow {
    constructor(errors) {
        let currentConfig = winWindowConfig.win;
        if (errors !== 0) {
            currentConfig = winWindowConfig.fail;
            currentConfig.text = `${errors} errors`;
        }
        this.audioSrc = currentConfig.audioSrc;
        this.image = currentConfig.imageSrc;
        this.text = currentConfig.text;
        this.element = this.createElement();
    }

    createElement() {
        const block = document.createElement('div');
        block.classList.add('win_window');

        const comment = document.createElement('div');
        comment.classList.add('block_comment');
        comment.innerText = this.text;
        block.appendChild(comment);

        const img = document.createElement('img');
        img.src = this.image;
        img.alt = 'image of game result';
        img.classList.add('win_img');
        block.appendChild(img);

        return block;
    }
}
