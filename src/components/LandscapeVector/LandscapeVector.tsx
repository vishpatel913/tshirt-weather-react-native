import React from 'react';
import styled from 'styled-components/native';
import { Svg, Defs, Mask, G, Circle, Rect } from 'react-native-svg';
import { useWeather } from '../../modules/weatherContext';
import Landscape from '../../assets/svgs/landscape.svg';
import LandscapeMask from '../../assets/svgs/landscape-mask.svg';
import SunMoonVector from '../SunMoonVector';

const Container = styled.View`
  position: relative;
`;
const Background = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  width: 100%;
`;
const SunMoon = styled(SunMoonVector)<{ opacity?: number }>`
  position: absolute;
  right: 64px;
  top: 64px;
  opacity: ${({ opacity }) => opacity && opacity};
`;

const LandscapeVector = () => {
  const { current, isDaytime, isLoading } = useWeather();
  const cloudOpacity = (100 - (current?.cloud_cover.value || 0)) / 100;

  return (
    <Container>
      <Landscape width="100%" height="400px" />
      <Background>
        <Svg>
          <G mask="url(#landscapeMask)">
            <SunMoon
              width={64}
              height={64}
              moon={!isDaytime()}
              animate={isLoading}
              opacity={cloudOpacity}
            />
            {!isDaytime() &&
              Array.from({ length: 200 }).map((i) => (
                <Circle
                  key={Math.random()}
                  cx={`${Math.random() * 100}%`}
                  cy={Math.random() * 220}
                  r={Math.random()}
                  opacity={cloudOpacity}
                  fill="white"
                />
              ))}
          </G>
          <Defs>
            <Mask id="landscapeMask">
              <Rect width="100%" height="100%" fill="white" />
              <LandscapeMask />
            </Mask>
          </Defs>
        </Svg>
      </Background>
    </Container>
  );
};

export default LandscapeVector;
