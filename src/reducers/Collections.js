import storage from "../actions/storage";

import types from "../actions/types";

let user = new storage();
let collections = Object.values(user.all());

export default (state = collections, action) => {
  switch (action.type) {
    case types.CREATE_COLLECTION:
    case types.COPY_COLLECTION:
      return [...state, { ...action.payload }];
    case types.DELETE_COLLECTION:
      return state.filter(coll => coll.id !== action.payload.id);
    default:
      return state;
  }
};
