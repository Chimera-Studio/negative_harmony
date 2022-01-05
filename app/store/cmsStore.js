import { get, groupBy, merge } from "lodash";
import * as API from "../api";
import { VALID_QUERY, MASTER_QUERY } from "../api/cms";
import { storeDataToLocal } from "../utils";
import { localStorageKeys } from "../tokens";

export const types = {
  CMS_CHECK_TIMESTAMPS: "CMS/CMS_CHECK_TIMESTAMPS",
  CMS_FETCH_APP: "CMS/FETCH_APP",
  CMS_STORE_APP: "CMS/STORE_APP",
};

export const selectors = {
  getTimestamps: (state) => state.cms.timestamps,
  getCMS: (state) => state.cms,
};

const storeTimestamps = (res) => ({
  type: types.CMS_CHECK_TIMESTAMPS,
  payload: res,
});

const storeCMS = (res) => ({
  type: types.CMS_FETCH_APP,
  payload: res,
});

export const actions = {
  checkTimestamps: () => {
    return async function (dispatch) {
      return API.cmsFetch(VALID_QUERY).then((res) =>
        dispatch(storeTimestamps(res))
      );
    };
  },
  fetchCMS: () => {
    return async function (dispatch) {
      return API.cmsFetch(MASTER_QUERY).then((res) => dispatch(storeCMS(res)));
    };
  },
  storeLocalCMS: (data) => ({
    type: types.CMS_STORE_APP,
    payload: data,
  }),
};

const _storeTimestamps = (state, payload) => {
  const newState = {};
  merge(newState, state, {
    timestamps: {
      master: new Date(
        payload.appCollection.items[0].sys.publishedAt
      ).valueOf(),
      patterns: new Date(
        payload.negativeHarmonyCollection.items[0].sys.publishedAt
      ).valueOf(),
    },
  });

  return newState;
};

const _storeCMS = (state, payload, local) => {
  const newState = {};
  if (local) {
    return merge(newState, state, payload);
  }

  const types = groupBy(payload.negativeHarmonyCollection.items, "type");

  merge(newState, state, {
    master: payload.appCollection.items[0],
    scales: get(types, "Scales[0].list", []),
    chords: get(types, "Chords[0].list", []),
  });

  storeDataToLocal(localStorageKeys.appContent, JSON.stringify(newState));

  return newState;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.CMS_CHECK_TIMESTAMPS:
      return _storeTimestamps(state, action.payload);
    case types.CMS_FETCH_APP:
      return _storeCMS(state, action.payload, false);
    case types.CMS_STORE_APP:
      return _storeCMS(state, action.payload, true);

    default:
      return state || {};
  }
};
