import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.SWAP_TEACHER:
      return Object.values(action.payload.teachers);
    case types.CREATE_TEACHER:
      return [...state, action.payload];
    case types.UPDATE_TEACHER:
      return state.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    case types.DELETE_TEACHER:
      return state.filter(item => item.id !== action.payload.id);
    default:
      return state;
  }
};
