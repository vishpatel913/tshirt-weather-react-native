import React from 'react';
import styled from 'styled-components/native';
import { Text, WeatherIcon, Icon, Hr } from '..';
import { WeatherCode } from '../../types/weather';
import { toTitleCase } from '../../modules/utils';

interface Props {
  temp: number;
  min?: number;
  max?: number;
  label: string;
  icon: keyof typeof WeatherCode;
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

const TemperatureHeader = ({ temp, min, max, label, icon }: Props) => {
  const titleDescription = toTitleCase(
    label
      .split('_')
      .slice(0, 2)
      .reduce(
        (a, c) => (['heavy', 'light'].includes(c) ? [c, ...a] : [...a, c]),
        [''],
      )
      .join(' '),
  ).trim();
  return (
    <Container>
      <DescriptionView>
        <WeatherIcon padding name={icon} size={48} />
        <DescriptionText>{titleDescription}</DescriptionText>
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
      <DetailsView />
    </Container>
  );
};

export default TemperatureHeader;
