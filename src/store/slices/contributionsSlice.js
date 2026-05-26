import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchContributions = createAsyncThunk(
  "contributions/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await supabase
      .from("contributions")
      .select("*")
      .order("date", { ascending: false });

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data.map((item) => ({
      id: item.id,
      amount: item.amount,
      date: item.date,
      title: item.title,
      category: item.category,
    }));
  },
);

export const addContribution = createAsyncThunk(
  "contributions/add",
  async (expenseData, { rejectWithValue }) => {
    const response = await supabase
      .from("contributions")
      .insert(expenseData)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const editContribution = createAsyncThunk(
  "contributions/edit",
  async ({ id, expenseData }, { rejectWithValue }) => {
    const response = await supabase
      .from("contributions")
      .update(expenseData)
      .eq("id", id)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const removeContribution = createAsyncThunk(
  "contributions/remove",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase
      .from("contributions")
      .delete()
      .eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

const contributionsSlice = createSlice({
  name: "contributions",
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
      .addCase(fetchContributions.pending, pendingReducer)
      .addCase(fetchContributions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchContributions.rejected, rejectedReducer)

      // Add
      .addCase(addContribution.pending, pendingReducer)
      .addCase(addContribution.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addContribution.rejected, rejectedReducer)

      // Edit
      .addCase(editContribution.pending, pendingReducer)
      .addCase(editContribution.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editContribution.rejected, rejectedReducer)

      // Remove
      .addCase(removeContribution.pending, pendingReducer)
      .addCase(removeContribution.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeContribution.rejected, rejectedReducer);
  },
});

export const { resetStatus } = contributionsSlice.actions;
export default contributionsSlice.reducer;
