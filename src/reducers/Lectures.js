import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_BLOCK:
      return action.payload.blocks.all();
    default:
      return state;
  }
};