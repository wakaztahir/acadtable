import types from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case types.SELECT_COLLECTION:
    case types.CREATE_TEACHER:
      return action.payload.teachers.all();
    default:
      return state;
  }
};
