import { CREATE_TABLE, RENAME_TABLE, DELETE_TABLE } from "../actions/types";
import storage from "../engine/storage";

export default (state = storage.getList(), action) => {
  switch (action.type) {
    case CREATE_TABLE:
    case RENAME_TABLE:
    case DELETE_TABLE:
      return action.list;
    default:
      return state;
  }
};
