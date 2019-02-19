import types from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return action.payload;
    default:
      return state;
  }
};
