function loadHandler() {
  todoInput = document.getElementById("input");
  addTodo = document.getElementById("add-button");
  taskList = document.getElementById("tasks");
  clearButton = document.getElementById("clear");

  addTodo.addEventListener("click", addTask);
  document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      addTask();
    }
  });
  document.addEventListener("DOMContentLoaded", getLocalTasks);
}

function addTask() {
  const todo = document.createElement("div");
  const newTask = document.createElement("li");

  todo.classList.add("todo");
  newTask.innerText = todoInput.value;
  newTask.classList.add("task-style");
  todo.appendChild(newTask);

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
  let newstyleTask = this.previousSibling;
  newstyleTask.classList.add("tasks-complete");

  let completedTasks;
  if (localStorage.getItem("completedTasks") === null) {
    completedTasks = [];
  } else {
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  }
  completedTasks.push(newstyleTask.innerText);
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
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

    let completedTasks;
    if (localStorage.getItem("completedTasks") === null) {
      completedTasks = [];
    } else {
      completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
    }
    if (completedTasks.includes(todo)) {
      newTask.classList.add("tasks-complete");
    }

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

window.addEventListener("load", loadHandler);
