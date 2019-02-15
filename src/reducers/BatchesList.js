import {
  SELECT_COLLECTION,
  CREATE_BATCH,
  UPDATE_BATCH,
  DELETE_BATCH
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_BATCH:
    case UPDATE_BATCH:
    case DELETE_BATCH:
      return action.payload.batches.all();
    default:
      return state;
  }
};
