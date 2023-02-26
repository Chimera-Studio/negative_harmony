// @flow
import { get, groupBy } from 'lodash';
import * as API from '../api';
import { deviceInfo } from '../utils';
import { setItem } from '../utils/hooks';
import { admob, localStorageKeys } from '../tokens';
import type { InitialCMSResponse } from '../api';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

type Timestamps = {
  local: any,
  online: any,
  announcement: any,
};

type Master = {
  adIds: {
    banner: {
      android: string,
      ios: string,
    },
    rewarded: {
      android: string,
      ios: string,
    },
  },
  ads: boolean,
  resetRewards: number,
  keepRewards: number,
};

export type State = {
  timestamps: Timestamps,
  master: Master,
  scales: Object[],
  chords: Object[],
  announcement?: Object,
  isLocal: boolean,
};

export const types = {
  CMS_FETCH_APP: 'CMS/FETCH_APP',
  CMS_FETCH_APP_PENDING: 'CMS/FETCH_APP_PENDING',
  CMS_FETCH_APP_REJECTED: 'CMS/FETCH_APP_REJECTED',
  CMS_FETCH_APP_FULFILLED: 'CMS/FETCH_APP_FULFILLED',
};

type AdmobIds = {
  banner: string|null,
  rewarded: string|null,
}

export const getAdmobIds = (state: ReduxState): AdmobIds => {
  const adIds: ?{
    banner: {
      android: string,
      ios: string,
    },
    rewarded: {
      android: string,
      ios: string,
    }
  } = get(state.cms, 'master.adIds');
  const showTestAds = state.global.developerMode;

  const getBannerID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      return showTestAds ? admob.banner.ios_test : adIds.banner.ios;
    } else {
      return showTestAds ? admob.banner.android_test : adIds.banner.android;
    }
  };

  const getRewardedID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      return showTestAds ? admob.rewarded.ios_test : adIds.rewarded.ios;
    } else {
      return showTestAds ? admob.rewarded.android_test : adIds.rewarded.android;
    }
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const selectors = {
  getCMS: (state: ReduxState): ?State => state.cms,
  getTimestamps: (state: ReduxState): ?Timestamps => state.cms?.timestamps,
  getAdmobIds: (state: ReduxState): AdmobIds => getAdmobIds(state),
};

export const actions = {
  fetchCMS: (deploymentEnvironment: 'Production'|'Staging'): ReduxAction => ({
    type: types.CMS_FETCH_APP,
    payload: API.fetchCMS(deploymentEnvironment),
  }),
};

const buildStore = (state: State, payload: InitialCMSResponse): State => {
  if (payload.isLocal) {
    return {
      ...state,
      master: payload.data.master,
      scales: payload.data.scales,
      chords: payload.data.chords,
      isLocal: payload.isLocal,
      timestamps: payload.timestamps,
    };
  }

  const listTypes = groupBy(get(payload.data, 'negativeHarmonyCollection.items'), 'type');

  const storeState = {
    master: get(payload.data, 'appCollection.items[0]', null),
    scales: get(listTypes, 'Scales[0].list', []),
    chords: get(listTypes, 'Chords[0].list', []),
  };

  setItem(
    localStorageKeys.appContent,
    JSON.stringify(storeState),
  );
  setItem(
    localStorageKeys.contentTimestamps,
    JSON.stringify(payload.timestamps.online),
  );

  return {
    ...state,
    ...{
      ...storeState,
      isLocal: payload.isLocal || false,
      timestamps: payload.timestamps,
      announcement: get(payload.data, 'announcementCollection.items[0]', null),
    },
  };
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.CMS_FETCH_APP_FULFILLED:
      return buildStore(state, action.payload);

    default:
      return state || {};
  }
};
