const mainDiv = document.querySelector('.main-div');
const date = mainDiv.querySelector('.date');
const clock = mainDiv.querySelector('.clock');

function getTime() {
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();
  clock.innerText = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}

function checkMainDate() {
  const fulDate = getDate();
  const date = document.querySelector('.date').innerHTML;
  if (fulDate !== date) {
    setDate();
    clearList();
    getTask();
  }
}

function getDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  return `${year}.${month < 10 ? `0${month}` : month}.${
    day < 10 ? `0${day}` : day
  }`;
}

function setDate() {
  const fulDate = getDate();
  date.innerText = fulDate;
}

function showMain() {
  mainDiv.classList.add('show');
}

function init() {
  setDate();
  setInterval(getTime, 1000);
  setTimeout(showMain, 1000);
}

init();
