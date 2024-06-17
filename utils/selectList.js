const noResultMessage = "No results found!";

$("select#weather-unit-select").select2({
  placeholder: "Choose weather unit",
  language: {
    noResults: function (params) {
      return noResultMessage;
    },
  },
});

$("select#forecast-time-select").select2({
  placeholder: "Choose forecast time",
  language: {
    noResults: function (params) {
      return noResultMessage;
    },
  },
});

const createSelectItem = (data, container) => {
  data.forEach((item) => {
    const optionEle = document.createElement("option");
    optionEle.textContent = item;
    document.querySelector(`${container}`).appendChild(optionEle);
  });
};

export default createSelectItem;
