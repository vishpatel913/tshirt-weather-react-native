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
  const { location, current, hourly, daily } = weather;

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
      {current && daily && (
        <Section>
          <ClothingDetails
            upper={current.clothing_upper.value}
            lower={current.clothing_lower.value}
            sunglasses={current.cloud_cover.value < 30}
            umbrella={daily[0].precipitation_probability.value > 0}
            woolies={current.temp.value < 5}
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
            additional:
              item.precipitation_type.value !== 'none'
                ? {
                    ...item.precipitation_probability,
                    type: item.precipitation_type.value,
                  }
                : undefined,
          }))}
        />
      </Section>
    </PageLayout>
  );
};

export default withWeather(Home);
