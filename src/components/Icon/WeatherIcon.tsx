import React from 'react';
import { Icon } from '.';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  id: number;
  timestamp?: number;
  size?: number;
  color?: string;
  padding?: boolean;
}

const WeatherIcon = ({ id, timestamp, ...rest }: Props) => {
  const { isDaytime } = useWeather();
  const isDay = isDaytime(timestamp);
  let iconName = 'na';

  switch (Math.floor(id / 100)) {
    case 2:
      iconName = 'thunderstorm';
      break;
    case 3:
      iconName = 'shower';
      break;
    case 5:
      iconName = 'rain';
      if (id === 511) iconName = 'hail';
      if (id > 511) iconName = 'shower';
      break;
    case 6:
      iconName = 'snow';
      if (id > 610) iconName = 'sleet';
      if (id > 614) iconName = 'rain-mix';
      break;
    case 7:
      iconName = 'fog';
      if (id === 711 || id === 762) iconName = 'smoke';
      if (id === 781) iconName = 'tornado';
      if (id === 731 || id === 751 || id === 761) iconName = 'dust';
      break;
    case 8:
      iconName = `cloud-${isDay ? 'day' : 'night'}`;
      if (id === 800) iconName = `clear-${isDay ? 'day' : 'night'}`;
      if (id > 802) iconName = 'cloudy';
      break;
    default:
      break;
  }
  return <Icon name={iconName} {...rest} />;
};

export default WeatherIcon;
