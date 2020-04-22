import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  ComponentType,
} from 'react';
import { OpenWeatherService } from '../services';
import { Coords } from '../types/coords';
import { Current } from '../types/weather';

export interface WeatherContextInterface {
  loading: boolean;
  coords: Coords;
  current: Current;
  actions?: Actions;
}

type Actions = {
  getLocation: () => Promise<void>;
};

type ProviderProps = {
  children: ReactNode;
};

const initialState = {
  loading: true,
  coords: undefined,
  current: undefined,
};

export const WeatherContext = createContext<Partial<WeatherContextInterface>>(
  initialState,
);

export const WeatherProvider = ({ children }: ProviderProps) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [coords, setCoords] = useState<Coords | undefined>(undefined);
  const [current, setCurrent] = useState<Current | undefined>(undefined);

  const getLocation = async () => {
    setLoading(true);
    setTimeout(async () => {
      setCoords({ lat: 51.4623656, lon: -0.1699604 });
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    if (coords) {
      const ows = new OpenWeatherService(coords);
      ows
        .getCurrentData()
        .then((value: Current) => {
          setCurrent(value);
        })
        .catch((err) => console.error(err));
    }
  }, [coords]);

  const ctx = {
    loading,
    coords,
    current,
    actions: { getLocation },
  };

  return (
    <WeatherContext.Provider value={ctx}>{children}</WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);

export const withWeatherContext = <P extends object>(
  Component: ComponentType<P>,
) => (props: any) => (
  <WeatherContext.Consumer>
    {(ctx) => <Component {...props} weather={ctx} />}
  </WeatherContext.Consumer>
);
