import './App.css';
import { Button } from './components';
import { useState } from 'react';
import { weatherService } from './services';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTestClick = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await weatherService.fetchWeatherByCity("London");
      setWeatherData(data);
      console.log('Weather data:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching weather:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <p>Get current weather information for any city</p>
      </header>
      <main className="App-main">
        <Button
          className="click-button"
          onClick={handleTestClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "Test"}
        </Button>

        {/* TODO: Add conditional rendering here for different states: */}
        {/* {loading && <LoadingSpinner />} */}
        {/* {error && <div className="error-message">Error: {error}</div>} */}
        {/* {weatherData && (
          <div className="weather-info">
            <h3>{weatherData.city}, {weatherData.country}</h3>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Description: {weatherData.description}</p>
            <img src={weatherData.iconUrl} alt={weatherData.description} />
          </div>
        )} */}

        {/* Search form will go here */}
        {/* Weather display will go here */}
      </main>
    </div>
  );
}

export default App;
