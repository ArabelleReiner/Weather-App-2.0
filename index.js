//currentDate
function formatDate(timestamp) {
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
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}, ${currentHour}:${currentMinutes}`;
}
Today.innerHTML = formatDate(new Date());

//Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forcastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="weather-forecast">${formatDay(forecastDay.dt)}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}</span>
            <span>|</span>
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}</span>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forcastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d41959f4e39709a61cab47f6141bbe79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

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
  let iconElement = document.querySelector("#Icon");
  iconElement.innerHTML = iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

//Search City
function searchCity(city) {
  let ApiKey = "d41959f4e39709a61cab47f6141bbe79";
  let ApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
  axios.get(ApiUrl).then(getWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#InputField");
  searchCity(city);
}

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);
let fieldsearch = document.querySelector("#form");
fieldsearch.addEventListener("search", handleSubmit);
let fieldclick = document.querySelector("#form");
fieldclick.addEventListener("click", handleSubmit);

searchCity("New York");

//Search current location
//function searchLocation(position) {
//  let ApiKeyposition = "d41959f4e39709a61cab47f6141bbe79";
//  let latitude = position.coord.latitude;
//  let longitude = position.coord.longitude;
//  let ApiUrlposition = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&long=${longitude}&units=metric&appid=${ApiKeyposition}`;
//  axios.get(ApiUrlposition).then(getWeather);
//}

//let fieldsearch = document.querySelector("#form");
//fieldsearch.addEventListener("search", handlesubmit);
//let fieldclick = document.querySelector("#form");
//fieldclick.addEventListener("click", handlesubmit);

//let currentlocation = document.querySelector("#Current");
//currentlocation.addEventListener("submit", getcurrentlocation);

//function getcurrentlocation(event) {
// event.preventDefault();
//  navigator.geolocation.getCurrentPosition(searchLocation);
//}

//Show Fahrenheit or Celsius

//function ShowFahrenheit(event) {
//event.preventDefault();
//let celsiusTemperature = response.data.main.temp;
//let TemperatureElement = document.querySelector("#temperature");
//Celsius.classList.remove("active");
//Fahrenheit.classList.add("active");
//let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
//TemperatureElement.innerHTML = Math.round(FahrenheitTemperature);
//}

//function ShowCelsius(event) {
//event.preventDefault();
//let celsiusTemperature = response.data.main.temp;
//Celsius.classList.add("active");
//Fahrenheit.classList.remove("active");
//let TemperatureElement = document.querySelector("#temperature");
//TemperatureElement.innerHTML = Math.round(celsiusTemperature);
//}

//let celsiusTemperature = null;

//let form = document.querySelector("#form");
//form.addEventListener("submit", handlesubmit);

//let Celsius = document.querySelector("#Celsius");
//Celsius.addEventListener("click", ShowCelsius);

//let Fahrenheit = document.querySelector("#Fahrenheit");
//Fahrenheit.addEventListener("click", ShowFahrenheit);
