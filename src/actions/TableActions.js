import engine from "../classes/engine";

export const editTable = id => {
  let table = engine.table(id);
  return {
    type: "EDIT_TABLE",
    payload: {
      table
    }
  };
};

export const deleteTable = id => {
  let table = engine.table(id);
  return {
    type: "DELETE_TABLE",
    payload: {
      table
    }
  };
};

export const renameTable = id => {
  let table = engine.table(id);
  return {
    type: "RENAME_TABLE",
    payload: {
      table
    }
  };
};

export const displayTable = id => {
  let table = engine.table(id);
  return {
    type: "DISPLAY_TABLE",
    payload: {
      table
    }
  };
};

export const exportTable = id => {
  let table = engine.table(id);
  return {
    type: "EXPORT_TABLE",
    payload: {
      table
    }
  };
};
