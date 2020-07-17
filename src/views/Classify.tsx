import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Switch, ActivityIndicator } from 'react-native-paper';

import { Layout, Section, Text, Button, Icon } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';
import WeatherService from '../services/weather';
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
const ShortsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  margin: 8px 0;
`;
const SaveStateFooter = styled.View`
  justify-content: space-between;
  align-items: center;
  height: 64px;
`;

const Classify = ({ weather }: Props) => {
  const { coords, current } = weather;
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shorts, setShorts] = useState(false);
  const { goBack } = useNavigation();
  const theme = useContext(ThemeContext);

  const handleSave = (upper: string) => {
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
      `Save Current Weather: ${toTitleCase(upper)} ${
        shorts ? 'with Shorts' : ''
      }`,
      currentData,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: () => saveClassification(upper) },
      ],
      { cancelable: true },
    );
  };

  const saveClassification = async (upper: string) => {
    setSaving(true);
    if (coords) {
      const ws = new WeatherService(coords);
      try {
        await ws.saveClothing({ upper, lower: shorts ? 'shorts' : undefined });
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
          <ShortsContainer>
            <Text size={20}>Shorts</Text>
            <Switch
              value={shorts}
              onValueChange={() => setShorts(!shorts)}
              color={theme.colors.blue}
            />
          </ShortsContainer>
          <Button text="T-shirt" onPress={() => handleSave('tshirt')} />
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
              <Icon material name="checkbox-marked-circle-outline" size={32} />
              <Text size={16}>Saved</Text>
            </>
          ) : (
            <>
              <ActivityIndicator animating size={32} color="#fff" />
              <Text size={16}>Loading</Text>
            </>
          )}
        </SaveStateFooter>
      )}
    </PageLayout>
  );
};

export default withWeather(Classify);
