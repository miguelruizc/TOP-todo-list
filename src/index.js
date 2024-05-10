import './style.css';
import {Todo} from './todo.js';
import {Project} from './project.js';
import { DOMController } from './DOMcontroller.js';
import {format} from "date-fns";

const todo1 = new Todo("Do laundry", "Description", new Date(2025, 10, 25), 1, "Remember the crusty socks", false);
const todo2 = new Todo("Clean the room", "Description", new Date(3045, 12, 1), 1, "Clean the room, yep", false);
const project1 = new Project("Chores");

project1.todoList.push(todo1);
project1.todoList.push(todo2);
todo1.dueDate = format(todo1.dueDate, "dd/MM/yyyy");

console.log(todo1);
console.log(project1);

let d = new DOMController();
d.clearDOM();