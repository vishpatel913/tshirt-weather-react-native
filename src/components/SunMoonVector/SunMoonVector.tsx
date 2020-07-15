import React, { useEffect, useState } from 'react';
import { Animated, Platform, Easing } from 'react-native';
import { Svg, G, Defs, Rect, Circle, Mask } from 'react-native-svg';
import { SkyVectorKey } from '../../types/common';

interface Props {
  width?: number;
  height?: number;
  moon?: boolean;
  animate?: boolean;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SunMoonVector = ({ width, height, moon, animate }: Props) => {
  const initialKey = moon ? 'moon' : 'sun';
  const animatedValues = {
    moonMask: { moon: 225, sun: 0 },
    mainSize: { moon: 280, sun: 200 },
    rayInnerSize: { moon: 0, sun: 240 },
    rayOuterSize: { moon: 0, sun: 280 },
    rayOpacity: { moon: 0, sun: 0.5 },
  };
  const initialSvg = {
    moonMask: new Animated.Value(animatedValues.moonMask[initialKey]),
    mainSize: new Animated.Value(animatedValues.mainSize[initialKey]),
    rayInnerSize: new Animated.Value(animatedValues.rayInnerSize[initialKey]),
    rayOuterSize: new Animated.Value(animatedValues.rayOuterSize[initialKey]),
    rayOpacity: new Animated.Value(animatedValues.rayOpacity[initialKey]),
  };
  const animationConfig = {
    duration: 500,
    animateOnDidMount: false,
    delay: 500,
    useNativeDriver: true,
    easing: Easing.ease,
  };
  const [svgValues, setSvgValues] = useState(initialSvg);

  const transitionTo = (key: SkyVectorKey) => {
    return Animated.parallel([
      Animated.timing(svgValues.moonMask, {
        toValue: animatedValues.moonMask[key],
        ...animationConfig,
      }),
      Animated.timing(svgValues.mainSize, {
        toValue: animatedValues.mainSize[key],
        ...animationConfig,
      }),
      Animated.timing(svgValues.rayInnerSize, {
        toValue: animatedValues.rayInnerSize[key],
        ...animationConfig,
      }),
      Animated.timing(svgValues.rayOuterSize, {
        toValue: animatedValues.rayOuterSize[key],
        ...animationConfig,
      }),
      Animated.timing(svgValues.rayOpacity, {
        toValue: animatedValues.rayOpacity[key],
        ...animationConfig,
      }),
    ]);
  };

  const loopTransitions = () =>
    Animated.loop(
      Animated.sequence(
        [transitionTo(SkyVectorKey.MOON), transitionTo(SkyVectorKey.SUN)].sort(
          () => -(moon || 0),
        ),
      ),
    );

  useEffect(() => {
    if (animate) {
      loopTransitions().start();
    } else {
      loopTransitions().stop();
      setSvgValues(initialSvg);
    }
  }, [animate]);

  return (
    <Svg width={width} height={height} viewBox="0 0 600 600">
      <G id="sun-group">
        <Defs>
          <Mask id="moon-mask">
            <Rect width="100%" height="100%" fill="white" />
            <AnimatedCircle
              cx={400}
              cy={250}
              r={svgValues.moonMask}
              fill="black"
            />
          </Mask>
        </Defs>
        <AnimatedCircle
          cx={300}
          cy={300}
          r={svgValues.rayOuterSize}
          fill="#fcf8f1"
          fillOpacity={svgValues.rayOpacity}
        />
        <AnimatedCircle
          cx={300}
          cy={300}
          r={svgValues.rayInnerSize}
          fill="#fcf8f1"
          fillOpacity={svgValues.rayOpacity}
        />
        <AnimatedCircle
          cx={300}
          cy={300}
          r={svgValues.mainSize}
          fill={`hsl(${moon ? 212.7 : 38.2}, 64.7%, 96.7%)`}
          mask={Platform.OS !== 'ios' && 'url(#moon-mask)'}
        />
      </G>
    </Svg>
  );
};

export default SunMoonVector;
