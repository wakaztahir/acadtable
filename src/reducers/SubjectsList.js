import {
  SELECT_COLLECTION,
  CREATE_SUBJECT,
  UPDATE_SUBJECT,
  DELETE_SUBJECT
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_SUBJECT:
    case UPDATE_SUBJECT:
    case DELETE_SUBJECT:
      return action.payload.subjects.all();
    default:
      return state;
  }
};
