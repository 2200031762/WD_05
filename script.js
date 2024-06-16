let map;

function initMap() {
    map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    map.on('click', onMapClick);

    const locationInput = document.getElementById('locationInput');
    locationInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            searchWeather();
        }
    });
}

function onMapClick(e) {
    const { lat, lng } = e.latlng;
    fetchWeatherByCoordinates(lat, lng);
}

function searchWeather() {
    const locationInput = document.getElementById('locationInput').value;
    fetchWeatherByLocation(locationInput);
}

function fetchWeatherByCoordinates(lat, lng) {
    const apiKey = 'your actual API Key'; // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`;

    fetchWeather(apiUrl);
}

function fetchWeatherByLocation(location) {
    const apiKey = 'your actual API Key'; // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetchWeather(apiUrl);
}

function fetchWeather(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.log('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].main}</p>
        <p>Description: ${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

document.addEventListener('DOMContentLoaded', function () {
    initMap();
});
