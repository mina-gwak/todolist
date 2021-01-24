const closeTodoBtn = document.querySelector('.close-todo-btn');
const todoDiv = document.querySelector('.todo-div')
const todayBtn = document.querySelector('.go-today');
const dateBtns = document.querySelectorAll('.date-btn');

function resizeMain() {

  // 늘리기 전 콘텐츠 내용 없애기
  mainDiv.classList.remove('show');
  closeTodoBtn.classList.remove('show');
  todoContents.classList.remove('show');
  todayBtn.classList.remove('show');
  dateBtns.forEach((item) => item.classList.remove('show'));

  // todo 창 줄이기
  todoDiv.classList.add('decrease');

  // todo 창 없어진 뒤 클래스 원상복귀하고 콘텐츠 다시 띄우기
  setTimeout(function() {
    mainDiv.classList.remove('decrease');
    todoDiv.classList.remove('decrease', 'increase');
    
    mainDiv.classList.add('show');
    greeting.classList.add('show');
    clock.classList.remove('resize');
    date.classList.remove('resize');
    showTodoBtn.classList.add('show');
  }, 1000);
}

function resizeTodo() {

  // 크기 줄이기 전 콘텐츠 내용 없애기
  mainDiv.classList.remove('show');
  greeting.classList.remove('show');
  showTodoBtn.classList.remove('show');

  // todo 창 나타나게 하기
  todoDiv.classList.add('increase');

  // 메인 콘텐츠 크기 줄이기
  mainDiv.classList.add('decrease');
  clock.classList.add('resize');
  date.classList.add('resize');

  // todo 창 모두 뜬 뒤 콘텐츠 다시 띄우기
  setTimeout(function() {
    checkMainDate();
    mainDiv.classList.add('show');
    closeTodoBtn.classList.add('show');
    todoContents.classList.add('show');
    todayBtn.classList.add('show');
    dateBtns.forEach((item) => item.classList.add('show'));
  }, 1000);

}

function init() {
  showTodoBtn.addEventListener('click', resizeTodo);
  closeTodoBtn.addEventListener('click', resizeMain);
}

init();