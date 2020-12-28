const localStorage = window.localStorage;
const todoDiv = document.querySelector("#todos");
const form = document.querySelector("#form");
const input = document.querySelector("#todo");
const warning = document.querySelector("#error");
let todoList = [];

if (localStorage.length > 0) {
  todoList = JSON.parse(localStorage.getItem("todos"));
  todoList.forEach(function (todo) {
    createTodo(todo);
  });
}

function createTodo(todo) {
  const div = document.createElement("div");
  div.appendChild(createParagraphTodo(todo));
  div.appendChild(createIconDeleteTodo());
  todoDiv.appendChild(div);
}

function createParagraphTodo(todo) {
  const paragraph = document.createElement("p");
  paragraph.textContent = todo;
  return paragraph;
}

function createIconDeleteTodo() {
  const iconDelete = document.createElement("em");
  iconDelete.className = "fas fa-trash-alt";
  return iconDelete;
}

function addTodo(e) {
  e.preventDefault();
  if (input.value === "") {
    input.classList.add("error");
    warning.classList.replace("hidden", "shown");
    return;
  }
  if (
    input.classList.contains("error") ||
    warning.classList.contains("shown")
  ) {
    input.classList.remove("error");
    warning.classList.replace("shown", "hidden");
  }
  todoList.push(input.value);
  localStorage.setItem("todos", JSON.stringify(todoList));
  createTodo(input.value);
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
}

document.querySelector("#container").addEventListener("submit", addTodo);

todoDiv.addEventListener("click", function (e) {
  if (e.target.tagName.toLowerCase() === "em") {
    deleteTodo(e.target);
  }
  e.stopPropagation();
});
