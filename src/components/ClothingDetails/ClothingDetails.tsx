import React from 'react';
import styled from 'styled-components/native';
import { Clothing } from '../../types/weather';
import {
  Tshirt,
  Jacket,
  Hoodie,
  Coat,
  Jeans,
  Shorts,
  Sunglasses,
  Hat,
  Scarf,
  Umbrella,
} from './ClothingVector';
import { Text } from '..';

interface Props {
  data: Clothing;
}

const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Content = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CLOTHING_CONFIG = [
  <Tshirt height={64} />,
  <Tshirt height={64} />,
  <Jacket height={64} />,
  <Hoodie height={64} />,
  <Coat height={64} />,
  <Coat height={64} />,
];

const ClothingDetails = ({ data }: Props) => {
  return (
    <Container>
      {CLOTHING_CONFIG[data.upper]}
      <Content>
        <Text>T-shirt Weather</Text>
      </Content>
    </Container>
  );
};

export default ClothingDetails;
