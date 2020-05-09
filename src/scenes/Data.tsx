import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import { Text, Layout, HourlyGraph } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  display: flex;
  justify-content: space-between;
`;

const Data = ({ weather }: Props) => {
  // const { geocoding, current, hourly, isDaytime } = weather;
  // const daytime = isDaytime();

  return (
    <>
      <SafeAreaView>
        <PageLayout>
          {/* <HourlyGraph
            data={hourly.map((item) => ({
              x: moment(item.dt, 'X').format('ha'),
              y: Math.ceil(item.temp),
              label: `${Math.ceil(item.temp)}°`,
              timestamp: item.dt,
              icon: item.weather[0].id,
              additional: item.rain?.['1h'] || item.snow?.['1h'] || undefined,
            }))}
          /> */}
        </PageLayout>
      </SafeAreaView>
    </>
  );
};

export default withWeather(Data);
