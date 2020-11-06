import React from 'react';
import styled from 'styled-components/native';
import { WeatherNumberValue, WeatherStringValue } from 'src/types/weather';
import { Icon, Text } from '..';
import { roundValue } from '../../modules/utils';

interface Props {
  data?: Detail[];
}

interface Detail {
  text: string;
  icon: string;
  content?: WeatherNumberValue | WeatherStringValue;
}

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const TileContainer = styled.View`
  width: 30%;
  align-items: center;
  justify-content: space-around;
  padding: ${({ theme }) => theme.spacing()};
  background: ${({ theme }) => theme.colors.background};
  margin-bottom: ${({ theme }) => theme.spacing()};
  border-radius: 4px;
`;
const Label = styled(Text)`
  margin-top: 4px;
`;

const DetailTiles = ({ data }: Props) => {
  return (
    <GridContainer>
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
    </GridContainer>
  );
};

export default DetailTiles;
