import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Text, Icon } from '..';

interface Props {
  text: string;
  type?: string;
  small?: boolean;
  icon?: string;
  onPress: () => void;
}

const ButtonContainer = styled(TouchableOpacity)<{
  type?: string;
  small?: boolean;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ small, theme }) =>
    small ? theme.spacing(0.5) : theme.spacing(0.5, 1)};
  margin: ${({ theme }) => theme.spacing(0.5, 0)};
  border-radius: 8px;
  background: #ffffff1a;
`;

const Button = ({ text, icon, small, ...rest }: Props) => {
  const iconSplit = icon?.split('_');
  const iconConfig = iconSplit && {
    name: iconSplit[0],
    [iconSplit[1]]: !!iconSplit[1],
  };

  return (
    <ButtonContainer {...rest} small={small}>
      {iconConfig && <Icon {...iconConfig} size={small ? 16 : 20} padding />}
      <Text size={small ? 16 : 20}>{text}</Text>
    </ButtonContainer>
  );
};

export default Button;
