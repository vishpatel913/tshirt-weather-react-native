import React, {createContext, useState, useEffect} from 'react';
import OpenWeatherService from '../services/openWeather';

const initialState = {
  loading: true,
  coords: {
    lat: null,
    lon: null,
  },
  current: {
    temp: 7,
  },
};

export const WeatherContext = createContext(initialState);

export const withWeatherContext = (Component) => (props) => {
  return (
    <WeatherContext.Consumer>
      {(ctx) => (
        <Component {...props} weather={ctx.weather} actions={ctx.actions} />
      )}
    </WeatherContext.Consumer>
  );
};

const WeatherProvider = ({children}) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [coords, setCoords] = useState(initialState.coords);
  const [current, setCurrent] = useState(initialState.current);

  const getLocation = async () => {
    setLoading(true);
    setCoords({lat: 51.4623656, lon: -0.1699604});
    setTimeout(async () => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const ows = new OpenWeatherService(coords);
    ows.getAllData().then((res) => {
      setCurrent(res.current);
    });
  }, [coords]);

  const ctx = {
    weather: {loading, coords, current},
    actions: {getLocation},
  };

  return (
    <WeatherContext.Provider value={ctx}>{children}</WeatherContext.Provider>
  );
};

export default WeatherProvider;
