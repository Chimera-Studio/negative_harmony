// @flow
import { get } from 'lodash';
import * as API from '../api';
import { types as cmsTypes } from './cmsStore';
import type { InitialCMSResponse } from '../api';
import type { ReduxAction, ReduxActionWithPayload, ReduxState } from '../types';

export type Axis = {
  status: boolean,
  angle: number,
};

export type ActiveKey = {
  x: number,
  y: number,
  group: ?string,
  field: ?number,
};

export type State = {
  codepushData?: {
    environment: 'Production'|'Staging',
    deploymentKey: string,
    ...Object,
  },
  scales?: Object[],
  chords?: Object[],
  selectedScale?: Object,
  selectedChord?: Object,
  axis: Axis,
  activeKey: ActiveKey,
  unlocked: boolean,
  showAds: boolean,
  personalisedAds?: boolean,
  showLegend?: boolean,
  rewardedAt?: number,
};

export const types = {
  GB_SHOW_PERSONALISED_ADS: 'GB/SHOW_PERSONALISED_ADS',
  GB_SHOW_ADS: 'GB/SHOW_ADS',

  GP_STORE_SELECTED_SCALE: 'GP/STORE_SELECTED_SCALE',
  GP_STORE_SELECTED_CHORD: 'GP/STORE_SELECTED_CHORD',
  GP_STORE_SCALES: 'GP/STORE_SCALES',
  GP_STORE_CHORDS: 'GP/STORE_CHORDS',
  GP_STORE_AXIS: 'GP/STORE_AXIS',
  GP_STORE_ACTIVE_KEY: 'GP/STORE_ACTIVE_KEY',
  GP_SHOW_LEGEND: 'GP/SHOW_LEGEND',
  GP_UNLOCK_CHORDS: 'GP/UNLOCK_CHORDS',

  GB_GET_DEPLOYMENT_DATA: 'GB/GET_DEPLOYMENT_DATA',
  GB_GET_DEPLOYMENT_DATA_PENDING: 'GB/GET_DEPLOYMENT_DATA_PENDING',
  GB_GET_DEPLOYMENT_DATA_REJECTED: 'GB/GET_DEPLOYMENT_DATA_REJECTED',
  GB_GET_DEPLOYMENT_DATA_FULFILLED: 'GB/GET_DEPLOYMENT_DATA_FULFILLED',
};

export const selectors = {
  getCodepushEnvironment: (state: ReduxState): 'Production'|'Staging' => get(state.global.codepushData, 'environment', 'Production'),
  getGlobal: (state: ReduxState): State => state.global,
  getScales: (state: ReduxState): any => state.global.scales,
  getChords: (state: ReduxState): any => state.global.chords,
  getUnlocked: (state: ReduxState): boolean => state.global.unlocked,
};

export const actions = {
  getDeploymentData: (): ReduxAction => ({
    type: types.GB_GET_DEPLOYMENT_DATA,
    payload: API.getDeploymentData(),
  }),
  showPersonalisedAds: (personalisedAds: boolean): ReduxAction => ({
    type: types.GB_SHOW_PERSONALISED_ADS,
    payload: { personalisedAds },
  }),
  showAds: (showAds: boolean): ReduxAction => ({
    type: types.GB_SHOW_ADS,
    payload: { showAds },
  }),
  showLegend: (showLegend: boolean): ReduxAction => ({
    type: types.GP_SHOW_LEGEND,
    payload: { showLegend },
  }),
  storeSelectedScale: (selectedScale: any): ReduxAction => ({
    type: types.GP_STORE_SELECTED_SCALE,
    payload: { selectedScale },
  }),
  storeSelectedChord: (selectedChord: any): ReduxAction => ({
    type: types.GP_STORE_SELECTED_CHORD,
    payload: { selectedChord },
  }),
  storeScales: (scales: any): ReduxAction => ({
    type: types.GP_STORE_SCALES,
    payload: { scales },
  }),
  storeChords: (chords: any): ReduxAction => ({
    type: types.GP_STORE_CHORDS,
    payload: { chords },
  }),
  storeAxis: (axis: Axis): ReduxAction => ({
    type: types.GP_STORE_AXIS,
    payload: { axis },
  }),
  storeActiveKey: (activeKey: ActiveKey): ReduxAction => ({
    type: types.GP_STORE_ACTIVE_KEY,
    payload: { activeKey },
  }),
  unlockChords: (): ReduxAction => ({
    type: types.GP_UNLOCK_CHORDS,
    payload: { unlocked: true },
  }),
};

const unlockChords = (state: State, payload: InitialCMSResponse) => {
  const payloadPath = payload.isLocal ? 'master.ads' : 'appCollection.items[0].ads';
  const displayAds = get(payload.data, payloadPath, false);

  return {
    ...state,
    unlocked: !displayAds,
  };
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    case types.GP_STORE_SELECTED_SCALE:
    case types.GP_STORE_SELECTED_CHORD:
    case types.GP_STORE_SCALES:
    case types.GP_STORE_CHORDS:
    case types.GP_STORE_AXIS:
    case types.GP_STORE_ACTIVE_KEY:
    case types.GP_UNLOCK_CHORDS:
    case types.GB_SHOW_PERSONALISED_ADS:
    case types.GB_SHOW_ADS:
    case types.GP_SHOW_LEGEND:
      return { ...state, ...action.payload };

    case types.GB_GET_DEPLOYMENT_DATA_FULFILLED:
      return { ...state, codepushData: action.payload };

    case cmsTypes.CMS_FETCH_APP:
      return unlockChords(state, action.payload);

    default:
      return state || {};
  }
};
