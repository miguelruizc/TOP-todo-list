export class DOMController {
    constructor(){
        this.mainContainer = document.getElementById("main");
    }

    clearDOM() {
        this.mainContainer.innerHTML = "";
    }
}