const apikey = "1553d4181ad0f0c5f0aa5c96dc544dae";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-icon");
const currenthour = new Date().getHours();

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
    console.log(data);

    const weatherCondition = data.weather[0].main;
    const isDaytime = currenthour >= 6 && currenthour < 18;

    if (weatherCondition == "Clear") {
      weathericon.src = isDaytime ? "images/clear.png" : "images/moon.png";
    } else if (weatherCondition == "Clouds") {
      weathericon.src = isDaytime
        ? "images/clouds.png"
        : "images/cloudy-night.png";
    } else if (weatherCondition == "Rain") {
      weathericon.src = "images/rain.png";
    } else if (weatherCondition == "Drizzle") {
      weathericon.src = isDaytime
        ? "images/drizzle.png"
        : "images/night-drizzle.png";
    } else if (weatherCondition == "Mist") {
      weathericon.src = "images/mist.png";
    } else if (weatherCondition == "Snow") {
      weathericon.src = "images/snow.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchbtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});

searchbox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkweather(searchbox.value);
  }
});

checkweather();
