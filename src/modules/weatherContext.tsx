import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  ComponentType,
} from 'react';
import { Alert, Platform } from 'react-native';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

import { WeatherService } from '../services';
import { Coords } from '../types/coords';
import {
  WeatherResponse,
  WeatherError,
  Weather,
  HourlyWeather,
  DailyWeather,
  Status,
} from '../types/weather';
import { requestLocationPermissions } from './utils';

export interface WeatherState {
  coords?: Coords;
  location?: string;
  current?: Weather;
  hourly?: HourlyWeather[];
  daily?: DailyWeather[];
  status?: Status;
  isLoading: boolean;
  isDaytime: (ts?: string) => boolean;
  actions: Actions;
}

type Actions = {
  getLocation: () => Promise<void>;
  toggleDark: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState = {
  isLoading: true,
  isDaytime: () => false,
  actions: {
    getLocation: () => Promise.resolve(),
    toggleDark: () => undefined,
  },
};

export const WeatherContext = createContext<WeatherState>(initialState);

export const WeatherProvider = ({ children }: ProviderProps) => {
  const [isLoading, setLoading] = useState(initialState.isLoading);
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [location, setLocation] = useState<string | undefined>(undefined);
  const [current, setCurrent] = useState<Weather | undefined>(undefined);
  const [hourly, setHourly] = useState<HourlyWeather[] | undefined>(undefined);
  const [daily, setDaily] = useState<DailyWeather[] | undefined>(undefined);
  const [reverseDay, setReverseDay] = useState(false);
  const [hourOffset, setHourOffset] = useState(0);
  const hourLimit = 6;

  const getLocation = async () => {
    setLoading(true);
    Platform.OS === 'android' && (await requestLocationPermissions());
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        setCoords({ lat: latitude, lon: longitude });
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        Alert.alert(
          'Could not find your coordinates, make sure yourr location is turned on',
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const updateWeather = async () => {
    if (coords) {
      setLoading(true);
      const ws = new WeatherService(coords);
      ws.get('weather')
        .then((res: WeatherResponse) => {
          setLocation(res.location);
          setCurrent(res.current);
          setHourly(res.hourly);
          setDaily(res.daily);
          setLoading(false);
        })
        .catch((err: WeatherError) => {
          Alert.alert('Error', 'Unable to fetch the weather');
        });
    }
  };

  useEffect(() => {
    if (!coords) {
      getLocation();
    } else {
      updateWeather();
    }
  }, [coords]);

  const isDaytime = (ts?: string) => {
    const now = moment(ts);
    const isBetweenSuns =
      now.isAfter(current ? moment(current.sunrise.value) : moment(6, 'HH')) &&
      now.isBefore(current ? moment(current.sunset.value) : moment(21, 'HH'));
    return isBetweenSuns !== reverseDay;
  };

  const activeHours = (data?: HourlyWeather[]) =>
    data?.slice(hourOffset, hourOffset + hourLimit) || [];

  const status = {
    sunny:
      Math.min(...activeHours(hourly).map((h) => h.cloud_cover.value)) < 25,
    precipChance:
      Math.max(
        ...activeHours(hourly).map((h) => h.precipitation_probability.value),
      ) > 10,
    cold:
      activeHours(hourly).reduce((t, c) => t + c.feels_like.value, 0) /
        hourLimit <
      5,
    clothing: {
      upper: Math.round(
        activeHours(hourly).reduce((t, c) => t + c.clothing_upper.value, 0) /
          hourLimit,
      ),
      lower: Math.round(
        activeHours(hourly).reduce((t, c) => t + c.clothing_lower.value, 0) /
          hourLimit,
      ),
    },
  };

  const ctx = {
    coords,
    location,
    current,
    hourly: activeHours(hourly),
    daily,
    status,
    isLoading,
    isDaytime,
    actions: { getLocation, toggleDark: () => setReverseDay(!reverseDay) },
  };

  return (
    <WeatherContext.Provider value={ctx}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);

export const withWeather = <P extends object>(Component: ComponentType<P>) => (
  props: any,
) => (
  <WeatherContext.Consumer>
    {(ctx) => <Component {...props} weather={ctx} />}
  </WeatherContext.Consumer>
);
