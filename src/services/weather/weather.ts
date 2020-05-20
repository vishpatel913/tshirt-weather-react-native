import qs from 'querystring';
import { Coords } from '../../types/coords';
import { WeatherResponse, Weather } from '../../types/weather';
import devResponse from './mocks/tempGeneratedResponse';

class WeatherService {
  coords: Coords;
  baseUrl: string;
  constructor(coords: Coords) {
    this.coords = coords;
    this.baseUrl =
      'https://fe883xgkja.execute-api.us-east-1.amazonaws.com/prod';
    // 'http://localhost:5000/prod';
  }

  async get(endpoint: string): Promise<WeatherResponse> {
    const params = {
      lat: this.coords.lat,
      lon: this.coords.lon,
    };

    let response = await fetch(
      `${this.baseUrl}/${endpoint}?${qs.stringify(params)}`,
    )
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((error) => {
        // TODO: add error handling
        console.error('Weather Service Error', error);
      });
    // response = process.env.mock ? devResponse : response;
    return response;
  }
}

export default WeatherService;
