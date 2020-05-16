import React from 'react';
import styled from 'styled-components/native';
import { Icon, Text } from '..';

interface Props {
  data?: Detail[];
}

interface Detail {
  text: string;
  icon: string;
  value?: number | string;
  unit?: string;
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
  margin-top: ${({ theme }) => theme.spacing.half};
`;

const DetailTiles = ({ data }: Props) => {
  return (
    <Container>
      {data?.map((item) => (
        <TileContainer key={item.icon}>
          <Icon name={item.icon} size={36} />
          <Label size={12}>{item.text}</Label>
          <Text size={20}>{`${item.value}${item.unit || ''}`}</Text>
        </TileContainer>
      ))}
    </Container>
  );
};

export default DetailTiles;
