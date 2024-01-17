import { admob } from '../tokens';
import { deviceInfo } from '../utils';
import type { ReduxActionWithPayload, ReduxState } from '../types';

export type State = {
  reviewMinutes: number,
  loadTime: number,
};

type AdmobIds = {
  banner: string | null,
  rewarded: string | null,
};

export const getAdmobIds = (state: ReduxState): AdmobIds => {
  const showTestAds = state.global.developerMode;

  const getBannerID = (): string | null => {
    if (deviceInfo.isApple) {
      return showTestAds ? admob.banner.ios_test : admob.banner.ios;
    } else {
      return showTestAds ? admob.banner.android_test : admob.banner.android;
    }
  };

  const getRewardedID = (): string | null => {
    if (deviceInfo.isApple) {
      return showTestAds ? admob.rewarded.ios_test : admob.rewarded.ios;
    } else {
      return showTestAds ? admob.rewarded.android_test : admob.rewarded.android;
    }
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const selectors = {
  getStatic: (state: ReduxState): State => state.static,
  getAdmobIds: (state: ReduxState): AdmobIds => getAdmobIds(state),
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
