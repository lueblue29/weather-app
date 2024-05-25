import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      setError('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c101106fa999021ef9b445176e419d1&units=metric`);
      setWeatherData(response.data);
    } catch (err) {
      setWeatherData(null);
      setError('City not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="weather-input"
        />
        <button type="submit" className="weather-button">Get Weather</button>
      </form>
      {error && <p className="weather-error">{error}</p>}
      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.name}</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
