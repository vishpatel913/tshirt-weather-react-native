import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { WeatherProvider } from './modules/weatherContext';
import { theme } from './styles/theme';
import Home from './scenes/Home';

const App = () => (
  <>
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" translucent />
        <Home />
      </ThemeProvider>
    </WeatherProvider>
  </>
);

export default App;
