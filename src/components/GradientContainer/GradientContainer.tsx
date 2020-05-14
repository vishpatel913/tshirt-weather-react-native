import React, { ReactNode } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import { Text } from '..';
import { useWeather } from '../../modules/weatherContext';

interface Props {
  children: ReactNode;
}

interface HSL {
  h: number;
  s: number;
  l: number;
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

const baseGradient = {
  day: [
    { h: 197.5, s: 67.3, l: 53.2 },
    { h: 196.8, s: 70.6, l: 74.5 },
  ],
  night: [
    { h: 218.8, s: 71.6, l: 19.4 },
    { h: 240.7, s: 35.8, l: 48.3 },
  ],
};

const hsl = ({ h, s, l }: HSL) => `hsl(${h}, ${s}%, ${l}%)`;

const GradientContainer = ({ children }: Props) => {
  const { current, isDaytime, isLoading } = useWeather();
  const daytime = isDaytime();
  const now = moment();
  const switchRange = 2;

  const getRange = (ts?: number) => ({
    before: moment(ts, 'X').subtract(switchRange, 'h'),
    after: moment(ts, 'X').add(switchRange, 'h'),
  });
  const getNewValueFromTime = (key: keyof HSL, index: number, time: number) => {
    const day = baseGradient.day[index];
    const night = baseGradient.night[index];
    const m = (night[key] - day[key]) / (switchRange * 60 * 60);
    const c = day[key] - m * time;
    return now.unix() * m + c;
  };

  const getInitialGradient = () => {
    const sunriseRange = getRange(current?.sunrise);
    const sunsetRange = getRange(current?.sunset);
    let initialGradient = baseGradient[daytime ? 'day' : 'night'];
    if (
      now.isBetween(sunriseRange.before.format(), sunriseRange.after.format())
    ) {
      initialGradient = baseGradient.day.map((c, i) => ({
        h: getNewValueFromTime('h', i, sunriseRange.before.unix()),
        s: getNewValueFromTime('s', i, sunriseRange.before.unix()),
        l: getNewValueFromTime('l', i, sunriseRange.before.unix()),
      }));
    } else if (
      now.isBetween(sunsetRange.before.format(), sunsetRange.after.format())
    ) {
      initialGradient = baseGradient.day.map((c, i) => ({
        h: getNewValueFromTime('h', i, sunsetRange.before.unix()),
        s: getNewValueFromTime('s', i, sunsetRange.before.unix()),
        l: getNewValueFromTime('l', i, sunsetRange.before.unix()),
      }));
    }
    return initialGradient;
  };

  let gradient: HSL[];
  switch (current?.weather[0].icon.slice(0, 2)) {
    case '01':
      gradient = getInitialGradient();
      break;
    case '02':
    case '03':
    case '04':
      gradient = getInitialGradient().map((c, i) =>
        i > 0 ? { ...c, s: 35 - (25 * current.clouds) / 100, l: 70 } : c,
      );
      break;
    case '09':
    case '10':
    case '11':
      gradient = getInitialGradient().map((c) => ({
        ...c,
        h: c.h - 10,
        s: c.s / (daytime ? 2 : 3),
      }));
      break;
    case '13':
    case '50':
      gradient = getInitialGradient().map((c, i) => ({
        ...c,
        h: c.h + 10,
        s: c.s / (daytime ? 2 : 3),
      }));
      break;
    default:
      gradient = getInitialGradient();
      break;
  }
  const [gradTop, gradBottom] = gradient;

  return (
    <>
      <SafeAreaView style={{ flex: 0, backgroundColor: hsl(gradTop) }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: hsl(gradBottom) }}>
        <GardientContainer colors={gradient.map((c) => hsl(c))}>
          {children}
        </GardientContainer>
        <UpdatedText size={12} weight="bold">
          {isLoading
            ? 'Updating...'
            : `Updated: ${moment(current?.dt, 'X').format('h:mm a')}`}
        </UpdatedText>
      </SafeAreaView>
    </>
  );
};

export default GradientContainer;
