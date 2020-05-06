import React, { ReactNode, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { useWeather } from '../../modules/weatherContext';
import { LandscapeVector } from '..';

interface Props {
  children: ReactNode;
  landscape?: boolean;
}

const LayoutContainer = styled(LinearGradient)`
  justify-content: space-between;
  padding-top: 32px;
  height: 100%;
  position: relative;
`;
const LandscapeContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Layout = ({ children, landscape }: Props) => {
  const { daytime, current } = useWeather();
  const { gradientMap } = useContext(ThemeContext);
  const timeKey = daytime ? 'day' : 'night';
  let gradient;
  switch (current?.weather[0].icon.slice(0, 2)) {
    case '01':
      gradient = gradientMap.clear[timeKey];
      break;
    case '02':
    case '03':
    case '04':
      gradient = gradientMap.clouds[timeKey];
      break;
    case '09':
    case '10':
    case '11':
      gradient = gradientMap.rain[timeKey];
      break;
    case '13':
    case '50':
      gradient = gradientMap.snow[timeKey];
      break;
    default:
      gradient = gradientMap.clear[timeKey];
      break;
  }

  return (
    <LayoutContainer colors={gradient}>
      {landscape && (
        <LandscapeContainer>
          <LandscapeVector />
        </LandscapeContainer>
      )}
      {children}
    </LayoutContainer>
  );
};

export default Layout;
