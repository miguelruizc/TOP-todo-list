export class DOMInterface {
    constructor(projectsInterface){
        this.mainContainer = document.getElementById("main");
    }

    clearDOM() {
        this.mainContainer.innerHTML = "";
    }

    test() {
        console.log("DOOM INTERFACE ACTIVATED!");
    }
}