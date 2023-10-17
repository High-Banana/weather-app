const inputValue = document.querySelector("input");
const searchButton = document.getElementById("search-button");
const countryNameElement = document.getElementById("country-name");
const cityNameElement = document.getElementById("city-name");
const weatherConditionElement = document.getElementById("current-weather");
const feelsLikeTempElement = document.getElementById("feels-like-temperature");
const secondaryTemperatureElement = document.getElementById("secondary-temperature");
const currentTemperature = document.getElementById("temperature");
const windSpeedElement = document.getElementById("wind-speed");
const uvIndexElement = document.getElementById("uv-index");
const visibilityDistanceElement = document.getElementById("visibility-distance");
const errorMessasge = document.createElement("span");

let userLocation;

async function getWeatherInfo() {
  if (!userLocation) {
    userLocation = "Bhaktapur";
  } else if (inputValue.value === "") {
    return;
  } else {
    userLocation = inputValue.value;
  }
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c60ff071c6fc43dabf591902231610&q=${userLocation}`);

  if (response.status === 400) {
    throwErrorMessage();
    return;
  } else {
    if (document.querySelector("nav").querySelector(".error-message")) {
      document.querySelector("nav").removeChild(errorMessasge);
    }
    const data = await response.json();
    displayWeatherInfo(data);
  }
}

getWeatherInfo();

function throwErrorMessage() {
  errorMessasge.textContent = "Location not found";
  errorMessasge.classList.add("error-message");
  if (!document.body.querySelector(".error-message")) {
    document.querySelector("nav").appendChild(errorMessasge);
  }
}

function displayWeatherInfo(data) {
  const countryName = data.location.country;
  const cityName = data.location.name;
  const weatherCondition = data.current.condition.text;
  const feelsLikeInCelsius = data.current.feelslike_c;
  const feelsLikeInInFahrenheit = data.current.feelslike_f;
  const tempInCelsius = data.current.temp_c;
  const tempInFahrenheit = data.current.temp_f;
  const windInKPH = data.current.wind_kph;
  const windInMPH = data.current.wind_mph;
  const uvIndex = data.current.uv;
  const visibilityDistanceKM = data.current.vis_km;
  const visibilityDistanceMiles = data.current.vis_miles;

  const tempDegreeUnit = document.createElement("span");
  tempDegreeUnit.classList.add("temperature-unit");
  tempDegreeUnit.innerHTML = "<sup>&degC</sup>";

  const secondaryTempDegreeUnit = document.createElement("span");
  secondaryTempDegreeUnit.classList.add("secondary-temperature-unit");
  secondaryTempDegreeUnit.innerHTML = "&degF";

  countryNameElement.textContent = countryName + ",";
  cityNameElement.textContent = cityName;
  weatherConditionElement.textContent = weatherCondition;
  feelsLikeTempElement.textContent = `Feels Like: ${feelsLikeInCelsius}`;
  feelsLikeTempElement.appendChild(tempDegreeUnit);
  currentTemperature.textContent = tempInCelsius;
  currentTemperature.appendChild(tempDegreeUnit.cloneNode(true));
  windSpeedElement.textContent = `Wind: ${windInKPH} KPH`;
  secondaryTemperatureElement.textContent = tempInFahrenheit;
  secondaryTemperatureElement.appendChild(secondaryTempDegreeUnit);
  uvIndexElement.textContent = `UV Index: ${uvIndex}`;
  visibilityDistanceElement.textContent = `Visibility Distance: ${visibilityDistanceKM} KM`;
  inputValue.value = "";

  if (weatherCondition.toLowerCase().includes("clear") || weatherCondition.toLowerCase().includes("sunny")) {
    document.body.style.backgroundImage = "url('./images/sunny.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("cloudy")) {
    document.body.style.backgroundImage = "url('./images/cloud.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("thunder")) {
    document.body.style.backgroundImage = "url('./images/thunder.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("rain")) {
    document.body.style.backgroundImage = "url('./images/rain.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("mist")) {
    document.body.style.backgroundImage = "url('./images/mist.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("snow")) {
    document.body.style.backgroundImage = "url('./images/snow.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("drizzle")) {
    document.body.style.backgroundImage = "url('./images/drizzle.jpeg')";
  } else if (weatherCondition.toLowerCase().includes("overcast")) {
    document.body.style.backgroundImage = "url('./images/overcast.jpeg')";
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherInfo();
  }
});

searchButton.addEventListener("click", getWeatherInfo);
