//currentDate
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "Mai",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentTime = new Date();
let currentDate = currentTime.getDate();
let currentDay = days[currentTime.getDay()];
let currentMonth = months[currentTime.getMonth()];
let currentYear = currentTime.getFullYear();
let currentHour = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();

let dat = `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}, ${currentHour}:${currentMinutes}`;
Today.innerHTML = dat;

//show city

function getWeather(response) {
  document.querySelector("#City").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#Precipitation").innerHTML = response.data.name;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML = response.data.weather.main;

  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let ApiKey = "d41959f4e39709a61cab47f6141bbe79";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;
  axios.get(ApiUrl).then(getWeather);
}

function searchLocation(position) {
  let ApiKeyposition = "d41959f4e39709a61cab47f6141bbe79";
  let latitude = position.coord.latitude;
  let longitude = position.coord.longitude;
  let ApiUrlposition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&units=metric&appid=${ApiKeyposition}`;
  axios.get(ApiUrlposition).then(getWeather);
}

function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#InputField").value;
  searchCity(city);
}

let fieldsearch = document.querySelector("#form");
fieldsearch.addEventListener("search", handlesubmit);
let fieldclick = document.querySelector("#form");
fieldclick.addEventListener("click", handlesubmit);

function getcurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentlocation = document.querySelector("#Currentlocation");
currentlocation.addEventListener("submit", getcurrentlocation);

let celsiusTemperature = null;

function ShowFahrenheit(event) {
  event.preventDefault();
  let TemperatureElement = document.querySelector("#temperature");
  let FahrenheitTemperature = (celsiusTemperature.innerHTML * 9) / 5 + 32;
  TemperatureElement = Math.round(FahrenheitTemperature);
}

let Fahrenheit = document.querySelector("#Fahrenheit");
Fahrenheit.addEventListener("click", ShowFahrenheit);

searchCity("Freiburg");
