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
    celsiusTemperature = response.data.main.temp;
    let city = response.data.name;
    let temperatureHeading = document.querySelector("#city");
    temperatureHeading.innerHTML = city;
    let temp = Math.round(celsiusTemperature);
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

// Feature activate current location button

function showTemperature(response) {
  let city = response.data.name;
  let temperatureHeading = document.querySelector("#current-temperature");
  let temp = Math.round(response.data.main.temp);
  let currentLocation = document.querySelector("#city");
  currentLocation.innerHTML = city;
  temperatureHeading.innerHTML = temp;
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

// Feature convert temperature

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let celsiusTemperature = null;

function displayCelsiusTemperature(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
function displayFahrenheitTemperature(event) {
  event.preventDefault;
  let temperatureElement = document.querySelector("#current-temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
