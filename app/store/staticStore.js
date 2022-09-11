// @flow
import type { ReduxActionWithPayload, ReduxState } from '../types';

export type State = {
  reviewMinutes: number,
  loadTime: number,
};

export const selectors = {
  getStatic: (state: ReduxState): State => state.static,
};

export const reducer = (state: State, action: ReduxActionWithPayload): State => {
  switch (action.type) {
    default:
      return state || {};
  }
};
