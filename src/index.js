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

  document.getElementById("convert-to-F").style.pointerEvents = "none";
  document.getElementById("convert-to-C").style.pointerEvents = "auto";

  
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

  document.getElementById("convert-to-C").style.pointerEvents = "none";
  document.getElementById("convert-to-F").style.pointerEvents = "auto";
}


let convertToC = document.querySelector("#convert-to-C");
convertToC.addEventListener("click", toC);

//display current city temp
function showCurrentCity(event) {
  event.preventDefault();

  function showWeather(response) {

    //console.log(response.data);

    //display current temp & weather

    let currentTemp = document.querySelector("#current-temp");
    let currentTempMin = document.querySelector("#current-temp-min");
    let currentTempMax = document.querySelector("#current-temp-max");

    let currentTempResponse = Math.round(response.data.current.temp);
    let currentTempMinResponse = Math.round(response.data.daily[0].temp.min);
    let currentTempMaxResponse = Math.round(response.data.daily[0].temp.max);

    currentTemp.innerHTML = `${currentTempResponse}°`;
    currentTempMin.innerHTML = `${currentTempMinResponse}°`;
    currentTempMax.innerHTML = `${currentTempMaxResponse}°`;

    let weatherDescription = document.querySelector("#description");
    weatherDescription.innerHTML = `${response.data.current.weather[0].description}`;

    let weatherMain = document.querySelector("#main");
    weatherMain.innerHTML = `${response.data.daily[0].weather[0].description}`;

    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(`${response.data.daily[0].wind_speed}` * 2.24);

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.daily[0].humidity}`;

    let timestamp = response.data.current.sunrise;
    let date = new Date(timestamp * 1000);

    let sunrise = document.querySelector("#sunrise");
    sunrise.innerHTML = `${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;

    let timestamp2 = response.data.current.sunset;
    let date2 = new Date(timestamp2 * 1000);

    let sunset = document.querySelector("#sunset");
    sunset.innerHTML = `${("0" + date2.getHours()).slice(-2)}:${(
      "0" + date2.getMinutes()
    ).slice(-2)}`;

    let rainProb = document.querySelector("#chance");
    rainProb.innerHTML = `${response.data.daily[0].pop}` * 100;

    function round(num) {
      var m = Number((Math.abs(num) * 100).toPrecision(15));
      return Math.round(m) / 100 * Math.sign(num);
    }

    let precipitation = document.querySelector("#precipitation");
    precipitation.innerHTML = round(`${response.data.daily[0].rain}` / 25.4);


    //change current weather icon
    //format: images/weather/sunny.png
    let todayIcon = document.querySelector("#today");

    let src;

    if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id < 803) {
      src = "cloudy";
    } else if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id > 802) {
      src = "cloudier";
    } else if (response.data.current.weather[0].main == "Clear") {
      src = "clear";
    } else if (response.data.current.weather[0].main == "Atmosphere") {
      src = "atmosphere";
    } else if (response.data.current.weather[0].main == "Snow") {
      src = "snow";
    } else if (response.data.current.weather[0].main == "Rain") {
      src = "rain";
    } else if (response.data.current.weather[0].main == "Drizzle") {
      src= "drizzle";
    } else if (response.data.current.weather[0].main == "Thunderstorm") {
      src = "thunderstorm";
    }

    todayIcon.setAttribute('src', `images/weather/${src}.png`);
    

     //show forecast icons
     let forecastDays = ['filler', 'first', 'second', 'third', 'fourth', 'fifth'];
    
     let dailyWeather = response.data.daily;
 
     function showIcon(element) {
       //console.log(forecastDays[element]);
 
       let icon = document.querySelector(`#${forecastDays[element]}-icon`);
       let src;
 
       if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id < 803) {
         src = "cloudy";
       } else if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id > 802) {
         src = "cloudier";
       } else if (dailyWeather[element].weather[0].main == "Clear") {
         src = "clear";
       } else if (dailyWeather[element].weather[0].main == "Atmosphere") {
         src = "atmosphere";
       } else if (dailyWeather[element].weather[0].main == "Snow") {
         src = "snow";
       } else if (dailyWeather[element].weather[0].main == "Rain") {
         src = "rain";
       } else if (dailyWeather[element].weather[0].main == "Drizzle") {
         src= "drizzle";
       } else if (dailyWeather[element].weather[0].main == "Thunderstorm") {
         src = "thunderstorm";
       }
 
       icon.setAttribute('src', `images/weather/${src}.png`);
     }
 
     let fiveDays = [1, 2, 3, 4, 5];
     fiveDays.forEach(showIcon); 

    //show forecast description
    let firstDescrption = document.querySelector("#first-description");
    let secondDescrption = document.querySelector("#second-description");
    let thirdDescrption = document.querySelector("#third-description");
    let fourthDescrption = document.querySelector("#fourth-description");
    let fifthDescrption = document.querySelector("#fifth-description");

    firstDescrption.innerHTML = `${response.data.daily[1].weather[0].description}`;
    secondDescrption.innerHTML = `${response.data.daily[2].weather[0].description}`;
    thirdDescrption.innerHTML = `${response.data.daily[3].weather[0].description}`;
    fourthDescrption.innerHTML = `${response.data.daily[4].weather[0].description}`;
    fifthDescrption.innerHTML = `${response.data.daily[5].weather[0].description}`;

    //show forecast temp
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

    //show forecast dates

    function formatDate(timestamp) {

      let now = new Date(timestamp);
      let date = now.getDate();
  
  
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
  
      return `${day}, ${month} ${date}`;
    }

    let firstDate = document.querySelector("#first-date");
    firstDate.innerHTML = formatDate(response.data.daily[1].dt * 1000);

    let secondDate = document.querySelector("#second-date");
    secondDate.innerHTML = formatDate(response.data.daily[2].dt * 1000);

    let thirdDate = document.querySelector("#third-date");
    thirdDate.innerHTML = formatDate(response.data.daily[3].dt * 1000);

    let fourthDate = document.querySelector("#fourth-date");
    fourthDate.innerHTML = formatDate(response.data.daily[4].dt * 1000);

    let fifthDate = document.querySelector("#fifth-date");
    fifthDate.innerHTML = formatDate(response.data.daily[5].dt * 1000);
  }


  function showLocation(response) {
    let currentLocation = document.querySelector("#current-city");
    currentLocation.innerHTML = `${response.data.name}`;
  }
    

  function retrievePosition(position) {
    let apiKey = "3429d234020f7a7bf6be603b3db0217b";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
 

    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);

   // let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;
    //axios.get(url2).then(showForecast);

    let url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(url3).then(showLocation);

  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let callCurrentCity = document.querySelector("#call-current-city");
callCurrentCity.addEventListener("click", showCurrentCity);





//search engine city name + display input city temp
function showInputTemp(event) {

  event.preventDefault();

  /*function formatDate(timestamp) {

    let now = new Date(timestamp);
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

    return `${hours}:${minutes} ${day} ${month} ${date}, ${year}`;
  }*/

  function showLocation(response) {

    //show input city date & time
    //let currentTime = document.querySelector("#current-time");
    //currentTime.innerHTML = formatDate(response.data.dt * 1000);

    let currentLocation = document.querySelector("#current-city");
    currentLocation.innerHTML = `${response.data.name}`;

    function showWeather(response) {

      //show today weather

      let currentTemp = document.querySelector("#current-temp");
      let currentTempMin = document.querySelector("#current-temp-min");
      let currentTempMax = document.querySelector("#current-temp-max");

      let currentTempResponse = Math.round(response.data.current.temp);
      let currentTempMinResponse = Math.round(response.data.daily[0].temp.min);
      let currentTempMaxResponse = Math.round(response.data.daily[0].temp.max);

      currentTemp.innerHTML = `${currentTempResponse}°`;
      currentTempMin.innerHTML = `${currentTempMinResponse}°`;
      currentTempMax.innerHTML = `${currentTempMaxResponse}°`;

      let weatherDescription = document.querySelector("#description");
      weatherDescription.innerHTML = `${response.data.current.weather[0].description}`;

      let weatherMain = document.querySelector("#main");
      weatherMain.innerHTML = `${response.data.daily[0].weather[0].description}`;

      let wind = document.querySelector("#wind");
      wind.innerHTML = Math.round(`${response.data.daily[0].wind_speed}` * 2.24);

      let humidity = document.querySelector("#humidity");
      humidity.innerHTML = `${response.data.daily[0].humidity}`;

      let timestamp = response.data.current.sunrise;
      let date = new Date(timestamp * 1000);

      let sunrise = document.querySelector("#sunrise");
      sunrise.innerHTML = `${("0" + date.getHours()).slice(-2)}:${(
        "0" + date.getMinutes()
      ).slice(-2)}`;

      let timestamp2 = response.data.current.sunset;
      let date2 = new Date(timestamp2 * 1000);

      let sunset = document.querySelector("#sunset");
      sunset.innerHTML = `${("0" + date2.getHours()).slice(-2)}:${(
        "0" + date2.getMinutes()
      ).slice(-2)}`;


      let todayIcon = document.querySelector("#today");

      let src;

      if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id < 803) {
        src = "cloudy";
      } else if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id > 802) {
        src = "cloudier";
      } else if (response.data.current.weather[0].main == "Clear") {
        src = "clear";
      } else if (response.data.current.weather[0].main == "Atmosphere") {
        src = "atmosphere";
      } else if (response.data.current.weather[0].main == "Snow") {
        src = "snow";
      } else if (response.data.current.weather[0].main == "Rain") {
        src = "rain";
      } else if (response.data.current.weather[0].main == "Drizzle") {
        src= "drizzle";
      } else if (response.data.current.weather[0].main == "Thunderstorm") {
        src = "thunderstorm";
      }

      todayIcon.setAttribute('src', `images/weather/${src}.png`);


      //show forecast

      //show forecast icons

     let forecastDays = ['filler', 'first', 'second', 'third', 'fourth', 'fifth'];
    
     let dailyWeather = response.data.daily;
 
     function showIcon(element) {
       //console.log(forecastDays[element]);
 
       let icon = document.querySelector(`#${forecastDays[element]}-icon`);
       let src;
 
       if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id < 803) {
         src = "cloudy";
       } else if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id > 802) {
         src = "cloudier";
       } else if (dailyWeather[element].weather[0].main == "Clear") {
         src = "clear";
       } else if (dailyWeather[element].weather[0].main == "Atmosphere") {
         src = "atmosphere";
       } else if (dailyWeather[element].weather[0].main == "Snow") {
         src = "snow";
       } else if (dailyWeather[element].weather[0].main == "Rain") {
         src = "rain";
       } else if (dailyWeather[element].weather[0].main == "Drizzle") {
         src= "drizzle";
       } else if (dailyWeather[element].weather[0].main == "Thunderstorm") {
         src = "thunderstorm";
       }
 
       icon.setAttribute('src', `images/weather/${src}.png`);
     }
 
     let fiveDays = [1, 2, 3, 4, 5];
     fiveDays.forEach(showIcon); 

    //show forecast description
    let firstDescrption = document.querySelector("#first-description");
    let secondDescrption = document.querySelector("#second-description");
    let thirdDescrption = document.querySelector("#third-description");
    let fourthDescrption = document.querySelector("#fourth-description");
    let fifthDescrption = document.querySelector("#fifth-description");

    firstDescrption.innerHTML = `${response.data.daily[1].weather[0].description}`;
    secondDescrption.innerHTML = `${response.data.daily[2].weather[0].description}`;
    thirdDescrption.innerHTML = `${response.data.daily[3].weather[0].description}`;
    fourthDescrption.innerHTML = `${response.data.daily[4].weather[0].description}`;
    fifthDescrption.innerHTML = `${response.data.daily[5].weather[0].description}`;

    //show forecast temp
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

    //show forecast dates

    function formatDate(timestamp) {

      let now = new Date(timestamp);
      let date = now.getDate();
  
  
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
  
      return `${day}, ${month} ${date}`;
    }

    let firstDate = document.querySelector("#first-date");
    firstDate.innerHTML = formatDate(response.data.daily[1].dt * 1000);

    let secondDate = document.querySelector("#second-date");
    secondDate.innerHTML = formatDate(response.data.daily[2].dt * 1000);

    let thirdDate = document.querySelector("#third-date");
    thirdDate.innerHTML = formatDate(response.data.daily[3].dt * 1000);

    let fourthDate = document.querySelector("#fourth-date");
    fourthDate.innerHTML = formatDate(response.data.daily[4].dt * 1000);

    let fifthDate = document.querySelector("#fifth-date");
    fifthDate.innerHTML = formatDate(response.data.daily[5].dt * 1000);
      

      console.log(response.data);

    }


    let lat = response.data.coord.lat;
    let lon = response.data.coord.lon;

    let apiKey = "3429d234020f7a7bf6be603b3db0217b";

    let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
    axios.get(url).then(showWeather);

   //console.log(response.data);
  }

  let changeCityInput = document.querySelector("#change-city-input");
  let inputValue = changeCityInput.value;

  inputValue = inputValue.trim();
  inputValue = inputValue.toLowerCase();
  //stolen(make multiple spaces one)
  inputValue = inputValue.replace(/\s\s+/g, " ");


  let apiKey = "3429d234020f7a7bf6be603b3db0217b";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocation);
 
}


let callInputCity = document.querySelector("#call-input-city");
callInputCity.addEventListener("click", showInputTemp);

let callHiddenInputCity = document.querySelector("#call-input-city-hidden");
callHiddenInputCity.addEventListener("click", showInputTemp);



//default nyc weather



function showWeather(response) {

  //console.log(response.data);

  //display current temp & weather

  let currentTemp = document.querySelector("#current-temp");
  let currentTempMin = document.querySelector("#current-temp-min");
  let currentTempMax = document.querySelector("#current-temp-max");

  let currentTempResponse = Math.round(response.data.current.temp);
  let currentTempMinResponse = Math.round(response.data.daily[0].temp.min);
  let currentTempMaxResponse = Math.round(response.data.daily[0].temp.max);

  currentTemp.innerHTML = `${currentTempResponse}°`;
  currentTempMin.innerHTML = `${currentTempMinResponse}°`;
  currentTempMax.innerHTML = `${currentTempMaxResponse}°`;

  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = `${response.data.current.weather[0].description}`;

  let weatherMain = document.querySelector("#main");
  weatherMain.innerHTML = `${response.data.daily[0].weather[0].description}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(`${response.data.daily[0].wind_speed}` * 2.24);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.daily[0].humidity}`;

  let timestamp = response.data.current.sunrise;
  let date = new Date(timestamp * 1000);

  let sunrise = document.querySelector("#sunrise");
  sunrise.innerHTML = `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;

  let timestamp2 = response.data.current.sunset;
  let date2 = new Date(timestamp2 * 1000);

  let sunset = document.querySelector("#sunset");
  sunset.innerHTML = `${("0" + date2.getHours()).slice(-2)}:${(
    "0" + date2.getMinutes()
  ).slice(-2)}`;

  let rainProb = document.querySelector("#chance");
  rainProb.innerHTML = `${response.data.daily[0].pop}` * 100;

  function round(num) {
    var m = Number((Math.abs(num) * 100).toPrecision(15));
    return Math.round(m) / 100 * Math.sign(num);
  }

  let precipitation = document.querySelector("#precipitation");
  precipitation.innerHTML = round(`${response.data.daily[0].rain}` / 25.4);


  //change current weather icon
  //format: images/weather/sunny.png
  let todayIcon = document.querySelector("#today");

  let src;

  if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id < 803) {
    src = "cloudy";
  } else if (response.data.current.weather[0].main == "Clouds" && response.data.current.weather[0].id > 802) {
    src = "cloudier";
  } else if (response.data.current.weather[0].main == "Clear") {
    src = "clear";
  } else if (response.data.current.weather[0].main == "Atmosphere") {
    src = "atmosphere";
  } else if (response.data.current.weather[0].main == "Snow") {
    src = "snow";
  } else if (response.data.current.weather[0].main == "Rain") {
    src = "rain";
  } else if (response.data.current.weather[0].main == "Drizzle") {
    src= "drizzle";
  } else if (response.data.current.weather[0].main == "Thunderstorm") {
    src = "thunderstorm";
  }

  todayIcon.setAttribute('src', `images/weather/${src}.png`);
  

   //show forecast icons
   let forecastDays = ['filler', 'first', 'second', 'third', 'fourth', 'fifth'];
  
   let dailyWeather = response.data.daily;

   function showIcon(element) {
     //console.log(forecastDays[element]);

     let icon = document.querySelector(`#${forecastDays[element]}-icon`);
     let src;

     if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id < 803) {
       src = "cloudy";
     } else if (dailyWeather[element].weather[0].main == "Clouds" && dailyWeather[element].weather[0].id > 802) {
       src = "cloudier";
     } else if (dailyWeather[element].weather[0].main == "Clear") {
       src = "clear";
     } else if (dailyWeather[element].weather[0].main == "Atmosphere") {
       src = "atmosphere";
     } else if (dailyWeather[element].weather[0].main == "Snow") {
       src = "snow";
     } else if (dailyWeather[element].weather[0].main == "Rain") {
       src = "rain";
     } else if (dailyWeather[element].weather[0].main == "Drizzle") {
       src= "drizzle";
     } else if (dailyWeather[element].weather[0].main == "Thunderstorm") {
       src = "thunderstorm";
     }

     icon.setAttribute('src', `images/weather/${src}.png`);
   }

   let fiveDays = [1, 2, 3, 4, 5];
   fiveDays.forEach(showIcon); 

  //show forecast description
  let firstDescrption = document.querySelector("#first-description");
  let secondDescrption = document.querySelector("#second-description");
  let thirdDescrption = document.querySelector("#third-description");
  let fourthDescrption = document.querySelector("#fourth-description");
  let fifthDescrption = document.querySelector("#fifth-description");

  firstDescrption.innerHTML = `${response.data.daily[1].weather[0].description}`;
  secondDescrption.innerHTML = `${response.data.daily[2].weather[0].description}`;
  thirdDescrption.innerHTML = `${response.data.daily[3].weather[0].description}`;
  fourthDescrption.innerHTML = `${response.data.daily[4].weather[0].description}`;
  fifthDescrption.innerHTML = `${response.data.daily[5].weather[0].description}`;

  //show forecast temp
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

  //show forecast dates

  function formatDate(timestamp) {

    let now = new Date(timestamp);
    let date = now.getDate();


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

    return `${day}, ${month} ${date}`;
  }

  let firstDate = document.querySelector("#first-date");
  firstDate.innerHTML = formatDate(response.data.daily[1].dt * 1000);

  let secondDate = document.querySelector("#second-date");
  secondDate.innerHTML = formatDate(response.data.daily[2].dt * 1000);

  let thirdDate = document.querySelector("#third-date");
  thirdDate.innerHTML = formatDate(response.data.daily[3].dt * 1000);

  let fourthDate = document.querySelector("#fourth-date");
  fourthDate.innerHTML = formatDate(response.data.daily[4].dt * 1000);

  let fifthDate = document.querySelector("#fifth-date");
  fifthDate.innerHTML = formatDate(response.data.daily[5].dt * 1000);
}


function showLocation(response) {
  let currentLocation = document.querySelector("#current-city");
  currentLocation.innerHTML = `${response.data.name}`;
}

//nyc lat + lon

let apiKey = "3429d234020f7a7bf6be603b3db0217b";
let lat = 40.776676;
let lon = -73.971321;


let url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${apiKey}&units=metric`;
axios.get(url).then(showWeather);

// let url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&&appid=${apiKey}&units=metric`;
//axios.get(url2).then(showForecast);

let url3 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(url3).then(showLocation);








