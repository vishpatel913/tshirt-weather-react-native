import React from 'react';
import {Text as RNText} from 'react-native';
import styled from 'styled-components';

const StyledText = styled(RNText)`
  font-family: ${({theme}) => theme.font.head};
  font-size: ${({level}) => (level ? 72 / level : 32)}px;
  color: black;
  font-weight: 300;
  margin-bottom: ${({theme}) => theme.spacing.single};
  color: ${({theme, color}) => theme.color[color ? color : 'purple']};
`;

const Title = (props) => {
  return <StyledText {...props} />;
};

export default Title;
