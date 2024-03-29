/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import App from './app/App.tsx';
import { name } from './app.json';

LogBox.ignoreLogs(['Require cycle:']);
AppRegistry.registerComponent(name, () => App);
