//Display the current date and time
function formatDate(now) {
  let date = now.getDate();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thurday",
    "Friday",
    "Saturday",
  ];
  let index = now.getDay();
  let day = days[index];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  return `${day} | ${month} ${date} | ${hours}:${minutes}`;
}
let now = new Date();
let weatherDate = document.querySelector(".date");
weatherDate.innerHTML = formatDate(now);

//Search engine - displays the city name on the page after the user submits the form
// + API - displays actual weather for this city
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = searchInput.value;

    let apiKey = "b39fd544fbfd289a17b0d205d5515953";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(changeCityWeather);
  } else {
    h1.innerHTML = "Odessa";
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function changeCityWeather(response) {
  // document.querySelector("h1").innerHTML = response.data.name; // выведет в h1 город с большой буквы

  let currTemp = document.querySelector("#curr-temp");
  let temperature = Math.round(response.data.main.temp);
  /* либо то же самое, но без переменных:
  document.querySelector("#curr-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  */
  /*if (temperature > 0) {
    temperature = `+${temperature}`;    // можно добавить плюс
  }*/
  currTemp.innerHTML = temperature;

  let currWind = document.querySelector("#curr-wind");
  let wind = Math.round(response.data.wind.speed);
  currWind.innerHTML = wind;

  let currHum = document.querySelector("#curr-hum");
  let Humidity = Math.round(response.data.main.humidity);
  currHum.innerHTML = Humidity;
}

//Bonus point:
//Add a Current Location button to get your GPS coordinates
//and display the city and current temperature using the OpenWeather API.
function yourPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b39fd544fbfd289a17b0d205d5515953";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(changeWeather);
}
//navigator.geolocation.getCurrentPosition(yourPosition);

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(yourPosition);
}

let btnLocation = document.querySelector("#position");
btnLocation.addEventListener("click", getLocation);

function changeWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  let currTemp = document.querySelector("#curr-temp");
  let temperature = Math.round(response.data.main.temp);
  /*if (temperature > 0) {
    temperature = `+${temperature}`;
  }*/
  currTemp.innerHTML = temperature;

  let currWind = document.querySelector("#curr-wind");
  let wind = Math.round(response.data.wind.speed);
  currWind.innerHTML = wind;

  let currHum = document.querySelector("#curr-hum");
  let Humidity = Math.round(response.data.main.humidity);
  currHum.innerHTML = Humidity;
}

/* LATER Non fake...
//Bonus Feature
//Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.
//changeUnits
function changeFahrenheit(event) {
  event.preventDefault();
  let degrees = document.querySelector(".temp");
  degrees.innerHTML = `Day ${Math.round((9 * 9) / 5 + 32)} / Night ${Math.round(
    (2 * 9) / 5 + 32
  )}`;
  //fahrenheitLink.innerHTML = "<strong>°F</strong>";
}
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", changeFahrenheit);

function changeCelcius(event) {
  event.preventDefault();
  let degrees = document.querySelector(".temp");
  degrees.innerHTML = `Day ${Math.round((48 - 32) / 1.8)} / Night ${Math.round(
    (36 - 32) / 1.8
  )}`;
}
let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", changeCelcius);
*/
