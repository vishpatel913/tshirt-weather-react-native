import React, {
  ReactNode,
  useContext,
  useEffect,
  Children,
  useState,
} from 'react';
import { Animated, Easing } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';

import SwipeArrow from '../../assets/svgs/swipe-arrow.svg';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  children: ReactNode;
}

const GardientContainer = styled(LinearGradient)`
  height: 100%;
  position: relative;
`;
const SwipeContainer = styled(Swiper)``;
const Footer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.single};
  width: 100%;
`;
const SwipeVectorContainer = styled(Animated.View)`
  margin: auto;
  opacity: 0.6;
`;

const SwipeRouter = ({ children }: Props) => {
  const { current, isDaytime } = useWeather();
  const { gradientMap } = useContext(ThemeContext);
  const daytime = isDaytime();
  const totalPages = Children.count(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const arrowY = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(arrowY, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

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
    <GardientContainer colors={gradient}>
      <SwipeContainer
        horizontal={false}
        loop={false}
        onIndexChanged={(i) => setCurrentIndex(i)}
        showsPagination={false}
        autoplay={false}
        showsButtons={false}>
        {children}
      </SwipeContainer>
      {currentIndex !== totalPages - 1 && (
        <Footer>
          <SwipeVectorContainer
            style={{
              transform: [
                {
                  translateY: arrowY.interpolate({
                    inputRange: [0, 0.05, 0.15, 1],
                    outputRange: [0, 10, 0, 0],
                  }),
                },
              ],
            }}>
            <SwipeArrow width={40} height={40} />
          </SwipeVectorContainer>
        </Footer>
      )}
    </GardientContainer>
  );
};

export default SwipeRouter;
