import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_BATCH:
    case types.UPDATE_BATCH:
    case types.DELETE_BATCH:
      return action.payload.batches.all();
    default:
      return state;
  }
};
