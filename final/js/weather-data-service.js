import {WEATHER_API_BASE_URL, WEATHER_API_KEY} from "./config.js";
console.log(WEATHER_API_BASE_URL)

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            //console.log(position);
            resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        }, (error) => {
            console.log(error);
            let errorMessage;
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = "Permission denied. Please enable location services for this state.";
                    break;
                case error.TIMEOUT:
                    errorMessage = "Getting your location timed out.";
                    break;
                default:
                    errorMessage = "An unknown error occured while getting location.";
                    break;
            }
            reject(new Error(errorMessage));
        });
    });
};

export const fetchWeatherData = async (lat, lon) => {
    try {
        const url = `${WEATHER_API_BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${WEATHER_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status} - ${errorText || 'Unknown API error'}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
};