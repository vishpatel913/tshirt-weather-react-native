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
  padding: ${({ small }) => (small ? '8px' : '8px 16px')};
  margin: 8px 0;
  border-radius: 8px;
  background: #ffffff1a;
`;

const Button = ({ text, icon, small, ...rest }: Props) => {
  console.log('small :>> ', small);
  return (
    <ButtonContainer {...rest} small={small}>
      {icon && <Icon name={icon} size={small ? 16 : 20} padding />}
      <Text size={small ? 16 : 20}>{text}</Text>
    </ButtonContainer>
  );
};

export default Button;
