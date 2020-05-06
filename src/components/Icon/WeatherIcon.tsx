import React from 'react';
import { Icon } from '.';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  id: number;
  size?: number;
  color?: string;
}

const WeatherIcon = ({ id, ...rest }: Props) => {
  const { daytime } = useWeather();
  let iconName = '?';
  const withTime = (text: string) => `${text}-${daytime ? 'day' : 'night'}`;

  switch (Math.floor(id / 100)) {
    case 2:
      iconName = 'thunder';
      if (id < 202 || id > 229) iconName = withTime('rain');
      if (id === 202 || id === 232) iconName = 'shower-thunder';
      break;
    case 3:
      iconName = 'rain';
      if (id === 321) iconName = 'shower';
      if (id < 305) iconName = withTime('rain');
      break;
    case 5:
      iconName = 'shower';
      if (id === 511) iconName = 'snowflake';
      if (id < 505) iconName = withTime('rain');
      break;
    case 6:
      iconName = 'snow';
      if (id < 620) iconName = daytime ? 'sleet-day' : 'snow-night';
      if (id < 615) iconName = 'rain-mixed';
      if (id < 610) iconName = withTime('snow');
      break;
    case 7:
      iconName = 'mist';
      if (id === 781) iconName = 'tornado';
      break;
    case 8:
      iconName = 'clouds';
      if (id < 803) iconName = withTime('clouds');
      if (id === 800) iconName = withTime('clear');
      break;
    default:
      break;
  }
  return <Icon name={iconName} {...rest} />;
};

export default WeatherIcon;
