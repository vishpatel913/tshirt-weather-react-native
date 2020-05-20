import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { WeatherNumberValue, WeatherCode } from '../../types/weather';
import { Text, WeatherIcon, Hr } from '..';

interface Props {
  data?: Day[];
}

interface Day {
  timestamp: string;
  icon: keyof typeof WeatherCode;
  tempMax?: number;
  tempMin?: number;
  additional?: WeatherNumberValue;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const DayContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 136px;
`;

const DailyForecast = ({ data = [] }: Props) => {
  return (
    <Container>
      {data.slice(1, 8).map((item: Day, i: number) => (
        <DayContainer key={item.timestamp}>
          <Text size={20}>{moment(item.timestamp).format('ddd')}</Text>
          <Text grey size={12} weight="bold">
            {item.additional && (
              <>
                {item.additional.value}
                {item.additional.units}
              </>
            )}
          </Text>
          <WeatherIcon
            name={item.icon}
            size={28}
            timestamp={moment(12, 'HH').format()}
          />
          <Text size={20}>{item.tempMax && `${Math.ceil(item.tempMax)}°`}</Text>
          <Hr padded />
          <Text grey size={20}>
            {item.tempMin && `${Math.ceil(item.tempMin)}°`}
          </Text>
        </DayContainer>
      ))}
    </Container>
  );
};

export default DailyForecast;
