import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import styled from 'styled-components/native';
import icoMoonConfig from '../../assets/fonts/selection.json';

interface Props {
  name: string;
  size?: number;
  color?: string;
}
const Icon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'Weather-Icons',
  'Weather-Icons.ttf',
);

const WhiteIcon = styled(Icon)`
  color: ${({ theme }) => theme.color.white};
  padding: 0 ${({ theme }) => theme.spacing.half};
`;

const StyledIcon = (props: Props) => {
  return <WhiteIcon {...props} />;
};

export default StyledIcon;
