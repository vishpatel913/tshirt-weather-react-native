import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import {
  LocationHeader,
  TemperatureHeader,
  Layout,
  HourlyGraph,
  ClothingDetails,
  Section,
} from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: space-between;
`;

const Home = ({ weather }: Props) => {
  const { location, current, hourly, daily, status, isLoading } = weather;

  return (
    <PageLayout landscape>
      <Section>
        <LocationHeader location={location} />
      </Section>
      <Section flex={1} loading={!current}>
        {current && daily && (
          <TemperatureHeader
            temp={current.temp.value}
            min={daily[0].temp.min?.value}
            max={daily[0].temp.max?.value}
            label={current.weather_code.value}
            icon={current.weather_code.value}
          />
        )}
      </Section>
      {status && !isLoading && (
        <Section>
          <ClothingDetails
            upper={status.clothing.upper}
            lower={status.clothing.lower}
            sunglasses={status.sunny}
            umbrella={status.precipChance}
            woolies={status.cold}
          />
        </Section>
      )}
      <Section loading={!hourly}>
        <HourlyGraph
          domain={[2, 0]}
          data={hourly?.map((item) => ({
            x: moment(item.observation_time.value).format('ha'),
            y: Math.ceil(item.temp.value),
            timestamp: item.observation_time.value,
            units: '°',
            icon: item.weather_code.value,
            additional: item.precipitation_probability,
          }))}
        />
      </Section>
    </PageLayout>
  );
};

export default withWeather(Home);
