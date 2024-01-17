/* istanbul ignore file */
import type { State as GlobalState } from '../store/globalStore';
import type { State as StaticState } from '../store/staticStore';

export type ReduxState = {
  static: StaticState,
  global: GlobalState,
};

export type BaseReduxAction = {
  type: string,
};

export type PayloadReduxAction = {
  type: string,
  payload: any,
};

export type ReduxAction = {
  type: string,
  payload?: any,
};

export type ReduxActionWithPayload = {
  type: string,
  payload: any,
};

export type ReduxMiddlewareArgument = {
  dispatch: Function,
  getState: () => ReduxState,
};

export type ErrorContent = {
  message: string | undefined,
  statusCode?: (string | number) | undefined,
  name?: string | undefined,
};

export type ErrorAction = {
  type: string,
  error: true,
  payload: ErrorContent,
};

type NextAction = ((action: ReduxAction) => ReduxAction) | string;

export type ActionChains = {
  [CauseActionType: string]: NextAction[] | NextAction,
};

export type DispatchFn = (action: BaseReduxAction | PayloadReduxAction) => void;

export type AsyncCallback = () => void;
