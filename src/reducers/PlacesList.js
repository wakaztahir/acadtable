import { SELECT_COLLECTION, CREATE_PLACE } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_PLACE:
      return action.payload.places.all();
    default:
      return state;
  }
};
