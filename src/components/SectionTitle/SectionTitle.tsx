import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { Text } from '..';

interface Props {
  children: ReactNode;
}

const TitleContainer = styled.View`
  flex-direction: row;
  margin: ${({ theme }) => theme.spacing.single} 0;
`;
const Stroke = styled.View`
  flex-grow: 1;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-color: #fff;
  opacity: 0.5;
  margin-left: ${({ theme }) => theme.spacing.half};
`;

const SectionTitle = ({ children }: Props) => (
  <TitleContainer>
    <Text weight="bold" transform="uppercase">
      {children}
    </Text>
    <Stroke />
  </TitleContainer>
);

export default SectionTitle;
