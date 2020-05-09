import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  ComponentType,
} from 'react';
import moment from 'moment';
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
  actions?: Actions;
}

type Geocoding = {
  timezone: string;
  country: string;
  location: string;
};

type Actions = {
  getLocation: () => Promise<void>;
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
  isDaytime: () => true,
};

export const WeatherContext = createContext<WeatherState>(initialState);

export const WeatherProvider = ({ children }: ProviderProps) => {
  const [isLoading, setLoading] = useState(initialState.isLoading);
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [geocoding, setGeocoding] = useState<Geocoding | undefined>(undefined);
  const [current, setCurrent] = useState<Weather | undefined>(undefined);
  const [hourly, setHourly] = useState<Weather[] | undefined>(undefined);
  const [daily, setDaily] = useState<DailyWeather[] | undefined>(undefined);

  const getLocation = async () => {
    setLoading(true);
    setTimeout(async () => {
      setCoords({ lat: 51.4623656, lon: -0.1699604 });
    }, 2000);
  };

  const isDaytime = (ts?: number) => {
    const now = ts ? moment(ts, 'X') : moment();
    const sunTime = (value: number) => moment(value, current ? 'X' : 'HH');
    return (
      now.isAfter(sunTime(current?.sunrise || 6)) &&
      now.isBefore(sunTime(current?.sunset || 21))
    );
  };

  useEffect(() => {
    if (coords) {
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
        .catch((err) => console.error(err));
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
    actions: { getLocation },
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
