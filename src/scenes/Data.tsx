import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import { Layout, SectionTitle } from '../components';
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
  // const { hourly } = weather;
  // const daytime = isDaytime();

  return (
    <>
      <SafeAreaView>
        <PageLayout>
          <SectionView>
            <SectionTitle>Details</SectionTitle>
          </SectionView>
        </PageLayout>
      </SafeAreaView>
    </>
  );
};

export default withWeather(Data);
