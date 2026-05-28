export const selectAllFamilies = (state) => state.families.items;
export const selectFamilyStatus = (state) => state.families.status;
export const selectFamilyError = (state) => state.families.error;
export const selectFamilyById = (id) => (state) =>
  state.families?.items?.find((e) => e.id === id);
