import React from 'react';
import styled from 'styled-components/native';
import { useWeather } from '../../modules/weatherContext';
import Landscape from '../../assets/svgs/landscape.svg';
import SunMoonVector from '../SunMoonVector';

const Container = styled.View`
  position: relative;
`;
const SkyVector = styled(SunMoonVector)<{ opacity?: number }>`
  position: absolute;
  top: 32px;
  right: 32px;
  opacity: ${({ opacity }) => opacity};
`;

const LandscapeVector = () => {
  const { current, isDaytime } = useWeather();
  const cloudOpacity = (100 - (current?.clouds || 0)) / 100;

  return (
    <Container>
      <Landscape width="100%" height="400px" />
      <SkyVector
        width={64}
        height={64}
        moon={!isDaytime()}
        opacity={cloudOpacity}
      />
    </Container>
  );
};

export default LandscapeVector;
