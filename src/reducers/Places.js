import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.SWAP_PLACE:
      return Object.values(action.payload.places);
    case types.CREATE_PLACE:
      return [...state, action.payload];
    case types.UPDATE_PLACE:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_PLACE:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
