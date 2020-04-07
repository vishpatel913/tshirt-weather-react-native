import React from 'react';
import {StatusBar} from 'react-native';
import {ThemeProvider} from 'styled-components';
import WeatherContext from './src/context/weatherContext';

import HomeContainer from './src/containers/HomeContainer';
import theme from './src/styles/theme';

const App = () => {
  return (
    <>
      <WeatherContext>
        <ThemeProvider theme={theme}>
          <StatusBar barStyle="dark-content" />
          <HomeContainer />
        </ThemeProvider>
      </WeatherContext>
    </>
  );
};

export default App;
