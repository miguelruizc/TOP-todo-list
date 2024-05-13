import './style.css';
import { DOMInterface } from './DOMInterface.js';
import { ProjectsInterface } from "./projectsInterface.js"; 
import { Project } from "./project.js";
import { Todo } from "./todo.js";

// //Retrieve projects data from local storage
let projects = new Array();

const loadData = localStorage.getItem("data");
if(loadData !== null) {
    //Add data to projects array
    let tempArray = JSON.parse(loadData);
    tempArray.forEach((element)=>{
        
        const projectInstance = Object.assign(new Project(), element);
        projectInstance.todoList = [];

        element.todoList.forEach((todo)=>{
            const todoInstance = Object.assign(new Todo(), todo);
            projectInstance.addTodo(todoInstance);
        });

        projects.push(projectInstance);
    });
}
else {
    console.log("No data in local storage");
}

// Start DOM & projects controllers
const p = new ProjectsInterface(projects);
const d = new DOMInterface(p);

console.log("Initial state: ");
p.renderProjects();

d.render();

// Store data every 5s
function save() {
    const saveData = JSON.stringify(projects);
    console.log(projects);
    console.log(saveData);
    if(saveData !== null){
        localStorage.setItem("data", saveData);
    }
}
setInterval(save, 5000);


