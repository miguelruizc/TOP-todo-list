import './style.css';
import { DOMInterface } from './DOMInterface.js';
import { format } from "date-fns";
import { ProjectsInterface } from "./projectsInterface.js"; 

//Retrieve projects data from local storage
let temp = localStorage.getItem("projectsData");
let projects = JSON.parse(temp);

//Restore methods (projects)
projects.forEach(element => {
    element.addTodo = function(todoItem){
        this.todoList.push(todoItem);
    };
    //Restore methods todos
    element.todoList.forEach(todo => {
        todo.toString = function() { 
            return `${this.title}, ${this.description}, ${format(this.dueDate,"dd,mm,yyyy")}, ${this.priority}, ${this.notes}, done:${this.isDone}`;
        };
    });
});

let p = new ProjectsInterface(projects);

p.renderProjects();
console.log(projects);

let d = new DOMInterface(p);
d.clearDOM();

let data = JSON.stringify(projects);
localStorage.setItem("projectsData", data);