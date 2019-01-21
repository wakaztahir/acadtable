import { SELECT_TABLE, CREATE_BATCH } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
    case CREATE_BATCH:
      return action.payload.batches.all();
    default:
      return state;
  }
};
