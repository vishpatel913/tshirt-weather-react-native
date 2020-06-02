import React, { ReactNode } from 'react';
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
  position: relative;
`;
const Content = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 64px;

  margin-left: ${({ theme }) => theme.spacing.single};
`;
const SubIcons = styled.View<{ children: ReactNode[] }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  ${({ children }) =>
    children?.length &&
    `width: ${children.filter((item) => !!item).length * 40}px`};
`;

const CLOTHING_CONFIG = [
  {
    label: "It's T-shirt weather!",
    icon: <Tshirt height={64} width={64} />,
  },
  {
    label: "It's T-shirt weather!",
    icon: <Tshirt height={64} width={64} />,
  },
  { label: 'Maybe a light jacket', icon: <Jacket height={64} width={64} /> },
  { label: 'Hoodie or jumper', icon: <Hoodie height={64} width={64} /> },
  { label: "It's cold, try a coat", icon: <Coat height={64} width={64} /> },
  { label: 'Multiple layers for sure', icon: <Coat height={64} width={64} /> },
];

const ClothingDetails = ({ data }: Props) => {
  const { upper, lower, sunglasses, umbrella, woolies } = data;
  return (
    <Container>
      {CLOTHING_CONFIG[upper].icon}
      <Content>
        <Text size={20}>{CLOTHING_CONFIG[upper].label}</Text>
        <SubIcons>
          {lower < 1 ? (
            <Shorts height={32} width={32} />
          ) : (
            <Jeans height={32} width={32} />
          )}
          {sunglasses && <Sunglasses height={32} width={32} />}
          {umbrella && <Umbrella height={32} width={32} />}
          {woolies && <Hat height={32} width={32} />}
          {woolies && <Scarf height={32} width={32} />}
        </SubIcons>
      </Content>
    </Container>
  );
};

export default ClothingDetails;
