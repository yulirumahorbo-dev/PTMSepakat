import { configureStore } from "@reduxjs/toolkit";
import loanReducer from "./slices/loanSlice";
import usersReducer from "./slices/usersSlice";
import inputReducer from "./slices/inputSlice";
import expensesReducer from "./slices/expensesSlice";

const store = configureStore({
  reducer: {
    loan: loanReducer,
    users: usersReducer,
    input: inputReducer,
    expenses: expensesReducer,
  },
});

export default store;
