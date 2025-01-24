/* eslint-disable no-console */
import { Tuple, configureStore } from '@reduxjs/toolkit';
import { InputType, reducer as globalStoreReducer } from '@store/globalStore';
import { reducer as staticStoreReducer } from '@store/staticStore';
import { isPromise } from '@utils';
import { thunk } from 'redux-thunk';
import type { Dispatch } from '@reduxjs/toolkit';

const initialState = {
  static: {
    loadTime: Date.now(),
    reviewMinutes: 2,
  },
  global: {
    developerMode: false,
    inputType: InputType.circle,
    axis: {
      angle: 0,
      status: false,
    },
    activeKey: {
      field: undefined,
      group: undefined,
      x: 0,
      y: 0,
    },
  },
};

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
  preloadedState: initialState,
});

export const store = createStore();

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
