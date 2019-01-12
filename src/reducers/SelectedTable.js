import { SELECT_TABLE, DELETE_TABLE } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let selected_table = action.table || null;
      return selected_table;
    case DELETE_TABLE:
      if (state !== null && action.deleted === state.id) {
        return null;
      } else {
        return state;
      }
    default:
      return state;
  }
};
