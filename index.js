function getResponse(response){
   let temperatureElement = document.querySelector("#temperature-value");
   let city = document.querySelector("#current-city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity-value");
   let windElement = document.querySelector("#wind");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#icon");


   city.innerHTML = response.data.city;
   timeElement.innerHTML = formatDate(date);
   descriptionElement.innerHTML = response.data.condition.description;
   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
   windElement.innerHTML = `${response.data.wind.speed}km/h`;
   temperatureElement.innerHTML = Math.round(response.data.temperature.current);
   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-icon">`

   getForecast(response.data.city);

}
function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    let day = days[date.getDay()];

    if ( hours < 10) {
        hours = `0${hours}`
    } 

    if (minutes < 10) {
        minutes = `0${minutes}`
    }

    return `${day} ${hours}:${minutes}`

}

function refreshWeather(city) {
    //make an Api call and update UI
    let apiKey = "4d930a106obfd6d4e69t4b1accf3ecd4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(getResponse);
}
function searchCity(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
    refreshWeather(searchInput.value);
}

function formatDay (timestamp){
    let date = new Date(timestamp * 1000);
    let days = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ]

    return days[date.getDay()];

}

function getForecast(city) {
    let apiKey ="4d930a106obfd6d4e69t4b1accf3ecd4";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(displayForecast);
    console.log(apiUrl);

}
function displayForecast(response) {
    let forecastHtml = "";
    response.data.daily.forEach(function (day, index) {
    
    if (index < 5) {
    forecastHtml = 
    forecastHtml +
        `<div class="forecast-day">
        <div class="forecast-date">${formatDay(day.time)}</div>
        <div class="forecast-icon">
            <img src="${day.condition.icon_url}" />
        </div>
        <div class="forecast-temperatures">
          <div class="forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}&deg </strong>
          </div>
          <div class="forecast-temperature">
            ${Math.round(day.temperature.minimum)}&deg;
          </div>
        </div>
        </div>
        `;
    }});
    
    let forecast = document.querySelector("#forecast");
    forecast.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

refreshWeather("Harare");


