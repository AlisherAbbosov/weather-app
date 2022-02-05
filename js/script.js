let weatherContainer = document.querySelector(".weather__container");
let elForm = document.querySelector(".search__form");
let elSearchInput = document.querySelector(".search__input");
let elCityName = document.querySelector(".city__name");
let elUpdatedDate = document.querySelector(".updated__date");
let elDescription = document.querySelector(".description");
let elIcon = document.querySelector(".weather__icon");
let elTemperature = document.querySelector(".temperature");
let elHumidity = document.querySelector(".humidity");
let elWind = document.querySelector(".wind");
let elSearch = document.querySelector(".wind");
let elDaysList = document.querySelector(".days__list");
let elRiseTime = document.querySelector("#rise-time");
let elSetTime = document.querySelector("#set-time");

let roundedNumber = num => {
  let rounded = Math.round(num);
  return rounded;
};

let getTime = time => {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
};

function filterDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return days[day];
}

let updatedDate = data => {
  let time = new Date(data * 1000);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDate()];
  return `${day} ${hours}:${minutes}`;
};

let renderDays = datas => {
  elDaysList.innerHTML = null;
  datas.forEach((day, index) => {
    if (index < 6) {
      let html = ` <li class="col-2 days__item">
      <div class="days__box">
        <p class="week__name">${filterDays(day.dt)}</p>
        <img
          src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <p>
          <span class="max">${roundedNumber(
            day.temp.max
          )}</span>° | <span class="min">${roundedNumber(day.temp.min)}°</span>
        </p>
      </div>
    </li>`;
      elDaysList.insertAdjacentHTML("beforeend", html);
    }
  });
};

const renderCountry = function (data) {
  elCityName.textContent = data.name;
  elUpdatedDate.textContent = updatedDate(data.dt);
  elDescription.textContent = data.weather[0].main;
  elTemperature.textContent = roundedNumber(data.main.temp);
  elHumidity.textContent = data.main.humidity;
  elWind.textContent = data.wind.speed;
  elRiseTime.textContent = getTime(data.sys.sunrise);
  elSetTime.textContent = getTime(data.sys.sunset);

  elIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
};

const getCountry = async function (country) {
  const firstResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=adb0448b67b2c947cceeb20cbcadff55&units=metric`
  );

  const data = await firstResponse.json();

  if (data.coord) {
    renderCountry(data);
  }

  const responce = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=adb0448b67b2c947cceeb20cbcadff55&units=metric`
  );
  let newData = await responce.json();

  renderDays(newData.daily);
};

getCountry("tashkent");

elForm.addEventListener("submit", evt => {
  evt.preventDefault();

  let city = elSearchInput.value;

  getCountry(city);
});

let datta = new Date(1643865330 * 1000);
let hour = datta.getHours();

console.log(datta);
