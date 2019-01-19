import { SELECT_TABLE } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "places");
      return list.all();
    default:
      return state;
  }
};
