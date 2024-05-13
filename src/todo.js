import {format} from "date-fns";

export class Todo {
    constructor(title, description, dueDate, priority, notes, isDone, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isDone = isDone;
        this.id = id;
        this.hideDetails = true;
    }

    toString(){
        return `${this.title}, ${this.description}, ${format(this.dueDate,"dd,mm,yyyy")}, ${this.priority}, ${this.notes},\
        done:${this.isDone} id:${this.id}`;
    }
}