import { combineReducers } from "@reduxjs/toolkit";
import inputReducer from "./inputReducer";
import loanReducer from "./loanReducer";

const rootReducer = combineReducers({
  input: inputReducer,
  loan: loanReducer,
});

export default rootReducer;
