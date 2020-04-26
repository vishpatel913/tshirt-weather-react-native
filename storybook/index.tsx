/* eslint-disable import/no-extraneous-dependencies */
import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

import './rn-addons';
import './stories/Header.stories';

// import stories
// configure(() => {
//   require('./stories');
// }, module);

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
const StorybookUIRoot = getStorybookUI({ port: 7007, host: 'localhost' });

AppRegistry.registerComponent('%APP_NAME%', () => StorybookUIRoot);

export default StorybookUIRoot;
