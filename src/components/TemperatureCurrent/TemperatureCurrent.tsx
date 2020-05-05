import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Text, WeatherIcon, Icon } from '..';

interface Props {
  temp: number;
  min?: number;
  max?: number;
  label: string;
  iconId: number;
  sunChange?: number;
}

const Container = styled.View`
  padding: ${({ theme }) => theme.spacing.double};
`;
const DescriptionView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DescriptionText = styled(Text)`
  font-size: 36px;
`;
const TemperatureView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;
const Temperature = styled(Text)`
  flex: 3;
  font-size: 128px;
  line-height: 132px;
`;
const VariationView = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
`;
const VariationRule = styled.View`
  width: 100%;
  border: solid 0.5px white;
  opacity: 0.5;
  margin: 8px;
`;
const DetailsView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TemperatureCurrent = ({
  temp,
  min,
  max,
  label,
  iconId,
  sunChange,
}: Props) => {
  const sunTime = moment(sunChange, 'X').format('hh:mm a');
  return (
    <Container>
      <DescriptionView>
        <WeatherIcon id={iconId} size={32} />
        <DescriptionText>{label}</DescriptionText>
      </DescriptionView>
      <TemperatureView>
        <Temperature weight="light">{Math.ceil(temp)}°</Temperature>
        <VariationView>
          <Text size={24}>{max}°C</Text>
          <VariationRule />
          <Text size={24}>{min}°C</Text>
        </VariationView>
      </TemperatureView>
      <DetailsView>
        <Icon name="horizon" size={12} />
        <Text>{sunTime}</Text>
      </DetailsView>
    </Container>
  );
};

export default TemperatureCurrent;
