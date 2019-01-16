import {
  CREATE_SUBJECT,
  RENAME_SUBJECT,
  DELETE_SUBJECT
} from "../actions/types";
import storage from "../storage";

let session = new storage("subject");

export default (state = session.getList(), action) => {
  switch (action.type) {
    case CREATE_SUBJECT:
    case RENAME_SUBJECT:
    case DELETE_SUBJECT:
      return action.list;
    default:
      return state;
  }
};
