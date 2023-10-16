const inputValue = document.querySelector("input");
const searchButton = document.getElementById("search-button");
const countryNameElement = document.getElementById("country-name");
const cityNameElement = document.getElementById("city-name");
const weatherConditionElement = document.getElementById("current-weather");
const feelsLikeTempElement = document.getElementById("feels-like-temperature");
const currentTemperature = document.getElementById("temperature");
const windSpeedElement = document.getElementById("wind-speed");
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
  console.log(
    countryName,
    cityName,
    weatherCondition,
    feelsLikeInCelsius,
    feelsLikeInInFahrenheit,
    tempInCelsius,
    tempInFahrenheit,
    windInKPH,
    windInMPH
  );
  countryNameElement.textContent = countryName;
  cityNameElement.textContent = cityName;
  weatherConditionElement.textContent = weatherCondition;
  feelsLikeTempElement.textContent = `Feels Like: ${feelsLikeInCelsius}`;
  currentTemperature.textContent = tempInCelsius;
  windSpeedElement.textContent = `Wind: ${windInKPH}`;

  inputValue.value = "";
}

getWeatherInfo();

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getWeatherInfo();
  }
});

searchButton.addEventListener("click", getWeatherInfo);
