import React from 'react';
import styled from 'styled-components/native';
import { Animated, View, TouchableOpacity } from 'react-native';
import { Svg, G, Defs, Rect, Circle, Mask } from 'react-native-svg';
import { useWeather } from '../../modules/weatherContext';

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
  const { actions } = useWeather();
  const state = {
    moonMask: new Animated.Value(moon ? 225 : 0),
    mainSize: new Animated.Value(moon ? 280 : 200),
    rayInnerSize: new Animated.Value(moon ? 0 : 240),
    rayOuterSize: new Animated.Value(moon ? 0 : 280),
    rayOpacity: new Animated.Value(moon ? 0 : 0.5),
  };

  const animationConfig = {
    duration: 300,
    animateOnDidMount: false,
    delay: 0,
    useNativeDriver: false,
  };

  const animate = () =>
    Animated.parallel([
      Animated.timing(state.moonMask, {
        toValue: !moon ? 225 : 0,
        ...animationConfig,
      }),
      Animated.timing(state.mainSize, {
        toValue: !moon ? 280 : 200,
        ...animationConfig,
      }),
      Animated.timing(state.rayInnerSize, {
        toValue: !moon ? 0 : 240,
        ...animationConfig,
      }),
      Animated.timing(state.rayOuterSize, {
        toValue: !moon ? 0 : 280,
        ...animationConfig,
      }),
      Animated.timing(state.rayOpacity, {
        toValue: !moon ? 0 : 0.5,
        ...animationConfig,
      }),
    ]);

  return (
    <View {...rest}>
      <TouchArea onPress={() => animate().start(() => actions?.toggleDark())}>
        <Svg width={width} height={height} viewBox="0 0 600 600">
          <G id="sun-group">
            <Defs>
              <Mask id="moon-mask">
                <Rect width="100%" height="100%" fill="white" />
                <AnimatedCircle
                  cx={400}
                  cy={250}
                  r={state.moonMask}
                  fill="black"
                />
              </Mask>
            </Defs>
            <AnimatedCircle
              cx={300}
              cy={300}
              r={state.rayOuterSize}
              fill="#fcf8f1"
              fillOpacity={state.rayOpacity}
            />
            <AnimatedCircle
              cx={300}
              cy={300}
              r={state.rayInnerSize}
              fill="#fcf8f1"
              fillOpacity={state.rayOpacity}
            />
            <AnimatedCircle
              cx={300}
              cy={300}
              r={state.mainSize}
              fill={`hsl(${moon ? 212.7 : 38.2}, 64.7%, 96.7%)`}
              mask="url(#moon-mask)"
            />
          </G>
        </Svg>
      </TouchArea>
    </View>
  );
};

export default SunMoonVector;
