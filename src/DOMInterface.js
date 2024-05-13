import { format } from "date-fns";

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
        this.projectsInterface.projects.forEach((element) => {
            // Add task click-Listener
            element.addTodoButton.addEventListener("click", ()=>{this.addTodo(element.id);});
            // Delete project click-listener
            element.deleteProjectButton.addEventListener("click", ()=>{this.deleteProject(element.id);});
            //Iterate all todos
            element.todoList.forEach(todo => {
                // Delete todo click-listener
                todo.deleteButton.addEventListener("click", ()=>{this.deleteTodo(element.id, todo.id);});
                // Todo Name (toggle show details) click-listener
                const todoName = document.getElementById(`todoName#${element.id}#${todo.id}`);
                todoName.addEventListener("click", (event)=>{ this.toggleShowDetails(event, element.id, todo.id);});
                // Edit button
                const editButton = document.getElementById(`editButton#${element.id}#${todo.id}`);
                editButton.addEventListener("click", (event)=>{ this.editTodo(todo) });
                            
            });
        });
        //Create project button
        let createProjectButton = document.querySelector(".createProjectButton");
        createProjectButton.addEventListener("click", ()=>{this.addProject("Project")});
    }

    render() {
        // Clear DOM before rendering
        this.clearDOM();

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
                // deleteTodoButton.setAttribute("id", `deleteTodoButtonProject${element.id}Todo${todo.id}`)
                deleteTodoButton.textContent = "-";
                todoDiv.appendChild(deleteTodoButton);
                todo.deleteButton = deleteTodoButton;
                // Title
                let todoName = document.createElement("p");
                todoName.classList.add("todoName");
                todoName.textContent = todo.title;
                todoName.setAttribute("id", `todoName#${element.id}#${todo.id}`);
                todoDiv.appendChild(todoName);
                // Description
                let todoDescription = document.createElement("p");
                todoDescription.classList.add("todoDescription");
                if(todo.hideDetails) todoDescription.classList.add("hide");
                todoDescription.textContent = todo.description;
                todoDiv.appendChild(todoDescription);
                // dueDate
                let todoDueDate = document.createElement("p");
                todoDueDate.classList.add("todoDueDate");
                if(todo.hideDetails) todoDueDate.classList.add("hide");
                todoDueDate.textContent = todo.dueDate;
                todoDiv.appendChild(todoDueDate);
                // priority
                let todoPrio = document.createElement("p");
                todoPrio.classList.add("todoPrio");
                if(todo.hideDetails) todoPrio.classList.add("hide");
                todoPrio.textContent = "Priority: " + todo.priority;
                todoDiv.appendChild(todoPrio);
                // notes
                let todoNotes = document.createElement("p");
                todoNotes.classList.add("todoNotes");
                if(todo.hideDetails) todoNotes.classList.add("hide");
                todoNotes.textContent = todo.notes;
                todoDiv.appendChild(todoNotes);
                // edit button
                const editButton = document.createElement("button");
                editButton.classList.add("editButton");
                if(todo.hideDetails) editButton.classList.add("hide");
                editButton.textContent = "edit";
                editButton.setAttribute("id", `editButton#${element.id}#${todo.id}`);
                todoDiv.appendChild(editButton);
                
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
            addTodo.setAttribute("id", `addTodoButtonProject${element.id}`);
            projectDiv.appendChild(addTodo);
            element.addTodoButton = addTodo;

            //Button / DELETE
            let deleteProject = document.createElement("button");
            deleteProject.textContent = "Delete"
            deleteProject.classList.add("deleteProjectButton");
            deleteProject.setAttribute("id", `deleteProjectButtonProject${element.id}`);
            projectDiv.appendChild(deleteProject);
            element.deleteProjectButton = deleteProject;

            //Append projectDiv
            this.mainContainer.appendChild(projectDiv);
        });

        //Create project button
        let createProject = document.createElement("button");
        createProject.classList.add("createProjectButton");
        createProject.textContent = "Add project";
        this.mainContainer.appendChild(createProject);

        this.setEventListeners();
    }

    //Event handlers
    addTodo(projectId) {

        // Click handler function to be used below 
        const clickHandler = (event)=>{
            event.preventDefault();
            
            // Handle submit
            const form = submitButton.closest("form");
            const formData = new FormData(form);
            
            const todoName= formData.get("newTodoName");
            const todoDescription= formData.get("newTodoDescription");
            const todoDate = format(new Date(formData.get("newTodoDate")), "yyyy-MM-dd");
            const todoPriority= formData.get("newTodoPriority");
            const todoNotes= formData.get("newTodoNotes");
            dialog.close();

            //Remove eventListener
            submitButton.removeEventListener("click", clickHandler);
            submitButton.hasEventListener = false;

            //Create new todo with form data
            this.projectsInterface.createTodo(projectId, todoName, todoDescription, todoDate, todoPriority, todoNotes, false);
            this.render();
        }; 

        //Open dialog with form 
        let dialog = document.getElementById("addTodoDialog");
        dialog.showModal();

        // Set event listener to submit button
        let submitButton = document.getElementById("todoSubmitButton");
        this.addUniqueEventListener(submitButton, "click", clickHandler);
    }

    deleteProject(projectId) {
        this.projectsInterface.deleteProject(projectId);
        this.render();
    }

    deleteTodo(projectId, todoId) {
        this.projectsInterface.deleteTodo(projectId, todoId);
        this.render();
    }

    addProject() { 
        
        // Click handler function to be used below 
        const clickHandler = (event)=>{
            event.preventDefault();
            
            // Handle submit
            const form = submitButton.closest("form");
            const formData = new FormData(form);
            
            const projectName= formData.get("newProjectName");
            dialog.close();

            //Remove eventListener
            submitButton.removeEventListener("click", clickHandler);
            submitButton.hasEventListener = false;

            //Create new Project with form data
            this.projectsInterface.createProject(projectName);
            this.render();
        }; 

        //Open dialog with form 
        let dialog = document.getElementById("addProjectDialog");
        dialog.showModal();

        // Set event listener to submit button
        let submitButton = document.getElementById("projectSubmitButton");
        this.addUniqueEventListener(submitButton, "click", clickHandler);
    }

    editTodo(todo) {
        // Click handler to use BELOW
        const clickHandler = (event) => {
            event.preventDefault();
            
            // handle submit to modify the todo with form data
            todo.title = nameInput.value; 
            todo.description = descriptionInput.value; 
            todo.dueDate = dateInput.value;
            todo.priority = priorityInput.value;
            todo.notes = notesInput.value;

             // remove event listener & close modal
             submitButton.removeEventListener("click", clickHandler);
             submitButton.hasEventListener = false;
             dialog.close();

             // refresh dom
             this.render();
        }

        // get form and populate with todo data
        const dialog = document.getElementById("editTodoDialog");
        const nameInput = document.getElementById("editTodoName");
        const descriptionInput = document.getElementById("editTodoDescription");
        const dateInput = document.getElementById("editTodoDate");
        const priorityInput = document.getElementById("editTodoPriority");
        const notesInput = document.getElementById("editTodoNotes");

        nameInput.value = todo.title;
        descriptionInput.value = todo.description;
        dateInput.value = format(todo.dueDate, "yyyy-MM-dd");
        priorityInput.value = todo.priority;
        notesInput.value = todo.notes;

        dialog.showModal();

        // set event listener for submit
        const submitButton = document.getElementById("editTodoSubmitButton");
        this.addUniqueEventListener(submitButton, "click", clickHandler);
    }

    toggleShowDetails(event, projectId, todoId) {
        //Find the parent
        const parent = event.target.parentNode;
        const children = parent.children;

        //Iterate through all .todo children except name & delete button
        for(let i = 2; i < children.length; i++){
            children[i].classList.toggle("hide");
        }

        //Find project
        this.projectsInterface.projects.forEach((project)=>{
             //Find todo
             if(project.id === projectId){
                project.todoList.forEach((todo)=>{
                    if(todo.id === todoId){
                        //Toggle todo.hideDetails
                        todo.hideDetails = !todo.hideDetails;
                    }
                });
             }
        });
    }

    addUniqueEventListener(element, eventType, handlerFunction) {
        if(element.hasEventListener) {
            element.removeEventListener(eventType, element.handlerFunctionReference);
        }

        element.addEventListener(eventType, handlerFunction);
        element.handlerFunctionReference = handlerFunction;
        element.hasEventListener = true;
    }
}