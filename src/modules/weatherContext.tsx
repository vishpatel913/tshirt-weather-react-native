import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  ComponentType,
} from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';

import { WeatherService } from '../services';
import { Coords } from '../types/coords';
import { Weather, WeatherResponse, DailyWeather } from '../types/weather';

export interface WeatherState {
  coords?: Coords;
  geocoding?: Geocoding;
  current?: Weather;
  hourly?: Weather[];
  daily?: DailyWeather[];
  isLoading: boolean;
  isDaytime: (ts?: number) => boolean;
  actions: Actions;
}

type Geocoding = {
  timezone: string;
  country: string;
  location: string;
};

type Actions = {
  getLocation: () => Promise<void>;
  toggleDark: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState = {
  coords: undefined,
  geocoding: undefined,
  current: undefined,
  hourly: undefined,
  daily: undefined,
  isLoading: true,
  isDaytime: () => false,
  actions: {
    getLocation: () => Promise.resolve(),
    toggleDark: () => undefined,
  },
};

export const WeatherContext = createContext<WeatherState>(initialState);

const requestLocationPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          "T-Shirt Weather needs access to your device's " +
          'geolocation so that you can see your local weather.',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use Location services');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export const WeatherProvider = ({ children }: ProviderProps) => {
  const [isLoading, setLoading] = useState(initialState.isLoading);
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [geocoding, setGeocoding] = useState<Geocoding | undefined>(undefined);
  const [current, setCurrent] = useState<Weather | undefined>(undefined);
  const [hourly, setHourly] = useState<Weather[] | undefined>(undefined);
  const [daily, setDaily] = useState<DailyWeather[] | undefined>(undefined);
  const [reverseDay, setReverseDay] = useState(false);

  const getLocation = async () => {
    await requestLocationPermissions();
    Geolocation.getCurrentPosition(
      (info) => {
        const { latitude, longitude } = info.coords;
        setCoords({ lat: latitude, lon: longitude });
      },
      (err) => {
        Alert.alert(err.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const isDaytime = (ts?: number) => {
    const now = ts ? moment.unix(ts) : moment();
    const sunTime = (value: number) => moment(value, current ? 'X' : 'HH');
    const isBetweenSuns =
      now.isAfter(sunTime(current?.sunrise || 6)) &&
      now.isBefore(sunTime(current?.sunset || 21));
    return isBetweenSuns !== reverseDay;
  };

  useEffect(() => {
    if (!coords) {
      setLoading(true);
      getLocation();
    } else {
      const ws = new WeatherService(coords);
      ws.get('weather')
        .then((res: WeatherResponse) => {
          setGeocoding({
            timezone: res.timezone,
            location: res.location,
            country: res.country,
          });
          setCurrent(res.current);
          setHourly(res.hourly);
          setDaily(res.daily);
          setLoading(false);
        })
        .catch((err) => Alert.alert(err));
    }
  }, [coords]);

  const ctx = {
    coords,
    geocoding,
    current,
    hourly,
    daily,
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
