import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";

export const fetchMembers = createAsyncThunk(
  "members/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await supabase
      .from("members")
      .select("*")
      .order("created_at", { ascending: false });

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data.map((item) => ({
      id: item.id,
      name: item.name,
      role: item.role,
      family_id: item.family_id,
    }));
  },
);

export const addMember = createAsyncThunk(
  "members/add",
  async (memberData, { rejectWithValue }) => {
    const response = await supabase
      .from("members")
      .insert(memberData)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const editMember = createAsyncThunk(
  "members/edit",
  async ({ id, memberData }, { rejectWithValue }) => {
    const response = await supabase
      .from("members")
      .update(memberData)
      .eq("id", id)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const removeMember = createAsyncThunk(
  "members/remove",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("members").delete().eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

const membersSlice = createSlice({
  name: "members",
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
      .addCase(fetchMembers.pending, pendingReducer)
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMembers.rejected, rejectedReducer)

      // Add
      .addCase(addMember.pending, pendingReducer)
      .addCase(addMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload);
      })
      .addCase(addMember.rejected, rejectedReducer)

      // Edit
      .addCase(editMember.pending, pendingReducer)
      .addCase(editMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editMember.rejected, rejectedReducer)

      // Remove
      .addCase(removeMember.pending, pendingReducer)
      .addCase(removeMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeMember.rejected, rejectedReducer);
  },
});

export const { resetStatus } = membersSlice.actions;
export default membersSlice.reducer;
