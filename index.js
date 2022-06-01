function formatDate(timestamp) {
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
  let currentTime = new Date(timestamp);
  let currentDate = currentTime.getDate();
  let currentDay = days[currentTime.getDay()];
  let currentMonth = months[currentTime.getMonth()];
  let currentYear = currentTime.getFullYear();
  let currentHour = currentTime.getHours();
  let currentMinutes = currentTime.getMinutes();
  if (currentMinutes < 10) {
    CurrentMinutes = `0${currentMinutes}`;
  }

  return `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}, ${currentHour}:${currentMinutes}`;
}
Today.innerHTML = formatDate(new Date());

//Current Weather

function getWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#City").innerHTML = response.data.name;
  document.querySelector("#Today").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  //document.querySelector("#Precipitation").innerHTML = response.data.name;
  document.querySelector("#Humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#Description").innerHTML =
    response.data.weather[0].description;
}

//Search City
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

//Search current location
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row>`;
  forecast.forEach(function (ForecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast">${ForecastDay.dt}}</div>
          <h3>Weather of the next few days</h3>
          <div class="col-2 Rahmen">
            <div>Tomorrow</div>
          <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
            <span>${Math.round(ForecastDay.temp.min)}</span>
            <span>|</span>
            <span>${Math.round(ForecastDay.temp.max)}</span>
            <div>sunny</div>
          </div>
          </div>
        </div>`;

      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forcastHTML;
    }
  });
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
