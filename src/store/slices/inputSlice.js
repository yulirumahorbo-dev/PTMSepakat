import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  jabatan: "",
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    updateInput: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    clearField: (state, action) => {
      const field = action.payload;
      state[field] = typeof state[field] === "object" ? {} : "";
    },
    clearInput: () => initialState,
  },
});

export const { updateInput, clearField, clearInput } = inputSlice.actions;

export default inputSlice.reducer;
