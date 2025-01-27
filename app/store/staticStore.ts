import type { RootState } from '@store';
import type { ReduxAction } from '@types';

export type State = {
  reviewMinutes: number,
  loadTime: number,
};

export const selectors = {
  getStatic: (state: RootState): State => state.static,
};

export const reducer = (state: any, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state || {};
  }
};
