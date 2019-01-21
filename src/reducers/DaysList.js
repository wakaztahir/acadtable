import { SELECT_COLLECTION, CREATE_DAY } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_DAY:
      return action.payload.days.all();
    default:
      return state;
  }
};
