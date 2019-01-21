import { SELECT_COLLECTION, DELETE_COLLECTION } from "../actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
      return action.payload.selectedCollection || null;
    case DELETE_COLLECTION:
      if (state !== null && action.payload.deleted.id === state.id) {
        return null;
      } else {
        return state;
      }
    default:
      return state;
  }
};
