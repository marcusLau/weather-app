import './App.css';
import { SearchForm, WeatherCard, LoadingSpinner } from './components';
import { useState } from 'react';
import { weatherService } from './services';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const data = await weatherService.fetchWeatherByCity(cityName);
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
        <SearchForm onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="loading-container">
            <LoadingSpinner size="large" />
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

        {weatherData && <WeatherCard weatherData={weatherData} />}
      </main>
    </div>
  );
}

export default App;
