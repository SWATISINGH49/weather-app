import React from 'react';
import { motion } from 'framer-motion';
import { weatherIcons } from '../utils/weatherIcons';

const Forecast = ({ data, units }) => {
  // Group forecast by day
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const getWeatherIcon = (iconCode) => {
    return weatherIcons[iconCode] || weatherIcons['default'];
  };

  return (
    <motion.div 
      className="forecast"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {Object.entries(dailyForecast).slice(0, 5).map(([date, dayData]) => {
          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
          const avgTemp = Math.round(
            dayData.reduce((sum, item) => sum + item.main.temp, 0) / dayData.length
          );
          const mainWeather = dayData[0].weather[0];

          return (
            <div key={date} className="forecast-day">
              <p className="day-name">{dayName}</p>
              <div className="day-icon">
                {getWeatherIcon(mainWeather.icon)}
              </div>
              <p className="day-temp">
                {avgTemp}°{units === 'metric' ? 'C' : 'F'}
              </p>
              <p className="day-desc">{mainWeather.description}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Forecast;