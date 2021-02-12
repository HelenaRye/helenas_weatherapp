let currentDate = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[currentDate.getDay()];
let currentHour = currentDate.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinute = currentDate.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}

let weekday = document.querySelector("#day-of-week");
weekday.innerHTML = `${currentDay},`;

let time = document.querySelector("#current-time");
time.innerHTML = `${currentHour}:${currentMinute}`;

function showCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchbox");
  let cityName = document.querySelector("h1");
  cityName.innerHTML = `<strong> ${cityInput.value} </strong>`;
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey = "5c043941096cfca1b8129a71701e2dcf";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiURL).then(showTemperature);
}

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = Math.round(response.data.main.temp);

  let temperatureElement = document.querySelector(".temperature-number");
  temperatureElement.innerHTML = `${temperature}°`;
  let localCity = document.querySelector("h1");
  localCity.innerHTML = response.data.name;
  let windspeed = Math.round(response.data.wind.speed);
  document.querySelector("#windspeed-number").innerHTML = `${windspeed} kmph`;
  let humidity = Math.round(response.data.main.humidity);
  document.querySelector("#humidity-number").innerHTML = `${humidity}%`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// Adding fahrenheit and celsius converter

function showFahrenheitTemperature (event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temperature-number");
  
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9)/5+32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}

function showCelsiusTemperature (event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureEelement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-symbol");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusTemperature = document.querySelector("#celsius-symbol");
celsiusTemperature.addEventListener("click", showCelsiusTemperature);