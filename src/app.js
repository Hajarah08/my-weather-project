function formatDate(timestamp){
let now = new Date(timestamp);
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let date = now.getDate();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
return `${day}, ${hours}: ${minutes}` ;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}
function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast"); 

  let forecastHTML =`<div class = "row">`;
  
  forecast.forEach(function(forecastDay, index) {
    if (index < 5) {

    forecastHTML =
      forecastHTML +
      `
        <div class="col">
          ${formatDay(forecastDay.dt)}
          <br/>
          <img  src = "http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt = "" width = "42" />
          <div class = "forecast-temperatures">
          <span class = "forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
          <span class = "forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
           </div>
        </div> `;
    }

  });
  

forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "765f905a5ff48de4791afc288658166a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeatherCondition(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  celsiusTemperature = response.data.main.temp ;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
    document.querySelector(".date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    getForecast(response.data.coord);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function searchCity(city) {
  let apiKey = "765f905a5ff48de4791afc288658166a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherCondition);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", handleSubmit);



function showFahrenheitTemperature(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature)
}
function showCelsiusTemperature(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);


searchCity("Lagos");
