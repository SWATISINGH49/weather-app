// src/utils/weatherService.js

export const getCurrentWeather = async (location) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('City not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getForecast = async (location) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/forecast?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric&cnt=40`
    );
    if (!response.ok) throw new Error('Forecast not available');
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export const getWeatherByCoords = async (lat, lon) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) throw new Error('Location not found');
    return await response.json();
  } catch (error) {
    throw error;
  }
};