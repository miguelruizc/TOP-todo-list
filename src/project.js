export class Project {
    constructor(title){
        this.title = title;
        this.todoList = new Array();        
    }

    addTodo(todoItem){
        this.todoList.push(todoItem);
    }
}