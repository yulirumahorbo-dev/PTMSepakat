import { combineReducers } from "@reduxjs/toolkit";
import inputReducer from "./inputReducer";

const rootReducer = combineReducers({
  input: inputReducer,
});

export default rootReducer;
