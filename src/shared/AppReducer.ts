import { Row, Action } from "./AppInterface";

// Initial state for useReducer
export const initialState: Row[] = [{ sign: "+", value: 0, disabled: false }];

// Reducer function of useReducer hook
export default function calcReducer(state: Row[], action: Action): Row[] {
  switch (action.type) {
    case "ADD_ROW":
      return [...state, { sign: "+", value: 0, disabled: false }];
    case "REMOVE_ROW":
      return state.filter((row, index) => action.index !== index);
    case "SET_SIGN":
      return state.map((row, index) => {
        if (action.index == index) return { ...row, sign: action.sign };
        return row;
      });
    case "SET_VALUE":
      return state.map((row, index) => {
        if (action.index == index) return { ...row, value: action.value };
        return row;
      });
    case "SET_DISABLED":
      return state.map((row, index) => {
        if (action.index == index) return { ...row, disabled: action.disabled };
        return row;
      });
    default:
      return state;
  }
}
