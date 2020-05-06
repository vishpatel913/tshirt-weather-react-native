import React from 'react';
import styled from 'styled-components/native';
import Landscape from '../../assets/svgs/landscape.svg';

const Container = styled.View`
  position: relative;
`;

const LandscapeVector = () => (
  <Container>
    <Landscape width="100%" height="400px" />
  </Container>
);

export default LandscapeVector;
