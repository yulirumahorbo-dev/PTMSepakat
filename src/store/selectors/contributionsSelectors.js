export const selectAllContributions = (state) => state.contributions.items;
export const selectContributionStatus = (state) => state.contributions.status;
export const selectContributionError = (state) => state.contributions.error;
export const selectContributionById = (id) => (state) =>
  state.contributions.items.find((e) => e.id === id);
