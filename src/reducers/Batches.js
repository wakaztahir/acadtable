import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.SWAP_BATCH:
      return Object.values(action.payload.batches);
    case types.CREATE_BATCH:
      return [...state, action.payload];
    case types.UPDATE_BATCH:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_BATCH:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
