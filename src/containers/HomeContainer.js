import React from 'react';
import {SafeAreaView} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';

const ScrollContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.color.light};
`;
const Engine = styled.View`
  position: absolute;
  right: 0;
`;
const Footer = styled.Text`
  color: ${({theme}) => theme.color.dark};
  font-size: 12px;
  font-weight: 600;
  padding: 4px;
  padding-right: 12px;
  text-align: right;
`;
const Body = styled.View`
  background-color: ${({theme}) => theme.color.light};
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
const Highlight = styled.Text`
  font-family: ${({theme}) => theme.font.body};
  font-weight: 600;
  color: ${({theme}) => theme.color.main};
  padding: 8px;
`;

const HomeContainer = () => {
  return (
    <>
      <SafeAreaView>
        <ScrollContainer contentInsetAdjustmentBehavior="automatic">
          <Header />
          {global.HermesInternal == null ? null : (
            <Engine>
              <Footer>Engine: Hermes</Footer>
            </Engine>
          )}
          <Body>
            <SectionContainer>
              <SectionTitle>Step One</SectionTitle>
              <SectionDescription>
                Edit <Highlight>HomeContainer.js</Highlight> to change this
                screen and then come back to see your edits.
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>See Your Changes</SectionTitle>
              <SectionDescription>
                <ReloadInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionTitle>Debug</SectionTitle>
              <SectionDescription>
                <DebugInstructions />
              </SectionDescription>
            </SectionContainer>
            <SectionContainer>
              <SectionDescription>Learn More</SectionDescription>
              <SectionDescription>
                Read the docs to discover what to do next:
              </SectionDescription>
            </SectionContainer>
            <LearnMoreLinks />
          </Body>
        </ScrollContainer>
      </SafeAreaView>
    </>
  );
};

export default HomeContainer;
