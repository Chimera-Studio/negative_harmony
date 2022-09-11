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

export const getAdmobIds = (adIds: ?{
  banner: {
    android: string,
    ios: string,
  },
  rewarded: {
    android: string,
    ios: string,
  }
}): AdmobIds => {
  let adId = null;

  const getBannerID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      adId = deviceInfo.isRealDevice ? adIds.banner.ios : admob.banner.ios_test;
    } else {
      adId = deviceInfo.isRealDevice ? adIds.banner.android : admob.banner.android_test;
    }

    return adId;
  };

  const getRewardedID = (): string|null => {
    if (!adIds) return null;

    if (deviceInfo.isApple) {
      adId = deviceInfo.isRealDevice ? adIds.rewarded.ios : admob.rewarded.ios_test;
    } else {
      adId = deviceInfo.isRealDevice ? adIds.rewarded.android : admob.rewarded.android_test;
    }

    return adId;
  };

  return {
    banner: getBannerID(),
    rewarded: getRewardedID(),
  };
};

export const selectors = {
  getCMS: (state: ReduxState): ?State => state.cms,
  getTimestamps: (state: ReduxState): ?Timestamps => state.cms?.timestamps,
  getAdmobIds: (state: ReduxState): AdmobIds => getAdmobIds(get(state.cms, 'master.adIds')),
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
