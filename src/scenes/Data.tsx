import React from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';

import moment from 'moment';
import {
  Layout,
  SectionTitle,
  HourlyGraph,
  DailyForecast,
} from '../components';
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
  const { daily, hourly } = weather;
  const precip = daily?.[0].rain ? 'rain' : daily?.[0].snow ? 'snow' : null;

  return (
    <>
      <SafeAreaView>
        <PageLayout>
          <SectionView>
            <SectionTitle>{precip || 'rain'}</SectionTitle>
            <HourlyGraph
              domain={[0, 0]}
              data={hourly?.map((item) => ({
                x: moment.unix(item.dt).format('ha'),
                y: (item.rain || item.snow)?.['1h'] ?? 0,
                icon: item.rain ? 300 : item.snow ? 600 : undefined,
                additional:
                  item.rain || item.snow
                    ? `${(item.rain || item.snow)?.['1h']}mm`
                    : undefined,
              }))}
            />
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
