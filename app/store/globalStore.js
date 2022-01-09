import { merge } from "lodash";

export const types = {
  GP_STORE_SELECTED_SCALE: "GP/STORE_SELECTED_SCALE",
  GP_STORE_SELECTED_CHORD: "GP/STORE_SELECTED_CHORD",
  GP_STORE_SCALES: "GP/STORE_SCALES",
  GP_STORE_CHORDS: "GP/STORE_CHORDS",
  GP_STORE_AXIS: "GP/STORE_AXIS",
  GP_STORE_ACTIVE_KEY: "GP/STORE_ACTIVE_KEY",
  GP_SHOW_BANNER: "GP/SHOW_BANNER",
  GP_UNLOCK_CHORDS: "GP/UNLOCK_CHORDS",
};

export const selectors = {
  getGlobal: (state) => state.global,
  getUnlocked: (state) => state.global.unlocked,
};

export const actions = {
  storeSelectedScale: (scale) => ({
    type: types.GP_STORE_SELECTED_SCALE,
    payload: scale,
  }),
  storeSelectedChord: (chord) => ({
    type: types.GP_STORE_SELECTED_CHORD,
    payload: chord,
  }),
  storeScales: (scales) => ({
    type: types.GP_STORE_SCALES,
    payload: scales,
  }),
  storeChords: (chords) => ({
    type: types.GP_STORE_CHORDS,
    payload: chords,
  }),
  storeAxis: (axis) => ({
    type: types.GP_STORE_AXIS,
    payload: axis,
  }),
  storeActiveKey: (activeKey) => ({
    type: types.GP_STORE_ACTIVE_KEY,
    payload: activeKey,
  }),
  showBanner: (bool) => ({
    type: types.GP_SHOW_BANNER,
    payload: bool,
  }),
  unlockChords: () => ({
    type: types.GP_UNLOCK_CHORDS,
  }),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.GP_STORE_SELECTED_SCALE:
      return { ...state, ...{ selectedScale: action.payload } };
    case types.GP_STORE_SELECTED_CHORD:
      return { ...state, ...{ selectedChord: action.payload } };
    case types.GP_STORE_SCALES:
      return { ...state, ...{ scales: action.payload } };
    case types.GP_STORE_CHORDS:
      return { ...state, ...{ chords: action.payload } };
    case types.GP_STORE_AXIS:
      return merge({}, state, { axis: action.payload });
    case types.GP_STORE_ACTIVE_KEY:
      return merge({}, state, { activeKey: action.payload });
    case types.GP_SHOW_BANNER:
      return merge({}, state, { showBanner: action.payload });
    case types.GP_UNLOCK_CHORDS:
      return merge({}, state, { unlocked: true, showBanner: true });

    default:
      return state || {};
  }
};
