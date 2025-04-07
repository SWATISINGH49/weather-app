import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WiDaySunny, WiRain, WiSnow, WiCloudy, WiDayCloudy, WiThunderstorm, WiFog } from 'react-icons/wi';
import { format } from 'date-fns';
import './App.css';

const API_KEY = '8129bd659786fe41faa814500c7b77c6';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [city, setCity] = useState('London');
  const [units, setUnits] = useState('metric');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const weatherIcons = {
    '01d': <WiDaySunny size={80} />,
    '01n': <WiDaySunny size={80} />,
    '02d': <WiDayCloudy size={80} />,
    '02n': <WiDayCloudy size={80} />,
    '03d': <WiCloudy size={80} />,
    '03n': <WiCloudy size={80} />,
    '04d': <WiCloudy size={80} />,
    '04n': <WiCloudy size={80} />,
    '09d': <WiRain size={80} />,
    '09n': <WiRain size={80} />,
    '10d': <WiRain size={80} />,
    '10n': <WiRain size={80} />,
    '11d': <WiThunderstorm size={80} />,
    '11n': <WiThunderstorm size={80} />,
    '13d': <WiSnow size={80} />,
    '13n': <WiSnow size={80} />,
    '50d': <WiFog size={80} />,
    '50n': <WiFog size={80} />,
  };

  useEffect(() => {
    fetchWeather();
    fetchForecast();
  }, [city, units]);

  const fetchWeather = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`
      );
      const data = await response.json();
      
      if (data.cod && data.cod !== 200) {
        throw new Error(data.message || 'Failed to fetch weather data');
      }
      
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=${units}`
      );
      const data = await response.json();
      
      if (data.cod && data.cod !== '200') {
        throw new Error(data.message || 'Failed to fetch forecast data');
      }
      
      setForecast(data);
    } catch (err) {
      console.error('Error fetching forecast:', err);
      setForecast(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
      fetchForecast();
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ fontSize: '50px' }}
        >
          ⛅
        </motion.div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">Error: {error}</p>
        <button className="retry-button" onClick={() => {
          setCity('London');
          fetchWeather();
          fetchForecast();
        }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="weather-app">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="weather-container"
      >
        <div className="search-container">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search for a city..."
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <div className="unit-toggle">
            <button 
              onClick={() => setUnits('metric')} 
              className={`unit-button ${units === 'metric' ? 'active' : ''}`}
            >
              °C
            </button>
            <button 
              onClick={() => setUnits('imperial')} 
              className={`unit-button ${units === 'imperial' ? 'active' : ''}`}
            >
              °F
            </button>
          </div>
        </div>

        {weather && (
          <AnimatePresence>
            <motion.div
              key={weather.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="current-weather"
            >
              <div className="location-info">
                <h1>
                  {weather.name}
                  {weather.sys && weather.sys.country && `, ${weather.sys.country}`}
                </h1>
                <p>{format(new Date(weather.dt * 1000), 'EEEE, MMMM do')}</p>
              </div>

              <div className="weather-main">
                <div className="weather-icon">
                  {weather.weather && weather.weather[0] && weatherIcons[weather.weather[0].icon] || <WiDaySunny size={80} />}
                </div>
                <div className="temperature">
                  <h2>
                    {weather.main && Math.round(weather.main.temp)}°{units === 'metric' ? 'C' : 'F'}
                  </h2>
                  <p>
                    {weather.weather && weather.weather[0] && weather.weather[0].description}
                  </p>
                </div>
              </div>

              {weather.main && (
                <div className="weather-details">
                  <div className="detail-card">
                    <span>Feels like</span>
                    <span>{Math.round(weather.main.feels_like)}°</span>
                  </div>
                  <div className="detail-card">
                    <span>Humidity</span>
                    <span>{weather.main.humidity}%</span>
                  </div>
                  <div className="detail-card">
                    <span>Wind</span>
                    <span>{weather.wind && weather.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</span>
                  </div>
                  <div className="detail-card">
                    <span>Pressure</span>
                    <span>{weather.main.pressure} hPa</span>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {forecast && forecast.list && (
          <div className="forecast-container">
            <h3>5-Day Forecast</h3>
            <div className="forecast-cards">
              {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((item) => (
                <motion.div 
                  key={item.dt}
                  whileHover={{ scale: 1.05 }}
                  className="forecast-card"
                >
                  <p>{format(new Date(item.dt * 1000), 'EEE')}</p>
                  <div className="forecast-icon">
                    {item.weather && item.weather[0] && weatherIcons[item.weather[0].icon] || <WiDayCloudy size={40} />}
                  </div>
                  <div className="forecast-temp">
                    <span>{item.main && Math.round(item.main.temp_max)}°</span>
                    <span className="min-temp">{item.main && Math.round(item.main.temp_min)}°</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default WeatherApp;