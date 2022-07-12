//current time
let now = new Date();

let currentTime = document.querySelector("#current-time");

let date = now.getDate();
let year = now.getFullYear();

let hours = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${minutes}`;
}

if (hours < 10) {
  hours = `0${hours}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentTime.innerHTML = `${hours}:${minutes} ${day} ${month} ${date}, ${year}`;

// C to F
function toF() {
  convertToF.style.fontSize = "30px";
  convertToF.style.color = "#ff9f1c";

  convertToC.style.fontSize = "18px";
  convertToC.style.color = "#0D6DFD";

  function toFLoop(loopElement) {
    loopElement.innerHTML = `${Math.round(
      `${loopElement.innerHTML.replace(/[^0-9]/g, "") * 1.8 + 32}`
    )}°`;
  }

  let C = document.querySelectorAll(".temp-convert");
  C.forEach(toFLoop);
  // console.log(C[0].innerHTML);

  // C[0].innerHTML = `${C[0].innerHTML.replace(/[^0-9]/g, "") * 1.8 + 32}°`;
  // C[1].innerHTML = `${C[1].innerHTML.replace(/[^0-9]/g, "") * 1.8 + 32}°`;
  // C[2].innerHTML = `${C[2].innerHTML.replace(/[^0-9]/g, "") * 1.8 + 32}°`;
}

let convertToF = document.querySelector("#convert-to-F");
convertToF.addEventListener("click", toF);

//F to C
function toC() {
  convertToC.style.fontSize = "30px";
  convertToC.style.color = "#ff9f1c";

  convertToF.style.fontSize = "18px";
  convertToF.style.color = "#0B59CA";

  function toCLoop(loopElement) {
    loopElement.innerHTML = `${Math.round(
      (loopElement.innerHTML.replace(/[^0-9]/g, "") - 32) / 1.8
    )}°`;
  }

  let F = document.querySelectorAll(".temp-convert");
  F.forEach(toCLoop);
}

let convertToC = document.querySelector("#convert-to-C");
convertToC.addEventListener("click", toC);

//display current city temp
function showCurrentTemp(event) {
  event.preventDefault();

  function showWeather(response) {
    let currentTemp = document.querySelector("#current-temp");
    let currentTempMin = document.querySelector("#current-temp-min");
    let currentTempMax = document.querySelector("#current-temp-max");

    let currentTempResponse = Math.round(response.data.main.temp);
    let currentTempMinResponse = Math.round(response.data.main.temp_min);
    let currentTempMaxResponse = Math.round(response.data.main.temp_max);

    currentTemp.innerHTML = `${currentTempResponse}°`;
    currentTempMin.innerHTML = `${currentTempMinResponse}°`;
    currentTempMax.innerHTML = `${currentTempMaxResponse}°`;

    let currentLocation = document.querySelector("#current-city");
    currentLocation.innerHTML = `${response.data.name}`;

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = `${response.data.weather[0].description}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;

    let timestamp = response.data.sys.sunrise;
    let date = new Date(timestamp * 1000);

    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = `${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;

    let timestamp2 = response.data.sys.sunset;
    let date2 = new Date(timestamp2 * 1000);

    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = `${("0" + date2.getHours()).slice(-2)}:${(
      "0" + date2.getMinutes()
    ).slice(-2)}`;

    console.log(response.data);
  }

  function showForecast(response) {
    console.log(response.data);

    let firstMin = document.querySelector("#first-min");
    let firstMax = document.querySelector("#first-max");
    let secondMin = document.querySelector("#second-min");
    let secondMax = document.querySelector("#second-max");
    let thirdMin = document.querySelector("#third-min");
    let thirdMax = document.querySelector("#third-max");
    let fourthMin = document.querySelector("#fourth-min");
    let fourthMax = document.querySelector("#fourth-max");
    let fifthMin = document.querySelector("#fifth-min");
    let fifthMax = document.querySelector("#fifth-max");

    firstMin.innerHTML = `${Math.round(response.data.daily[1].temp.min)}°`;
    firstMax.innerHTML = `${Math.round(response.data.daily[1].temp.max)}°`;
    secondMin.innerHTML = `${Math.round(response.data.daily[2].temp.min)}°`;
    secondMax.innerHTML = `${Math.round(response.data.daily[2].temp.max)}°`;
    thirdMin.innerHTML = `${Math.round(response.data.daily[3].temp.min)}°`;
    thirdMax.innerHTML = `${Math.round(response.data.daily[3].temp.max)}°`;
    fourthMin.innerHTML = `${Math.round(response.data.daily[4].temp.min)}°`;
    fourthMax.innerHTML = `${Math.round(response.data.daily[4].temp.max)}°`;
    fifthMin.innerHTML = `${Math.round(response.data.daily[5].temp.min)}°`;
    fifthMax.innerHTML = `${Math.round(response.data.daily[5].temp.max)}°`;
  }

  function retrievePosition(position) {
    let apiKey = "3429d234020f7a7bf6be603b3db0217b";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);

    let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;
    axios.get(url2).then(showForecast);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let callCurrentCity = document.querySelector("#call-current-city");
callCurrentCity.addEventListener("click", showCurrentTemp);

//search engine city name + display input city temp
function showInputTemp(event) {
  event.preventDefault();

  function showWeather(response) {
    let currentTemp = document.querySelector("#current-temp");
    let currentTempMin = document.querySelector("#current-temp-min");
    let currentTempMax = document.querySelector("#current-temp-max");

    let currentTempResponse = Math.round(response.data.main.temp);
    let currentTempMinResponse = Math.round(response.data.main.temp_min);
    let currentTempMaxResponse = Math.round(response.data.main.temp_max);

    currentTemp.innerHTML = `${currentTempResponse}°`;
    currentTempMin.innerHTML = `${currentTempMinResponse}°`;
    currentTempMax.innerHTML = `${currentTempMaxResponse}°`;

    let currentLocation = document.querySelector("#current-city");
    currentLocation.innerHTML = `${response.data.name}`;

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = `${response.data.weather[0].description}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}`;

    let timestamp = response.data.sys.sunrise;
    let date = new Date(timestamp * 1000);

    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = `${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;

    let timestamp2 = response.data.sys.sunset;
    let date2 = new Date(timestamp2 * 1000);

    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = `${("0" + date2.getHours()).slice(-2)}:${(
      "0" + date2.getMinutes()
    ).slice(-2)}`;

    //console.log(response.data);
  }

  function showForecast(response) {
    console.log(response.data);

    let firstMin = document.querySelector("#first-min");
    let firstMax = document.querySelector("#first-max");
    let secondMin = document.querySelector("#second-min");
    let secondMax = document.querySelector("#second-max");
    let thirdMin = document.querySelector("#third-min");
    let thirdMax = document.querySelector("#third-max");
    let fourthMin = document.querySelector("#fourth-min");
    let fourthMax = document.querySelector("#fourth-max");
    let fifthMin = document.querySelector("#fifth-min");
    let fifthMax = document.querySelector("#fifth-max");

    firstMin.innerHTML = `${Math.round(response.data.list[1].main.temp_min)}°`;
    firstMax.innerHTML = `${Math.round(response.data.list[1].main.temp_max)}°`;
    secondMin.innerHTML = `${Math.round(response.data.list[2].main.temp_min)}°`;
    secondMax.innerHTML = `${Math.round(response.data.list[2].main.temp_max)}°`;
    thirdMin.innerHTML = `${Math.round(response.data.list[3].main.temp_min)}°`;
    thirdMax.innerHTML = `${Math.round(response.data.list[3].main.temp_max)}°`;
    fourthMin.innerHTML = `${Math.round(response.data.list[4].main.temp_min)}°`;
    fourthMax.innerHTML = `${Math.round(response.data.list[4].main.temp_max)}°`;
    fifthMin.innerHTML = `${Math.round(response.data.list[5].main.temp_min)}°`;
    fifthMax.innerHTML = `${Math.round(response.data.list[5].main.temp_max)}°`;
  }

  let changeCityInput = document.querySelector("#change-city-input");
  let inputValue = changeCityInput.value;

  inputValue = inputValue.trim();
  inputValue = inputValue.toLowerCase();
  //stolen(make multiple spaces one)
  inputValue = inputValue.replace(/\s\s+/g, " ");

  let apiKey = "3429d234020f7a7bf6be603b3db0217b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(url2).then(showForecast);
}

let callInputCity = document.querySelector("#call-input-city");
callInputCity.addEventListener("click", showInputTemp);
