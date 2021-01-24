const setting = document.querySelector('.setting');
const reset = document.querySelector('.reset');

function resetData() {
  const askUser = confirm('저장된 정보를 초기화하시겠습니까?\n유저 정보와 등록된 투두리스트가 모두 삭제됩니다.');
  if (askUser) {
    localStorage.clear();
    window.location.reload();
  }
}

function activeBtn() {
  setting.classList.toggle('active');
  const menu = setting.parentNode.querySelector('.setting-menu');
  menu.classList.toggle('active');
}

function init() {
  setting.addEventListener('click', activeBtn);  
  reset.addEventListener('click', resetData);
}

init();