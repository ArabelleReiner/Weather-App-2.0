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

//Current Weather
celsiusTemperature = response.data.main.temp;

function getWeather(response) {
  document.querySelector("#City").innerHTML = response.data.name;
  document.querySelector("#Today").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  //document.querySelector("#Precipitation").innerHTML = response.data.name;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#Description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let ApiKey = "d41959f4e39709a61cab47f6141bbe79";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;
  axios.get(ApiUrl).then(getWeather);
}

function handlesubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#InputField").value;
  searchCity(city.value);
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
let currentlocation = document.querySelector("#Current");
currentlocation.addEventListener("submit", getcurrentlocation);

function getcurrentlocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

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

let Celsius = document.querySelector("#Celsius");
Celsius.addEventListener("click", ShowCelsius);

let Fahrenheit = document.querySelector("#Fahrenheit");
Fahrenheit.addEventListener("click", ShowFahrenheit);

searchCity("New York");

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML='<div class="row">';
  days.forEach(day){
    forecastHTML= forecastHTML + `
    <div class="weather-forecast">${day}</div>
          <h3>Weather of the next few days</h3>
          <div class="col-2 Rahmen">
            <div>Tomorrow</div>
            <div>☁</div>
            <span>21°C</span>
            <span>|</span>
            <span>21°C</span>
            <div>sunny</div>
          </div>
          </div>
        </div>`;

  forecastHTML= forecastHTML + `</div>`
  forecastElement.innerHTML=forcastHTML;

}
}
displayForecast()