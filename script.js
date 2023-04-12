const todoInput = document.getElementById("input");
const addTodo = document.getElementById("add-button");
const taskList = document.getElementById("tasks");
let completedTaskButton;
let deleteButton;

function addTask() {
  const todo = document.createElement("div");
  const newTask = document.createElement("li");

  todo.classList.add("todo");
  newTask.innerText = todoInput.value;
  newTask.classList.add("task-style");
  todo.appendChild(newTask);

  //saving in local storage
  saveLocalTasks(todoInput.value);

  completedTaskButton = document.createElement("button");
  completedTaskButton.innerHTML = "✓";
  completedTaskButton.classList.add("complete-button");
  todo.appendChild(completedTaskButton);
  completedTaskButton.addEventListener("click", completedTask);

  deleteButton = document.createElement("button");
  deleteButton.innerHTML = "🗑️";
  deleteButton.classList.add("delete-button");
  todo.appendChild(deleteButton);
  deleteButton.addEventListener("click", deleteTask);

  taskList.appendChild(todo);
  todoInput.value = "";
}

addTodo.addEventListener("click", addTask);

document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function saveLocalTasks(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function completedTask() {
  const newstyleTask = this.previousSibling;
  newstyleTask.classList.add("tasks-complete");
}

//https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event
function deleteTask() {
  const todo = this.parentNode;
  todo.remove();
  removeLocalTask(todo);
  todo.addEventListener("transitionend", function () {
    todo.remove();
  });
}

function getLocalTasks() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTask = document.createElement("li");
    newTask.innerText = todo;
    newTask.classList.add("task-style");
    todoDiv.appendChild(newTask);

    completedTaskButton = document.createElement("button");
    completedTaskButton.innerHTML = "✓";
    completedTaskButton.classList.add("complete-button");
    todoDiv.appendChild(completedTaskButton);
    completedTaskButton.addEventListener("click", completedTask);

    deleteButton = document.createElement("button");
    deleteButton.innerHTML = "🗑️";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    deleteButton.addEventListener("click", deleteTask);

    taskList.appendChild(todoDiv);
  });
}

document.addEventListener("DOMContentLoaded", getLocalTasks);

function removeLocalTask(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
