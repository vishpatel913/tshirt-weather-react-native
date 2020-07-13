import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from '..';

interface Props {
  text: string;
  size?: string;
  type?: string;
  icon?: string;
  onPress: () => void;
}

const ButtonContainer = styled(TouchableOpacity)<{
  type?: string;
  size?: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 16px;
  margin: 8px 0;
  border-radius: 8px;
  background: #ffffff1a;
`;

const Button = ({ text, size, type, icon, onPress }: Props) => (
  <ButtonContainer type={type} size={size} onPress={onPress}>
    {icon && <Icon name={icon} size={20} padding />}
    <Text size={20}>{text}</Text>
  </ButtonContainer>
);

export default Button;
