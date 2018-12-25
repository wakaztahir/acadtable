const UserReducer = (data = null, action) => {
  switch (action.type) {
    case "CREATE_TABLE":
    default:
      if (data === undefined || data === null) {
        return {};
      } else {
        return data;
      }
  }
};

export default UserReducer;
