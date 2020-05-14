import React from 'react';
import styled from 'styled-components/native';

import moment from 'moment';
import {
  Layout,
  Section,
  DetailTiles,
  HourlyGraph,
  DailyForecast,
} from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: flex-start;
`;

const Data = ({ weather }: Props) => {
  const { current, daily, hourly } = weather;
  const detailsData = [
    {
      text: 'Feels Like',
      icon: 'thermometer',
      value: current ? Math.ceil(current.feels_like) : undefined,
      unit: '°',
    },
    {
      text: 'Cloud Cover',
      icon: 'cloud',
      value: current?.clouds,
      unit: '%',
    },
    {
      text: 'UV Index',
      icon: 'hot',
      value: current?.uvi,
    },
    {
      text: 'Wind Speed',
      icon: 'wind',
      value: current?.wind_speed,
      unit: 'm/s',
    },
    {
      text: 'Humidity',
      icon: 'humidity',
      value: current?.humidity,
      unit: '%',
    },
    {
      text: 'Pressure',
      icon: 'barometer',
      value: current?.pressure,
      unit: 'hPa',
    },
  ];
  const precip = daily?.[0].rain ? 'rain' : daily?.[0].snow ? 'snow' : null;

  return (
    <PageLayout>
      <Section title="Details">
        <DetailTiles data={detailsData} />
      </Section>
      <Section title={precip || 'cloud cover'}>
        <HourlyGraph
          domain={precip ? undefined : [10, 0]}
          data={hourly?.map((item) => ({
            x: moment.unix(item.dt).format('ha'),
            y: precip ? (item.rain || item.snow) ?? 0 : item.clouds,
            icon: precip
              ? item.rain
                ? 300
                : item.snow
                ? 600
                : undefined
              : 804,
            additional: precip
              ? item.rain || item.snow
                ? `${item.rain || item.snow}mm`
                : undefined
              : `${item.clouds}%`,
          }))}
        />
      </Section>
      <Section title="Next 7 days">
        <DailyForecast
          data={daily?.map((item) => ({
            timestamp: item.dt,
            icon: item.weather[0].id,
            tempMax: item.temp.max,
            tempMin: item.temp.min,
            additional: item.rain || item.snow || undefined,
          }))}
        />
      </Section>
    </PageLayout>
  );
};

export default withWeather(Data);
