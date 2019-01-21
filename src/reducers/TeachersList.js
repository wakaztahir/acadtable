import { SELECT_COLLECTION, CREATE_TEACHER } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_TEACHER:
      return action.payload.teachers.all();
    default:
      return state;
  }
};
