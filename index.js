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

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#City");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#Humidity");
  let windElement = document.querySelector("#Wind");
  let dateElement = document.querySelector("#Date");
  let iconElement = document.querySelector("#Icon");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png"
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

//show city
//function getWeather(response) {
//document.querySelector("#City").innerHTML = response.data.name;
//document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
//document.querySelector("#Precipitation").innerHTML = response.data.name;
//document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
//document.querySelector("#Wind").innerHTML = Math.round(response.data.wind.speed);
//document.querySelector("#description").innerHTML = response.data.weather.main;
//}
celsiusTemperature = response.data.main.temp;

function searchCity(city) {
  let ApiKey = "d41959f4e39709a61cab47f6141bbe79";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;
  axios.get(ApiUrl).then(getWeather);
}

function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#InputField").value;
  searchCity(city);
}

function searchLocation(position) {
  let ApiKeyposition = "d41959f4e39709a61cab47f6141bbe79";
  let latitude = position.coord.latitude;
  let longitude = position.coord.longitude;
  let ApiUrlposition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&units=metric&appid=${ApiKeyposition}`;
  axios.get(ApiUrlposition).then(getWeather);
}

let fieldsearch = document.querySelector("#form");
fieldsearch.addEventListener("search", handlesubmit);
let fieldclick = document.querySelector("#form");
fieldclick.addEventListener("click", handlesubmit);

function getcurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentlocation = document.querySelector("#Current-location");
currentlocation.addEventListener("submit", getcurrentlocation);

function ShowFahrenheit(event) {
  event.preventDefault();
  let TemperatureElement = document.querySelector("#temperature");

  Celsius.classList.remove("active");
  Fahrenheit.classList.add("active");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  FahrenheitTemperature.innerHTML = Math.round(FahrenheitTemperature);
}

function ShowCelsius(event) {
  event.preventDefault();
  Celsius.classList.add("active");
  Fahrenheit.classList.remove("active");
  let TemperatureElement = document.querySelector("#temperature");
  TemperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let Celisius = document.querySelector("#Celsius");
Celsius.addEventListener("click", ShowCelsius);

let Fahrenheit = document.querySelector("#Fahrenheit");
Fahrenheit.addEventListener("click", ShowFahrenheit);

searchCity("New York");
