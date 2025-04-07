import React from 'react';
import { motion } from 'framer-motion';
import { weatherIcons } from '../utils/weatherIcons';

const CurrentWeather = ({ data, units, onUnitChange }) => {
  const getWeatherIcon = (iconCode) => {
    return weatherIcons[iconCode] || weatherIcons['default'];
  };

  return (
    <motion.div 
      className="current-weather"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="weather-header">
        <h2>{data.name}, {data.sys.country}</h2>
        <div className="unit-toggle">
          <button 
            onClick={() => onUnitChange('metric')} 
            className={units === 'metric' ? 'active' : ''}
          >
            °C
          </button>
          <button 
            onClick={() => onUnitChange('imperial')} 
            className={units === 'imperial' ? 'active' : ''}
          >
            °F
          </button>
        </div>
      </div>
      
      <div className="weather-main">
        <div className="weather-icon">
          {getWeatherIcon(data.weather[0].icon)}
        </div>
        <div className="weather-temp">
          {Math.round(data.main.temp)}°{units === 'metric' ? 'C' : 'F'}
        </div>
      </div>
      
      <div className="weather-details">
        <p>{data.weather[0].description}</p>
        <div className="detail-item">
          <span>Feels like:</span>
          <span>{Math.round(data.main.feels_like)}°</span>
        </div>
        <div className="detail-item">
          <span>Humidity:</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Wind:</span>
          <span>{data.wind.speed} {units === 'metric' ? 'm/s' : 'mph'}</span>
        </div>
        <div className="detail-item">
          <span>Pressure:</span>
          <span>{data.main.pressure} hPa</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CurrentWeather;