import React, { ReactNode, useEffect } from 'react';
import { Animated, Easing, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper';

import SwipeArrow from '../../assets/svgs/swipe-arrow.svg';
import { useWeather } from '../../modules/weatherContext';
import { useRouter } from '../../modules/routerContext';

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
  const { pages, index, push } = useRouter();
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

  return (
    <>
      <SwipeContainer
        horizontal={false}
        loop={false}
        onIndexChanged={(i) => push(i)}
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
        {index !== pages - 1 && (
          <SwipeArrowContainer
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
          </SwipeArrowContainer>
        )}
      </Footer>
    </>
  );
};

export default SwipeRouter;
