import './style.css';
import { DOMInterface } from './DOMInterface.js';
import { format } from "date-fns";
import { ProjectsInterface } from "./projectsInterface.js"; 

// //Retrieve projects data from local storage
// let temp = localStorage.getItem("projectsData");
// let projects = JSON.parse(temp);

// //Restore methods (projects)
// projects.forEach(element => {
//     element.addTodo = function(todoItem){
//         this.todoList.push(todoItem);
//     };
//     //Restore methods todos
//     element.todoList.forEach(todo => {
//         todo.toString = function() { 
//             return `${this.title}, ${this.description}, ${format(this.dueDate,"dd,mm,yyyy")}, ${this.priority}, ${this.notes}, done:${this.isDone}`;
//         };
//     });
// });

// Projects generated manually 
//(need to load from localStorage in the final version)
let projects = new Array();

let p = new ProjectsInterface(projects);

p.renderProjects();
console.log(projects);
console.log(":::::::::");

console.log("p: "+p)
let d = new DOMInterface(p);
d.render();

p.renderProjects();
console.log(projects);

// // TODO: Store data on exit event (and maybe periodically)
// let data = JSON.stringify(projects);
// localStorage.setItem("projectsData", data);

// TODO: Add ids to todo and project items, to be able to have multiple with the same name

// WIP: Implement new Todo calls to generate an unique ID
