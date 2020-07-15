import React from 'react';
import styled from 'styled-components/native';
import { Linking } from 'react-native';
import moment from 'moment';
import { useWeather } from '../../modules/weatherContext';
import { Text, Icon } from '..';

const Container = styled.View`
  position: absolute;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  bottom: ${({ theme }) => theme.spacing.single};
  padding: 0 ${({ theme }) => theme.spacing.double};
`;
const PubLink = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const Footer = () => {
  const { current, isLoading } = useWeather();
  return (
    <Container>
      <Text size={12} weight="bold">
        {isLoading
          ? 'Updating...'
          : `Updated: ${moment(current?.observation_time.value).format(
              'h:mm a',
            )}`}
      </Text>
      <PubLink
        onPress={() => Linking.openURL('https://pubs-nearby.firebaseapp.com')}>
        <Icon material name="beer" size={10} />
        <Text size={12} weight="bold">
          Fancy a Beer?
        </Text>
      </PubLink>
    </Container>
  );
};

export default Footer;
