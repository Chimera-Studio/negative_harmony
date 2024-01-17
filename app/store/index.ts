import {
  concat, forEach, get, includes, isString,
} from 'lodash';
import { applyMiddleware, combineReducers, legacy_createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer as globalStoreReducer } from './globalStore';
import { reducer as staticStoreReducer } from './staticStore';
import ENV from '../../env.json';
import { isPromise } from '../utils';
import type {
  ActionChains, ReduxAction, ReduxMiddlewareArgument, ReduxState,
} from '../types';

const sanitizedActions: string[] = get(ENV, 'REDUX.SANITIZED_LIST', []);
const actionsDenyList: string[] = get(ENV, 'REDUX.DENY_LIST', []);

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
  return (next: any) => (action: ReduxAction) => {
    if (action.payload && isPromise(action.payload)) {
      action.payload
        .then((payload: any) => {
          dispatch({
            type: `${action.type}_FULFILLED`,
            payload,
          });
        })
        .catch((e: any) => {
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
  return ({ dispatch }: ReduxMiddlewareArgument) => (next: any) => (action: ReduxAction) => {
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

function dispatchRecorder(dispatchedActions: string[] | undefined): any {
  return () => (next: any) => (action: ReduxAction) => {
    if (dispatchedActions && !actionsDenyList.includes(action.type)) {
      dispatchedActions.push(action.type);
    }

    return next(action);
  };
}

export const configureStore = (initialState: {} | ReduxState, actionChains?: ActionChains, dispatchedActions?: string[]) => {
  const middleware = [thunk];
  if (dispatchedActions) {
    middleware.push(dispatchRecorder(dispatchedActions));
  }
  middleware.push(promiseMiddleware as any);
  if (actionChains) {
    middleware.push(chainActionsMiddleware(actionChains));
  }

  const sanitizers = get(ENV, 'REDUX.SANITIZER') !== false && { actionSanitizer, stateSanitizer };
  // @ts-ignore
  const composeEnhancers = composeWithDevTools({ ...sanitizers, actionsDenylist: actionsDenyList });
  const middlewareApplier = composeEnhancers(applyMiddleware(...middleware as any) as any);

  return legacy_createStore(
    combineReducers({ static: staticStoreReducer, global: globalStoreReducer }),
    // @ts-ignore
    initialState,
    middlewareApplier,
  );
};
