import {
  LIST_DIALOGUE,
  CREATE_DIALOGUE,
  EDIT_DIALOGUE,
  RENAME_DIALOGUE,
  DELETE_DIALOGUE,
  CREATE_TABLE
} from "../actions";

export const MenuDisplay = (
  state = { display: "list", tableList: [] },
  action
) => {
  switch (action.type) {
    case LIST_DIALOGUE:
    case CREATE_TABLE:
      return { ...state, list: action.list, display: action.display };
    case CREATE_DIALOGUE:
      return { ...state, display: action.display };
    case EDIT_DIALOGUE:
      return { ...state, display: action.display };
    case RENAME_DIALOGUE:
      return { ...state, display: action.display };
    case DELETE_DIALOGUE:
      return { ...state, display: action.display };
    default:
      return state;
  }
};
