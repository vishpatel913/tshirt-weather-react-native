import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Text } from '..';

interface Props {
  location: string;
}

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${({ theme }) => theme.spacing.double};
`;

const LocationHeader = ({ location }: Props) => (
  <Container>
    <Text size={24}>{location}</Text>
    <Text grey>{moment().format('ddd, Do MMM')}</Text>
  </Container>
);

export default LocationHeader;
