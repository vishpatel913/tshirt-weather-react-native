import React from 'react';
import styled from 'styled-components/native';
import { Text, Icon } from '..';

interface Props {
  text: string;
  type?: string;
  icon?: boolean;
}

const AlertContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(0.5)};
  margin: ${({ theme }) => theme.spacing(0.5, 0)};
  border: solid 1px ${({ theme }) => theme.colors.offWhite};
  border-radius: 8px;
`;

const TextContainer = styled.View`
  margin: ${({ theme }) => theme.spacing(0.5)};
`;

const Alert = ({ text, type = 'error', icon }: Props) => {
  return (
    <AlertContainer>
      {icon ? <Icon material name="cloud-alert" size={20} /> : null}
      <TextContainer>
        <Text>{text}</Text>
      </TextContainer>
    </AlertContainer>
  );
};

export default Alert;
