import React from 'react';
import styled from 'styled-components/native';
import { Animated, View, TouchableOpacity } from 'react-native';
import { Svg, G, Defs, Rect, Circle, Mask } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  moon?: boolean;
}

const TouchArea = styled(TouchableOpacity)<Props>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-grow: 1;
`;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SunMoonVector = ({ width, height, moon, ...rest }: Props) => {
  return (
    <View {...rest}>
      <TouchArea onPress={() => console.log('HIT')}>
        <Svg width={width} height={height} viewBox="0 0 600 600">
          <G id="sun-group">
            <Defs>
              <Mask id="moon-mask">
                <Rect width="100%" height="100%" fill="white" />
                <AnimatedCircle
                  cx={400}
                  cy={250}
                  r={moon ? 225 : 0}
                  fill="black"
                />
              </Mask>
            </Defs>
            <AnimatedCircle
              cx={300}
              cy={300}
              r={moon ? 0 : 280}
              fill="#fcf8f1"
              fillOpacity={moon ? 0 : 0.5}
            />
            <AnimatedCircle
              cx={300}
              cy={300}
              r={moon ? 0 : 240}
              fill="#fcf8f1"
              fillOpacity={moon ? 0 : 0.5}
            />
            <AnimatedCircle
              cx={300}
              cy={300}
              r={moon ? 280 : 200}
              fill={moon ? '#f1f6fc' : '#fcf8f1'}
              mask="url(#moon-mask)"
            />
          </G>
        </Svg>
      </TouchArea>
    </View>
  );
};

export default SunMoonVector;
