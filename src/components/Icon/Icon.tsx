import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import styled from 'styled-components/native';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import icoMoonConfig from '../../assets/fonts/selection.json';

interface Props {
  name: string;
  size?: number;
  color?: string;
  padding?: boolean;
  simple?: boolean;
  material?: boolean;
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

const Icon = ({ size, simple, material, ...rest }: Props) => {
  let CustomIcon = StyledIcon;
  if (material) {
    CustomIcon = CustomIcon.withComponent(MaterialCommunityIcon);
  } else if (simple) {
    CustomIcon = CustomIcon.withComponent(SimpleLineIcon);
  }
  return <CustomIcon {...rest} size={size || 32} />;
};

export default Icon;
