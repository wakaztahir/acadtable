import types from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.DESELECT_COLLECTION:
      return action.payload.user;
    default:
      return state;
  }
};
