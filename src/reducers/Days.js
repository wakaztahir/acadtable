import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_DAY:
    case types.UPDATE_DAY:
    case types.DELETE_DAY:
      return action.payload.days.all();
    default:
      return state;
  }
};
