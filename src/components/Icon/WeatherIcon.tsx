import React from 'react';
import { WeatherCode } from '../../types/weather';
import { Icon } from '.';
import { useWeather } from '../../modules/weatherContext';

const iconMap = {
  rain_heavy: 'rain',
  rain: 'rain',
  rain_light: 'shower',
  freezing_rain_heavy: 'sleet',
  freezing_rain: 'sleet',
  freezing_rain_light: 'sleet',
  freezing_drizzle: 'mixed',
  drizzle: 'shower',
  ice_pellets_heavy: 'hail',
  ice_pellets: 'hail',
  ice_pellets_light: 'sleet',
  snow_heavy: 'snow',
  snow: 'snow',
  snow_light: 'snow',
  flurries: 'windy',
  tstorm: 'thunderstorm',
  fog_light: 'fog',
  fog: 'fog',
  cloudy: 'cloudy',
  mostly_cloudy: 'cloud',
  partly_cloudy: 'cloud-',
  mostly_clear: 'cloud-',
  clear: 'clear-',
  none: 'na',
};

interface Props {
  name: keyof typeof WeatherCode;
  timestamp?: string;
  size?: number;
  color?: string;
  padding?: boolean;
}

const WeatherIcon = ({ name, timestamp, ...rest }: Props) => {
  const { isDaytime } = useWeather();
  const isDay = isDaytime(timestamp);
  let iconName: string = WeatherCode.none;
  iconName = iconMap[name].replace('-', `-${isDay ? 'day' : 'night'}`);

  return <Icon name={iconName} {...rest} />;
};

export default WeatherIcon;
