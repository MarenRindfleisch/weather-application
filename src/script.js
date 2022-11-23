// Feature show actual current date
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
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentWeekDay} ${currentHour}:${currentMinute}`;
}

let currentDate = new Date();
let dateDisplay = document.querySelector("#day-time-display");
dateDisplay.innerHTML = formatDate(currentDate);

// Feature search City and replace in display
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  let searchedCity = searchInput.value;

  let heading = document.querySelector("#city");
  heading.innerHTML = `${searchedCity}`;

  // Feature change temperature according to search city result
  function showTemperature(response) {
    let city = response.data.name;
    let temperatureHeading = document.querySelector("#city");
    temperatureHeading.innerHTML = city;
    let temp = Math.round(response.data.main.temp);
    let temperatureDisplay = document.querySelector("#current-temperature");
    temperatureDisplay.innerHTML = temp;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = Math.round(response.data.wind.speed);

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  }

  let apiKey = "19a7287a43046ce253c65a1908dfe8b1";
  let city = searchedCity;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// Feature convert temperature
function convertTemperature(event) {
  let celsiusDisplay = document.querySelector("#current-temperature");
  let tempInteger = celsiusDisplay.innerHTML;
  tempInteger = Number(tempInteger);
  let fahrenheit = Math.round((tempInteger * 9) / 5 + 32);
  celsiusDisplay.innerHTML = `${fahrenheit}`;
}

let FahrenheitTemperature = document.querySelector("#fahrenheit");
FahrenheitTemperature.addEventListener("click", convertTemperature);

function convertTemperatureBack(event) {
  let fahrenheitDisplay = document.querySelector("#current-temperature");
  let tempFloat = fahrenheitDisplay.innerHTML;
  tempFloat = Number(tempFloat);
  let celsius = Math.round(((tempFloat - 32) * 5) / 9);

  fahrenheitDisplay.innerHTML = `${celsius}`;
}
let CelsiusTemperature = document.querySelector("#celsius");
CelsiusTemperature.addEventListener("click", convertTemperatureBack);

// Feature activate current location button

function showTemperature(response) {
  let city = response.data.name;
  let temperatureHeading = document.querySelector("#current-temperature");
  let temp = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = city;
  temperatureHeading.innerHTML = temp;
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "19a7287a43046ce253c65a1908dfe8b1";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let units = "metric";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);
