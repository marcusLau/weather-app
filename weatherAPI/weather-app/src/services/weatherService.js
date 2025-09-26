import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants';

class WeatherService {
  constructor() {
    this.apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  async fetchWeatherByCity(cityName) {
    if (!cityName || typeof cityName !== 'string') {
      throw new Error('City name is required');
    }

    if (!this.apiKey) {
      throw new Error(ERROR_MESSAGES.API_KEY_ERROR);
    }

    const url = `${this.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}&units=imperial`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        switch (response.status) {
          case 404:
            throw new Error(ERROR_MESSAGES.CITY_NOT_FOUND);
          case 401:
            throw new Error(ERROR_MESSAGES.API_KEY_ERROR);
          default:
            throw new Error(`Weather service error: ${response.status}`);
        }
      }

      const data = await response.json();
      return this.formatWeatherData(data);

    } catch (error) {
      if (error.name === 'AbortError') {
        throw new Error(ERROR_MESSAGES.TIMEOUT_ERROR);
      }

      if (error.message.includes('fetch')) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }

      // Re-throw known errors
      if (Object.values(ERROR_MESSAGES).includes(error.message)) {
        throw error;
      }

      throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
    }
  }

  formatWeatherData(data) {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      description: data.weather[0].description,
      main: data.weather[0].main,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      pressure: data.main.pressure,
      iconUrl: `${API_CONFIG.ICON_URL}/${data.weather[0].icon}@2x.png`,
    };
  }

  getIconUrl(iconCode) {
    return `${API_CONFIG.ICON_URL}/${iconCode}@2x.png`;
  }
}

export default new WeatherService();