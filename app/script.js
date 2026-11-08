// script.js – Fetches weather data from OpenWeatherMap and updates the UI
// NOTE: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
const apiKey = "229958a89cef26d86738d2de25a83a9b";

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const resultSection = document.getElementById('weather-result');

const cityNameEl = document.getElementById('city-name');
const dateEl = document.getElementById('date');
const tempEl = document.getElementById('temperature');
const iconEl = document.getElementById('weather-icon');
const feelsLikeEl = document.getElementById('feels-like');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// Helper: format timestamp to readable date
function formatDate(timestamp) {
  const options = { weekday: 'short', month: 'short', day: 'numeric' };
  return new Date(timestamp * 1000).toLocaleDateString(undefined, options);
}

async function getWeather(city) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error('City not found');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    alert('Unable to fetch weather data. Please check the city name and your API key.');
    return null;
  }
}

function updateUI(data) {
  cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
  dateEl.textContent = formatDate(data.dt);
  tempEl.textContent = Math.round(data.main.temp);
  iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  iconEl.alt = data.weather[0].description;
  feelsLikeEl.textContent = Math.round(data.main.feels_like);
  humidityEl.textContent = data.main.humidity;
  windEl.textContent = data.wind.speed;
  resultSection.hidden = false;
}

searchBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();
  if (!city) return alert('Please enter a city name.');
  const weatherData = await getWeather(city);
  if (weatherData) updateUI(weatherData);
});

// Optional: allow Enter key to trigger search
cityInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchBtn.click();
  }
});
