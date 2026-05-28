import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase";
import {
  generateFamilyNumber,
  generateMemberNumber,
} from "../../utils/membership";

export const fetchFamilies = createAsyncThunk(
  "families/fetchAll",
  async (_, { rejectWithValue }) => {
    const response = await supabase
      .from("families")
      .select("*")
      .order("created_at", { ascending: false });

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data.map((item) => ({
      id: item.id,
      name: item.name,
      family_membership_number: item.family_membership_number,
      address: item.address,
      sequence_number: item.sequence_number,
    }));
  },
);

export const addFamilyWithMembers = createAsyncThunk(
  "families/addWithMembers",
  async (
    { husbandName, husbandRole, wifeName, wifeRole, address },
    { rejectWithValue },
  ) => {
    const { data: seqData, error: seqError } = await supabase.rpc(
      "get_next_family_sequence",
    );
    if (seqError) return rejectWithValue(seqError.message);

    const year = new Date().getFullYear();
    const familyNumber = generateFamilyNumber(year, seqData);
    const husbandNumber = generateMemberNumber(familyNumber, "01");
    const wifeNumber = generateMemberNumber(familyNumber, "02");

    const { data: family, error: familyError } = await supabase
      .from("families")
      .insert({
        family_membership_number: familyNumber,
        name: `${husbandName.trim()} / ${wifeName.trim()}`,
        address: address.trim(),
        sequence_number: seqData,
      })
      .select()
      .single();

    if (familyError) return rejectWithValue(familyError.message);

    const { data: members, error: membersError } = await supabase
      .from("members")
      .insert([
        {
          family_id: family.id,
          membership_number: husbandNumber,
          name: husbandName.trim(),
          role: husbandRole,
        },
        {
          family_id: family.id,
          membership_number: wifeNumber,
          name: wifeName.trim(),
          role: wifeRole,
        },
      ])
      .select();

    if (membersError) return rejectWithValue(membersError.message);

    return { family, members };
  },
);

export const editFamily = createAsyncThunk(
  "families/edit",
  async ({ id, familyData }, { rejectWithValue }) => {
    const response = await supabase
      .from("families")
      .update(familyData)
      .eq("id", id)
      .select()
      .single();

    if (!response) return rejectWithValue("No response from Supabase");
    if (response.error) return rejectWithValue(response.error.message);

    return response.data;
  },
);

export const removeFamily = createAsyncThunk(
  "families/remove",
  async (id, { rejectWithValue }) => {
    const { error } = await supabase.from("families").delete().eq("id", id);

    if (error) return rejectWithValue(error.message);

    return id;
  },
);

const familiesSlice = createSlice({
  name: "families",
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
      .addCase(fetchFamilies.pending, pendingReducer)
      .addCase(fetchFamilies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchFamilies.rejected, rejectedReducer)

      // Add with members
      .addCase(addFamilyWithMembers.pending, pendingReducer)
      .addCase(addFamilyWithMembers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.unshift(action.payload.family);
      })
      .addCase(addFamilyWithMembers.rejected, rejectedReducer)

      // Edit
      .addCase(editFamily.pending, pendingReducer)
      .addCase(editFamily.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.items.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(editFamily.rejected, rejectedReducer)

      // Remove
      .addCase(removeFamily.pending, pendingReducer)
      .addCase(removeFamily.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeFamily.rejected, rejectedReducer);
  },
});

export const { resetStatus } = familiesSlice.actions;
export default familiesSlice.reducer;
