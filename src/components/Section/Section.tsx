import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Text } from '..';
import { Icon } from '../Icon';

interface Props {
  children: ReactNode;
  title?: string;
  onIconPress?: () => void;
  icon?: string;
  flex?: number;
  loading?: boolean;
}

const Container = styled.View<Props>`
  margin: ${({ theme }) => theme.spacing.single} 0;
  ${({ flex }) =>
    flex &&
    `
      flex: ${flex};
      justify-content: center;
  `}
`;
const Title = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: ${({ theme }) => theme.spacing.single};
`;
const Stroke = styled.View<{ middle?: boolean }>`
  flex-grow: 1;
  align-self: flex-start;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.white};
  opacity: 0.5;
  margin-left: ${({ theme }) => theme.spacing.half};
  margin-right: ${({ theme, middle }) => (middle ? theme.spacing.half : 0)};
`;
const Switch = styled(TouchableOpacity)`
  border-radius: 20px;
`;

const Section = ({
  title,
  flex,
  icon,
  onIconPress,
  loading,
  children,
}: Props) => {
  return (
    <Container flex={flex}>
      <Title>
        {title && (
          <>
            <Text weight="bold" transform="uppercase">
              {title}
            </Text>
            <Stroke middle={!!icon} />
          </>
        )}
        {icon && !loading && (
          <Switch onPress={() => onIconPress && onIconPress()}>
            <Icon name={icon} color="white" size={24} />
          </Switch>
        )}
      </Title>
      {children}
    </Container>
  );
};

export default Section;
