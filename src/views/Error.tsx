import React from 'react';
import styled from 'styled-components/native';
import { Layout, Icon, Text, Button } from '../components';
import { useWeather } from '../modules/weatherContext';

const Content = styled.View`
  margin: auto;
  align-items: center;
`;

const Error = () => {
  const { actions } = useWeather();
  return (
    <Layout>
      <Content>
        <Icon material name="cloud-alert" size={120} />
        <Text center size={24}>
          Unable to fetch weather
        </Text>
        <Button
          text="Refresh"
          icon="refresh_material"
          onPress={() => actions.getLocation()}
        />
      </Content>
    </Layout>
  );
};

export default Error;
