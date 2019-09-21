import types from "../actions/types";

const initial_state = {
  modal: {
    type: null,
    content: null,
    buttons: null
  },
  menu: {
    display: false,
    type: null
  }
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
    case types.UNSHOW_MODAL:
      return { ...state, modal: action.payload };
    case types.SHOW_MENU:
    case types.UNSHOW_MENU:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
};
