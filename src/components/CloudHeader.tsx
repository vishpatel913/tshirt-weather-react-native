import React from 'react';
import styled from 'styled-components/native';
import Cloud from '../assets/svgs/cloud.svg';

interface Props {
  clouds: number;
}

const HeaderContainer = styled.View`
  position: relative;
  width: 100%;
  height: 200px;
`;

const VectorContainer = styled.View`
  /* background-color: ${({ theme }) => theme.color.blue}; */
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -50;
`;
const ScatteredCloud = styled(Cloud)<{
  pos: { x: number; y: number; z: number };
}>`
  position: absolute;
  top: ${({ pos }) => pos.y}%;
  left: ${({ pos }) => pos.x}%;
  opacity: ${({ pos }) => pos.z};
  z-index: 50;
`;

const CloudHeader = ({ clouds }: Props) => {
  const randomClouds = Array.from(
    { length: Math.floor(clouds / Math.sqrt(10) + clouds / 5) },
    () => ({
      x: Math.floor(Math.random() * 200 - 100),
      y: Math.floor(Math.random() * 100) - 25,
      z: Math.sqrt(clouds / 200) + 0.2,
    }),
  );

  return (
    <HeaderContainer>
      <VectorContainer>
        {randomClouds.map((cloud) => (
          <ScatteredCloud key={cloud.x * cloud.y} height="128" pos={cloud} />
        ))}
      </VectorContainer>
    </HeaderContainer>
  );
};

export default CloudHeader;
