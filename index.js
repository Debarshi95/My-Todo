const localStorage = window.localStorage;
const todos = document.querySelector("#todos");
const form = document.querySelector("#form");
const input = document.querySelector("#todo");

let todoList = [];

(function () {
  if (localStorage.length > 0) {
    todoList = JSON.parse(localStorage.getItem("todos"));
    todoList.forEach(function (todo) {
      createTodos(todo);
    });
  }
})();

function createTodos(todo) {
  const containerDiv = document.createElement("div");
  containerDiv.appendChild(createParagraph(todo));
  containerDiv.appendChild(createButton());
  todos.appendChild(containerDiv);
  createButtonClear();
}

function createParagraph(todo) {
  const paragraph = document.createElement("p");
  paragraph.textContent = todo;
  return paragraph;
}

function createButton() {
  const btnDeleteTodo = document.createElement("button");
  btnDeleteTodo.textContent = "Delete";
  return btnDeleteTodo;
}

function addTodo(e) {
  e.preventDefault();
  if (input.value == "") {
    alert("Todo cannot be empty");
    return;
  }
  todoList.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todoList));
  createTodos(input.value);
  input.value = "";
}

function deleteTodo(target) {
  const todoToDelete = target.previousSibling.textContent;
  const newTodoList = todoList.filter(function (todo) {
    return todo != todoToDelete;
  });
  todoList = newTodoList;
  localStorage.setItem("todos", JSON.stringify(newTodoList));
  target.parentNode.remove();

  if (todoList.length === 0) {
    removeButtonClear();
  }
}

function deleteTodos() {
  todoList = [];
  localStorage.clear();
}

function createButtonClear() {
  if (todos.querySelector("#clear")) {
    return;
  }
  const button = document.createElement("button");
  button.textContent = "Clear";
  button.setAttribute("id", "clear");
  button.setAttribute("type", "click");
  todos.appendChild(button);
}

function removeButtonClear() {
  while (todos.lastChild) {
    todos.removeChild(todos.lastChild);
  }
  deleteTodos();
}

document.querySelector("#container").addEventListener("submit", addTodo);

todos.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "button" && e.target.id != "clear") {
    deleteTodo(e.target);
    return;
  }
  if (e.target.getAttribute("id") === "clear") {
    removeButtonClear();
  }
  e.stopPropagation();
});
