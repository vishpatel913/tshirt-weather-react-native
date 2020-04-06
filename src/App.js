import React from 'react';
import {StatusBar} from 'react-native';
import HomeContainer from './containers/HomeContainer';
import {ThemeProvider} from 'styled-components';
import theme from './assets/style/theme';

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />
        <HomeContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
