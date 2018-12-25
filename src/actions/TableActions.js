export const editTable = id => {
  return {
    type: "EDIT_TABLE",
    payload: {
      id: id
    }
  };
};

export const deleteTable = id => {
  return {
    type: "DELETE_TABLE",
    payload: {
      id: id
    }
  };
};

export const renameTable = id => {
  return {
    type: "RENAME_TABLE",
    payload: {
      id: id
    }
  };
};

export const displayTable = id => {
  return {
    type: "DISPLAY_TABLE",
    payload: {
      id: id
    }
  };
};

export const exportTable = id => {
  return {
    type: "EXPORT_TABLE",
    payload: {
      id: id
    }
  };
};
