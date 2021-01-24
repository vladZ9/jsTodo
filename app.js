//variables
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoContainer = document.querySelector(".todo-container");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listener
document.addEventListener("DOMContentLoaded", getStorage);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener(`click`, deleteCheck);
filterOption.addEventListener("change", filterTodo);

//functions
function addTodo(e) {
  e.preventDefault();
  saveTodos(todoInput.value);
  //create the div in which the li will be inside
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //create the li
  const todoLi = document.createElement("li");
  todoLi.innerText = todoInput.value;
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);
  //checked button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //edit button
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-pen"></i>`;
  editButton.classList.add("edit-btn");
  todoDiv.appendChild(editButton);

  //append the div( containing li & 2 button ( all separate ) to the UL element
  todoList.appendChild(todoDiv);
  //clear the input after each enter from the user
  todoInput.value = ``;
}
function deleteCheck(e) {
  //grab the event what we clicked on, get its first class, and check if that is equal to trash-btn
  // trash-btn is the actual bigger button , but the <i icon is the icon inside the buton ( the trash icon )
  //we want to get the bigger btn && the icons when are pressed both to work ( to delete item )
  const item = e.target;
  //delete todo
  if (item.classList.contains("trash-btn")) {
    const todo = item.parentElement;
    //add the animation class to the todo ( div created by us in JS)
    removeStorage(todo);
    todo.classList.add("fall");
    //add a special event to the div when the transition is finished
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList.contains("complete-btn")) {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    removeStorage(todo);
  }

  if (e.target.classList.contains("edit-btn")) {
    let question = prompt("What would you like this to change to?");
    e.target.parentElement.childNodes[0].innerText = question;
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
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
function saveTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    //we use stringify when we set the storage (stringify will make an exact string of what we have ) in this case
    //an array, will parse it exactly aswe see it , otherwise localstorage will parse it to an array without brackets
    // but with stringyfi we can keep the brackets as well
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getStorage() {
  let todos;
  //when you just check if there is something inside a local storage key you dont have to use json parse
  //only use json parse when you assign the data to an object so it can be looped
  if (localStorage.getItem("todos") === "null") {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create the li
    const todoLi = document.createElement("li");
    todoLi.innerText = todo;
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);
    //checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //edit button
    const editButton = document.createElement("button");
    editButton.innerHTML = `<i class="fas fa-pen"></i>`;
    editButton.classList.add("edit-btn");
    todoDiv.appendChild(editButton);
    //append the div( containing li & 2 button ( all separate ) to the UL element
    todoList.appendChild(todoDiv);
  });
}
function removeStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === "null") {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.childNodes[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
