import storage from "../engine/storage";
import {
  CREATE_TABLE,
  SELECT_TABLE,
  RENAME_TABLE,
  DELETE_TABLE,
  CREATE_BATCH,
  RENAME_BATCH,
  DELETE_BATCH,
  CREATE_LECTURE,
  RENAME_LECTURE,
  DELETE_LECTURE
} from "./types";

let session = new storage();

//TABLE ACTIONS

export const createTableByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(0, 5);
  storage.create(name, id);
  let list = storage.getList();
  return {
    type: CREATE_TABLE,
    list
  };
};
export const selectTableById = id => {
  session.init(id);
  return {
    type: SELECT_TABLE,
    table: storage.getData(id)
  };
};
export const renameTableById = (id, newname) => {
  storage.rename(id, newname);
  let list = storage.getList();
  return {
    type: RENAME_TABLE,
    list
  };
};
export const deleteTableById = id => {
  storage.delete(id);
  let list = storage.getList();
  return {
    type: DELETE_TABLE,
    deleted: id,
    list
  };
};

//BATCH ACTIONS

export const createBatchByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(3, 8);
  session.create(name, id);
  let list = session.getBatchList();
  return {
    type: CREATE_BATCH,
    list
  };
};
export const renameBatchById = (newname, id) => {
  session.renameBatch(newname, id);
  let list = session.getBatchList();
  return {
    type: RENAME_BATCH,
    list
  };
};
export const deleteBatchById = id => {
  session.deleteBatch(id);
  let list = session.getBatchList();
  return {
    type: DELETE_BATCH,
    list
  };
};

//LECTURE ACTIONS

export const createLectureByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(4, 9);
  session.createLecture(name, id);
  let list = session.getLectureList();
  console.log(list);
  return {
    type: CREATE_LECTURE,
    list
  };
};
export const renameLectureById = (newname, id) => {
  session.renameLecture(newname, id);
  let list = session.getLectureList();
  return {
    type: RENAME_LECTURE,
    list
  };
};
export const deleteLectureById = id => {
  session.deleteLecture(id);
  let list = session.getLectureList();
  return {
    type: DELETE_LECTURE,
    list
  };
};
