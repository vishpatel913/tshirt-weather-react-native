import React, { ReactNode, useEffect, Children, useState } from 'react';
import { Animated, Easing, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import SwipeArrow from '../../assets/svgs/swipe-arrow.svg';
import { useWeather } from '../../modules/weatherContext';
import { useSwipeRouter } from '../../modules/swipeRouterContext';

interface Props {
  children: ReactNode;
}

const SwipeContainer = styled(Swiper)``;
const Footer = styled.View`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.single};
  width: 100%;
`;
const SwipeArrowContainer = styled(Animated.View)`
  margin: auto;
  opacity: 0.6;
`;

const SwipeRouter = ({ children }: Props) => {
  const { isLoading, actions } = useWeather();
  const arrowY = new Animated.Value(0);
  const { length: pages } = Children.toArray(children);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(arrowY, {
        toValue: arrowY.interpolate({
          inputRange: [0, 0.05, 0.15, 1],
          outputRange: [0, 10, 0, 0],
        }),
        duration: 2000,
        delay: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  useEffect(() => {
    if (index === pages - 1) {
      Animated.timing(arrowY, {
        toValue: 1000,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    }
  }, [index]);

  return (
    <>
      <SwipeContainer
        horizontal={false}
        loop={false}
        onIndexChanged={(i) => setIndex(i)}
        showsPagination={false}
        autoplay={false}
        showsButtons={false}
        bounces
        scrollEnabled={!isLoading}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => actions.getLocation()}
          />
        }>
        {children}
      </SwipeContainer>
      <Footer>
        <SwipeArrowContainer style={{ transform: [{ translateY: arrowY }] }}>
          <SwipeArrow width={40} height={40} />
        </SwipeArrowContainer>
      </Footer>
    </>
  );
};

export default SwipeRouter;
