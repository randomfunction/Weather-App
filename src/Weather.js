import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (city) => {
    setLoading(true);
    try {
      const apiKey = 'b5b112040e83c7f2a70e493e3c5c518f';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      const response = await axios.get(url);
      setWeather(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Live Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          Search
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : weather ? (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
    </div>
  );
};

export default Weather;
