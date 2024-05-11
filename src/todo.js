import {format} from "date-fns";

export class Todo {
    constructor(title, description, dueDate, priority, notes, isDone) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.isDone = isDone;
    }

    toString(){
        return `${this.title}, ${this.description}, ${format(this.dueDate,"dd,mm,yyyy")}, ${this.priority}, ${this.notes}, done:${this.isDone}`;
    }
}