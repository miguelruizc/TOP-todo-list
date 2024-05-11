export class DOMInterface {
    constructor(projectsInterface){
        this.projectsInterface = projectsInterface;
        this.mainContainer = document.getElementById("main");

    }

    clearDOM() {
        this.mainContainer.innerHTML = "";
    }
    
    setEventListeners() {
        //Iterate all projects
        //console.log("This(outside): " + JSON.stringify(this, null, 2));
        this.projectsInterface.projects.forEach((element) => {
            //Set add task click-Listener
            element.addTodoButton.addEventListener("click", ()=>{
                this.projectsInterface.createTodo(element.title, undefined, undefined,undefined, undefined, undefined, undefined);
                this.clearDOM();
                this.render();
            });
            //Set delete project click-listener
            element.deleteProjectButton.addEventListener("click", ()=>{
                console.log("removeProjectButton clicked")
            });
            //Iterate all todos
            element.todoList.forEach((todo) => {
                //Set delete todo click-listener
                todo.deleteButton.addEventListener("click", ()=>{
                    console.log("removeTodo clicked");
                });
            });
        });
    }

    render() {
        this.projectsInterface.projects.forEach((element) => {
            // Project div
            let projectDiv = document.createElement("div");
            projectDiv.classList.add("project");
            // Project name
            let projectName = document.createElement("p");
            projectName.textContent = element.title;
            projectName.classList.add("projectName");
            projectDiv.appendChild(projectName);
            // todo List div
            let todoListDiv = document.createElement("div");
            todoListDiv.classList.add("todoList");
            // Iterate todo list
            element.todoList.forEach(todo => {
                // todo div
                let todoDiv = document.createElement("div");
                todoDiv.classList.add("todo");
                // Remove button
                let deleteTodoButton = document.createElement("button");
                deleteTodoButton.classList.add("deleteTodoButton");
                deleteTodoButton.textContent = "-";
                todoDiv.appendChild(deleteTodoButton);
                todo.deleteButton = deleteTodoButton;
                // Title
                let todoName = document.createElement("p");
                todoName.classList.add("todoName");
                todoName.textContent = todo.title;
                todoDiv.appendChild(todoName);
                // Description
                let todoDescription = document.createElement("p");
                todoDescription.classList.add("todoDescription");
                todoDescription.textContent = todo.description;
                todoDiv.appendChild(todoDescription);
                // dueDate
                let todoDueDate = document.createElement("p");
                todoDueDate.classList.add("todoDueDate");
                todoDueDate.textContent = todo.dueDate;
                todoDiv.appendChild(todoDueDate);
                // priority
                let todoPrio = document.createElement("p");
                todoPrio.classList.add("todoPrio");
                todoPrio.textContent = "Priority: " + todo.priority;
                todoDiv.appendChild(todoPrio);
                // notes
                let todoNotes = document.createElement("p");
                todoNotes.classList.add("todoNotes");
                todoNotes.textContent = todo.notes;
                todoDiv.appendChild(todoNotes);
                // isDone
                if(todo.isDone) todoDiv.classList.add("isDone");

                // Append todo
                todoListDiv.appendChild(todoDiv);
            }); 

            //Append todoListDIv
            projectDiv.appendChild(todoListDiv);

            //Buttons / ADD
            let addTodo = document.createElement("button");
            addTodo.textContent = "Add task";
            addTodo.classList.add("addTodoButton");
            projectDiv.appendChild(addTodo);
            element.addTodoButton = addTodo;

            //Button / DELETE
            let deleteProject = document.createElement("button");
            deleteProject.textContent = "Delete"
            deleteProject.classList.add("deleteProjectButton");
            projectDiv.appendChild(deleteProject);
            element.deleteProjectButton = deleteProject;

            //Append projectDiv
            this.mainContainer.appendChild(projectDiv);
        });

        this.setEventListeners();
    }
}