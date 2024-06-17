const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getWeekDay = (date) => {
  const timeZone = new Date().getTimezoneOffset() * 60;
  date -= -timeZone;
  const dayIndex = new Date(date * 1000).getDay();
  if (new Date().getDay() === dayIndex) {
    return "Today";
  } else {
    return DAYS[dayIndex];
  }
};

export default getWeekDay;
