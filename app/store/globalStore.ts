import { get } from 'lodash';
import * as API from '../api';
import type { RootState } from '.';
import type { Option } from '../components/elements/inputs/Select';
import type { ReduxAction } from '../types';

export type Axis = {
  status: boolean,
  angle: number,
};

export type ActiveKey = {
  x: number,
  y: number,
  group: string | undefined,
  field: number | undefined,
};

export type CodePushData = Object & {
  environment: 'Production' | 'Staging',
  deploymentKey: string,
};

export type State = {
  developerMode: boolean,
  codepushData?: CodePushData,
  scales?: Object[],
  chords?: Object[],
  selectedScale?: Option,
  selectedChord?: Option,
  axis: Axis,
  activeKey: ActiveKey,
  unlocked: boolean,
  showAds: boolean,
  personalisedAds?: boolean,
  showLegend?: boolean,
  rewardedAt?: number,
};

export enum GlobalTypes {
  GB_SHOW_PERSONALISED_ADS = 'GB/SHOW_PERSONALISED_ADS',
  GB_SHOW_ADS = 'GB/SHOW_ADS',

  GB_TOGGLE_DEVELOPER_MODE = 'GB/TOGGLE_DEVELOPER_MODE',
  GP_STORE_SELECTED_SCALE = 'GP/STORE_SELECTED_SCALE',
  GP_STORE_SELECTED_CHORD = 'GP/STORE_SELECTED_CHORD',
  GP_STORE_SCALES = 'GP/STORE_SCALES',
  GP_STORE_CHORDS = 'GP/STORE_CHORDS',
  GP_STORE_AXIS = 'GP/STORE_AXIS',
  GP_STORE_ACTIVE_KEY = 'GP/STORE_ACTIVE_KEY',
  GP_SHOW_LEGEND = 'GP/SHOW_LEGEND',
  GP_UNLOCK_CHORDS = 'GP/UNLOCK_CHORDS',

  GB_GET_DEPLOYMENT_DATA = 'GB/GET_DEPLOYMENT_DATA',
  GB_GET_DEPLOYMENT_DATA_PENDING = 'GB/GET_DEPLOYMENT_DATA_PENDING',
  GB_GET_DEPLOYMENT_DATA_REJECTED = 'GB/GET_DEPLOYMENT_DATA_REJECTED',
  GB_GET_DEPLOYMENT_DATA_FULFILLED = 'GB/GET_DEPLOYMENT_DATA_FULFILLED',
}

export const selectors = {
  getCodepushEnvironment: (state: RootState): 'Production' | 'Staging' => get(state.global.codepushData, 'environment', 'Production'),
  getGlobal: (state: RootState): State => state.global,
  getScales: (state: RootState): any => state.global.scales,
  getChords: (state: RootState): any => state.global.chords,
  getUnlocked: (state: RootState): boolean => state.global.unlocked,
};

export const actions = {
  getDeploymentData: () => ({
    type: GlobalTypes.GB_GET_DEPLOYMENT_DATA,
    payload: API.getDeploymentData(),
  }),
  showPersonalisedAds: (personalisedAds: boolean) => ({
    type: GlobalTypes.GB_SHOW_PERSONALISED_ADS,
    payload: { personalisedAds },
  }),
  showAds: (showAds: boolean) => ({
    type: GlobalTypes.GB_SHOW_ADS,
    payload: { showAds },
  }),
  showLegend: (showLegend: boolean) => ({
    type: GlobalTypes.GP_SHOW_LEGEND,
    payload: { showLegend },
  }),
  storeSelectedScale: (selectedScale: any) => ({
    type: GlobalTypes.GP_STORE_SELECTED_SCALE,
    payload: { selectedScale },
  }),
  storeSelectedChord: (selectedChord: any) => ({
    type: GlobalTypes.GP_STORE_SELECTED_CHORD,
    payload: { selectedChord },
  }),
  storeScales: (scales: any) => ({
    type: GlobalTypes.GP_STORE_SCALES,
    payload: { scales },
  }),
  storeChords: (chords: any) => ({
    type: GlobalTypes.GP_STORE_CHORDS,
    payload: { chords },
  }),
  storeAxis: (axis: Axis) => ({
    type: GlobalTypes.GP_STORE_AXIS,
    payload: { axis },
  }),
  storeActiveKey: (activeKey: ActiveKey) => ({
    type: GlobalTypes.GP_STORE_ACTIVE_KEY,
    payload: { activeKey },
  }),
  unlockChords: () => ({
    type: GlobalTypes.GP_UNLOCK_CHORDS,
    payload: { unlocked: true },
  }),
  toggleDeveloperMode: (bool: boolean) => ({
    type: GlobalTypes.GB_TOGGLE_DEVELOPER_MODE,
    payload: bool,
  }),
};

const setCodePushData = (state: State, payload: CodePushData) => {
  const developerMode: boolean = state.developerMode || get(payload, 'environment', 'Production') === 'Staging';

  return {
    ...state,
    developerMode,
    codepushData: payload,
  };
};

export const reducer = (state: State, action: ReduxAction) => {
  switch (action.type) {
    case GlobalTypes.GP_STORE_SELECTED_SCALE:
    case GlobalTypes.GP_STORE_SELECTED_CHORD:
    case GlobalTypes.GP_STORE_SCALES:
    case GlobalTypes.GP_STORE_CHORDS:
    case GlobalTypes.GP_STORE_AXIS:
    case GlobalTypes.GP_STORE_ACTIVE_KEY:
    case GlobalTypes.GP_UNLOCK_CHORDS:
    case GlobalTypes.GB_SHOW_PERSONALISED_ADS:
    case GlobalTypes.GB_SHOW_ADS:
    case GlobalTypes.GP_SHOW_LEGEND:
      return { ...state, ...action.payload };

    case GlobalTypes.GB_TOGGLE_DEVELOPER_MODE:
      return { ...state, developerMode: action.payload };

    case GlobalTypes.GB_GET_DEPLOYMENT_DATA_FULFILLED:
      return setCodePushData(state, action.payload);

    default:
      return state || {};
  }
};
