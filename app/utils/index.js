// @flow
import { Dimensions, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { AdsConsent, AdsConsentStatus } from 'react-native-google-mobile-ads';

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
