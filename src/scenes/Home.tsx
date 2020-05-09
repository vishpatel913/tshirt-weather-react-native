import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';

import {
  LocationHeader,
  TemperatureCurrent,
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

const Home = ({ weather }: Props) => {
  const { geocoding, current, hourly, isDaytime, actions } = weather;
  const daytime = isDaytime();

  useEffect(() => {
    actions?.getLocation();
  }, []);

  return (
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
            domain={[2, 0]}
            data={hourly?.map((item) => ({
              x: moment(item.dt, 'X').format('ha'),
              y: Math.ceil(item.temp),
              label: `${Math.ceil(item.temp)}°`,
              timestamp: item.dt,
              icon: item.weather[0].id,
              additional:
                item.rain || item.snow
                  ? `${item.rain?.['1h'] || item.snow?.['1h']}mm`
                  : undefined,
            }))}
          />
        </PageLayout>
      </SafeAreaView>
    </>
  );
};

export default withWeather(Home);
