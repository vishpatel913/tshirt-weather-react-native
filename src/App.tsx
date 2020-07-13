import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { WeatherProvider } from './modules/weatherContext';
import { SwipeRouterProvider } from './modules/swipeRouterContext';
import { theme } from './styles/theme';
import { GradientContainer, SwipeRouter } from './components';
import { withGradient } from './components/GradientContainer/GradientContainer';
import { Home, Data, Classify } from './views';

import 'react-native-gesture-handler';

const Stack = createStackNavigator();

const App = () => (
  <>
    <WeatherProvider>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="#00000000"
        />
        <GradientContainer showUpdated>
          <NavigationContainer>
            <Stack.Navigator
              mode="card"
              initialRouteName="main"
              headerMode="none"
              screenOptions={{
                cardStyle: { backgroundColor: 'transparent' },
              }}>
              <Stack.Screen name="main" component={MainSwipePage} />
              <Stack.Screen
                name="classify"
                component={withGradient(Classify)}
                options={{ title: 'test' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </GradientContainer>
      </ThemeProvider>
    </WeatherProvider>
  </>
);

const MainSwipePage = () => (
  <SwipeRouterProvider pages={2}>
    <SwipeRouter>
      <Home />
      <Data />
    </SwipeRouter>
  </SwipeRouterProvider>
);

export default App;
