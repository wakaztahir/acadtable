import { SELECT_COLLECTION, CREATE_SUBJECT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_SUBJECT:
      return action.payload.subjects.all();
    default:
      return state;
  }
};
