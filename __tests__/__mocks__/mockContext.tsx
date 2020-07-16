import React, { ReactNode } from 'react';

import { WeatherContext, WeatherState } from '../../src/modules/weatherContext';
// import mockResponse from '../../src/services/weather/mocks/mockResponse';
import { Weather, HourlyWeather, DailyWeather } from '../../src/types/weather';

interface MockProveiderProps {
  children: ReactNode;
  getLocation?: () => Promise<void>;
  toggleDark?: () => void;
}

type MockResponse = {
  current: Weather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
};

export const MockWeatherProvider = ({
  children,
  getLocation,
  toggleDark,
}: MockProveiderProps) => {
  // const { current, hourly, daily }: MockResponse = mockResponse;
  const mockCtx: WeatherState = {
    coords: { lat: 51.4641197, lon: -0.1624304 },
    location: 'Battersea',
    current: undefined,
    hourly: undefined,
    daily: undefined,
    status: {
      sunny: true,
      precipChance: false,
      cold: false,
      clothing: { upper: 2, lower: 1 },
    },
    isLoading: false,
    isDaytime: (ts?: string) => false,
    actions: {
      getLocation: getLocation || (() => Promise.resolve(undefined)),
      toggleDark: toggleDark || (() => undefined),
    },
  };

  return (
    <WeatherContext.Provider value={mockCtx}>
      {children}
    </WeatherContext.Provider>
  );
};
