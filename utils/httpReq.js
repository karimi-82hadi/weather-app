import appendModal from "./modal.js";

const API_KEY = "9df9320bf78ca1449e2dcb11eb6cc1b7";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (type, data, unit) => {
  let url = null;
  unit === "°C" ? (unit = "metric") : (unit = "imperial");
  switch (type) {
    case "current":
      if (typeof data === "string") {
        url = `${BASE_URL}/weather?q=${data}&units=${unit}&appid=${API_KEY}`;
      } else {
        url = `${BASE_URL}/weather?lat=${data.latitude}&lon=${data.longitude}&units=${unit}&appid=${API_KEY}`;
      }
      break;

    case "forecast":
      if (typeof data === "string") {
        url = `${BASE_URL}/forecast?q=${data}&units=${unit}&appid=${API_KEY}`;
      } else {
        url = `${BASE_URL}/forecast?lat=${data.latitude}&lon=${data.longitude}&units=${unit}&appid=${API_KEY}`;
      }
      break;

    default:
      url = `${BASE_URL}/weather?q=tehran&units=${unit}&appid=${API_KEY}`;
      break;
  }
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (+json.cod === 200) {
      return json;
    } else {
      appendModal("error", json.message);
    }
  } catch (error) {
    appendModal("error", "An error occured when fetching data!");
  }
};

export default getWeatherData;
