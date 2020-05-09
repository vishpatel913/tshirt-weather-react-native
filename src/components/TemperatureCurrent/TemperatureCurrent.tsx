import React from 'react';
import styled from 'styled-components/native';
import { Text, WeatherIcon, Icon } from '..';

interface Props {
  temp: number;
  min?: number;
  max?: number;
  label: string;
  iconId: number;
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
const HighLowView = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
`;
const HighLowItemView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const TemperatureCurrent = ({ temp, min, max, label, iconId }: Props) => {
  return (
    <Container>
      <DescriptionView>
        <WeatherIcon id={iconId} size={48} />
        <DescriptionText>{label}</DescriptionText>
      </DescriptionView>
      <TemperatureView>
        <Temperature weight="light">{Math.ceil(temp)}°</Temperature>
        {max && min && (
          <HighLowView>
            <HighLowItemView>
              <Icon name="arrow-up" size={12} />
              <Text size={24}>{Math.ceil(max)}°C</Text>
            </HighLowItemView>
            <Hr />
            <HighLowItemView>
              <Icon name="arrow-down" size={12} />
              <Text size={24}>{Math.floor(min)}°C</Text>
            </HighLowItemView>
          </HighLowView>
        )}
      </TemperatureView>
      <DetailsView />
    </Container>
  );
};

export default TemperatureCurrent;
