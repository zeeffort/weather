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

   console.log(response.data); 
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


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

refreshWeather("Lisbon");