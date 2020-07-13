import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import { WeatherProvider } from './modules/weatherContext';
import { RouterProvider } from './modules/routerContext';
import { theme } from './styles/theme';

import { GradientContainer, SwipeRouter } from './components';
import { Home, Data } from './views';

const App = () => (
  <>
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#00000000"
        />
        <GradientContainer>
          <RouterProvider pages={2}>
            <SwipeRouter>
              <Home />
              <Data />
            </SwipeRouter>
          </RouterProvider>
        </GradientContainer>
      </ThemeProvider>
    </WeatherProvider>
  </>
);

export default App;
