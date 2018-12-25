const TableReducer = (data = null, action) => {
  switch (action.type) {
    case "DISPLAY_TABLE":
      return {
        selected: action.payload.id
      };
    default:
      if (data === undefined || data === null) {
        return {
          selected: null
        };
      } else {
        return data;
      }
  }
};

export default TableReducer;
