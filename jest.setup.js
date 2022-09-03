/* eslint-disable no-undef -- jest is not defined and cannot be */
// @flow
import mockRNDeviceInfo from 'react-native-device-info/jest/react-native-device-info-mock';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

afterEach(() => {
  jest.clearAllMocks();
});

jest.useFakeTimers();

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('react-native-device-info', () => mockRNDeviceInfo);

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-linear-gradient', () => 'LinearGradient');

jest.mock('react-native-in-app-review', () => ({
  RequestInAppReview: jest.fn(),
  isAvailable: jest.fn(),
}));

jest.mock('react-native-code-push', () => {
  const cp = () => (app: any) => app;
  Object.assign(cp, {
    InstallMode: {},
    CheckFrequency: {},
    SyncStatus: {},
    UpdateState: {},
    DeploymentStatus: {},
    DEFAULT_UPDATE_DIALOG: {},

    checkForUpdate: jest.fn(),
    codePushify: jest.fn(),
    getConfiguration: jest.fn(),
    getCurrentPackage: jest.fn(),
    getUpdateMetadata: jest.fn(),
    log: jest.fn(),
    notifyAppReady: jest.fn(),
    notifyApplicationReady: jest.fn(),
    sync: jest.fn(),
  });

  return cp;
});

jest.mock('react-native-json-tree', () => 'JSONTree');

jest.mock('axios', () => {
  const mockAxios = jest.genMockFromModule('axios');

  return {
    create: jest.fn(() => mockAxios),
  };
});
