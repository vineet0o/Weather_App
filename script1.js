const sButton = document.querySelector(".navbar section button");
const city = document.querySelector(".city");
const country = document.querySelector(".country")
const input = sButton.previousElementSibling;
const temp = document.querySelector(".temperature");
const desc = document.querySelector(".description");
const humidity = document.querySelector(".humidity");
const maxTemp = document.querySelector(".maxTemp");
const minTemp = document.querySelector(".minTemp");
const windSpeed = document.querySelector(".windSpeed");
const windDegree = document.querySelector(".windDegree");
const pressure = document.querySelector(".pressure");
const visiblity = document.querySelector(".visiblity");
const box = document.querySelector(".box-1");
const nextData = document.querySelectorAll(".next-data");
const checkbox = document.querySelector(".checkbox");
let data;
let map = L.map('map');

sButton.addEventListener("click", () => {
    data = input.value;
    if (!data) {
        alert("Enter a Valid City");
        return;
    }
    else {
        input.value = "";
        getWeather();
        displayMap();
    }
});

async function getWeather() {

    const apiCode = 'a8b0928eaa74b3c241bf64196368f113';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${apiCode}`;
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=${apiCode}`;
    try {
        const apiData = await fetch(apiUrl);
        const dataJson = await apiData.json();
        displayWeather(dataJson);
    } catch (error) {
        alert("Enter a Valid City")
        return;
    }

    try {
        const apiData = await fetch(forecast);
        const dataJson = await apiData.json();
        displayForecast(dataJson.list);

    } catch (error) {
        alert("Data Not Found");
    }
}

function displayWeather(data) {

    city.innerText = `${data.name}`;
    country.innerText = `${data.sys.country}`;
    temp.innerText = `${Math.round(data.main.temp - 273.15)}`;
    humidity.innerText = `${data.main.humidity}`;
    pressure.innerText = `${data.main.pressure}`;
    maxTemp.innerText = `${Math.round(data.main.temp_max - 273.15)}`;
    minTemp.innerText = `${Math.round(data.main.temp_min - 273.15)}`;
    desc.innerText = `${data.weather[0].description}`;
    visiblity.innerText = `${data.visibility}`;
    windSpeed.innerText = `${data.wind.speed}`;
    windDegree.innerText = `${data.wind.deg}`;
    const iconCode = `${data.weather[0].icon}`;
    displayImage(iconCode);
};


function displayImage(code) {
    const iconUrl = `https://openweathermap.org/img/wn/${code}@4x.png`
    box.setAttribute("style", `background-image: url(${iconUrl})`)
}


function displayForecast(data) {

    nextData.forEach((value, index) => {
        value.firstElementChild.innerText = data[index].dt_txt;
    });

    nextData.forEach((value, index) => {
        value.lastElementChild.firstElementChild.innerText = Math.round(data[index].main.temp - 273.15);
    });
};

function displayMap() {
   

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker = L.marker([28.6139, 77.209]).addTo(map);
    let apiKey = 'a8b0928eaa74b3c241bf64196368f113';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let lat = data.coord.lat;
            let lon = data.coord.lon;
            map.setView([lat, lon], 13);
            marker.setLatLng([lat, lon]);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

let theme = "Dark";
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    theme === "Dark" ? darkTheme() : lightTheme();
});

function darkTheme() {
    document.documentElement.style.setProperty('--backgroundColor', '#171717');
    document.documentElement.style.setProperty('--black', '#fff');
    document.documentElement.style.setProperty('--white', '#000');
    document.documentElement.style.setProperty('--toGray', '#333');
    theme = "Light";
}

function lightTheme() {
    document.documentElement.style.setProperty('--backgroundColor', '#eee');
    document.documentElement.style.setProperty('--black', '#000');
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--toGray', '#fff');
    theme = "Dark";
}