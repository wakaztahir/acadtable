import { SELECT_TABLE, CREATE_DAY } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "days");
      return list.all();
    case CREATE_DAY:
      return action.days.all();
    default:
      return state;
  }
};
