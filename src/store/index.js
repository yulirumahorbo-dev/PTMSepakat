import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import inputReducer from "./slices/inputSlice";
import loanReducer from "./slices/loanSlice";
import membersReducer from "./slices/membershipSlice";

const store = configureStore({
  reducer: {
    loan: loanReducer,
    members: membersReducer,
    expenses: expensesReducer,
  },
});

export default store;
