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
  const { current, daily, hourly, status, isDaytime } = weather;
  const sunKey = isDaytime() ? 'sunset' : 'sunrise';
  const willRain = status?.precipChance;

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

  return (
    <PageLayout>
      <Section title="Details">
        <DetailTiles data={detailsData} />
      </Section>
      <Section
        multi={[
          {
            index: +!willRain,
            title: `chance of ${toTitleCase(
              current?.precipitation_type.value.replace('none', 'rain') ||
                'rain',
            )}`,
            icon: 'raindrops',
          },
          { index: +!!willRain, title: 'cloud cover', icon: 'cloud' },
        ]}>
        <HourlyGraph
          data={hourly?.map((item) => ({
            x: moment(item.observation_time.value).format('ha'),
            y: Math.ceil(item.precipitation_probability.value),
            units: item.precipitation_probability.units,
            timestamp: item.observation_time.value,
            icon:
              item.precipitation_probability.value > 0
                ? item.precipitation_type.value
                : undefined,
            additional: item.precipitation,
          }))}
        />
        <HourlyGraph
          domain={[10, 0]}
          data={hourly?.map((item) => ({
            x: moment(item.observation_time.value).format('ha'),
            y: Math.ceil(item.cloud_cover.value),
            units: item.cloud_cover.units,
            timestamp: item.observation_time.value,
            icon: item.weather_code.value,
          }))}
        />
      </Section>
      <Section title="Next 7 days">
        <DailyForecast
          data={daily?.map((item) => ({
            timestamp: item.observation_time.value,
            icon: item.weather_code.value,
            tempMax: item.temp.max?.value,
            tempMin: item.temp.min?.value,
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
