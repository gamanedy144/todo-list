//QUERY SELECTORS

const addNewProject = document.querySelector('.add-new-project');
let addNewTodoItemList = document.querySelectorAll('.add-new-todo');
const projecstListElement = document.querySelector('.projects-list');
let projectsList = document.querySelectorAll('.project');
let plusIcons = document.querySelectorAll('.fa-square-plus');

let projectCount = document.querySelectorAll('.project').length - 1;

//class for project - title, color and the list of todo lists
class Project {
    constructor(title, color, index, arrayOfTodoItems){
        this.title = title;
        this.color = color;
        this.index = index;
        this.arrayOfTodoItems = arrayOfTodoItems;
    }
    static createProjectFromObject(object, array){
        return new Project(object.title, object.color, object.index, array);
    }
    addTodoItemClassMethod(todoItem, location){
        this.arrayOfTodoItems[location] = todoItem;
    }
    removeByIndex(location){
        this.arrayOfTodoItems.splice(location,1);
    }
}
//class for todo item
class TodoItem{
    constructor(description, status){
        this.description = description;
        this.status = status;
    }
    static createTodoItemFromObject(object){
        return new TodoItem(object.description, object.status);
    }
}

let projectsArray = [];
// let defaultTodoList = [];
// let defaultTodoItem = new TodoItem("Start by adding your own tasks to this default project", true);
// defaultTodoList.push(defaultTodoItem);
// let defaultProject = new Project("Default project", "#000",0, defaultTodoList);
// projectsArray.push(defaultProject);

// console.log(projectsArray);
// console.log(defaultTodoList);
( () => {
    projectsArray = localStorageOnLoad();  
    // console.log(projectsArray);
    projectsArray.forEach(function(project){
        console.log('Type of project inside IIFE '+typeof project);
        addNewProjectToList(project); 
        // //current node is UL
        // console.log(project);
        // console.log(project.arrayOfTodoItems);

    })
})();


window.addEventListener('load', function(){
    console.log('I am loaded');
    addEventListenerToNewTodoItemList();
    addEventListenerToPlusIcons();

} );



function updateAddNewTodoItemList(){
    addNewTodoItemList = document.querySelectorAll('.add-new-todo');
}
function updateProjecstList(){
    projectsList = document.querySelectorAll('.project');
}
function updatePlusIcons(){
    plusIcons = document.querySelectorAll('.fa-square-plus');
}
addNewProject.addEventListener('click', function() {
    addNewProjectToList();
});

// Add event listener to newTodo item
function addEventListenerToNewTodoItem(currentNode){
    currentNode.addEventListener('keypress',
        function(event){
            if(event.key ==='Enter' || event.keyCode == 13){
                event.preventDefault();
                let currentInput = currentNode.querySelector('input');
                if(currentInput.value !== ''){
                    addNewTodoItem(currentInput.value, currentNode);
                    currentInput.value = '';
                }
            }
        }
    , false);
}
function addEventListenerToNewTodoItemList(){
    addNewTodoItemList.forEach(
        function(currentNode){
            addEventListenerToNewTodoItem(currentNode);
        }
    );
}


// Add event listener to plus icon
function addEventListenerToIcon(icon){
    
    // console.log(`iconLabel is ${iconLabel}`);

    icon.addEventListener('click', function(){

        let iconLabel = icon.parentElement;
        let formElem = iconLabel.parentElement;
        let currentInput = formElem.querySelector('input');

        if(currentInput.value !== ''){

            let currentNode = formElem.parentElement;
            addNewTodoItem(currentInput.value, currentNode);
            currentInput.value ="";
        }
    })
}
function addEventListenerToPlusIcons(){
    plusIcons.forEach(
        function(icon){
            addEventListenerToIcon(icon);
            
        }
    )
}
function updateAll(){
    updateAddNewTodoItemList();
    updateProjecstList();
    updatePlusIcons();
    projectCount = document.querySelectorAll('.project').length - 1;
}




// function to create Project
function createNewProject(){
    // projectCount++;

    const newProject = document.createElement('li');
    newProject.classList.add('project');
    newProject.setAttribute('id', `project-${projectCount}`);
    newProject.setAttribute('data-project-index', `${projectCount}`);

    const newProjectTopRow = document.createElement('div');
    newProjectTopRow.classList.add('project-top-row');

    const projectTitle = document.createElement('span');
    projectTitle.textContent = `New project ${projectCount}`;
    projectTitle.classList.add('project-title');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');



    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');


    newProjectTopRow.appendChild(projectTitle);
    newProjectTopRow.appendChild(editIcon);
    newProjectTopRow.appendChild(deleteIcon);

    newProject.appendChild(newProjectTopRow);

    const newTodoList = document.createElement('ul');
    newTodoList.classList.add('todo-list');
    let newTodo = createAddNewTodoItem();
    // addEventListenerToNewTodoItem(newTodo);
    // console.log(newTodoLabelPlusIcon);
    // addEventListenerToIcon(newTodoLabelPlusIcon);
    newTodoList.appendChild(newTodo);
    newProject.appendChild(newTodoList);
    projectsArray.push(new Project(`New project ${projectCount}`, '#000', 0, []));

    return newProject;
}

// function to create Project from array (memory)
function createNewProjectFromArray(project){
    const newProject = document.createElement('li');
    newProject.classList.add('project');
    newProject.style.backgroundColor = project.color;
    //projectCount will be taken from array

    newProject.setAttribute('id', `project-${project.index}`);
    newProject.setAttribute('data-project-index', `${project.index}`);

    const newProjectTopRow = document.createElement('div');
    newProjectTopRow.classList.add('project-top-row');

    const projectTitle = document.createElement('span');
    projectTitle.textContent = project.title;
    projectTitle.classList.add('project-title');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');


    newProjectTopRow.appendChild(projectTitle);
    newProjectTopRow.appendChild(editIcon);
    newProjectTopRow.appendChild(deleteIcon);
    

    newProject.appendChild(newProjectTopRow);

    const newTodoList = document.createElement('ul');
    newTodoList.classList.add('todo-list');
    let newTodo = createAddNewTodoItem();

    newTodoList.appendChild(newTodo);
    newProject.appendChild(newTodoList);
    console.log('Project is ');
    console.log(project);
    if(project.arrayOfTodoItems.length != 0){
        console.log('start creating todo items');
        project.arrayOfTodoItems.forEach(function(item){
            addNewTodoItem(item.description, newProject.querySelector('.add-new-todo'));
        })
    }

    return newProject;
}

function createNewProjectFactory(project){
    if(typeof project === 'object'){
        return createNewProjectFromArray(project);
    }
    else {
        return createNewProject();
    }
}
// function to create addNewTodoItem
function createAddNewTodoItem(){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item', 'add-new-todo');

    const newTodoForm = document.createElement('form');

    const newTodoInput = document.createElement('input');
    newTodoInput.setAttribute('type','text');

    newTodoInput.setAttribute('placeholder','Add new todo item');
    newTodoInput.setAttribute('id',`add-new-todo-input-${projectCount}`);
    newTodoInput.setAttribute('value', "");

    const newTodoLabel = document.createElement('label');
    newTodoLabel.setAttribute('for',`add-new-todo-input-${projectCount}`);

    const newTodoLabelPlusIcon = document.createElement('i');
    newTodoLabelPlusIcon.classList.add('fa-solid', 'fa-square-plus');
    newTodoLabel.appendChild(newTodoLabelPlusIcon);
    
    newTodoForm.appendChild(newTodoInput);
    newTodoForm.appendChild(newTodoLabel);

    newTodo.appendChild(newTodoForm);

    return newTodo;
}

// function to add Project to DOM
function addNewProjectToList(project){
    let newProjectToBeAdded = createNewProjectFactory(project);





    projecstListElement.insertBefore(newProjectToBeAdded, addNewProject);

    updateAll();

    addEventListenerToNewTodoItem(newProjectToBeAdded.querySelector('.add-new-todo'));
    addEventListenerToIcon(newProjectToBeAdded.querySelector('.fa-square-plus'));

}
 
// function to create the Todo Item
function createNewTodoItem(inputValue){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    const newTodoSpan = document.createElement('span');
    newTodoSpan.textContent = inputValue;

    const separator = document.createElement('hr');
    separator.classList.add('solid');

    const divManageTodo = document.createElement('div');
    divManageTodo.classList.add('manage-todo-item');

    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid', 'fa-circle-check');
    divManageTodo.appendChild(checkIcon);
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    divManageTodo.appendChild(editIcon);
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    divManageTodo.appendChild(deleteIcon);


    newTodo.appendChild(newTodoSpan);
    newTodo.appendChild(separator);
    newTodo.appendChild(divManageTodo);

    
    return newTodo;
}
// function to create the Todo Item from array (memory)
function createNewTodoItemFromArray(todoItem){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    const newTodoSpan = document.createElement('span');
    newTodoSpan.textContent = todoItem.description;
    
    const separator = document.createElement('hr');
    separator.classList.add('solid');

    const divManageTodo = document.createElement('div');
    divManageTodo.classList.add('manage-todo-item');

    const checkIcon = document.createElement('i');
    checkIcon.classList.add('fa-solid', 'fa-circle-check');
    divManageTodo.appendChild(checkIcon);
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    divManageTodo.appendChild(editIcon);
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    divManageTodo.appendChild(deleteIcon);


    newTodo.appendChild(newTodoSpan);
    newTodo.appendChild(separator);
    newTodo.appendChild(divManageTodo);

    
    return newTodo; 
}

function createNewTodoItemFactory(todoItem){

    if((typeof todoItem) === 'object'){
        console.log('using createNewToDoItemFromArray');
        console.log(todoItem)
        return createNewTodoItemFromArray(todoItem);
    }
    else {
        console.log('using createNewToDoItem');
        return createNewTodoItem(todoItem);
    }
}


// function to add hover event listere to todo Item
function addHoverEventListenerToTodoItem(currentNode){
    const hrElem = currentNode.querySelector('hr');
    const manageTodoItemElem = currentNode.querySelector('.manage-todo-item');

    console.log(currentNode);
    currentNode.addEventListener('mouseenter', function(event){
        hrElem.style.display = 'unset';
        manageTodoItemElem.style.display = 'flex';
    },false)

    currentNode.addEventListener('mouseleave', function(){
        hrElem.style.display = 'none';
        manageTodoItemElem.style.display = 'none';
    })
}
// function to add the Todo Item to DOM
function addNewTodoItem(inputValue, currentNode){
    let newTodoItemToBeAdded = createNewTodoItemFactory(inputValue);
    const parent = currentNode.parentElement;
    parent.insertBefore(newTodoItemToBeAdded, currentNode);

    const project = parent.parentElement;
    // const projectId = project.getAttribute('id');
    const number = project.dataset.projectIndex;

    const todoItemCount = parent.querySelectorAll('.todo-item').length - 2;
    newTodoItemToBeAdded.setAttribute('data-project-index',`${number}`);
    newTodoItemToBeAdded.setAttribute('data-todo-item-index',`${todoItemCount}`);
    newTodoItemToBeAdded.setAttribute('id', `p-${number}-i-${todoItemCount}`);

    addHoverEventListenerToTodoItem(newTodoItemToBeAdded);
    if(typeof inputValue === 'string'){
        addTodoItemToArray(newTodoItemToBeAdded, inputValue);
    }
    const deleteIcon = newTodoItemToBeAdded.querySelector('.fa-trash');
    deleteIcon.addEventListener('click', function(event){
        console.log(event.target.parentElement.parentElement);
        removeToDoItemFromArray(event.target.parentElement.parentElement);
        newTodoItemToBeAdded.remove();
    },false)


}
// function to add the Todo Item into array
function addTodoItemToArray(todoItem, inputValue){
    const parent = todoItem.parentElement;
    const project = parent.parentElement;
    let tempTodoItem = new TodoItem(inputValue, true);

    const number = project.dataset.projectIndex;

    let numberOfTodos = project.querySelectorAll('.todo-item').length - 2;
    projectsArray[number].addTodoItemClassMethod(tempTodoItem,numberOfTodos);
}

function removeToDoItemFromArray(todoItem){

    projectsArray[todoItem.dataset.projectIndex].removeByIndex(todoItem.dataset.todoItemIndex);
}

// LocalStorage Part
// localStorage.setItem(array, projectsArray);

function localStorageOnLoad(){
    //check if item in memory
    let array = [];
    // console.log(array)
    if(localStorage.getItem('array') === null){

        let tempTodoList = [];
        let tempTodoItem = new TodoItem("Start by adding your own tasks to this default project", true);
        tempTodoList.push(tempTodoItem);
        let tempProject = new Project("Default project", "green", 0, tempTodoList);
        array.push(tempProject);
        let arrayJson = JSON.stringify(array);

        console.log('local storage is empty');
        console.log(arrayJson);
        localStorage.setItem('array', arrayJson);

    }
    else{
        console.log("local storage is not empty, before methods");
        let arrayJson = localStorage.getItem('array');
        // console.log(arrayJson);
        array = JSON.parse(arrayJson);
        // console.log(array);

        console.log('local storage is not empty');
    }
    // console.log(convertToObjects(array));
    return convertToObjects(array);
}

function convertToObjects(array){
    let tempArray = [];
    console.log('\n------- start of convert to objects -------\n');
    array.forEach( function(project) {
        let tempItems = [];
        let arrayOfItems = project.arrayOfTodoItems;
        arrayOfItems.forEach(function(item) {
            let tempTodoItem = TodoItem.createTodoItemFromObject(item);
            tempItems.push(tempTodoItem);
        })
        let tempProject = Project.createProjectFromObject(project, tempItems);

        tempArray.push(tempProject);
    })

    console.log('------- end of convert to objects --------\n');
    return tempArray;
}