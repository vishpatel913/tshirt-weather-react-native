import React from 'react';
import { render } from 'react-native-testing-library';
import { Home } from '../src/views';
import { MockWeatherProvider } from './__mocks__/mockContext';

const createTestProps = (props?: object) => ({
  ...props,
});

describe('Home', () => {
  const props = createTestProps();
  const { getByText } = render(
    <MockWeatherProvider>
      (<Home {...props} />)
    </MockWeatherProvider>,
  );

  it('should render a welcome', () => {
    expect(getByText(/welcome/i)).toBeDefined();
  });
});
