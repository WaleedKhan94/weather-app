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

    // Getting time from openwhether api
    const timezoneOffset = data.timezone * 1000;
    // Get current UTC time in milliseconds
    const utcTime =
      new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    // Calculate local time for the city
    const localTime = new Date(utcTime + timezoneOffset);
    const localHour = localTime.getHours();
    // console.log("Local hour in", data.name, "is:", localHour);

    const weatherCondition = data.weather[0].main;
    // const isDaytime = currenthour >= 6 && currenthour < 18;
    const isDaytime = localHour >= 6 && localHour < 18; // Daytime is between 6 AM and 6 PM

    if (weatherCondition == "Clear") {
      weathericon.src = isDaytime ? "images/clear.svg" : "images/moon.svg";
    } else if (weatherCondition == "Clouds") {
      weathericon.src = isDaytime
        ? "images/clouds.svg"
        : "images/cloudy-night.svg";
    } else if (weatherCondition == "Rain") {
      weathericon.src = "images/rain.svg";
    } else if (weatherCondition == "Drizzle") {
      weathericon.src = isDaytime
        ? "images/drizzle.png"
        : "images/night-drizzle.png";
    } else if (weatherCondition == "Mist") {
      weathericon.src = isDaytime ? "images/mist.svg" : "images/night-mist.svg";
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

// checkweather();
