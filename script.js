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
  console.log(event);
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
  const newstyle = this.previousSibling;
  newstyle.classList.add("task-style-completed");

  const newstyleTask = this.previousSibling;
  newstyle.classList.add("tasks-complete");
}

function deleteTask() {
  const todo = this.parentNode;
  todo.remove();
}
