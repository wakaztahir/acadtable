import { SELECT_COLLECTION, CREATE_TIME } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_COLLECTION:
    case CREATE_TIME:
      return action.payload.times.all();
    default:
      return state;
  }
};
