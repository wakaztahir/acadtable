import storage from "../storage";
import { CREATE_TABLE, RENAME_TABLE, DELETE_TABLE } from "./types";
export const createTableByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(0, 5);
  storage.createTable(name, id);
  let list = storage.getList();
  return {
    type: CREATE_TABLE,
    list
  };
};
export const renameTableById = (newname, id) => {
  storage.renameTable(newname, id);
  let list = storage.getList();
  return {
    type: RENAME_TABLE,
    list
  };
};

export const deleteTableById = id => {
  storage.deleteTable(id);
  let list = storage.getList();
  return {
    type: DELETE_TABLE,
    list
  };
};
