import axios from 'axios';
import { useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';
const API_KEY = import.meta.env.VITE_API_KEY

const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url);
            return response;
        } catch (error) {
            if (i < retries - 1) {
                const backoffDelay = delay * i;
                await new Promise((resolve) => setTimeout(resolve, backoffDelay));
            } else {
                throw error; // all retries failed
            }
        }
    }
};


function CityWeather({ city, removeCity }: { city: string, removeCity: (string: string) => void }) {
    const [weatherData, setWeatherData] = useState<null | Record<string, any>>(null);
    const [error, setError] = useState('');
    // bulk_queries_not_supported_on_plan
    const fetchWeatherData = async () => {
        try {
            // const response = await axios.get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
            const response = await fetchWithRetry(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`);
            setWeatherData(response?.data);
            setError('');
        } catch (err) {
            setError('Error fetching weather data');
        }
    };

    useEffect(() => {
        fetchWeatherData();
    }, [city]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!weatherData) {
        return <div>Loading...</div>;
    }
    if (!weatherData?.location?.name) {
        return <><h2>{city}</h2> <p>City not found</p> <button onClick={() => removeCity(city)}>Remove</button></>;
    }

    return (
        <ErrorBoundary>
            <h2>{weatherData.location.name}</h2>
            <img src={weatherData.current.weather_icons} alt={'icon'} />
            <p>Temperature: {weatherData.current.temperature} °C</p>
            <p>Humidity: {weatherData.current.humidity}%</p>
            <p>Wind Speed: {weatherData.current.wind_speed} m/s</p>
            <p>*"Plan does not support weather forecast data."</p>
            <button onClick={() => removeCity(city)}>Remove</button>
        </ErrorBoundary>
    );
}

export default CityWeather;


// This is a sample data for city weather : we can remove if we don't need it
// {
//     "request": {
//         "type": "City",
//         "query": "Indore, India",
//         "language": "en",
//         "unit": "m"
//     },
//     "location": {
//         "name": "Indore",
//         "country": "India",
//         "region": "Madhya Pradesh",
//         "lat": "22.717",
//         "lon": "75.833",
//         "timezone_id": "Asia\/Kolkata",
//         "localtime": "2025-03-11 13:04",
//         "localtime_epoch": 1741698240,
//         "utc_offset": "5.50"
//     },
//     "current": {
//         "observation_time": "07:34 AM",
//         "temperature": 36,
//         "weather_code": 113,
//         "weather_icons": [
//             "https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0001_sunny.png"
//         ],
//         "weather_descriptions": [
//             "Sunny"
//         ],
//         "wind_speed": 4,
//         "wind_degree": 106,
//         "wind_dir": "ESE",
//         "pressure": 1018,
//         "precip": 0,
//         "humidity": 21,
//         "cloudcover": 0,
//         "feelslike": 35,
//         "uv_index": 9,
//         "visibility": 6,
//         "is_day": "yes"
//     }
// }