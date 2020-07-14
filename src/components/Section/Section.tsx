import React, { ReactNode, Children, useState } from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { Text } from '..';
import { Icon } from '../Icon';

interface Props {
  children: ReactNode;
  title?: string;
  flex?: number;
  loading?: boolean;
  multi?: SectionConfig[];
}

interface SectionConfig {
  index: number;
  title?: string;
  icon?: string;
  component?: ReactNode;
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

const Section = ({ title, flex, loading, multi, children }: Props) => {
  const [index, setIndex] = useState(0);
  const childArray = Children.toArray(children);

  const sections = multi?.reduce((a: SectionConfig[], c, i) => {
    a[c.index] = { ...c, component: childArray[i] };
    return a;
  }, []);

  const toggleSection = () => {
    const total = multi?.length || 1;
    setIndex((value) => (value + 1 < total ? value + 1 : 0));
  };

  return (
    <Container flex={flex}>
      {(sections?.[index].title || title) && (
        <Title>
          <Text weight="bold" transform="uppercase">
            {sections?.[index].title || title}
          </Text>
          <Stroke middle={!!sections} />
          {sections && (
            <Switch onPress={() => toggleSection()}>
              <Icon
                name={sections?.[index].icon || 'moon-full'}
                color="white"
                size={24}
              />
            </Switch>
          )}
        </Title>
      )}
      {/* {loading ? <ActivityIndicator color="white" /> : children} */}
      {sections ? sections?.[index].component : children}
    </Container>
  );
};

export default Section;
