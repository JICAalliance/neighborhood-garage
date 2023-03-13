import { useReducer } from "react";
import {
  UPDATE_USER,
  // REMOVE_USER,
  // ADD_TOOL,
  // REMOVE_TOOL,
  // CREATE_GARAGE,
  // DELETE_GARAGE,
  // JOIN_GARAGE,
  // LEAVE_GARAGE,
  // ADD_CHECKOUT,
  // DELETE_CHECKOUT,
} from "./actions";

//Add more reducers below:

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        user: [...action.user],
      };

    default:
      return state;
  }
};

export function useToolReducer(initialState) {
  return useReducer(reducer, initialState);
}
