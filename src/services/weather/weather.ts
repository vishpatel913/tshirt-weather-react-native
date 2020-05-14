import qs from 'querystring';
import { Coords } from 'src/types/coords';
import devResponse from './mocks/tempGeneratedResponse';

class WeatherService {
  coords: Coords;
  baseUrl: string;
  constructor(coords: Coords) {
    this.coords = coords;
    this.baseUrl =
      'https://dgr5nygxa5.execute-api.us-east-1.amazonaws.com/prod/';
  }

  async get(endpoint: string) {
    const params = {
      lat: this.coords.lat,
      lon: this.coords.lon,
    };
    console.warn('remove log', { params });
    // return fetch(`${this.baseUrl}/${endpoint}?${qs.stringify(params)}`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     return json;
    //   })
    //   .catch((error) => {
    //     // TODO: add error handling
    //     console.error('Weather Service Error', error);
    //   });
    return devResponse;
  }
}

export default WeatherService;
