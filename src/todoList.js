const addBtn = document.querySelector('.add-item-btn');

// const form = document.querySelector('.task-form');
// const input = document.querySelector('input');
const pendingUl = document.querySelector('.pending-ul');
const finishedUl = document.querySelector('.finished-ul');
const prevBtn = document.querySelector('.previous');
const nextBtn = document.querySelector('.next');

let pendings = [];
let finished = [];
let firstInit = true;
let newId = function () {
  return Math.random().toString(36).substr(2, 16);
};

function clearList() {
  const pendingUl = document.querySelector('.pending-ul');
  const finishedUl = document.querySelector('.finished-ul');
  while (pendingUl.firstChild) pendingUl.removeChild(pendingUl.firstChild);
  while (finishedUl.firstChild) finishedUl.removeChild(finishedUl.firstChild);
}

function changeDate(year, month, day) {
  document.querySelector('.date').innerText = `${year}.${month < 10 ? `0${month}` : month}.${day < 10 ? `0${day}` : day}`;
  clearList();
  getTask();
}

function curDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  changeDate(year, month, day);
}

function prevDate() {
  const currentDate = new Date(document.querySelector('.date').innerHTML);
  const prevDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
  const year = prevDate.getFullYear();
  const month = prevDate.getMonth() + 1;
  const day = prevDate.getDate();
  changeDate(year, month, day);
}

function nextDate() {
  const currentDate = new Date(document.querySelector('.date').innerHTML);
  const nextDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
  const year = nextDate.getFullYear();
  const month = nextDate.getMonth() + 1;
  const day = nextDate.getDate();
  changeDate(year, month, day);
}

function saveTask(list) {
  if (list === 'pending') {
    localStorage.setItem('PENDING', JSON.stringify(pendings));
  } else {
    localStorage.setItem('FINISHED', JSON.stringify(finished));
  }
}

function moveToPending(e) {
  e.target.removeEventListener('click', moveToPending);
  e.target.addEventListener('click', moveToFinished);
  e.target.classList.remove('toPendingBtn');
  e.target.classList.add('toFinishedBtn');
  const li = e.currentTarget.parentNode;
  finishedUl.removeChild(li);
  pendingUl.appendChild(li);
  finished.forEach(function(item) {
    if (item.id === li.id) {
      const removedItem = finished.splice(finished.indexOf(item), 1);
      pendings.push(removedItem[0]);
    }
  });
  saveTask('pending');
  saveTask('finished');
}

function moveToFinished(e) {
  e.target.removeEventListener('click', moveToFinished);
  e.target.addEventListener('click', moveToPending);
  e.target.classList.remove('toFinishedBtn');
  e.target.classList.add('toPendingBtn');
  const li = e.currentTarget.parentNode;
  pendingUl.removeChild(li);
  finishedUl.appendChild(li);
  pendings.forEach(function(item) {
    if (item.id === li.id) {
      const removedItem = pendings.splice(pendings.indexOf(item), 1);
      finished.push(removedItem[0]);
    }
  });
  saveTask('finished');
  saveTask('pending');
}

function deleteTask(e) {
  const li = e.currentTarget.parentNode;
  if (li.parentNode.classList.contains('pending-ul')) {
    pendingUl.removeChild(li);
    pendings = pendings.filter(function(item) {
      return item.id !== li.id;
    })
    saveTask('pending');
  } else {
    finishedUl.removeChild(li);
    finished = finished.filter(function(item) {
      return item.id !== li.id;
    })
    saveTask('finished');
  }
}


function showTask(item, list, newTask, date, id) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const btnDiv = document.createElement('div');
  const delBtn = document.createElement('button');
  const listBtn = document.createElement('button');
  const currentDate = document.querySelector('.date').innerHTML;
  span.innerText = item;
  delBtn.classList.add('delBtn');
  delBtn.addEventListener('click', deleteTask);
  li.appendChild(span);
  btnDiv.classList.add('btnDiv');
  btnDiv.appendChild(delBtn);
  if (list === 'pending') {
    if (currentDate === date) {
      listBtn.classList.add('toFinishedBtn');
      listBtn.addEventListener('click', moveToFinished);
      btnDiv.appendChild(listBtn);
      li.id = id;
      li.appendChild(btnDiv);
      pendingUl.appendChild(li);
    }
    if (newTask) {
      const obj = {
        date: date,
        id: id,
        task: item
      }
      pendings.push(obj);
      saveTask('pending');
    }
  } else {
    if (currentDate === date) {
      listBtn.classList.add('toPendingBtn');
      listBtn.addEventListener('click', moveToPending);
      btnDiv.appendChild(listBtn);
      li.id = id;
      li.appendChild(btnDiv);
      finishedUl.appendChild(li);
    }
    if (newTask) {
      const obj = {
        date: date,
        id: id,
        task: item
      }
      finished.push(obj);
      saveTask('finished');
    }
  }
}

function submit(e) {
  e.preventDefault();
  const currentDate = document.querySelector('.date').innerHTML;
  const todoInput = e.target.querySelector('input');
  const todoForm = e.target;
  const id = newId();
  showTask(todoInput.value, 'pending', true, currentDate, id);
  todoInput.value = "";
  saveTask('pending');
  pendingUl.removeChild(todoForm);
}

function addForm(e) {
  const existForm = document.querySelector('.add-form');
  if (!existForm) {
    const todoForm = document.createElement('form');
    const todoInput = document.createElement('input');
    todoInput.placeholder = 'Write A Todo';
    todoInput.classList.add('add-todo');
    todoForm.classList.add('add-form');
    todoForm.appendChild(todoInput);
    pendingUl.appendChild(todoForm);
    todoForm.addEventListener('submit', submit);
    todoInput.focus();
  } else {
    existForm.querySelector('input').focus();
  }
}

function checkDate(list, kind) {
  const currentDate = document.querySelector('.date').innerHTML;
  list.forEach(function(item) {
    if (item.date === currentDate) {
      if (kind === 'pending') { showTask(item.task, 'pending', false, item.date, item.id); }
      else { showTask(item.task, 'finished', false, item.date, item.id); }
    }
  })
  saveTask(kind);
}

function getTask() {
  let exist = true;
  if (localStorage.getItem('PENDING')) {
    const parsedPendings = JSON.parse(localStorage.getItem('PENDING'));
    if (firstInit) {
      parsedPendings.forEach((item) => { showTask(item.task, 'pending', true, item.date, item.id) });
    } else checkDate(parsedPendings, 'pending')
  } else {
    localStorage.setItem('PENDING', JSON.stringify(pendings));
    exist = false;
  }
  if (localStorage.getItem('FINISHED')) {
    const parsedFinished = JSON.parse(localStorage.getItem('FINISHED'));
    if (firstInit) {
      parsedFinished.forEach((item) => showTask(item.task, 'finished', true, item.date, item.id));
    } else checkDate(parsedFinished, 'finished');
  } else {
    localStorage.setItem('FINISHED', JSON.stringify(finished));
    exist = false;
  }
  if (exist === false) getTask();
}

function init() {
  todayBtn.addEventListener('click', curDate);
  addBtn.addEventListener('click', addForm);
  prevBtn.addEventListener('click', prevDate);
  nextBtn.addEventListener('click', nextDate);
  getTask();
  firstInit = false;
}

init();