import qs from 'querystring';
import {OPEN_WEATHER_API_KEY} from 'react-native-dotenv';
import {
  mockCurrentResponse,
  mockForecastResponse,
  mockOnecallResponse,
} from './mocks';

class OpenWeatherService {
  constructor(coords) {
    this.coords = coords;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async get(endpoint) {
    const params = {
      lat: this.coords.lat,
      lon: this.coords.lon,
      appid: OPEN_WEATHER_API_KEY,
      units: 'metric',
    };

    return fetch(`${this.baseUrl}/${endpoint}?${qs.stringify(params)}`)
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        // TODO: add error handling
        console.error('Weather Service Error', error);
      });
  }

  async getAllData() {
    // const response = await this.get('onecall');
    const response = mockOnecallResponse;

    return response;
  }

  async getCurrentData() {
    // const response = await this.get('current');
    const response = mockCurrentResponse;

    return response;
  }

  async getForecastData() {
    // const response = await this.get('forecast');
    const response = mockForecastResponse;

    return response;
  }
}

export default OpenWeatherService;
