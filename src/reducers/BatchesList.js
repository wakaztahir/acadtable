import { SELECT_TABLE, CREATE_BATCH } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "batches");
      return list.all();
    case CREATE_BATCH:
      return action.batches.all();
    default:
      return state;
  }
};
