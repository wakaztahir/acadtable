export const Tables = (data = [], action) => {
  if (action.type === "LIST_TABLES") {
    return action.payload;
  }
  return data;
};

export const Modal = (data = {}, action) => {
  if (action.type === "DISPLAY_MODAL") {
    return {
      display: action.payload.show,
      content: action.payload.content
    };
  }
  return data;
};
