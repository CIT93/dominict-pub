import { getUserLocation, fetchWeatherData } from "./weather-data-service.js";

const weatherDisplaySection = document.getElementById('weather-display');
const currentTempSpan = weatherDisplaySection.querySelector('#currentTemp');
const weatherConditionSpan = weatherDisplaySection.querySelector('#weatherCondition');
const refreshWeatherButton = weatherDisplaySection.querySelector('#refreshWeatherButton');

const getWeatherQuality = (temp) => {
    switch (true) {
        case (temp >= 80): return { label: "Hot", color: "text-red-600", description: "Pretty Warm." };
        case (temp >= 60): return { label: "Mild ", color: "text-yellow-600", description: "Comfortable weather conditions." };
        case (temp >= 40): return { label: "Cool", color: "text-blue-600", description: "Cold" };
        case (temp < 40): return { label: "Cold", color: "text-purple-600", description: "Freezing" };
        default: return { label: "Unknown", color: "text-gray-500", description: "Weather data is currently unavailable." };
    }
};


const renderWeatherDisplay = (weatherData) => {
    const temp = weatherData.main?.temp;
    const quality = getWeatherQuality(temp);
    currentTempSpan.textContent = `${temp}°F (${quality.label})`;
    currentTempSpan.classList.add(quality.color, 'font-extrabold');
    weatherConditionSpan.textContent = quality.description;
};

export const loadAndDisplayWeather = async () => {
    //console.log('inside load and display weather');
    currentTempSpan.textContent = '...';
    weatherConditionSpan.textContent = "Fetching weather...";
    weatherDisplaySection.style.display = 'block';

    try {
        const { latitude, longitude } = await getUserLocation();
        const weatherData = await fetchWeatherData(latitude, longitude);
       // console.log(weatherData)
        renderWeatherDisplay(weatherData);
    } catch (error) {
        currentTempSpan.textContent = '--';
        weatherConditionSpan.style.color = 'red';
        weatherConditionSpan.textContent = `${error.message}`;
        weatherDisplaySection.style.display = 'block';
    }
};

if (refreshWeatherButton) {
    refreshWeatherButton.addEventListener('click', loadAndDisplayWeather);
}