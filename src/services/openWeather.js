import {OPEN_WEATHER_API_KEY} from 'react-native-dotenv';
import mockResponse from './mockResponse.json';

class OpenWeatherService {
  constructor(coords) {
    this.coords = coords;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getAllData() {
    // const response = await fetch(
    //   `${this.baseUrl}/onecall?lat=${this.coords.lat}&lon=${this.coords.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`,
    // )
    //   .then((res) => res.json())
    //   .then((json) => {
    //     return json;
    //   })
    //   .catch((error) => {
    //     // TODO: add error handling
    //     console.error('WEATHER', error);
    //   });
    const response = mockResponse;

    return response;
  }
}

export default OpenWeatherService;
