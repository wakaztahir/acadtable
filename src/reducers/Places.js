import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_PLACE:
    case types.UPDATE_PLACE:
    case types.DELETE_PLACE:
      return action.payload;
    default:
      return state;
  }
};
