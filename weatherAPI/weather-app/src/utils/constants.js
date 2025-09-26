export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ICON_URL: 'https://openweathermap.org/img/wn',
  TIMEOUT: 10000, // 10 seconds
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Unable to connect to weather service. Please check your internet connection.',
  CITY_NOT_FOUND: 'City not found. Please check the spelling and try again.',
  API_KEY_ERROR: 'Weather service is temporarily unavailable.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again.',
};

export default {
  API_CONFIG,
  ERROR_MESSAGES,
};