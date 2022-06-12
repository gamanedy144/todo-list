//QUERY SELECTORS

const addNewProject = document.querySelector('.add-new-project');
let addNewTodoItemList = document.querySelectorAll('.add-new-todo');
const projecstListElement = document.querySelector('.projects-list');
let projectsList = document.querySelectorAll('.project');
let plusIcons = document.querySelectorAll('.fa-square-plus');

let projectCount = projectsList.length - 2;

//class for project - title, color and the list of todo lists
class Project {
    constructor(title, color, arrayOfTodoItems){
        this.title = title;
        this.color = color;
        this.arrayOfTodoItems = arrayOfTodoItems;
    }

    addTodoItemClassMethod(todoItem, location){
        this.arrayOfTodoItems[location] = todoItem;
    }
}
//class for todo item
class TodoItem{
    constructor(description, status){
        this.description = description;
        this.status = status;
    }
}
let projectsArray = [];
let defaultTodoList = [];
let defaultTodoItem = new TodoItem("Start by adding your own tasks to this default project", true);
defaultTodoList.push(defaultTodoItem);
let defaultProject = new Project("Default project", "#000", defaultTodoList);
projectsArray.push(defaultProject);
console.log(projectsArray[0]);
// console.log(projectsArray);
// console.log(defaultTodoList);

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
addNewProject.addEventListener('click', addNewProjectToList);

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
}




// function to create Project
function createNewProject(){
    projectCount++;

    const newProject = document.createElement('li');
    newProject.classList.add('project');
    newProject.setAttribute('id', `project-${projectCount}`);

    const newProjectTopRow = document.createElement('div');
    newProjectTopRow.classList.add('project-top-row');

    const projectTitle = document.createElement('span');
    projectTitle.textContent = `New project ${projectCount}`;
    projectTitle.classList.add('project-title');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');

    newProjectTopRow.appendChild(projectTitle);
    newProjectTopRow.appendChild(editIcon);

    newProject.appendChild(newProjectTopRow);

    const newTodoList = document.createElement('ul');
    newTodoList.classList.add('todo-list');
    let newTodo = createAddNewTodoItem();
    // addEventListenerToNewTodoItem(newTodo);
    // console.log(newTodoLabelPlusIcon);
    // addEventListenerToIcon(newTodoLabelPlusIcon);
    newTodoList.appendChild(newTodo);
    newProject.appendChild(newTodoList);
    projectsArray.push(new Project(`New project ${projectCount}`, '#000',[]));
    return newProject;
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
function addNewProjectToList(){
    let newProjectToBeAdded = createNewProject();
    projecstListElement.insertBefore(newProjectToBeAdded, addNewProject);

    updateAll();

    addEventListenerToNewTodoItem(newProjectToBeAdded.querySelector('.add-new-todo'));
    addEventListenerToIcon(newProjectToBeAdded.querySelector('.fa-square-plus'));

}
 
// function to create the Todo Item
function createNewTodoItem(inputValue){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.textContent = inputValue;
    
    return newTodo;
}
// function to create the Todo Item from array (memory)
function createNewTodoItemFromArray(todoItem){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.textContent = todoItem.description;
    
    return newTodo; 
}

function createNewTodoItemFactory(todoItem){

    if((typeof todoItem) === Object){
        return createNewTodoItemFromArray(todoItem);
    }
    else {
        return createNewTodoItem(todoItem);
    }
}
// function to add the Todo Item to DOM
function addNewTodoItem(inputValue, currentNode){
    let newTodoItemToBeAdded = createNewTodoItemFactory(inputValue);
    const parent = currentNode.parentElement;
    parent.insertBefore(newTodoItemToBeAdded, currentNode);


    console.log(typeof inputValue);
    if(typeof inputValue === 'string'){
        const project = parent.parentElement;
        let tempTodoItem = new TodoItem(inputValue, true);
        const projectId = project.getAttribute('id');
        const number = projectId.charAt(projectId.length-1);
        let numberOfTodos = parent.querySelectorAll('.todo-item').length - 1;
        if(projectsArray[number].title === 'Default project'){
            numberOfTodos--;
        }
        projectsArray[number].addTodoItemClassMethod(tempTodoItem,numberOfTodos);
    }

    // let numberOfTodos = parent.querySelectorAll('.todo-item').length - 1;

    // projectsArray[projectCount].push()
    // console.log(numberOfTodos);


}

// LocalStorage Part
