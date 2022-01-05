import { merge } from "lodash";

export const types = {
  GP_STORE_SELECTED_SCALE: "GP/STORE_SELECTED_SCALE",
  GP_STORE_SELECTED_CHORD: "GP/STORE_SELECTED_CHORD",
  GP_STORE_SCALES: "GP/STORE_SCALES",
  GP_STORE_CHORDS: "GP/STORE_CHORDS",
  GP_STORE_AXIS: "GP/STORE_AXIS",
  GP_STORE_ACTIVE_KEY: "GP/STORE_ACTIVE_KEY",
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
  unlockChords: () => ({
    type: types.GP_UNLOCK_CHORDS,
  }),
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.GP_STORE_SELECTED_SCALE:
      return merge({}, state, { selectedScale: action.payload });
    case types.GP_STORE_SELECTED_CHORD:
      return merge({}, state, { selectedChord: action.payload });
    case types.GP_STORE_SCALES:
      return merge({}, state, { scales: action.payload });
    case types.GP_STORE_CHORDS:
      return merge({}, state, { chords: action.payload });
    case types.GP_STORE_AXIS:
      return merge({}, state, { axis: action.payload });
    case types.GP_STORE_ACTIVE_KEY:
      return merge({}, state, { activeKey: action.payload });
    case types.GP_UNLOCK_CHORDS:
      return merge({}, state, { unlocked: true });

    default:
      return state || {};
  }
};
