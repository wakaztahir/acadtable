import { SELECT_TABLE, CREATE_BLOCK } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "blocks");
      return list.all();
    case CREATE_BLOCK:
      return action.blocks.all();
    default:
      return state;
  }
};
