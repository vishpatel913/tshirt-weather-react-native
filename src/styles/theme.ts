import {} from 'styled-components/native';

declare module 'styled-components' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {
    spacing: {
      single: string;
      double: string;
      triple: string;
      half: string;
    };
  }
}

export const theme = {
  roundness: 4,
  fonts: {
    regular: {
      fontFamily: 'WorkSans-Light',
      fontWeight: 'normal' as 'normal',
    },
    medium: {
      fontFamily: 'WorkSans-Regular',
      fontWeight: 'normal' as 'normal',
    },
    light: {
      fontFamily: 'WorkSans-ExtraLight',
      fontWeight: 'normal' as 'normal',
    },
    thin: {
      fontFamily: 'WorkSans-Thin',
      fontWeight: 'normal' as 'normal',
    },
  },
  spacing: {
    single: '16px',
    double: '32px',
    triple: '48px',
    half: '8px',
  },
  colors: {
    // purpleDark: '#070544',
    // purple: '#361D9D',
    // pinkLight: '#E67FC4',
    // yellow: '#FAC140',
    blue: '#1D2F6F',
    indigo: '#8390FA',
    yellow: '#FAC748',
    beige: '#F9E9EC',
    pink: '#F88DAD',
    pinkDark: '#E04483',
    white: '#FFF',
    offwhite: '#FFFFFF80',
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
  animation: {
    scale: 1.0,
  },
};
