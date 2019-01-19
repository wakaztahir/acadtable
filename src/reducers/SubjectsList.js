import { SELECT_TABLE, CREATE_SUBJECT } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "subjects");
      return list.all();
    case CREATE_SUBJECT:
      return action.subjects.all();
    default:
      return state;
  }
};
