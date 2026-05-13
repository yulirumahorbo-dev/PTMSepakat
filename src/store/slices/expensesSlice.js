import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await supabase
      .from("expenses")
      .select("*")
      .order("date", { ascending: false });

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data.map((item) => ({
      id: item.id,
      amount: item.amount,
      date: item.date,
      description: item.description,
    }));
  },
);

export const addExpense = createAsyncThunk(
  "expenses/add",
  async (expenseData, { rejectWithValue }) => {
    const response = await supabase
      .from("expenses")
      .insert(expenseData)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const editExpense = createAsyncThunk(
  "expenses/edit",
  async ({ id, expenseData }, { rejectWithValue }) => {
    const response = await supabase
      .from("expenses")
      .update(expenseData)
      .eq("id", id)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const removeExpense = createAsyncThunk(
  "expenses/remove",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("expenses").delete().eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

const expensesSlice = createSlice({
  name: "expenses",
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
      .addCase(fetchExpenses.pending, pendingReducer)
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchExpenses.rejected, rejectedReducer)

      // Add
      .addCase(addExpense.pending, pendingReducer)
      .addCase(addExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addExpense.rejected, rejectedReducer)

      // Edit
      .addCase(editExpense.pending, pendingReducer)
      .addCase(editExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editExpense.rejected, rejectedReducer)

      // Remove
      .addCase(removeExpense.pending, pendingReducer)
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeExpense.rejected, rejectedReducer);
  },
});

export const { resetStatus } = expensesSlice.actions;
export default expensesSlice.reducer;
