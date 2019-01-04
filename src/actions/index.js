import { Table, getList } from "../table";

export const LIST_DIALOGUE = "LIST_DIALOGUE";
export const CREATE_DIALOGUE = "CREATE_DIALOGUE";
export const EDIT_DIALOGUE = "EDIT_DIALOGUE";
export const RENAME_DIALOGUE = "RENAME_DIALOGUE";
export const DELETE_DIALOGUE = "DELETE_DIALOGUE";
export const CREATE_TABLE = "CREATE_TABLE";
export const DISPLAY_TABLE = "DISPLAY_TABLE";
export const EDIT_TABLE = "EDIT_TABLE";
export const RENAME_TABLE = "RENAME_TABLE";
export const DELETE_TABLE = "DELETE_TABLE";
export const SAVE_TABLE = "SAVE_TABLE";

export const listDialogue = () => {
  let list = getList();
  return {
    type: LIST_DIALOGUE,
    list,
    display: "list"
  };
};

export const createDialogue = () => {
  return {
    type: CREATE_DIALOGUE,
    display: "create"
  };
};
export const editDialogue = () => {
  return {
    type: CREATE_DIALOGUE,
    display: "edit"
  };
};
export const renameDialogue = () => {
  return {
    type: CREATE_DIALOGUE,
    display: "rename"
  };
};
export const deleteDialogue = () => {
  return {
    type: CREATE_DIALOGUE,
    display: "delete"
  };
};

export const createTable = name => {
  Table.byName(name);
  return {
    type: CREATE_TABLE,
    display: "list"
  };
};
export const editTable = id => {};
export const renameTable = id => {};
export const deleteTable = id => {};
export const saveTable = id => {};
export const displayTable = id => {};
