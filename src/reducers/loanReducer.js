import {
  UPDATE_LOAN_INPUT,
  CLEAR_LOAN_FIELD,
  CLEAR_LOAN_INPUT,
} from "../actions/loanActions";

const initialState = {
  name: "",
  date: "",
  totalMoney: "",
  totalMonth: "",
};

export default function loanReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOAN_INPUT:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case CLEAR_LOAN_FIELD:
      return {
        ...state,
        [action.payload.field]:
          typeof state[action.payload.field] === "object" ? {} : "",
      };

    case CLEAR_LOAN_INPUT:
      return initialState;

    default:
      return state;
  }
}
