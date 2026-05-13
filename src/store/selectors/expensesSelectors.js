export const selectAllExpenses = (state) => state.expenses.items;
export const selectExpenseStatus = (state) => state.expenses.status;
export const selectExpenseError = (state) => state.expenses.error;
export const selectTotalAmount = (state) =>
  state.expenses.items.reduce((sum, e) => sum + e.amount, 0);
export const selectExpenseById = (id) => (state) =>
  state.expenses.items.find((e) => e.id === id);
