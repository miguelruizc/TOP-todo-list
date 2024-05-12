export class Project {
    constructor(title, id=1){
        this.id = id;
        this.title = title;
        this.todoList = new Array();      
    }

    addTodo(todoItem){
        this.todoList.push(todoItem);
    }
}