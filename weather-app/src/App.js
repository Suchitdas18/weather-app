import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "c76457acc4af48dea57152026251808";

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`
      );
      const data = await response.json();
      if (data.error) {
        setWeather({ error: "City not found!" });
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.error(err);
      setWeather({ error: "Something went wrong!" });
    }
  };

  return (
    <div className="app">
      <h1>🌤 Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="result">
          {weather.error ? (
            <p className="error">{weather.error}</p>
          ) : (
            <>
              <h2>{weather.location.name}, {weather.location.country}</h2>
              <p>🌡 Temperature: {weather.current.temp_c}°C</p>
              <p>☁ Condition: {weather.current.condition.text}</p>
              <img
                src={weather.current.condition.icon}
                alt="weather icon"
              />
              <p>💨 Wind: {weather.current.wind_kph} kph</p>
              <p>💧 Humidity: {weather.current.humidity}%</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
