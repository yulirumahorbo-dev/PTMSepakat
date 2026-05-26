import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import inputReducer from "./slices/inputSlice";
import loansReducer from "./slices/loansSlice";
import membersReducer from "./slices/membershipSlice";
import contributionsReducer from "./slices/contributionsSlice";

const store = configureStore({
  reducer: {
    loans: loansReducer,
    members: membersReducer,
    expenses: expensesReducer,
    contributions: contributionsReducer,
  },
});

export default store;
