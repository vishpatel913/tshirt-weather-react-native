import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

interface Props {
  background?: boolean;
  direction?: string;
  justify?: string;
  align?: string;
  padding?: boolean;
  margin?: boolean;
  grow?: boolean;
  rounded?: boolean;
  flex?: number;
  children: ReactNode;
}

const StyledContainer = styled(TouchableOpacity)<Props>`
  background: ${({ background }) =>
    background ? 'rgba(225, 225, 225, 0.1);' : 'transparent'};
  color: ${({ theme }) => theme.colors.white};
  ${({ flex }) => flex && `flex: ${flex}`};
  flex-direction: ${({ direction }) => direction || 'column'};
  align-items: ${({ align }) => align || 'center'};
  justify-content: ${({ justify }) => justify || 'flex-start'};
  flex-grow: ${({ grow }) => (grow ? 1 : 0)};
  padding: ${({ padding, theme }) => theme.spacing(padding ? 1 : 0)};
  margin: ${({ margin, theme }) => theme.spacing(margin ? 0.5 : 0)};
  border-radius: ${({ rounded, theme }) => (rounded ? '4px' : '0px')};
`;

const Container = ({ children, ...rest }: Props) => {
  return <StyledContainer {...rest}>{children}</StyledContainer>;
};

export default Container;
