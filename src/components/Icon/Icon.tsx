import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import icoMoonConfig from '../../assets/fonts/selection.json';

interface Props {
  name: string;
  size?: number;
  color?: string;
  padding?: boolean;
  simple?: boolean;
  feather?: boolean;
}
const IcomoonIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'Weather-Icons',
  'Weather-Icons.ttf',
);

const StyledIcon = styled(IcomoonIcon)<Props>`
  color: ${({ theme, color }) => color || theme.colors.white};
  margin: 0 ${({ padding }) => padding && '4px'};
`;

const Icon = ({ size, simple, feather, ...rest }: Props) => {
  let CustomIcon = StyledIcon;
  if (feather) {
    CustomIcon = CustomIcon.withComponent(FeatherIcon);
  } else if (simple) {
    CustomIcon = CustomIcon.withComponent(SimpleLineIcon);
  }
  return <CustomIcon {...rest} size={size || 32} />;
};

export default Icon;
