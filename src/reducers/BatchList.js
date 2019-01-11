import { CREATE_BATCH, RENAME_BATCH, DELETE_BATCH } from "../actions/types";
import storage from "../storage";

let session = new storage("batch");

export default (state = session.getList(), action) => {
  switch (action.type) {
    case CREATE_BATCH:
    case RENAME_BATCH:
    case DELETE_BATCH:
      return action.list;
    default:
      return state;
  }
};
