import React from 'react';
import styled from 'styled-components/native';
import { useWeather } from '../../modules/weatherContext';
import Landscape from '../../assets/svgs/landscape.svg';
import Sun from '../../assets/svgs/sun.svg';
import Moon from '../../assets/svgs/moon.svg';

const Container = styled.View`
  position: relative;
`;
const StyledSkyVector = styled.View<{ opacity?: number }>`
  position: absolute;
  top: 32px;
  right: 32px;
  opacity: ${({ opacity }) => opacity};
`;

const LandscapeVector = () => {
  const { current, isDaytime } = useWeather();
  const SkyVector = StyledSkyVector.withComponent(isDaytime() ? Sun : Moon);
  const cloudOpacity = (100 - (current?.clouds || 0)) / 100;

  return (
    <Container>
      <Landscape width="100%" height="400px" />
      <SkyVector width={64} height={64} opacity={cloudOpacity} />
    </Container>
  );
};

export default LandscapeVector;
