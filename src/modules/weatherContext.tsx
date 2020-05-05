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
  loading: boolean;
  coords: Coords;
  geocoding: Geocoding;
  day: boolean;
  current: Weather;
  hourly: Weather[];
  daily: DailyWeather[];
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
  loading: true,
  coords: undefined,
  geocoding: undefined,
  day: true,
  current: undefined,
  hourly: undefined,
  daily: undefined,
};

export const WeatherContext = createContext<Partial<WeatherState>>(
  initialState,
);

export const WeatherProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [geocoding, setGeocoding] = useState<Geocoding | undefined>(undefined);
  const [current, setCurrent] = useState<Weather | undefined>(undefined);
  const [hourly, setHourly] = useState<Weather[] | undefined>(undefined);
  const [daily, setDaily] = useState<DailyWeather[] | undefined>(undefined);

  const getLocation = async () => {
    setLoading(true);
    setTimeout(async () => {
      setCoords({ lat: 51.4623656, lon: -0.1699604 });
      setLoading(false);
    }, 2000);
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
        })
        .catch((err) => console.error(err));
    }
  }, [coords]);

  const ctx = {
    loading,
    coords,
    geocoding,
    current,
    day:
      moment(current?.dt, 'X').isAfter(moment(current?.sunrise, 'X')) &&
      moment(current?.dt, 'X').isBefore(moment(current?.sunset, 'X')),
    hourly,
    daily,
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
