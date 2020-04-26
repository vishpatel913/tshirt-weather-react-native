/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { ThemeProvider } from 'styled-components';

import { theme } from '../../src/styles/theme';
import { Header } from '../../src/components';

const withProvider = (story) => (
  <ThemeProvider theme={theme}>{story()}</ThemeProvider>
);

storiesOf('Header', module)
  .addDecorator(withProvider)
  .add('sunny and clear', () => <Header temp={20} clouds={2} />)
  .add('50% clouds', () => <Header temp={16} clouds={50} />)
  .add('normal and cloudy', () => <Header temp={13} clouds={80} />);
