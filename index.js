import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import Storybook from './storybook';

const runStorybook = false;
AppRegistry.registerComponent(appName, () => (runStorybook ? Storybook : App));
