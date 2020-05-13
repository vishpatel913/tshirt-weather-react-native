export interface WeatherResponse {
  lat: number;
  lon: number;
  timezone: string;
  country: string;
  location: string;
  current: Weather;
  hourly: Weather[];
  daily: DailyWeather[];
}

export interface Weather {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  temp_min?: number;
  temp_max?: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_deg: number;
  rain?: number;
  snow?: number;
  weather: WeatherInfo[];
}

export interface DailyWeather extends Omit<Weather, 'temp' | 'feels_like'> {
  temp: Temp;
  feels_like: Temp;
}

export interface Temp {
  day: number;
  min?: number;
  max?: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}
