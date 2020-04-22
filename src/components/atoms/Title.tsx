import React, { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components';

interface Props {
  level?: number;
  color?: string;
  children?: ReactNode;
}

const StyledText = styled(RNText)<Props>`
  font-family: ${({ theme }) => theme.font.head};
  font-size: ${({ level }) => (level ? 72 / level : 32)}px;
  font-weight: 300;
  margin-bottom: ${({ theme }) => theme.spacing.single};
  /* color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.purple}; */
`;

const Title = (props: Props) => {
  return <StyledText {...props} />;
};

export default Title;
