import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return Object.values(action.payload.tables);
    case types.SWAP_TABLE:
      return Object.values(action.payload.tables);
    case types.CREATE_TABLE:
      return [...state, action.payload];
    case types.UPDATE_TABLE:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_TABLE:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
