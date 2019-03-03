import storage from "../actions/storage";

import types from "../actions/types";

export default (state = Object.values(storage.list), action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
      return Object.values(storage.list);
    case types.CREATE_COLLECTION:
    case types.EXAMPLE_COLLECTION:
    case types.COPY_COLLECTION:
      return [...state, { ...action.payload }];
    case types.DELETE_COLLECTION:
      return state.filter(coll => coll.id !== action.payload.id);
    default:
      return state;
  }
};
