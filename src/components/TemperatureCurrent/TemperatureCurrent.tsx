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

const Container = styled.View``;
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
const Hr = styled.View`
  width: 100%;
  border: solid 0.5px white;
  opacity: 0.5;
  margin: ${({ theme }) => theme.spacing.half};
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
  const sunTime = moment(sunChange, 'X').format('h:mm a');
  return (
    <Container>
      <DescriptionView>
        <WeatherIcon id={iconId} size={40} />
        <DescriptionText>{label}</DescriptionText>
      </DescriptionView>
      <TemperatureView>
        <Temperature weight="light">{Math.ceil(temp)}°</Temperature>
        {max && min && (
          <VariationView>
            <Text size={24}>
              <Icon name="arrow-up" size={16} />
              {Math.ceil(max)}°C
            </Text>
            <Hr />
            <Text size={24}>
              <Icon name="arrow-down" size={16} />
              {Math.floor(min)}°C
            </Text>
          </VariationView>
        )}
      </TemperatureView>
      <DetailsView>
        <Icon name="horizon" size={20} />
        <Text>{sunTime}</Text>
      </DetailsView>
    </Container>
  );
};

export default TemperatureCurrent;
