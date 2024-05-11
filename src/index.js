import './style.css';
import {Todo} from './todo.js';
import {Project} from './project.js';
import { DOMController } from './DOMcontroller.js';
import {format} from "date-fns";
import {ConsoleInterface} from "./consoleInterface.js"; 

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

// let projects = new Array();

let c = new ConsoleInterface(projects);

// c.createTodo();
// c.createTodo();
// c.createTodo("Work", "Taxes", "Do taxes", undefined, 1,"Remember to include crypto", false);
// c.createTodo("Work", "Q1 Report", "Report of the 1st quarter", undefined, 1,"Spreadsheet and presentation", false);
// c.renderProjects();

// console.log("");
// console.log("Editing...");
// console.log("");

// c.editProject("Work", "Work related");
// c.renderProjects();

c.renderProjects();
console.log(projects);

let data = JSON.stringify(projects);
localStorage.setItem("projectsData", data);