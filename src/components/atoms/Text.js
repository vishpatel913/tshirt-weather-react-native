import React from 'react';
import {Text as RNText} from 'react-native';
import styled from 'styled-components/native';

const StyledText = styled(RNText)`
  font-family: ${({theme}) => theme.font.body};
  font-size: ${({small}) => (small ? 16 : 20)}px;
  font-weight: 300;
  color: ${({theme, color}) => theme.color[color ? color : 'main']};
`;

const Text = (props) => {
  return <StyledText {...props} />;
};

export default Text;
