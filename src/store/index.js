import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "./slices/loanSlice";
import usersReducer from "./slices/usersSlice";
import inputReducer from "./slices/inputSlice";

const store = configureStore({
  reducer: {
    loan: loanReducer,
    users: usersReducer,
    input: inputReducer,
  },
});

export default store;
