import React, { useState } from 'react';

const Search = ({ onSearch, onGeolocation }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity('');
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city..."
        />
        <button type="submit">Search</button>
      </form>
      <button className="geo-btn" onClick={onGeolocation}>
        Use My Location
      </button>
    </div>
  );
};

export default Search;