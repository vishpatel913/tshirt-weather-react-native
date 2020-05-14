import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Text } from '..';

interface Props {
  title?: string;
  flex?: number;
  children: ReactNode;
}

const Container = styled.View<Props>`
  margin: ${({ theme }) => theme.spacing.single} 0;
  ${({ flex }) => flex && `flex: ${flex}`}
`;
const Title = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.single};
`;
const Stroke = styled.View`
  flex-grow: 1;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  opacity: 0.5;
  margin-left: ${({ theme }) => theme.spacing.half};
`;

const SectionTitle = ({ title, flex, children }: Props) => (
  <Container flex={flex}>
    {title && (
      <Title>
        <Text weight="bold" transform="uppercase">
          {title}
        </Text>
        <Stroke />
      </Title>
    )}
    {children}
  </Container>
);

export default SectionTitle;
