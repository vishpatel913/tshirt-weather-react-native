import qs from 'querystring';
import { OPEN_WEATHER_API_KEY } from 'react-native-dotenv';
import { Coords } from 'src/types/coords';
import { Current } from 'src/types/weather';
import {
  mockCurrentResponse,
  mockForecastResponse,
  mockOnecallResponse,
} from './mocks';
import { CurrentResponse } from './types';

class OpenWeatherService {
  coords: Coords;
  baseUrl: string;
  constructor(coords: Coords) {
    this.coords = coords;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async get(endpoint: string) {
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

  async getCurrentData(): Promise<Current> {
    // const response = await this.get('current');
    console.log('this.coords', this.coords);
    const response = mockCurrentResponse;
    return OpenWeatherService.normaliseCurrentData(response);
  }

  async getForecastData() {
    // const response = await this.get('forecast');
    console.log('this.coords', this.coords);
    const response = mockForecastResponse;

    return response;
  }

  async getAllData() {
    // const response = await this.get('onecall');
    console.log('this.coords', this.coords);
    const response = mockOnecallResponse;

    return response;
  }

  static normaliseCurrentData(obj: CurrentResponse) {
    const {
      visibility,
      timezone,
      weather,
      main,
      wind,
      clouds,
      dt,
      sys,
      name,
    } = obj;

    return {
      timestamp: dt,
      sunrise: sys.sunrise,
      sunset: sys.sunset,
      main: weather[0].main,
      description: weather[0].description,
      icon: weather[0].icon,
      ...main,
      clouds: clouds.all,
      wind_speed: wind.speed,
      wind_deg: wind.deg,
      location: name,
      country: sys.country,
      visibility,
      timezone,
    };
  }
}

export default OpenWeatherService;
