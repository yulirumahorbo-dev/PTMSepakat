export const selectAllMembers = (state) => state.members.items;
export const selectMemberStatus = (state) => state.members.status;
export const selectMemberError = (state) => state.members.error;
export const selectMemberById = (id) => (state) =>
  state.members?.items?.find((e) => e.id === id);
