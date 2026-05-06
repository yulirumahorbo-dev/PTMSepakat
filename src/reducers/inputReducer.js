import {
  UPDATE_INPUT,
  CLEAR_FIELD,
  CLEAR_INPUT,
} from "../actions/inputActions";

const initialState = {
  nama: "",
  jabatan: "",
};

export default function inputReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INPUT:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };

    case CLEAR_FIELD:
      return {
        ...state,
        [action.payload.field]:
          typeof state[action.payload.field] === "object" ? {} : "",
      };

    case CLEAR_INPUT:
      return initialState;

    default:
      return state;
  }
}
