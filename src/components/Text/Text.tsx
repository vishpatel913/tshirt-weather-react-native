import React, { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  size?: number;
  grey?: boolean;
  weight?: string;
  shadow?: boolean;
  transform?: string;
  children?: ReactNode;
}

const StyledText = styled(RNText)<Props>`
  font-family: ${({ theme, weight }) =>
    Object.entries(theme.fonts).reduce(
      (acc, [key, value]) => (key === weight ? value.fontFamily : acc),
      theme.fonts.regular.fontFamily,
    )};
  font-size: ${({ size }) => Math.ceil((size || 16) / 4) * 4}px;
  color: ${({ theme }) => theme.colors.white};
  opacity: ${({ grey }) => (grey ? 0.7 : 1)};
  text-shadow: ${({ shadow }) =>
    shadow ? '2px 2px 5px rgba(0, 0, 0, 0.5)' : 'none'};
  text-transform: ${({ transform }) => transform || 'none'};
  ${({ size }) => size && size < 12 && `line-height: ${size}px;`}
`;

const Text = (props: Props) => {
  return <StyledText {...props} />;
};

export default Text;
