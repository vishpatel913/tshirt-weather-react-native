import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import { Layout, SectionTitle, DailyForecast } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: space-between;
`;
const SectionView = styled.View``;

const Data = ({ weather }: Props) => {
  const { daily } = weather;

  return (
    <>
      <SafeAreaView>
        <PageLayout>
          <SectionView>
            <SectionTitle>Next 7 days</SectionTitle>
            <DailyForecast
              data={daily?.map((item) => ({
                timestamp: item.dt,
                icon: item.weather[0].id,
                tempMax: item.temp.max,
                tempMin: item.temp.min,
                additional: item.rain || item.snow || undefined,
              }))}
            />
          </SectionView>
        </PageLayout>
      </SafeAreaView>
    </>
  );
};

export default withWeather(Data);
