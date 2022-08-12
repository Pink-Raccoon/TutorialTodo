//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos);

//Functions
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    console.log("hello");

    //Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add to do in local storage
    saveLocalTodos(todoInput.value);


    //Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

    //trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"> <\i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //Append To list

    todoList.appendChild(todoDiv);

    //clear input
    todoInput.value = "";
}

function deleteCheck(event) {
    console.log(event.target);
    const item = event.target;

    //delete todo

    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();

        });


    }

    // Check mark

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');

    }
}


function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                console.log(todo.classList)
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo) {
    // check if already todos exists
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    console.log("whats wrong with mine");
    let todos;
    // check if already todos exists
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        //Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        todoInput.value = "";

        //Checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"> <\i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);

        //Append To list
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    let todos;
    // check if already todos exists
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}