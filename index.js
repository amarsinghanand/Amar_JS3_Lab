const getWeatherApi = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
};

const search = document.getElementById('search'),
    cityLabel = document.querySelector('#city'),
    currentDate = document.querySelector('#date'),
    temperature = document.querySelector('.temperature'),
    weather = document.querySelector('.weather'),
    highLow = document.querySelector('.hi-low');

const displayResults = res => {
    console.log(res);
    cityLabel.innerHTML = `${res.name}, ${res.sys.country}`;
    currentDate.innerHTML = (new Date(res.dt * 1000)).toDateString();
    temperature.innerHTML = `${Math.round(res.main.temp)}<span>&#8451;</span>`;
    weather.innerHTML = res.weather[0].main;
    highLow.innerHTML = `${Math.round(res.main.temp_min)}<span>&#8451;</span> / ${Math.round(res.main.temp_max)}<span>&#8451;</span>`;
};

const getResults = cityName => {
    fetch(`${getWeatherApi.base}weather?q=${cityName}&units=metric&appid=${getWeatherApi.key}`)
        .then(weather => {
            return weather.json();
        }).then((response) => {
            console.log(response)
            displayResults(response)
        });
}

search.addEventListener('keypress', (event) => {
    if (event.keyCode == 13) {
        getResults(event.target.value);
    }
});