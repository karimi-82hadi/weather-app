import getWeatherData from "../utils/httpReq.js";
import loadingJSX from "../utils/JSX.js";
import getWeekDay from "../utils/customData.js";
import createSelectItem from "../utils/selectList.js";
import appendModal from "../utils/modal.js";

const weatherBox = document.getElementById("weather-box");
const searchInput = document.querySelector(".search-input input");
const searchButton = document.querySelector(".search-input button");
const loacationButton = document.getElementById("location-btn");
const forecastContainer = document.getElementById("forecast-container");
const weatherSetting = document.getElementById("weather-setting");
const openSettingButton = document.getElementById("setting-btn");
const closeSettingButton = document.getElementById("setting-close-button");
const saveSetting = document.getElementById("save-setting-button");

let weatherUnit = "°C";
let forecastTime = "00:00";
let weatherUnitsList = ["°C", "°F"];
let forecastTimeList = [
  "00:00",
  "03:00",
  "06:00",
  "09:00",
  "12:00",
  "15:00",
  "18:00",
  "21:00",
];

createSelectItem(weatherUnitsList, "select#weather-unit-select");
createSelectItem(forecastTimeList, "select#forecast-time-select");

const addBodyPadding = () => {
  let scrollbarWidth = window.innerWidth - document.body.offsetWidth;
  document.body.style.overflow = "hidden";
  if (+scrollbarWidth !== 0) {
    document.body.style.paddingRight = scrollbarWidth + "px";
  }
};

const removeBodyPadding = () => {
  document.body.removeAttribute("style");
};

openSettingButton.addEventListener("click", () => {
  weatherSetting.style.display = "flex";
  addBodyPadding();
});

closeSettingButton.addEventListener("click", () => {
  weatherSetting.removeAttribute("style");
  removeBodyPadding();
});

const unitClassHandler = (temp) => {
  switch (weatherUnit) {
    case "°C":
      if (temp > 22) {
        return "warm";
      } else if (temp < 10) {
        return "cold";
      } else {
        return "standard";
      }
    case "°F":
      if (temp > 72) {
        return "warm";
      } else if (temp < 50) {
        return "cold";
      } else {
        return "standard";
      }
  }
};

const renderCurrentWeather = (data) => {
  if (!data) return;
  const weatherJSX = `
    <div class="weather-box-inner">
      <div class="weather-box-header">
          <div class="weather-box-image">
              <img src="https://openweathermap.org/img/w/${
                data.weather[0].icon
              }.png" alt="weather-icon" />
          </div>
          <div class="weather-box-title">
              <h3>${data.name}, ${data.sys.country}</h3>
          </div>
      </div>
      <div class="weather-box-content">
          <div class="weather-box-main">
              <p class="weather-box-temp ${unitClassHandler(
                data.main.temp
              )}">${Math.round(
    data.main.temp
  )}<span class="temp-sign">${weatherUnit}</span></p>
              <p class="weather-box-desc">${data.weather[0].main}, ${
    data.weather[0].description
  }</p>
          </div>
          <div class="weather-box-info">
              <p>Humidity:<span class="${unitClassHandler(data.main.temp)}">${
    data.main.humidity
  } %</span></p>
              <p>Wind Speed:<span class="${unitClassHandler(data.main.temp)}">${
    data.wind.speed
  } m/s</span></p>
          </div>
      </div>
    </div>
  `;
  weatherBox.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
  if (!data) return;
  forecastContainer.innerHTML = "";
  data = data.list.filter((obj) => obj.dt_txt.endsWith(`${forecastTime}:00`));
  data.forEach((item) => {
    let date = item.dt_txt.split(" ")[0];
    let customDate = date.split("-").splice("1").join("/");
    const forecastJSX = `
      <div class="forecast-weather-item">
        <div class="forecast-weather-image">
          <img src="https://openweathermap.org/img/w/${
            item.weather[0].icon
          }.png" alt="weather-icon" />
        </div>
        <div class="forecast-weather-title">
          <h4>${getWeekDay(item.dt)}</h4>
          <p>${customDate}</p>
        </div>
        <div class="forecast-weather-main">
          <p class="forecast-weather-temp ${unitClassHandler(
            item.main.temp
          )}">${Math.round(
      item.main.temp
    )}<span class="temp-sign">${weatherUnit}</span></p>
          <p>${item.weather[0].main}</p>
        </div>
      </div>
    `;
    forecastContainer.innerHTML += forecastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value.toLowerCase().trim();
  if (!cityName) {
    appendModal("error", "Please Enter a city name!");
    return;
  }
  weatherBox.innerHTML = loadingJSX;
  forecastContainer.innerHTML = loadingJSX;
  const currentData = await getWeatherData("current", cityName, weatherUnit);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", cityName, weatherUnit);
  renderForecastWeather(forecastData);
};

const locationHandler = () => {
  if (navigator.geolocation) {
    weatherBox.innerHTML = loadingJSX;
    forecastContainer.innerHTML = loadingJSX;
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    appendModal("warning", "Your browser does not suppport geolocation!");
  }
};

const positionCallback = async (position) => {
  const currentData = await getWeatherData(
    "current",
    position.coords,
    weatherUnit
  );
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData(
    "forecast",
    position.coords,
    weatherUnit
  );
  renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
  appendModal("error", error.message);
};

const initHandler = async () => {
  weatherBox.innerHTML = loadingJSX;
  forecastContainer.innerHTML = loadingJSX;
  const currentData = await getWeatherData("current", "tehran", weatherUnit);
  renderCurrentWeather(currentData);
  const forecastData = await getWeatherData("forecast", "tehran", weatherUnit);
  renderForecastWeather(forecastData);
};

const saveHandler = () => {
  let unit = document.getElementById(
    "select2-weather-unit-select-container"
  ).textContent;
  let time = document.getElementById(
    "select2-forecast-time-select-container"
  ).textContent;
  weatherUnit = unit;
  forecastTime = time;
  weatherSetting.removeAttribute("style");
  removeBodyPadding();
  weatherBox.innerHTML = loadingJSX;
  forecastContainer.innerHTML = loadingJSX;
  const cityName = searchInput.value.toLowerCase().trim();
  if (!cityName) {
    initHandler();
  } else {
    searchHandler();
  }
};

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchHandler();
  }
});
searchButton.addEventListener("click", searchHandler);
loacationButton.addEventListener("click", locationHandler);
saveSetting.addEventListener("click", saveHandler);
window.addEventListener("DOMContentLoaded", initHandler);

export { addBodyPadding, removeBodyPadding };
