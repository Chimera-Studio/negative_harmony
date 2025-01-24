import type { Option } from '@components/elements/inputs/Select';
import type { RootState } from '@store';
import type { ReduxAction } from '@types';

export enum InputType {
  circle,
  grid,
}

export type Axis = {
  angle: number,
  status: boolean,
};

export type ActiveKey = {
  field: number | undefined,
  group: string | undefined,
  x: number,
  y: number,
};

export type State = {
  activeKey: ActiveKey,
  axis: Axis,
  chords?: Object[],
  developerMode: boolean,
  inputType: InputType,
  scales?: Object[],
  selectedChord?: Option,
  selectedScale?: Option,
  showLegend?: boolean,
};

export enum GlobalTypes {
  GB_TOGGLE_DEVELOPER_MODE = 'GB/TOGGLE_DEVELOPER_MODE',

  GP_SHOW_LEGEND = 'GP/SHOW_LEGEND',
  GP_STORE_ACTIVE_KEY = 'GP/STORE_ACTIVE_KEY',
  GP_STORE_AXIS = 'GP/STORE_AXIS',
  GP_STORE_CHORDS = 'GP/STORE_CHORDS',
  GP_STORE_INPUT_TYPE = 'GP/STORE_INPUT_TYPE',
  GP_STORE_SCALES = 'GP/STORE_SCALES',
  GP_STORE_SELECTED_CHORD = 'GP/STORE_SELECTED_CHORD',
  GP_STORE_SELECTED_SCALE = 'GP/STORE_SELECTED_SCALE',
}

export const selectors = {
  getGlobal: (state: RootState): State => state.global,
  getChords: (state: RootState): any => state.global.chords,
  getScales: (state: RootState): any => state.global.scales,
};

export const actions = {
  showLegend: (showLegend: boolean) => ({
    type: GlobalTypes.GP_SHOW_LEGEND,
    payload: { showLegend },
  }),
  switchInputType: (inputType: InputType) => ({
    type: GlobalTypes.GP_STORE_INPUT_TYPE,
    payload: { inputType },
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
  toggleDeveloperMode: (bool: boolean) => ({
    type: GlobalTypes.GB_TOGGLE_DEVELOPER_MODE,
    payload: bool,
  }),
};

export const reducer = (state: State, action: ReduxAction) => {
  switch (action.type) {
    case GlobalTypes.GP_SHOW_LEGEND:
    case GlobalTypes.GP_STORE_ACTIVE_KEY:
    case GlobalTypes.GP_STORE_AXIS:
    case GlobalTypes.GP_STORE_CHORDS:
    case GlobalTypes.GP_STORE_INPUT_TYPE:
    case GlobalTypes.GP_STORE_SCALES:
    case GlobalTypes.GP_STORE_SELECTED_CHORD:
    case GlobalTypes.GP_STORE_SELECTED_SCALE:
      return { ...state, ...action.payload };

    case GlobalTypes.GB_TOGGLE_DEVELOPER_MODE:
      return { ...state, developerMode: action.payload };

    default:
      return state || {};
  }
};
