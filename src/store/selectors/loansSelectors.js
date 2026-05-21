export const selectAllLoans = (state) => state.loans.items;
export const selectLoanStatus = (state) => state.loans.status;
export const selectLoanError = (state) => state.loans.error;
export const selectLoanById = (id) => (state) =>
  state.loans?.items?.find((e) => e.id === id);
