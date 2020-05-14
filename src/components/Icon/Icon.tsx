import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import styled from 'styled-components/native';
import icoMoonConfig from '../../assets/fonts/selection.json';

interface Props {
  name: string;
  size?: number;
  color?: string;
  padding?: boolean;
}
const Icon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'Weather-Icons',
  'Weather-Icons.ttf',
);

const WhiteIcon = styled(Icon)<Props>`
  color: ${({ theme, color }) => color || theme.color.white};
  margin: 0 ${({ theme, padding }) => padding && '4px'};
`;

const StyledIcon = ({ size, ...rest }: Props) => {
  return <WhiteIcon {...rest} size={size || 32} />;
};

export default StyledIcon;
