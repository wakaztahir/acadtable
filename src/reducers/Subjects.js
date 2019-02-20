import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_SUBJECT:
    case types.UPDATE_SUBJECT:
    case types.DELETE_SUBJECT:
      return action.payload.subjects;
    default:
      return state;
  }
};
