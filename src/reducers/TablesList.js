import { SELECT_COLLECTION, CREATE_TABLE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_TABLE:
      return action.payload.tables.all();
    default:
      return state;
  }
};
