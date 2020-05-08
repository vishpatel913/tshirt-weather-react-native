import React, { ReactNode } from 'react';
import styled from 'styled-components/native';

import { LandscapeVector } from '..';

interface Props {
  children: ReactNode;
  landscape?: boolean;
}

const LayoutContainer = styled.View`
  padding: ${({ theme }) => theme.spacing.double};
  height: 100%;
  position: relative;
`;
const LandscapeContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const Layout = ({ children, landscape, ...rest }: Props) => {
  return (
    <LayoutContainer {...rest}>
      {landscape && (
        <LandscapeContainer>
          <LandscapeVector />
        </LandscapeContainer>
      )}
      {children}
    </LayoutContainer>
  );
};

export default Layout;
