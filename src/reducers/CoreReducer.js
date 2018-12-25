const CoreReducer = (data = null, action) => {
  switch (action.type) {
    case "LIST_TABLES":
      return { TableList: action.payload };
    default:
      if (data === undefined || data === null) {
        return {
          TableList: []
        };
      } else {
        return data;
      }
  }
};

export default CoreReducer;
