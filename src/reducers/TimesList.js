import { SELECT_TABLE, CREATE_TIME } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "times");
      return list.all();
    case CREATE_TIME:
      return action.times.all();
    default:
      return state;
  }
};
