import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { Home, Data, Classify, Hourly } from './views';
import { GradientContainer, SwipeRouter, Footer } from './components';
import { withGradient } from './components/GradientContainer/GradientContainer';
import { WeatherProvider } from './modules/weatherContext';
import { theme } from './styles/theme';

import 'react-native-gesture-handler';

enableScreens();
const Stack = createNativeStackNavigator();

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
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen
                name="main"
                component={withGradient(MainSwipePage)}
              />
              <Stack.Screen name="hourly" component={withGradient(Hourly)} />
              <Stack.Screen
                name="classify"
                component={withGradient(Classify)}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GradientContainer>
        <Footer />
      </ThemeProvider>
    </WeatherProvider>
  </>
);

const MainSwipePage = () => (
  <SwipeRouter>
    <Home />
    <Data />
  </SwipeRouter>
);

export default App;
