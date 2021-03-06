import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return Object.values(action.payload.lectures);
    case types.CREATE_LECTURE:
      return [...state, action.payload];
    case types.UPDATE_LECTURE:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_LECTURE:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
