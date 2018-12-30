export const createTable = (name, id) => {
  return {
    type: "CREATE_TABLE",
    payload: {
      name: name,
      id: id
    }
  };
};

export const importTable = (name, id) => {
  return {
    type: "IMPORT_TABLE",
    payload: {
      name: name,
      id: id
    }
  };
};

export const tableOptions = (name, id) => {
  return {
    type: "TABLE_OPTIONS",
    payload: {
      name: name,
      id: id
    }
  };
};

export const saveTables = () => {
  return {
    type:"SAVE_TABLES",
    payload:{}
  }
}