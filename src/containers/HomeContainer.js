import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

import {Header} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';
import {withWeatherContext} from '../context/weatherContext';

const ScrollContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.color.light};
`;
const Body = styled.View`
  background-color: ${({theme}) => theme.color.white};
`;
const SectionContainer = styled.View`
  margin-top: 32px;
  padding: 0 24px;
`;
const SectionTitle = styled.Text`
  font-family: ${({theme}) => theme.font.head};
  font-size: 24px;
  font-weight: 600;
  color: black;
`;
const SectionDescription = styled.Text`
  margin-top: 8px;
  font-family: ${({theme}) => theme.font.body};
  font-size: 16px;
  font-weight: 400;
  color: ${({theme}) => theme.color.dark};
`;

const HomeContainer = ({weather, actions}) => {
  useEffect(() => {
    actions.getLocation();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollContainer contentInsetAdjustmentBehavior="automatic">
          <Header />
          <Body>
            <SectionContainer>
              <SectionTitle>Temp: {weather.current.temp}</SectionTitle>
            </SectionContainer>
          </Body>
        </ScrollContainer>
      </SafeAreaView>
    </>
  );
};

export default withWeatherContext(HomeContainer);
