import React, { useState, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { Alert, Switch, ActivityIndicator } from 'react-native';

import { Layout, Text, Button, Icon, Header } from '../components';
import { withWeather, WeatherState } from '../modules/weatherContext';
import WeatherService from '../services/weather';
import { toTitleCase } from '../modules/utils';

interface Props {
  weather: WeatherState;
}

const ButtonsWrapper = styled.View`
  margin: ${({ theme }) => theme.spacing(1, 0)};
`;
const ShortsContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing()};
  margin: ${({ theme }) => theme.spacing(0.5, 0)};
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
  const [label, setLabel] = useState<string | undefined>(undefined);
  const theme = useContext(ThemeContext);

  const handleSave = (upper: string) => {
    setLabel(`${toTitleCase(upper)} ${shorts ? 'with Shorts' : ''}`);
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
      `Save Current Weather: ${label}`,
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
    }
  };

  return (
    <Layout>
      <Header title="Classify Clothing" back />
      <ButtonsWrapper>
        <ShortsContainer>
          <Text size={20}>Shorts</Text>
          <Switch
            value={shorts}
            onValueChange={() => setShorts(!shorts)}
            thumbColor={theme.colors.white}
            trackColor={{
              false: theme.colors.offWhite,
              true: theme.colors.blue,
            }}
          />
        </ShortsContainer>
        <Button text="T-shirt" onPress={() => handleSave('tshirt')} />
        <Button text="Jacket" onPress={() => handleSave('jacket')} />
        <Button text="Jumper" onPress={() => handleSave('jumper')} />
        <Button text="Coat" onPress={() => handleSave('coat')} />
        <Button text="Layers" onPress={() => handleSave('layers')} />
      </ButtonsWrapper>
      {saving && (
        <SaveStateFooter>
          {saved ? (
            <>
              <Icon material name="checkbox-marked-circle-outline" size={36} />
              <Text grey size={16}>
                Saved - {label}
              </Text>
            </>
          ) : (
            <>
              <ActivityIndicator animating size="large" color="#fff" />
              <Text grey size={16}>
                Loading
              </Text>
            </>
          )}
        </SaveStateFooter>
      )}
    </Layout>
  );
};

export default withWeather(Classify);
