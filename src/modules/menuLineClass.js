export default class MenuLine {
    constructor(topicName) {
        this.element = document.createElement('li');
        this.element.innerText = topicName;
    }
}
