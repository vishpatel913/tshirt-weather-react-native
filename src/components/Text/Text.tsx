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
  font-family: ${({ theme }) => theme.font};
  font-size: ${({ size }) => Math.ceil((size || 16) / 4) * 4}px;
  font-weight: ${({ weight }) => Math.ceil((weight || 300) / 100) * 100};
  color: ${({ theme }) => theme.color.white};
  opacity: ${({ grey }) => (grey ? 0.7 : 1)};
`;

const Text = (props: Props) => {
  return <StyledText {...props} />;
};

export default Text;
