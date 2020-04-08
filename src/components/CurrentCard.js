import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';

const CardContainer = styled.View`
  background-color: ${({theme}) => theme.color.purple};
  width: 100%;
  padding: 16px;
  color: white;
`;

const CurrentCard = ({main}) => {
  return (
    <CardContainer>
      <Text>Temp: {main.temp}</Text>
    </CardContainer>
  );
};

export default CurrentCard;
