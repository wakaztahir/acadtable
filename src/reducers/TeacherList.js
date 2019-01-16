import {
  CREATE_TEACHER,
  RENAME_TEACHER,
  DELETE_TEACHER
} from "../actions/types";
import storage from "../storage";

let session = new storage("teacher");

export default (state = session.getList(), action) => {
  switch (action.type) {
    case CREATE_TEACHER:
    case RENAME_TEACHER:
    case DELETE_TEACHER:
      return action.list;
    default:
      return state;
  }
};
