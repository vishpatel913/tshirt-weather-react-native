import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { LocationHeader, TemperatureMain, Text } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const ScrollContainer = styled.ScrollView`
  padding-top: 32px;
  background-color: ${({ theme }) => theme.color.purple};
  min-height: 120%;
`;
const LoadingContainer = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = ({ weather }: Props) => {
  const { current, day, geocoding, actions } = weather;

  useEffect(() => {
    actions?.getLocation();
  }, []);

  return current ? (
    <>
      <SafeAreaView>
        <ScrollContainer contentInsetAdjustmentBehavior="automatic">
          <LocationHeader location={geocoding.location} />
          <TemperatureMain
            temp={current.temp}
            min={current.temp_min}
            max={current.temp_max}
            label={current.weather[0].main}
            iconId={current.weather[0].id}
            sunChange={day ? current.sunset : current.sunrise}
          />
        </ScrollContainer>
      </SafeAreaView>
    </>
  ) : (
    <LoadingContainer>
      <Text weight={400}>Loading...</Text>
    </LoadingContainer>
  );
};

export default withWeather(Home);
