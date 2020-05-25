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
import { toTitleCase } from '../modules/utils';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: flex-start;
`;

const Data = ({ weather }: Props) => {
  const { current, daily, hourly, isDaytime } = weather;
  const sunKey = isDaytime() ? 'sunset' : 'sunrise';

  const detailsData = [
    {
      text: 'Feels Like',
      icon: 'thermometer',
      content: current?.feels_like,
    },
    {
      text: 'Cloud Cover',
      icon: 'cloud',
      content: current?.cloud_cover,
    },
    {
      text: 'Wind Speed',
      icon: 'wind',
      content: current?.wind_speed,
    },
    {
      text: toTitleCase(sunKey),
      icon: sunKey,
      content: { value: moment(current?.[sunKey].value).format('HH:mm') },
    },
    {
      text: 'Humidity',
      icon: 'humidity',
      content: current?.humidity,
    },
    {
      text: 'Moon Phase',
      icon: current
        ? `moon-${current.moon_phase.value.replace('_', '-')}`
        : 'lunar-eclipse',
    },
  ];
  const precip =
    hourly &&
    Math.max(
      ...hourly.slice(0, 6).map((item) => item.precipitation_probability.value),
    ) > 10;

  return (
    <PageLayout>
      <Section title="Details">
        <DetailTiles data={detailsData} />
      </Section>
      <Section title={precip ? 'chance of rain' : 'cloud cover'}>
        <HourlyGraph
          domain={precip ? undefined : [10, 0]}
          data={hourly?.map((item) => ({
            x: moment(item.observation_time.value).format('ha'),
            y: precip
              ? item.precipitation_probability.value
              : item.cloud_cover.value,
            timestamp: item.observation_time.value,
            icon: precip
              ? item.precipitation_type.value
              : item.weather_code.value,
            additional: precip
              ? { ...item.precipitation, type: item.precipitation_type.value }
              : item.cloud_cover,
          }))}
        />
      </Section>
      <Section title="Next 7 days">
        <DailyForecast
          data={daily?.map((item) => ({
            timestamp: item.observation_time.value,
            icon: item.weather_code.value,
            tempMax: item.temp[1].max?.value,
            tempMin: item.temp[0].min?.value,
            additional:
              item.precipitation_probability.value > 0
                ? item.precipitation_probability
                : undefined,
          }))}
        />
      </Section>
    </PageLayout>
  );
};

export default withWeather(Data);
