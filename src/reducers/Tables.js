import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_TABLE:
      return action.payload.tables;
    default:
      return state;
  }
};
