let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let currentDate = new Date();
let dateDisplay = document.querySelector("#day-time-display");
dateDisplay.innerHTML = formatDate(currentDate);

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentWeekDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentWeekDay} ${currentHour}:${currentMinute}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchedCity = searchInput.value;
  let heading = document.querySelector("#city");
  let apiKey = "19a7287a43046ce253c65a1908dfe8b1";
  let city = searchedCity;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  heading.innerHTML = `${searchedCity}`;
  function getWeekForecast(coordinates) {
    let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/onecall?";
    let apiUrl = `${apiEndpoint}lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeekForecast);
  }
  function displayWeekForecast(response) {
    let weekForecastElement = document.querySelector("#week-forecast");
    let weekForecastHTML = `<div class="row">`;
    let forecast = response.data.daily;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        weekForecastHTML =
          weekForecastHTML +
          `
        <div class="col-2">
          <div class="week-forecast-day">${formatForecastDay(
            forecastDay.dt
          )}</div>
            <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="40"
                height="40"
                style="width: 40px; height: 40px"
                alt=""
                id="fri-forecast"
            />
          <div class="week-forecast-temperature">
                <span class="min-week-forecast-temperature">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
                <span class="max-week-forecast-temperature">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
          </div>
      
      `;
        weekForecastHTML = weekForecastHTML + `</div>`;
        weekForecastElement.innerHTML = weekForecastHTML;
      }
    });
  }
  function showTemperature(response) {
    celsiusTemperature = response.data.main.temp;
    let city = response.data.name;
    let temperatureHeading = document.querySelector("#city");
    let temp = Math.round(celsiusTemperature);
    let temperatureDisplay = document.querySelector("#current-temperature");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    temperatureDisplay.innerHTML = temp;
    temperatureHeading.innerHTML = city;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    getWeekForecast(response.data.coord);
  }
  axios.get(apiUrl).then(showTemperature);
}
