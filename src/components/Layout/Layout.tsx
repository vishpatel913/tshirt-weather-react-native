import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import moment from 'moment';

import { LandscapeVector, Text } from '..';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  children: ReactNode;
  landscape?: boolean;
}

const LayoutContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.double};
  height: 100%;
  position: relative;
`;
const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;
const Footer = styled.View`
  position: absolute;
  bottom: 0;
  bottom: ${({ theme }) => theme.spacing.single};
  left: ${({ theme }) => theme.spacing.double};
`;

const Layout = ({ children, landscape, ...rest }: Props) => {
  const { current } = useWeather();
  return (
    <LayoutContainer {...rest}>
      {landscape && (
        <Background>
          <LandscapeVector />
        </Background>
      )}
      {children}
      <Footer>
        <Text size={12} weight="bold">
          Updated: {moment(current?.dt, 'X').format('h:mm a')}
        </Text>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;
