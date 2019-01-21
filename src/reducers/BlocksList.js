import { SELECT_COLLECTION, CREATE_BLOCK } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_BLOCK:
      return action.payload.blocks.all();
    default:
      return state;
  }
};
