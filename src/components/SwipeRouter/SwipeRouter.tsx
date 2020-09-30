import React, {
  ReactNode,
  useContext,
  useEffect,
  Children,
  useState,
} from 'react';
import { Animated, Easing, RefreshControl } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import Swiper from 'react-native-swiper';

import { Error } from '../../views';
import { useWeather } from '../../modules/weatherContext';
import SwipeArrow from '../../assets/svgs/swipe-arrow.svg';

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
  const { isLoading, error, actions } = useWeather();
  const arrowY = new Animated.Value(0);
  const { length: pages } = Children.toArray(children);
  const [index, setIndex] = useState(0);
  const theme = useContext(ThemeContext);

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

  return error ? (
    <Error />
  ) : (
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
            colors={[
              theme.colors.indigo,
              theme.colors.pink,
              theme.colors.yellow,
            ]}
            progressBackgroundColor={theme.colors.blue}
            tintColor={theme.colors.white}
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
