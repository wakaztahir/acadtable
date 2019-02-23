import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return action.payload.subjects;
    case types.CREATE_SUBJECT:
      return [...state, action.payload];
    case types.UPDATE_SUBJECT:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_SUBJECT:
      return state.filter(item => item.id === action.payload.id);
    default:
      return state;
  }
};
