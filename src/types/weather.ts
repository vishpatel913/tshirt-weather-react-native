export interface WeatherResponse {
  location: string;
  current: Weather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
  clothing: Clothing;
}

export interface Weather {
  temp: WeatherNumberValue;
  feels_like: WeatherNumberValue;
  temp_min: WeatherNumberValue;
  temp_max: WeatherNumberValue;
  dewpoint: WeatherNumberValue;
  humidity: WeatherNumberValue;
  visibility: WeatherNumberValue;
  cloud_cover: WeatherNumberValue;
  wind_speed: WeatherNumberValue;
  wind_direction: WeatherNumberValue;
  baro_pressure: WeatherNumberValue;
  precipitation: WeatherNumberValue;
  precipitation_type: WeatherCodeValue;
  moon_phase: WeatherStringValue;
  sunrise: WeatherStringValue;
  sunset: WeatherStringValue;
  weather_code: WeatherCodeValue;
  observation_time: WeatherStringValue;
}

export interface HourlyWeather extends Omit<Weather, 'temp_min' | 'temp_max'> {
  precipitation_probability: WeatherNumberValue;
}

export interface DailyWeather {
  temp: DailyWeatherValue[];
  feels_like: DailyWeatherValue[];
  humidity: DailyWeatherValue[];
  visibility: DailyWeatherValue[];
  wind_speed: DailyWeatherValue[];
  wind_direction: DailyWeatherValue[];
  baro_pressure: DailyWeatherValue[];
  precipitation: DailyWeatherValue[];
  precipitation_probability: WeatherNumberValue;
  precipitation_accumulation: WeatherNumberValue;
  sunrise: WeatherStringValue;
  sunset: WeatherStringValue;
  weather_code: WeatherCodeValue;
  observation_time: WeatherStringValue;
}

export interface Clothing {
  upper: number;
  lower: number;
  sunglasses?: boolean;
  umbrella?: boolean;
  woolies?: boolean;
}

export interface WeatherNumberValue {
  value: number;
  units?: string;
}

export interface WeatherStringValue {
  value: string;
  units?: string;
}

export interface DailyWeatherValue {
  observation_time: string;
  min?: WeatherNumberValue;
  max?: WeatherNumberValue;
}

export enum WeatherCode {
  rain_heavy = 'rain_heavy',
  rain = 'rain',
  rain_light = 'rain_light',
  freezing_rain_heavy = 'freezing_rain_heavy',
  freezing_rain = 'freezing_rain',
  freezing_rain_light = 'freezing_rain_light',
  freezing_drizzle = 'freezing_drizzle',
  drizzle = 'drizzle',
  ice_pellets_heavy = 'ice_pellets_heavy',
  ice_pellets = 'ice_pellets',
  ice_pellets_light = 'ice_pellets_light',
  snow_heavy = 'snow_heavy',
  snow = 'snow',
  snow_light = 'snow_light',
  flurries = 'flurries',
  tstorm = 'tstorm',
  fog_light = 'fog_light',
  fog = 'fog',
  cloudy = 'cloudy',
  mostly_cloudy = 'mostly_cloudy',
  partly_cloudy = 'partly_cloudy',
  mostly_clear = 'mostly_clear',
  clear = 'clear',
  none = 'na',
}
export interface WeatherCodeValue {
  value: keyof typeof WeatherCode;
}

export enum MoonPhase {
  new_moon = 'new_moon',
  waxing_crescent = 'waxing_crescent',
  first_quarter = 'first_quarter',
  waxing_gibbous = 'waxing_gibbous',
  full = 'full',
  waning_gibbous = 'waning_gibbous',
  third_quarter = 'third_quarter',
  waning_crescent = 'waning_crescent',
}
