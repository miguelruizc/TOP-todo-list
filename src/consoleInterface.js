import {Project} from "./project.js";
import {Todo} from "./todo.js";

export class ConsoleInterface {
    constructor(projectsArray){
        this.projects = projectsArray;
    }

    createProject(title) {
        let newProject = new Project(title);
        this.projects.push(newProject);
    }

    createTodo(projectTitle = "Default", title="Task", description="Task about X", dueDate=new Date(1111, 1, 1), priority=0, notes="Notes", isDone=false){
        let newTodo = new Todo(title, description, dueDate, priority, notes, isDone);
        
        //If the project exists, add todo
        if(this.projects.some(project => project.title === projectTitle)){
            
            console.log(`Todo: ${newTodo} created, inside ${projectTitle} project, which existed beforehand`);
            
            let index = this.projects.findIndex(obj => obj.title === projectTitle);
            this.projects[index].addTodo(newTodo); 
        }
        //Else, create project, add todo
        else {
            
            console.log(`Todo: ${newTodo} created, inside ${projectTitle} project, which didn't existed beforehand`);
            
            this.createProject(projectTitle);
            let index = this.projects.findIndex(obj => obj.title === projectTitle);
            this.projects[index].addTodo(newTodo);    
        }
    }

    deleteProject(name){
        //create new array without filtered objects
        let temp = this.projects.filter(element => element.title !== name);
        this.projects = temp;
    }

    renderProjects() {
        if(this.projects.length === 0)
            console.log("No projects");
        this.projects.forEach(element => {
            console.log(`Project: ${element.title}`);
            element.todoList.forEach(todo => {
                console.log(todo.toString());
            });
        });
    }
}