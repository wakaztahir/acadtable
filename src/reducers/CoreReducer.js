const CoreReducer = (data = null, action) => {
  switch (action.type) {
    case "LIST_TABLES":
      return { TableList: action.payload };
    case "DISPLAY_MODAL":
      return {
        Modal: action.payload.show,
        ModalContent: action.payload.content
      };
    default:
      if (data === undefined || data === null) {
        return {
          TableList: [],
          ModalDisplay: false,
          ModalContent: null
        };
      } else {
        return data;
      }
  }
};

export default CoreReducer;
