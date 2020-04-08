import React, {createContext, useState, useEffect} from 'react';
import {OpenWeatherService} from '../services';

const initialState = {
  loading: true,
  coords: {
    lat: null,
    lon: null,
  },
  current: {
    main: {
      temp: 7,
    },
  },
};

export const WeatherContext = createContext(initialState);

export const withWeatherContext = (Component) => (props) => {
  return (
    <WeatherContext.Consumer>
      {(ctx) => <Component {...props} data={ctx.data} actions={ctx.actions} />}
    </WeatherContext.Consumer>
  );
};

const WeatherProvider = ({children}) => {
  const [loading, setLoading] = useState(initialState.loading);
  const [coords, setCoords] = useState(initialState.coords);
  const [current, setCurrent] = useState(initialState.current);

  const getLocation = async () => {
    setLoading(true);
    setTimeout(async () => {
      setCoords({lat: 51.4623656, lon: -0.1699604});
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    const ows = new OpenWeatherService(coords);
    ows
      .getCurrentData()
      .then((res) => {
        setCurrent(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const ctx = {
    data: {loading, coords, current},
    actions: {getLocation},
  };

  return (
    <WeatherContext.Provider value={ctx}>{children}</WeatherContext.Provider>
  );
};

export default WeatherProvider;
