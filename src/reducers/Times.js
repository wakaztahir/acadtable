import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_TIME:
      return action.payload.times.all();
    default:
      return state;
  }
};
