import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import { Svg, Defs, Mask, G, Circle, Rect } from 'react-native-svg';
import { useWeather } from '../../modules/weatherContext';
import SunMoonVector from '../SunMoonVector';
import Landscape from '../../assets/svgs/landscape.svg';
import LandscapeMask from '../../assets/svgs/landscape-mask.svg';

const Container = styled.View`
  position: relative;
`;
const Background = styled.View<{ opacity?: number }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 400px;
  width: 100%;
  opacity: ${({ opacity }) => opacity && opacity};
`;

const LandscapeVector = () => {
  const { current, isDaytime, isLoading } = useWeather();
  const cloudOpacity = (100 - (current?.cloud_cover.value || 0)) / 100;
  const { width } = useWindowDimensions();

  const getSunHeight = () => {
    if (!current) {
      return 64;
    }
    const from = isDaytime() ? current.sunrise.value : current.sunset.value;
    const to = isDaytime() ? current.sunset.value : current.sunrise.value;
    const skyPos = moment().diff(moment(from)) / moment(to).diff(moment(from));
    const x = skyPos;
    const y = 300 * (x - 0.5) ** 2;
    return 64 + y;
  };

  return (
    <Container>
      <Landscape width="100%" height="400px" />
      <Background opacity={cloudOpacity}>
        <Svg>
          <G mask="url(#landscapeMask)">
            <G transform={`translate(${width - 128},${getSunHeight()})`}>
              <SunMoonVector
                width={64}
                height={64}
                moon={!isDaytime()}
                animate={isLoading}
              />
            </G>
            {!isDaytime() &&
              Array.from({ length: 200 }).map((i) => (
                <Circle
                  key={Math.random()}
                  cx={`${Math.random() * 100}%`}
                  cy={Math.random() * 220}
                  r={Math.random()}
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
