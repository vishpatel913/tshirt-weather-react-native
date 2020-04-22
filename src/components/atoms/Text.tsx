import React, { ReactNode } from 'react';
import { Text as RNText } from 'react-native';
import styled from 'styled-components/native';

interface Props {
  small?: string;
  color?: string;
  children?: ReactNode;
}

const StyledText = styled(RNText)<Props>`
  font-family: ${({ theme }) => theme.font.body};
  font-size: ${({ small }) => (small ? 16 : 20)}px;
  font-weight: 300;
  /* color: ${({ theme, color }) => theme.color[color || 'main']}; */
`;

const Text = (props: Props) => {
  return <StyledText {...props} />;
};

export default Text;
