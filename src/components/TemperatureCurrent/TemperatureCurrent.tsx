import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Text, WeatherIcon, Icon, Hr } from '..';

interface Props {
  temp: number;
  min?: number;
  max?: number;
  label: string;
  iconId: number;
  sunMovement: {
    time?: number;
    type: string;
  };
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
  sunMovement,
}: Props) => {
  return (
    <Container>
      <DescriptionView>
        <WeatherIcon padding id={iconId} size={48} />
        <DescriptionText>{label}</DescriptionText>
      </DescriptionView>
      <TemperatureView>
        <Temperature weight="light">{Math.ceil(temp)}°</Temperature>
        {max && min && (
          <HighLowView>
            <HighLowItemView>
              <Icon padding name="arrow-up" size={12} />
              <Text size={24}>{Math.ceil(max)}°C</Text>
            </HighLowItemView>
            <Hr />
            <HighLowItemView>
              <Icon padding name="arrow-down" size={12} />
              <Text size={24}>{Math.floor(min)}°C</Text>
            </HighLowItemView>
          </HighLowView>
        )}
      </TemperatureView>
      <DetailsView>
        <Icon padding color="#ffffffb3" size={20} name={sunMovement.type} />
        <Text grey size={16} weight="bold">
          {moment(sunMovement.time, 'X').format('h:mm a')}
        </Text>
      </DetailsView>
    </Container>
  );
};

export default TemperatureCurrent;
