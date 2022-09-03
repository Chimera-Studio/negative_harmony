// @flow
/* eslint-disable no-undef */
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';
import { includes } from 'lodash';
// $FlowFixMe[cannot-resolve-module] (Git Ignored)
import ENV from '../../env.json';

type DeviceInfoType = {
  isApple: boolean,
  isTablet: boolean,
  isiPhone: boolean,
  isRealDevice?: boolean,
  isAdminDevice?: boolean,
  showAdminActions?: boolean,
  deviceId?: string,
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

export const getDeviceInfo = async (): Promise<any> => {
  const isEmulator = await DeviceInfo.isEmulator();
  const deviceID = await DeviceInfo.getUniqueId();
  const isAdminDevice = includes(ENV.ADMIN_DEVICE_IDS, deviceID);
  const showAdminActions = isEmulator || isAdminDevice;

  deviceInfo.isRealDevice = !isEmulator;
  deviceInfo.isAdminDevice = isAdminDevice;
  deviceInfo.showAdminActions = showAdminActions;
  deviceInfo.deviceId = deviceID;
};

// $FlowFixMe
export const isPromise = (p) => !!p && typeof p.then === 'function';

export const checkAdsConsent = async (): Promise<{
  showAds: boolean,
  personalisedAds: boolean,
}> => {
  const { selectPersonalisedAds, storeAndAccessInformationOnDevice } = await AdsConsent.getUserChoices();

  return {
    showAds: storeAndAccessInformationOnDevice,
    personalisedAds: selectPersonalisedAds,
  };
};

export const handleAdsConsent = async (): Promise<{
  showAds: boolean,
  personalisedAds: boolean,
}> => {
  const consentInfo = await AdsConsent.requestInfoUpdate();
  const consentObtained = consentInfo.status === AdsConsentStatus.OBTAINED;
  const consentRequired = consentInfo.status === AdsConsentStatus.REQUIRED;

  if (consentObtained) {
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  if (consentInfo.isConsentFormAvailable && consentRequired) {
    await AdsConsent.showForm();
    const { showAds, personalisedAds } = await checkAdsConsent();

    return {
      showAds,
      personalisedAds,
    };
  }

  return {
    showAds: true,
    personalisedAds: true,
  };
};
