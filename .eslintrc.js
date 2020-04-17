module.exports = {
  root: true,
  extends: [
    '@react-native-community',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  plugins: ['react'],
  rules: {
    'space-in-brackets': ['always', 'error'],
    'import/no-unresolved': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
};
