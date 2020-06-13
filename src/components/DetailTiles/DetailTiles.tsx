import React from 'react';
import styled from 'styled-components/native';
import { WeatherNumberValue, WeatherStringValue } from 'src/types/weather';
import { Icon, Text } from '..';

interface Props {
  data?: Detail[];
}

interface Detail {
  text: string;
  icon: string;
  content?: WeatherNumberValue | WeatherStringValue;
}

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const TileContainer = styled.View`
  width: 30%;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing.single};
  background: rgba(225, 225, 225, 0.1);
  margin-bottom: ${({ theme }) => theme.spacing.single};
`;
const Label = styled(Text)`
  margin-top: 4px;
`;

const roundValue = (value: number | string) =>
  typeof value === 'number' && value !== 100 ? value.toPrecision(2) : value;

const DetailTiles = ({ data }: Props) => {
  return (
    <Container>
      {data?.map((item) => (
        <TileContainer key={item.icon}>
          <Icon name={item.icon} size={32} />
          <Label size={12}>{item.text}</Label>
          {item.content && (
            <Text size={20}>{`${roundValue(item.content?.value)}${
              item.content?.units || ''
            }`}</Text>
          )}
        </TileContainer>
      ))}
    </Container>
  );
};

export default DetailTiles;
