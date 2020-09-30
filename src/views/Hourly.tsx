import React, { Fragment } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { ScrollView } from 'react-native';
import { WeatherState, withWeather } from '../modules/weatherContext';
import { Layout, Header, WeatherIcon, Text, Icon, Hr } from '../components';
import { HourlyWeather } from '../types/weather';
import { toTitleCase } from '../modules/utils';

interface Props {
  weather: WeatherState;
}

const ItemContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  height: 52px;
`;
const Column = styled.View<{ flex: number }>`
  flex: ${({ flex }) => flex};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Description = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin-right: 16px;
`;
const Details = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Hourly = ({ weather }: Props) => {
  const { hourly } = weather;
  return (
    <Layout>
      <Header title="Hourly Weather" back />
      <ScrollView>
        {hourly?.map(
          (hour: HourlyWeather, i) =>
            i < 24 && (
              <Fragment key={hour.observation_time.value}>
                <ItemContainer>
                  <Column flex={3}>
                    <Text size={24} weight="bold">
                      {moment(hour.observation_time.value).format('ha')}
                    </Text>
                    <Description>
                      <Text size={20}>
                        {toTitleCase(hour.weather_code.value)}
                      </Text>
                      <Details>
                        <>
                          <Icon padding size={12} name="cloud" />
                          <Text size={12}>
                            {Math.ceil(hour.cloud_cover.value)}
                            {hour.cloud_cover.units}
                          </Text>
                        </>
                        <>
                          <Icon padding size={12} name="raindrops" />
                          <Text size={12}>
                            {Math.ceil(hour.precipitation_probability.value)}
                            {hour.precipitation_probability.units}
                          </Text>
                        </>
                      </Details>
                    </Description>
                  </Column>
                  <Column flex={1}>
                    <WeatherIcon
                      padding
                      size={28}
                      name={hour.weather_code.value}
                    />
                    <Text size={24} weight="bold">
                      {Math.ceil(hour.temp.value)}
                      {hour.temp.units}
                    </Text>
                  </Column>
                </ItemContainer>
                <Hr grey />
              </Fragment>
            ),
        )}
      </ScrollView>
    </Layout>
  );
};

export default withWeather(Hourly);
