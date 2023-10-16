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
let userLocation;

async function getWeatherInfo() {
  if (!userLocation) {
    userLocation = "Bhaktapur";
  } else {
    userLocation = inputValue.value;
  }
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=c60ff071c6fc43dabf591902231610&q=${userLocation}`);
  const data = await response.json();
  console.log(data);
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
  console.log(
    countryName,
    cityName,
    weatherCondition,
    feelsLikeInCelsius,
    feelsLikeInInFahrenheit,
    tempInCelsius,
    tempInFahrenheit,
    windInKPH,
    windInMPH,
    uvIndex
  );
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
}

getWeatherInfo();

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherInfo();
  }
});

searchButton.addEventListener("click", getWeatherInfo);
