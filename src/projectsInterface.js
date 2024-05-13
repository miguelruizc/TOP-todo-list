import {Project} from "./project.js";
import {Todo} from "./todo.js";

export class ProjectsInterface {
    constructor(projectsArray){
        this.projects = projectsArray;
    }

    createProject(title) {
        let newProject = new Project(title, this.createProjectId());
        this.projects.push(newProject);
    }

    createTodo(projectId = 0, title="Task", description="Task about X", dueDate=new Date(1111, 1, 1),
               priority=0, notes="Notes", isDone=false){
        
        let index = this.projects.findIndex(project => project.id === projectId);
        let newTodo = new Todo(title, description, dueDate, priority, notes, isDone, this.createTodoId(projectId));
        this.projects[index].addTodo(newTodo); 
    
    }

    deleteProject(projectId){
        //create new array without filtered objects
        let temp = this.projects.filter(element => element.id !== projectId);
        this.projects = temp;
    }

    deleteTodo(projectId, todoId){
        //Iterate projects to find ProjectName
        this.projects.forEach(element => {
            if(element.id === projectId){
                //Filter todos with todoName
                let tempArray = element.todoList.filter(todo => todo.id !== todoId);
                element.todoList = tempArray;
            }  
        });
    }

    editTodo(projectName, todoName, field, newValue){
        //Iterate projects to find projectName
        this.projects.forEach((project)=>{
            if(project.title === projectName){
                //Iterate todos to find todoName
                project.todoList.forEach((todo)=>{
                    if(todo.title === todoName)
                        todo[field] = newValue;
                });
            }
        });
    }

    editProject(projectName, newName){
        this.projects.forEach(project => {
            if(project.title === projectName) {
                project.title = newName;
            }
        });
    }

    renderProjects() {
        if(this.projects.length === 0)
                console.log("No projects");

        this.projects.forEach(element => {
            console.log(`Project: ${element.title}`);
            
            if(element.todoList.length === 0)
                console.log("Empty project");

            element.todoList.forEach(todo => {
                console.log(todo.toString());
            });
        });
    }

    createProjectId() {
        //Iterate from 0 to infinite and find the first available ID
        for(let i = 0; true ;i++)
        {
            let available = true;
            this.projects.forEach((project)=>{
                if(project.id === i){
                    available = false;
                }
            });
            
            if(available)
                return i;
        }
    }

    createTodoId(projectId) {
      
        //Find the project
        for(let project of this.projects){
            if(project.id === projectId){
                
                //If first task, set to 0
                if(project.todoList.length === 0){
                    return 0;
                }

                // Else, find first available id
                for(let i = 0; true; i++){
                    
                    let available = true;

                    for(let todo of project.todoList) {
                        if(todo.id === i){
                            available = false;
                        }
                    };

                    if(available){
                        return i;
                    }
                };
            }
        };
    }
}