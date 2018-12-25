const TableReducer = (data = null, action) => {
  switch (action.type) {
    case "DISPLAY_TABLE":
      return {
        current: action.payload.table
      };
    default:
      if (data === undefined || data === null) {
        return {
          current: null
        };
      } else {
        return data;
      }
  }
};

export default TableReducer;
