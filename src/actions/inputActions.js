export const UPDATE_INPUT = "input/UPDATE_INPUT";
export const CLEAR_FIELD = "input/CLEAR_FIELD";
export const CLEAR_INPUT = "input/CLEAR_INPUT";

export const updateInput = (field, value) => ({
  type: UPDATE_INPUT,
  payload: { field, value },
});

export const clearField = (field) => ({
  type: CLEAR_FIELD,
  payload: { field },
});

export const clearInput = () => ({
  type: CLEAR_INPUT,
});
