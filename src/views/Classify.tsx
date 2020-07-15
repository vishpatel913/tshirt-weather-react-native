import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Layout, Section, Text, Button, SunMoonVector } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';
import WeatherService from '../services/weather';
import CheckCircle from '../assets/svgs/tick.svg';
import { toTitleCase } from '../modules/utils';

interface Props {
  weather: WeatherState;
}

const PageLayout = styled(Layout)`
  justify-content: flex-start;
`;
const Header = styled.View`
  flex-direction: row;
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
  const { coords, current } = weather;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { goBack } = useNavigation();

  const handleSave = (upper: string, lower?: string) => {
    const ignoreKeys = [
      'sunrise',
      'sunset',
      'moon_phase',
      'observation_time',
      'clothing_upper',
      'clothing_lower',
    ];
    const currentData =
      current &&
      Object.entries(current).reduce(
        (a, [k, v]) =>
          !ignoreKeys.includes(k) ? `${a}${toTitleCase(k)}: ${v.value}\n` : a,
        '',
      );
    Alert.alert(
      `Save Current Weather: ${toTitleCase(upper)}`,
      currentData,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: () => saveClassification(upper, lower) },
      ],
      { cancelable: true },
    );
  };

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
      <Header>
        <Button
          small
          text="Back"
          icon="arrow-left_material"
          onPress={() => goBack()}
        />
      </Header>
      <Section title="Clothing Classifications">
        <ButtonsWrapper>
          <Button
            text="T-shirt & Shorts"
            onPress={() => handleSave('tshirt', 'shorts')}
          />
          <Button text="T-shirt" onPress={() => handleSave('tshirt')} />
          <Button
            text="Jacket & Shorts"
            onPress={() => handleSave('jacket', 'shorts')}
          />
          <Button text="Jacket" onPress={() => handleSave('jacket')} />
          <Button text="Jumper" onPress={() => handleSave('jumper')} />
          <Button text="Coat" onPress={() => handleSave('coat')} />
          <Button text="Layers" onPress={() => handleSave('layers')} />
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
