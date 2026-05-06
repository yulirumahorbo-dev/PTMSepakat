export const UPDATE_LOAN_INPUT = "loan/UPDATE_INPUT";
export const CLEAR_LOAN_FIELD = "loan/CLEAR_FIELD";
export const CLEAR_LOAN_INPUT = "loan/CLEAR_INPUT";

export const updateLoanInput = (field, value) => ({
  type: UPDATE_LOAN_INPUT,
  payload: { field, value },
});

export const clearLoanField = (field) => ({
  type: CLEAR_LOAN_FIELD,
  payload: { field },
});

export const clearLoanInput = () => ({
  type: CLEAR_LOAN_INPUT,
});
