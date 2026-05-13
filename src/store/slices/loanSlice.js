import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  date: "",
  totalMoney: "",
  totalMonth: "",
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    updateLoanInput: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearLoanField: (state, action) => {
      const field = action.payload;
      state[field] = typeof state[field] === "object" ? {} : "";
    },
    clearLoanInput: () => initialState,
  },
});

export const { updateLoanInput, clearLoanField, clearLoanInput } =
  loanSlice.actions;

export default loanSlice.reducer;
