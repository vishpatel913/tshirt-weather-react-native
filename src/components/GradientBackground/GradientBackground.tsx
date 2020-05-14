import React, { ReactNode, useContext } from 'react';
import { SafeAreaView } from 'react-native';
import styled, { ThemeContext } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { Text } from '..';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  children: ReactNode;
}

const GardientContainer = styled(LinearGradient)`
  height: 100%;
  position: relative;
`;
const UpdatedText = styled(Text)`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.double};
  left: ${({ theme }) => theme.spacing.double};
`;

const SwipeRouter = ({ children }: Props) => {
  const { current, isDaytime, isLoading } = useWeather();
  const { gradientMap } = useContext(ThemeContext);
  const daytime = isDaytime();

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
  const [gradTop, gradBottom] = gradient;

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: gradTop }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: gradBottom }}>
        <GardientContainer colors={gradient}>{children}</GardientContainer>
        <UpdatedText size={12} weight="bold">
          {isLoading
            ? 'Updating...'
            : `Updated: ${moment(current?.dt, 'X').format('h:mm a')}`}
        </UpdatedText>
      </SafeAreaView>
    </>
  );
};

export default SwipeRouter;
