import {
  SELECT_COLLECTION,
  CREATE_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_PLACE:
    case UPDATE_PLACE:
    case DELETE_PLACE:
      return action.payload.places.all();
    default:
      return state;
  }
};
