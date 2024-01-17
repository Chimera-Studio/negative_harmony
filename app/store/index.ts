// @flow
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  concat, forEach, get, includes, isString,
} from 'lodash';
import { reducer as staticStoreReducer } from './staticStore';
import { reducer as globalStoreReducer } from './globalStore';
import { isPromise } from '../utils';
import ENV from '../../env.json';
import type {
  ReduxState, ReduxAction, ReduxMiddlewareArgument, ActionChains,
} from '../types';

const sanitizedActions = get(ENV, 'REDUX.SANITIZEDLIST', []);
const actionsDenyList = get(ENV, 'REDUX.DENYLIST', []);

const sanitizedPayload = 'Set REACT_APP_REDUX_SANITIZER=false';
const actionSanitizer = (action: ReduxAction): ReduxAction => {
  if (!action.payload) return action;

  return includes(sanitizedActions, action.type)
    ? { ...action, payload: sanitizedPayload }
    : action;
};

const stateSanitizer = (state: ReduxState): any => {
  if (!state) return state;

  return {
    ...state,
  };
};

function promiseMiddleware({ dispatch }: ReduxMiddlewareArgument): any {
  return (next) => (action) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload) => {
          dispatch({
            type: `${action.type}_FULFILLED`,
            payload,
          });
        })
        .catch((e) => {
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

export function chainActionsMiddleware(chainedActions: ActionChains): any {
  return ({ dispatch }: ReduxMiddlewareArgument) => (next) => (action) => {
    let nextActions = chainedActions[action.type];
    if (nextActions) {
      nextActions = concat(nextActions);
      forEach(nextActions, (nextAction) => {
        if (isString(nextAction)) {
          dispatch({ type: nextAction });
        } else {
          dispatch(nextAction(action));
        }
      });
    }

    return next(action);
  };
}

function dispatchRecorder(dispatchedActions: ?Array<string>): any {
  return () => (next) => (action) => {
    if (dispatchedActions && !actionsDenyList.includes(action.type)) {
      dispatchedActions.push(action.type);
    }

    return next(action);
  };
}

export const configureStore = (
  initialState: {} | ReduxState,
  actionChains: ?ActionChains,
  dispatchedActions: ?Array<string>,
): Function => {
  const middleware = [thunk];
  if (dispatchedActions) {
    middleware.push(dispatchRecorder(dispatchedActions));
  }
  middleware.push(promiseMiddleware);
  if (actionChains) {
    middleware.push(chainActionsMiddleware(actionChains));
  }

  const sanitizers = get(ENV, 'REDUX.SANITIZER') !== false && { actionSanitizer, stateSanitizer };
  const composeEnhancers = composeWithDevTools({
    ...sanitizers,
    actionsDenylist: actionsDenyList,
  });
  const middlewareApplier = composeEnhancers(applyMiddleware(...middleware));

  return createStore(
    combineReducers({
      static: staticStoreReducer,
      global: globalStoreReducer,
    }),
    initialState,
    middlewareApplier,
  );
};
