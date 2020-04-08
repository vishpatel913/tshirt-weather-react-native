import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {withWeatherContext} from '../context/weatherContext';
import {Header} from '../components';

const ScrollContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.color.white};
  /* background-color: ${({theme}) => theme.color.light}; */
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
  color: ${({theme}) => theme.color.main};
`;

const HomeContainer = ({weather}) => {
  const {current, actions} = weather;

  useEffect(() => {
    actions.getLocation();
  }, []);

  return (
    <>
      <SafeAreaView>
        <ScrollContainer contentInsetAdjustmentBehavior="automatic">
          <Header temp={current.temp} location={current.location} />
          <Body>
            <SectionContainer>
              <SectionTitle>Body</SectionTitle>
              <SectionDescription>Temp: {current.temp}ºC</SectionDescription>
            </SectionContainer>
          </Body>
        </ScrollContainer>
      </SafeAreaView>
    </>
  );
};

export default withWeatherContext(HomeContainer);
