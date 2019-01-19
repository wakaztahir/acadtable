import { SELECT_TABLE, CREATE_PLACE } from "../actions/types";
import storage from "../engine/storage";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_TABLE:
      let list = storage.list(action.table.id, "places");
      return list.all();
    case CREATE_PLACE:
      return action.places.all();
    default:
      return state;
  }
};
