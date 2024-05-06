import { combineReducers } from "redux";

import dataSlice from "./data";

export const rootReducer = combineReducers({
  data: dataSlice,
});
