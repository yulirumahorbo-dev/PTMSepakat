import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchLoans = createAsyncThunk(
  "loans/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await supabase
      .from("loans")
      .select("*")
      .order("date", { ascending: false });

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data.map((item) => ({
      id: item.id,
      name: item.name,
      totalMoney: item.totalMoney,
      date: item.date,
      totalMonth: item.totalMonth,
    }));
  },
);

export const addLoan = createAsyncThunk(
  "loans/add",
  async (loanData, { rejectWithValue }) => {
    const response = await supabase
      .from("loans")
      .insert(loanData)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const editLoan = createAsyncThunk(
  "loans/edit",
  async ({ id, loanData }, { rejectWithValue }) => {
    const response = await supabase
      .from("loans")
      .update(loanData)
      .eq("id", id)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const removeLoan = createAsyncThunk(
  "loans/remove",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("loans").delete().eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

const loansSlice = createSlice({
  name: "loans",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const pendingReducer = (state) => {
      state.status = "loading";
      state.error = null;
    };
    const rejectedReducer = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    };

    builder
      // Fetch
      .addCase(fetchLoans.pending, pendingReducer)
      .addCase(fetchLoans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchLoans.rejected, rejectedReducer)

      // Add
      .addCase(addLoan.pending, pendingReducer)
      .addCase(addLoan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addLoan.rejected, rejectedReducer)

      // Edit
      .addCase(editLoan.pending, pendingReducer)
      .addCase(editLoan.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editLoan.rejected, rejectedReducer)

      // Remove
      .addCase(removeLoan.pending, pendingReducer)
      .addCase(removeLoan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeLoan.rejected, rejectedReducer);
  },
});

export const { resetStatus } = loansSlice.actions;
export default loansSlice.reducer;
