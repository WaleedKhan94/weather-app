const apikey = "1553d4181ad0f0c5f0aa5c96dc544dae";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");

async function checkweather(city) {
  const responce = await fetch(apiUrl + city + `&appid=${apikey}`);

  if (responce.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await responce.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " Km/h";

    if (data.weather[0].main == "Clear") {
      weathericon.src = "images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      weathericon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weathericon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "images/mist.png";
    } else if (data.weather[0].main == "Snow") {
      weathericon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});

checkweather();
