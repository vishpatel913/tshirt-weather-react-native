import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { WeatherProvider } from './modules/weatherContext';

import Home from './scenes/Home';
import { theme } from './styles/theme';

const App = () => {
  return (
    <>
      <WeatherProvider>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <Home />
        </ThemeProvider>
      </WeatherProvider>
    </>
  );
};

export default App;
