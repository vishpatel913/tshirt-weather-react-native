import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import {
  LocationHeader,
  TemperatureCurrent,
  Text,
  Layout,
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
  const { current, daytime, geocoding, actions } = weather;

  useEffect(() => {
    actions?.getLocation();
  }, []);

  return current ? (
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
          <View />
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
