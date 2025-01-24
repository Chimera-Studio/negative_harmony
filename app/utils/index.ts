import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

type DeviceInfoType = {
  isApple: boolean,
  isTablet: boolean,
  isiPhone: boolean,
  isRealDevice?: boolean,
};

export const isApple: boolean = Platform.OS === 'ios';
export const isTablet: boolean = DeviceInfo.isTablet();
export const isiPhone: boolean = isApple && !isTablet;
export const deviceInfo: DeviceInfoType = {
  isApple,
  isTablet,
  isiPhone,
};
export const deviceWidth: number = Dimensions.get('screen').width;
export const deviceHeight: number = Dimensions.get('screen').height;

export const getDeviceInfo = async (): Promise<DeviceInfoType> => {
  const isEmulator = await DeviceInfo.isEmulator();
  deviceInfo.isRealDevice = !isEmulator;

  return deviceInfo;
};

export const isPromise = (p: any) => !!p && typeof p.then === 'function';
