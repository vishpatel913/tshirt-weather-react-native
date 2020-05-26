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
  const { location, current, hourly, clothing } = weather;

  return (
    <PageLayout landscape>
      <Section>
        <LocationHeader location={location} />
      </Section>
      <Section>
        {current && (
          <TemperatureHeader
            temp={current.temp.value}
            min={current.temp_min.value}
            max={current.temp_max.value}
            label={current.weather_code.value}
            icon={current.weather_code.value}
          />
        )}
      </Section>
      {/* {clothing && (
        <Section>
          <ClothingDetails data={clothing} />
        </Section>
      )} */}
      <Section>
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
