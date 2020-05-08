import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { WeatherProvider } from './modules/weatherContext';
import { theme } from './styles/theme';

import { SwipeRouter } from './components';
import Home from './scenes/Home';

const App = () => (
  <>
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#00000000"
        />
        <SwipeRouter>
          <Home />
        </SwipeRouter>
      </ThemeProvider>
    </WeatherProvider>
  </>
);

export default App;
