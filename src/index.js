import './style.css';
import {Todo} from './todo.js';
import {Project} from './project.js';
import { DOMController } from './DOMcontroller.js';

const todo1 = new Todo("Do laundry", "Description", "25/12/2025", 1, "Remember the crusty socks", false);
const todo2 = new Todo("Clean the room", "Description", "35/10/3023", 1, "Clean the room, yep", false);
const project1 = new Project("Chores");

project1.todoList.push(todo1);
project1.todoList.push(todo2);

console.log(todo1);
console.log(project1);

let d = new DOMController();
d.clearDOM();