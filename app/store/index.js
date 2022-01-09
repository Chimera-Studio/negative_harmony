import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer as globalReducer } from "./globalStore";
import { reducer as cmsReducer } from "./cmsStore";

export const configureStore = (initialState) => {
  return createStore(
    combineReducers({
      global: globalReducer,
      cms: cmsReducer,
    }),
    initialState,
    applyMiddleware(thunk)
  );
};
