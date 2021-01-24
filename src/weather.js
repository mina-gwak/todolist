const weather = document.querySelector('.weather');
const API_KEY = "c7b94a18d841d2a7db9bf447485c009d";
const COORDS = "coords";

function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
  .then(function(response){
    return response.json();
  }).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerHTML = `${temperature}℃ @ ${place}`;
  })
}

function saveCoords(Obj) {
  localStorage.setItem(COORDS, JSON.stringify(Obj));
}

function handleGeoError() {
  console.log("Can not access geo location");
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    lat: latitude,
    lon: longitude
  }
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords !== null) {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.lat, parsedCoords.lon);
  } else {
    askForCoords();
  }
}

function init() {
  loadCoords();
}

init();