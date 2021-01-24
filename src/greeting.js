const form = document.querySelector('.name-form');
const input = form.querySelector('input');
const greeting = document.querySelector('.greeting');
const showTodoBtn = document.querySelector('.show-todo-btn');

const todoContents = document.querySelector('.todo-contents');
const todoTitle = todoContents.querySelector('h1');
const titleName = todoTitle.querySelector('span');

function setTodoTitle(name) {
  titleName.innerText = name;
}

function saveName(name) {
  localStorage.setItem('currentUser', name);
}

function showName(name) {
  form.classList.remove('show');
  greeting.classList.add('show');
  showTodoBtn.classList.add('show');
  greeting.innerText = `Hello, ${name}!`;
}

function handleSubmit(e) {
  e.preventDefault();
  const name = form.querySelector('input').value;
  saveName(name.toUpperCase());
  showName(name.toUpperCase());
  setTodoTitle(name.toUpperCase());
}

function getName() {
  form.classList.add('show');
  form.addEventListener('submit', handleSubmit);
}

function loadName() {
  const nameLS = localStorage.getItem('currentUser');
  if (nameLS === null) {
    getName();
  } else {
    showName(nameLS);
    setTodoTitle(nameLS);
  }
}

function init() {
  loadName();
}

init();