import React from 'react';
import styled from 'styled-components/native';
import {Text, Title} from './atoms';

const HeaderContainer = styled.View`
  background-color: ${({theme}) => theme.color.purple};
  width: 100%;
  padding: ${({theme}) => theme.spacing.double};
  color: white;
`;

const Header = ({temp, location}) => {
  return (
    <HeaderContainer>
      <Title level="1" color="white">
        {Math.round(temp)}ºC
      </Title>
      <Text color="white">{location}</Text>
    </HeaderContainer>
  );
};

export default Header;
