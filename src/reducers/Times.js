import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.SWAP_TIME:
      return Object.values(action.payload.times);
    case types.CREATE_TIME:
      return [...state, action.payload];
    case types.UPDATE_TIME:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_TIME:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
