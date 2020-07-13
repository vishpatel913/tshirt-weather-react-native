import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { Layout, Section, Text, Button, SunMoonVector } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';
import WeatherService from '../services/weather';
import CheckCircle from '../assets/svgs/tick.svg';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  justify-content: flex-start;
`;
const ButtonsWrapper = styled.View`
  margin: 16px 0;
`;
const SaveStateFooter = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 100px;
`;

const Classify = ({ weather }: Props) => {
  const { coords } = weather;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const saveClassification = async (upper: string, lower?: string) => {
    setSaving(true);
    if (coords) {
      const ws = new WeatherService(coords);
      try {
        await ws.saveClothing({ upper, lower });
        setSaved(true);
      } catch (e) {
        Alert.alert('Problem saving weather to database');
      }
      setTimeout(() => {
        setSaving(false);
        setSaved(false);
      }, 2000);
    }
  };

  return (
    <PageLayout>
      <Section title="Save Clothing">
        <ButtonsWrapper>
          <Button
            text="T-shirt & Shorts"
            onPress={() => {
              saveClassification('tshirt', 'shorts');
            }}
          />
          <Button
            text="T-shirt"
            onPress={() => {
              saveClassification('tshirt');
            }}
          />
          <Button
            text="Jacket & Shorts"
            onPress={() => {
              saveClassification('jacket', 'shorts');
            }}
          />
          <Button
            text="Jacket"
            onPress={() => {
              saveClassification('jacket');
            }}
          />
          <Button
            text="Jumper"
            onPress={() => {
              saveClassification('jumper');
            }}
          />
          <Button
            text="Coat"
            onPress={() => {
              saveClassification('coat');
            }}
          />
          <Button
            text="Layers"
            onPress={() => {
              saveClassification('layers');
            }}
          />
        </ButtonsWrapper>
      </Section>

      {saving && (
        <SaveStateFooter>
          {saved ? (
            <>
              <CheckCircle width={60} height={60} />
              <Text size={20}>Saved</Text>
            </>
          ) : (
            <>
              <SunMoonVector width={60} height={60} animate />
              <Text size={20}>Loading</Text>
            </>
          )}
        </SaveStateFooter>
      )}
    </PageLayout>
  );
};

export default withWeather(Classify);
