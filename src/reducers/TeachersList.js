import { SELECT_TABLE, CREATE_TEACHER } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "teachers");
      return list.all();
    case CREATE_TEACHER:
      return action.teachers.all();
    default:
      return state;
  }
};
