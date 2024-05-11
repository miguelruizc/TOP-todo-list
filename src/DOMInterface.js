export class DOMInterface {
    constructor(projectsInterface){
        this.mainContainer = document.getElementById("main");
    }

    clearDOM() {
        this.mainContainer.innerHTML = "";
    }

    
}