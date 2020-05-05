import React, { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  size?: number;
  grey?: boolean;
  weight?: number;
  children?: ReactNode;
}

const StyledText = styled(RNText)<Props>`
  font-family: ${({ theme, weight }) => Object.values(theme.font)[weight || 2]};
  font-size: ${({ size }) => Math.ceil((size || 16) / 4) * 4}px;
  color: ${({ theme }) => theme.color.white};
  opacity: ${({ grey }) => (grey ? 0.7 : 1)};
  /* font-weight: 700; */
`;

const Text = (props: Props) => {
  return <StyledText {...props} />;
};

export default Text;
