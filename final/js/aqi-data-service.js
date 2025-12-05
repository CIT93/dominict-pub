// aqi-data-service.js

import { AQI_API_BASE_URL, AQI_API_KEY } from "./config.js";
console.log(AQI_API_BASE_URL);

/**
* Gets the user's current geographical location (latitude and longitude).
* @returns {Promise<{latitude: number, longitude: number}>} A Promise that resolves
* with coordinates or rejects with an Error if location cannot be obtained.
*/
export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
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

/**
* Fetches the AQI data from an external API based on latitude and longitude.
* @param {number} lat - Latitude.
* @param {number} lon - Longitude.
* @returns {Promise} A Promise that resolves with the parsed JSON data.
*/

export const fetchAqiData = async (lat, lon) => {
    try {
        const url = `${AQI_API_BASE_URL}?lat=${lat}&lon=${lon}&appid=${AQI_API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            // Throw descriptive error if HTTP status is not successful (200-299)
            const errorText = await response.text();
            throw new Error (`HTTP error! status: ${response.status} - ${errorText || 'Unknown API error'}`)
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching AQI data:", error);
        throw new Error(`Failed to fetch AQI data: ${error.message}`);
    }
}
