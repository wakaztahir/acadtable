import {
  CREATE_LECTURE,
  RENAME_LECTURE,
  DELETE_LECTURE
} from "../actions/types";
import storage from "../storage";

let session = new storage("lecture");

export default (state = session.getList(), action) => {
  switch (action.type) {
    case CREATE_LECTURE:
    case RENAME_LECTURE:
    case DELETE_LECTURE:
      return action.list;
    default:
      return state;
  }
};
