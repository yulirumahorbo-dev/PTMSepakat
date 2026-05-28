import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./slices/expensesSlice";
import inputReducer from "./slices/inputSlice";
import loansReducer from "./slices/loansSlice";
import membersReducer from "./slices/membershipSlice";
import contributionsReducer from "./slices/contributionsSlice";
import familiesReducer from "./slices/familiesSlice";

const store = configureStore({
  reducer: {
    loans: loansReducer,
    members: membersReducer,
    expenses: expensesReducer,
    contributions: contributionsReducer,
    families: familiesReducer,
  },
});

export default store;
