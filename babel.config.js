module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
    'module:react-native-dotenv',
    // 'module:babel-plugin-styled-components',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
