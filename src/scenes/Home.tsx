import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import {
  LocationHeader,
  TemperatureCurrent,
  Text,
  Layout,
  HourlyGraph,
} from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: space-between;
`;

const LoadingContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ weather }: Props) => {
  const { geocoding, current, hourly, isDaytime, actions, isLoading } = weather;
  const daytime = isDaytime();

  useEffect(() => {
    actions?.getLocation();
  }, []);

  return !isLoading ? (
    <>
      <SafeAreaView>
        <PageLayout landscape>
          <LocationHeader location={geocoding?.location} />
          {current && (
            <TemperatureCurrent
              temp={current.temp}
              min={current.temp_min}
              max={current.temp_max}
              label={current.weather[0].main}
              iconId={current.weather[0].id}
              sunChange={daytime ? current.sunset : current.sunrise}
            />
          )}
          <HourlyGraph
            data={hourly?.map((item) => ({
              x: moment(item.dt, 'X').format('ha'),
              y: Math.ceil(item.temp),
              label: `${Math.ceil(item.temp)}°`,
              timestamp: item.dt,
              icon: item.weather[0].id,
              additional: item.rain?.['1h'] || item.snow?.['1h'] || undefined,
            }))}
          />
        </PageLayout>
      </SafeAreaView>
    </>
  ) : (
    <LoadingContainer>
      <Text size={32} weight="thin">
        Loading...
      </Text>
    </LoadingContainer>
  );
};

export default withWeather(Home);
