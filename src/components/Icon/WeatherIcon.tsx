import React from 'react';
import moment from 'moment';
import { Icon } from '.';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  id: number;
  size?: number;
  color?: string;
}

const WeatherIcon = ({ id, ...rest }: Props) => {
  const { day } = useWeather();
  let iconName = '?';
  const withTag = (text: string) => `${text}-${day ? 'day' : 'night'}`;

  switch (Math.floor(id / 100)) {
    case 2:
      iconName = 'thunder';
      if (id < 202 || id > 229) iconName = withTag('rain-light');
      if (id === 202 || id === 232) iconName = 'rain-heavy-thunder';
      break;
    case 3:
      iconName = 'rain';
      if (id === 321) iconName = 'rain-heavy';
      if (id < 305) iconName = withTag('rain-light');
      break;
    case 5:
      iconName = 'rain-heavy';
      if (id === 511) iconName = 'snowflake';
      if (id < 505) iconName = withTag('rain-light');
      break;
    case 6:
      iconName = 'snow';
      if (id < 620) iconName = day ? 'sleet-day' : 'snow-night';
      if (id < 615) iconName = 'rain-mixed';
      if (id < 610) iconName = withTag('snow');
      break;
    case 7:
      iconName = 'mist';
      if (id === 781) iconName = 'tornado';
      break;
    case 8:
      iconName = 'clouds';
      if (id === 800) withTag('clear');
      if (id < 803) iconName = withTag('clouds');
      break;
    default:
      break;
  }
  return <Icon name={iconName} {...rest} />;
};

export default WeatherIcon;
