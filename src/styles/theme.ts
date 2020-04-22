import {} from 'styled-components/native';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {
    font: {
      head: string;
      body: string;
    };
    spacing: {
      single: string;
      double: string;
      half: string;
    };
  }
}

export const theme = {
  font: {
    head: 'TextMeOne-Regular',
    body: 'Khula',
  },
  spacing: {
    single: '8px',
    double: '16px',
    half: '4px',
  },
  color: {
    purpleDark: '#070544',
    purple: '#361D9D',
    pink: '#E04483',
    pinkLight: '#E67FC4',
    blue: '#4361EE',
    blueLight: '#4ba9f9',
    yellow: '#FAC140',
    yellowLight: '#FFF376',
    beige: '#FDF9ED',

    primary: '#332AD8',
    main: '#323232',
    background: '#FDF9ED',

    white: '#FFF',
    black: '#000',
  },
};
