import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import moment from 'moment';
import { Text, Icon } from '..';

interface Props {
  title?: string;
  date?: boolean;
  back?: boolean;
}

const Container = styled.View`
  flex-direction: row;
  margin-bottom: 16px;
`;
const Title = styled.View`
  flex: 8;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 ${({ theme }) => theme.spacing.double};
`;
const ButtonContainer = styled.View`
  flex: 1;
`;
const BackButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;

const Header = ({ title, date, back }: Props) => {
  const { goBack } = useNavigation();
  return (
    <Container>
      <ButtonContainer>
        {back && (
          <BackButton onPress={() => goBack()}>
            <Icon material name="backburger" size={32} />
          </BackButton>
        )}
      </ButtonContainer>
      {title && (
        <Title>
          <Text center size={24}>
            {title}
          </Text>
          {date && <Text grey>{moment().format('ddd, Do MMM')}</Text>}
        </Title>
      )}
      <ButtonContainer />
    </Container>
  );
};

export default Header;
