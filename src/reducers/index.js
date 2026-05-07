import { combineReducers } from "@reduxjs/toolkit";
import inputReducer from "./inputReducer";
import loanReducer from "./loanReducer";
import usersReducer from "../store/slices/usersSlice";

const rootReducer = combineReducers({
  input: inputReducer,
  loan: loanReducer,
  users: usersReducer,
});

export default rootReducer;
