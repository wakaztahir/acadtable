//For Tables
const createTable = (name, id) => {
  return {
    type: "CREATE_TABLE",
    info: {
      name: name,
      id: id
    }
  };
};

const deleteTable = (name, id) => {
  return {
    type: "DELETE_TABLE",
    info: {
      name: name,
      id: id
    }
  };
};

const renameTable = (name, id) => {
  return {
    type: "RENAME_TABLE",
    info: {
      name: name,
      id: id
    }
  };
};

const displayTable = (name, id) => {
  return {
    type: "DISPLAY_TABLE",
    info: {
      name: name,
      id: id
    }
  };
};
