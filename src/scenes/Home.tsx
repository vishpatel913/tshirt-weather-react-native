import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import {
  LocationHeader,
  TemperatureCurrent,
  Text,
  Layout,
  TemperatureHourly,
} from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const LoadingContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ weather }: Props) => {
  const { current, hourly, daytime, geocoding, actions } = weather;

  useEffect(() => {
    actions?.getLocation();
  }, []);

  return current && hourly ? (
    <>
      <SafeAreaView>
        <Layout landscape>
          <LocationHeader location={geocoding.location} />
          <TemperatureCurrent
            temp={current.temp}
            min={current.temp_min}
            max={current.temp_max}
            label={current.weather[0].main}
            iconId={current.weather[0].id}
            sunChange={daytime ? current.sunset : current.sunrise}
          />
          <TemperatureHourly
            data={hourly.map((item) => ({
              time: item.dt,
              temp: item.temp,
              icon: item.weather[0].id,
            }))}
          />
        </Layout>
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
