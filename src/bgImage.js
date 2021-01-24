const body = document.querySelector('body');

const bgList = [
  'https://user-images.githubusercontent.com/62706988/103933135-3dc88e80-5166-11eb-8a9d-4b687bc4143d.jpg',
  'https://user-images.githubusercontent.com/62706988/103933149-43be6f80-5166-11eb-90d0-47f374f17603.jpg',
  'https://user-images.githubusercontent.com/62706988/103933151-44ef9c80-5166-11eb-8dee-fe3ae4fd7700.jpg',
  'https://user-images.githubusercontent.com/62706988/103933154-45883300-5166-11eb-8421-f3b49ee46987.jpg',
  'https://user-images.githubusercontent.com/62706988/103933165-47ea8d00-5166-11eb-9866-e042bfdd939a.jpg',
  'https://user-images.githubusercontent.com/62706988/104126273-07c21f00-539f-11eb-848b-207610aae681.jpg',
  'https://user-images.githubusercontent.com/62706988/104126275-10b2f080-539f-11eb-9fb8-15907fec9dde.jpg',
  'https://user-images.githubusercontent.com/62706988/104126277-127cb400-539f-11eb-8081-5f421088bf10.jpg',
  'https://user-images.githubusercontent.com/62706988/104126280-14467780-539f-11eb-8ec9-1a8dc4698248.jpg',
];

function changeTodoColor(num) {
  const listTitle = document.querySelectorAll('.list-title');
  listTitle.forEach(function(item) {
    const h3 = item.querySelector('h3');
    h3.classList.add(`color-${num+1}`);
  });
}

function randomNum() {
  const randNum = Math.floor(Math.random() * 9);
  return randNum;
}

function showImage() {
  const div = document.createElement('div');
  const dark = document.createElement('div');
  const img = new Image();
  const bgNum = randomNum();
  img.src = bgList[bgNum];
  div.classList.add('bg');
  dark.classList.add('bg-dark');
  img.classList.add('bg-image');
  div.appendChild(img);
  div.appendChild(dark);
  body.prepend(div);
  changeTodoColor(bgNum);
}

function init() {
  showImage();
}

init();
