import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Text, WeatherIcon } from '..';

interface Props {
  data?: Day[];
}

interface Day {
  timestamp: number;
  icon: number;
  tempMax?: number;
  tempMin?: number;
  additional?: number;
}

const Container = styled.View`
  margin-bottom: ${({ theme }) => theme.spacing.double};
  flex-direction: row;
  justify-content: space-between;
`;
const DayContainer = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 136px;
`;
const Hr = styled.View`
  width: 80%;
  border: solid 0.5px white;
  opacity: 0.5;
`;

const DailyForecast = ({ data = [] }: Props) => {
  return (
    <Container>
      {data.slice(0, 7).map((item: Day) => (
        <DayContainer key={item.timestamp}>
          <Text size={20}>{moment.unix(item.timestamp).format('ddd')}</Text>
          <Text grey size={12} weight="bold">
            {item.additional && `${item.additional}%`}
          </Text>
          <WeatherIcon
            id={item.icon}
            size={28}
            timestamp={moment(12, 'HH').unix()}
          />
          <Text size={20}>{item.tempMax && `${Math.ceil(item.tempMax)}°`}</Text>
          <Hr />
          <Text grey size={20}>
            {item.tempMin && `${Math.ceil(item.tempMin)}°`}
          </Text>
        </DayContainer>
      ))}
    </Container>
  );
};

export default DailyForecast;
