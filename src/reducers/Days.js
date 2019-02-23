import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return action.payload.days;
    case types.CREATE_DAY:
      return [...state, action.payload];
    case types.UPDATE_DAY:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_DAY:
      return state.filter(item => item.id === action.payload.id);
    default:
      return state;
  }
};
