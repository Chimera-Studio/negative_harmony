/* eslint-disable no-console */
import { Tuple, configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { reducer as globalStoreReducer } from './globalStore';
import { reducer as staticStoreReducer } from './staticStore';
import { config } from '../tokens';
import { isPromise } from '../utils';
import type { Dispatch } from '@reduxjs/toolkit';

function promiseMiddleware({ dispatch }: { dispatch: Dispatch }) {
  return (next: (arg0: any) => any) => (action: { payload: Promise<any>; type: any; }) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload: any) => {
          dispatch({
            type: `${action.type}_FULFILLED`,
            payload,
          });
        })
        .catch((e: { status: any; name: any; message: any; }) => {
          console.error(
            `REDUX: ${action.type}_REJECTED: statusCode = `,
            (e && e.status) || '',
            'name = ',
            (e && e.name) || '',
            'message = ',
            (e && e.message) || '',
          );
          dispatch({
            type: `${action.type}_REJECTED`,
            payload: {
              statusCode: (e && e.status) || '',
              name: (e && e.name) || '',
              message: (e && e.message) || '',
            },
          });
        });

      return dispatch({ type: `${action.type}_PENDING` });
    }

    return next(action);
  };
}

export const createStore = () => configureStore({
  reducer: {
    static: staticStoreReducer,
    global: globalStoreReducer,
  },
  middleware: () => new Tuple(thunk, promiseMiddleware as any),
  preloadedState: {
    static: {
      reviewMinutes: 2,
      loadTime: Date.now(),
    },
    global: {
      developerMode: false,
      axis: {
        status: false,
        angle: 0,
      },
      activeKey: {
        x: 0,
        y: 0,
        group: undefined,
        field: undefined,
      },
      showAds: false,
      personalisedAds: false,
      unlocked: !config.ads,
    },
  },
});

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
