import './style.css';
import {Todo} from './todo.js';
import {Project} from './project.js';
import { DOMController } from './DOMcontroller.js';
import {format} from "date-fns";
import {ConsoleInterface} from "./consoleInterface.js"; 

let projects = new Array();

let c = new ConsoleInterface(projects);

c.createTodo();
c.createTodo();
c.renderProjects();