import { get, groupBy, merge } from "lodash";
import * as API from "../api";
import { MASTER_QUERY } from "../api/cms";
import { storeDataToLocal } from "../utils";
import { appKeys, localStorageKeys } from "../tokens";

export const types = {
  CMS_CHECK_TIMESTAMPS: "CMS/CMS_CHECK_TIMESTAMPS",
  CMS_FETCH_APP: "CMS/FETCH_APP",
  CMS_STORE_APP: "CMS/STORE_APP",
};

export const selectors = {
  getTimestamps: (state) => state.cms.timestamps,
  getCMS: (state) => state.cms,
};

const storeTimestamps = (local, online) => ({
  type: types.CMS_CHECK_TIMESTAMPS,
  payload: { local, online },
});

const storeCMS = (res, timestamps) => ({
  type: types.CMS_FETCH_APP,
  payload: { data: res, timestamps },
});

export const actions = {
  checkTimestamps: () => {
    return async function (dispatch) {
      return API.fetchLocalTimestamps().then((local) =>
        API.fetchCMSTimestamps().then((online) =>
          dispatch(storeTimestamps(local, online))
        )
      );
    };
  },
  fetchCMS: (timestamps) => {
    return async function (dispatch) {
      return API.cmsFetch(MASTER_QUERY).then((res) =>
        dispatch(storeCMS(res, timestamps))
      );
    };
  },
  storeLocalCMS: (data) => ({
    type: types.CMS_STORE_APP,
    payload: data,
  }),
};

const _storeCMS = (state, payload, local) => {
  const newState = {};
  if (local) {
    return merge(newState, state, payload);
  }

  const types = groupBy(payload.data.negativeHarmonyCollection.items, "type");

  merge(newState, state, {
    master: payload.data.appCollection.items[0],
    scales: get(types, "Scales[0].list", []),
    chords: get(types, "Chords[0].list", []),
  });

  storeDataToLocal(
    localStorageKeys.contentTimestamps,
    JSON.stringify(payload.timestamps)
  );
  storeDataToLocal(localStorageKeys.appContent, JSON.stringify(newState));

  return newState;
};

const _storeTimestamps = (state, payload) => {
  const newState = {};
  if (!payload.local) {
    merge(newState, state, {
      timestamps: {
        local: appKeys.noLocalData,
        online: payload.online,
      },
    });

    return newState;
  }

  merge(newState, state, { timestamps: payload });

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
