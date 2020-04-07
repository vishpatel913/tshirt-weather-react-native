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

const WeatherProvider = ({children}) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [coords, setCoords] = useState(initialState.coords);
  const [current, setCurrent] = useState(initialState.current);

  const getLocation = async () => {
    setLoading(true);
    setTimeout(async () => {
      setCoords({lat: 51.4623656, lon: -0.1699604});
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const ows = new OpenWeatherService(coords);
    ows.getAllData().then((res) => {
      setCurrent(res.current);
    });
  }, [coords]);

  return (
    <WeatherContext.Provider
      value={{weather: {loading, coords, current}, actions: {getLocation}}}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
