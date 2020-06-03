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
  Weather,
  HourlyWeather,
  DailyWeather,
  Clothing,
  WeatherError,
} from '../types/weather';
import { requestLocationPermissions } from './utils';

export interface WeatherState {
  coords?: Coords;
  location?: string;
  current?: Weather;
  hourly?: HourlyWeather[];
  daily?: DailyWeather[];
  clothing?: Clothing;
  isLoading: boolean;
  isDaytime: (ts?: string) => boolean;
  actions: Actions;
}

type Actions = {
  getLocation: () => Promise<void>;
  // refreshWeather: () => Promise<void>;
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
    // refreshWeather: () => Promise.resolve(),
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
  const [clothing, setClothing] = useState<Clothing | undefined>(undefined);
  const [reverseDay, setReverseDay] = useState(false);

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
          setClothing(res.clothing);
          setLoading(false);
        })
        .catch((err: WeatherError) => {
          Alert.alert('Error', err.message);
        });
    }
  };

  const isDaytime = (ts?: string) => {
    const now = moment(ts);
    const isBetweenSuns =
      now.isAfter(current ? moment(current.sunrise.value) : moment(6, 'HH')) &&
      now.isBefore(current ? moment(current.sunset.value) : moment(21, 'HH'));
    return isBetweenSuns !== reverseDay;
  };

  useEffect(() => {
    // console.log('useEffect');
    if (!coords) {
      // console.log('getLocation');
      getLocation();
    } else {
      // console.log('updateWeather');
      updateWeather();
    }
  }, [coords]);

  const ctx = {
    coords,
    location,
    current,
    hourly,
    daily,
    clothing,
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
