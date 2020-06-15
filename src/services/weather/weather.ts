import qs from 'querystring';
import { Coords } from '../../types/coords';
import { WeatherResponse } from '../../types/weather';

interface Clothing {
  upper: string;
  lower?: string;
}

class WeatherService {
  coords: Coords;
  baseUrl: string;
  constructor(coords: Coords) {
    this.coords = coords;
    this.baseUrl =
      'https://486izb204e.execute-api.us-east-1.amazonaws.com/prod';
    // 'http://localhost:5000/prod';
  }

  async get(endpoint: string): Promise<WeatherResponse> {
    const params = {
      lat: this.coords.lat,
      lon: this.coords.lon,
      // mocks: '*',
    };

    const response = await fetch(
      `${this.baseUrl}/${endpoint}?${qs.stringify(params)}`,
    )
      .then((res) => res.json())
      .then((json) => {
        if (json.message?.includes('error')) throw json.message;
        return json;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  }

  async saveClothing(clothing: Clothing) {
    let data = {
      method: 'POST',
      body: JSON.stringify(clothing),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const response = fetch(`${this.baseUrl}/weather`, data)
      .then((res) => res.json()) // promise
      .then((json) => {
        if (json.message?.includes('error')) throw json.message;
        return json;
      })
      .catch((error) => {
        throw new Error(error);
      });

    return response;
  }
}

export default WeatherService;
