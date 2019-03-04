import types from "../actions/types";

const initial_state = {
  modal: {
    display: false,
    type: null,
    content: null,
    buttons: null
  }
};

export default (state = initial_state, action) => {
  switch (action.type) {
    case types.SHOW_MODAL:
    case types.UNSHOW_MODAL:
      return { ...state, modal: action.payload };
    default:
      return state;
  }
};
