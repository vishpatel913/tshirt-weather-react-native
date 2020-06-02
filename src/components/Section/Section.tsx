import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
// import { ActivityIndicator } from 'react-native';
import { Text } from '..';

interface Props {
  children: ReactNode;
  title?: string;
  flex?: number;
  loading?: boolean;
}

const Container = styled.View<Props>`
  margin: ${({ theme }) => theme.spacing.single} 0;
  ${({ flex }) =>
    flex &&
    `
      flex: ${flex};
      justify-content: center;
  `}
`;
const Title = styled.View`
  flex-direction: row;
  margin-bottom: ${({ theme }) => theme.spacing.single};
`;
const Stroke = styled.View`
  flex-grow: 1;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.color.white};
  opacity: 0.5;
  margin-left: ${({ theme }) => theme.spacing.half};
`;

const SectionTitle = ({ title, flex, loading, children }: Props) => (
  <Container flex={flex}>
    {title && (
      <Title>
        <Text weight="bold" transform="uppercase">
          {title}
        </Text>
        <Stroke />
      </Title>
    )}
    {/* {loading ? <ActivityIndicator color="white" /> : children} */}
    {children}
  </Container>
);

export default SectionTitle;
