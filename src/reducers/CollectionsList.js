import {
  CREATE_COLLECTION,
  RENAME_COLLECTION,
  DELETE_COLLECTION
} from "../actions/types";
import storage from "../engine/storage";

export default (state = storage.getList(), action) => {
  switch (action.type) {
    case CREATE_COLLECTION:
    case RENAME_COLLECTION:
    case DELETE_COLLECTION:
      return action.payload.collections;
    default:
      return state;
  }
};
