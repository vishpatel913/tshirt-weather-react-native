import {} from 'styled-components/native';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {
    font: {
      thin: string;
      light: string;
      main: string;
      bold: string;
    };
    spacing: {
      single: string;
      double: string;
      triple: string;
      half: string;
    };
  }
}

export const theme = {
  font: {
    thin: 'WorkSans-Thin',
    light: 'WorkSans-ExtraLight',
    main: 'WorkSans-Light',
    bold: 'WorkSans-Regular',
  },
  spacing: {
    single: '16px',
    double: '32px',
    triple: '48px',
    half: '8px',
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
  gradientMap: {
    clear: {
      day: ['#37a9d8', '#90d2ec'],
      night: ['#0e2755', '#504fa7'],
      sunrise: ['#006f7d', '#e8f1bb'],
      sunset: ['#753676', '#febea2'],
    },
    clouds: {
      day: ['#37a9d8', '#9ebacd'],
      night: ['#0e2755', '#959bc6'],
    },
    rain: {
      day: ['#70919f', '#b0cad4'],
      night: ['#1e363b', '#728591'],
    },
    snow: {
      day: ['#7e9ecc', '#adc2da'],
      night: ['#3a4759', '#899fb8'],
    },
    pink: ['#E04483', '#E67FC4'],
  },
};
