import React, { ReactNode, Children, useState } from 'react';
import { Section } from '.';

interface Props {
  children: ReactNode;
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

const MultiSection = ({ flex, loading, multi, children }: Props) => {
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
    <Section
      title={sections?.[index].title}
      icon={sections?.[index].icon}
      onIconPress={() => toggleSection()}
      flex={flex}>
      {/* {loading ? <ActivityIndicator color="white" /> : children} */}
      {sections?.[index].component}
    </Section>
  );
};

export default MultiSection;
