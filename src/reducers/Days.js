import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return action.payload.days;
    default:
      return state;
  }
};
