import React from 'react';
import styled from 'styled-components/native';
import moment from 'moment';
import { Text, Title } from './atoms';
import Sun from '../assets/svg/sun.svg';
import Moon from '../assets/svg/moon.svg';
import Cloud from '../assets/svg/cloud.svg';
import CloudRain from '../assets/svg/rain-cloud.svg';
import Clouds from '../assets/svg/cloud-both.svg';
import ThermometerHot from '../assets/svg/thermometer-hot.svg';
import ThermometerCold from '../assets/svg/thermometer-cold.svg';

const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
`;

const ContentContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.double};
`;

const VectorContainer = styled.View`
  background-color: ${({ theme }) => theme.color.blueLight};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -50;
`;

const ScatteredCloud = styled(Cloud)`
  position: absolute;
  top: ${({ cloud }) => cloud.y}%;
  left: ${({ cloud }) => cloud.x}%;
  opacity: ${({ cloud }) => cloud.z};
  z-index: 50;
`;

const Header = ({ current }) => {
  const now = moment();
  const { temp, clouds, sunrise, sunset, location, uv } = current;
  const randomClouds = Array.from({ length: Math.floor(clouds / Math.sqrt(10)) }, () => ({
    x: Math.floor(Math.random() * 200 - 100),
    y: Math.floor(Math.random() * 100) - 25,
    z: Math.sqrt((clouds) / 100) - 0.1,
  }));

  return (
    <HeaderContainer>
      <ContentContainer>
        <Title level="1">
          {Math.round(temp)}
          ºC
        </Title>
        <Title level="2">{clouds}</Title>
        <Text>{location}</Text>
      </ContentContainer>
      <VectorContainer>
        {randomClouds.map((cloud, i) => (
          <ScatteredCloud key={i} height="128" cloud={cloud} />
        ))}
      </VectorContainer>
    </HeaderContainer>
  );
};

export default Header;
