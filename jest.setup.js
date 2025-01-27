/* eslint-disable no-undef -- jest is not defined and cannot be */
import * as ReactNative from 'react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';

afterEach(() => {
  jest.clearAllMocks();
});

jest.useFakeTimers();

jest.doMock('react-native', () => Object.setPrototypeOf(
  {
    NativeModules: {
      ...ReactNative.NativeModules,
      RNAppModule: {
        addListener: jest.fn(),
        removeListeners: jest.fn(),
        eventsAddListener: jest.fn(),
        eventsNotifyReady: jest.fn(),
      },
    },
    TurboModuleRegistry: {
      getEnforcing: () => ({
        initialize: jest.fn(),
        setRequestConfiguration: jest.fn(),
        openAdInspector: jest.fn(),
        openDebugMenu: jest.fn(),
      }),
    },
  },
  ReactNative,
));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn(),
}));

jest.mock('react-native-sound', () => {
  class SoundMock {}

  SoundMock.prototype.setVolume = jest.fn();
  SoundMock.prototype.setNumberOfLoops = jest.fn();
  SoundMock.prototype.play = jest.fn();
  SoundMock.prototype.stop = jest.fn();

  SoundMock.setCategory = jest.fn();

  return SoundMock;
});

jest.mock('react-native-json-tree', () => 'JSONTree');
