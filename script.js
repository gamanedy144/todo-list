//QUERY SELECTORS

const addNewProject = document.querySelector('.add-new-project');
let addNewTodoItemList = document.querySelectorAll('.add-new-todo');
const projecstListElement = document.querySelector('.projects-list');
let projectsList = document.querySelectorAll('.project');

let projectCount = projectsList.length - 1;

window.addEventListener('load', function(){
    console.log('I am loaded');
    addEventListenerToNewTodoItemList();

} );



function updateAddNewTodoItemList(){
    addNewTodoItemList = document.querySelectorAll('.add-new-todo');
}
function updateProjecstList(){
    projectsList = document.querySelectorAll('.project');
}
addNewProject.addEventListener('click', addNewProjectToList);


function addEventListenerToNewTodoItemList(){
    addNewTodoItemList.forEach(
        function(currentNode){
            // console.log(getEventListeners(currentNode));
            // if(Object.keys(getEventListeners(currentNode)).length != 1){
            //     currentNode.addEventListener('click', function(){
            //         addNewTodoItem('test', currentNode);
            //         console.log(getEventListeners(currentNode));
            //     });
            // }
            currentNode.addEventListener('click', function(){
                addNewTodoItem('test', currentNode)
            });
        }
    );
}

function updateAll(){
    updateAddNewTodoItemList();
    updateProjecstList();

}

function addEventListenerToNewTodoItem(currentNode){
    currentNode.addEventListener('click', function(){
        addNewTodoItem('test', currentNode)}
        );
}



function createNewProject(){
    const newProject = document.createElement('li');
    newProject.classList.add('project');

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
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item', 'add-new-todo');
    newTodo.textContent = 'Add new todo item';
    addEventListenerToNewTodoItem(newTodo);
    
    newTodoList.appendChild(newTodo);
    newProject.appendChild(newTodoList);

    return newProject;
}

function addNewProjectToList(){
    let newProjectToBeAdded = createNewProject();
    projecstListElement.insertBefore(newProjectToBeAdded, addNewProject);
    projectCount++;
    updateAll();
}

function createNewTodoItem(inputValue){
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.textContent = inputValue;
    
    return newTodo;
}
function addNewTodoItem(inputValue, currentNode){
    let newTodoItemToBeAdded = createNewTodoItem(inputValue);

    const parent = currentNode.parentElement;
    console.log(parent);

    parent.insertBefore(newTodoItemToBeAdded, currentNode);
}



function makeInput(currentNode){
    const inputText = document.createElement("INPUT");
    inputText.setAttribute('type', 'text');
    inputText.classList
}