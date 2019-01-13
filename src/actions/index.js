import storage from "../storage";
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

let table = new storage("table");
let batch = new storage("batch");
let lecture = new storage("lecture");

export const createTableByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(0, 5);
  table.create(name, id);
  let list = table.getList();
  return {
    type: CREATE_TABLE,
    list
  };
};
export const selectTableById = id => {
  let tableData = table.getData(id);
  return {
    type: SELECT_TABLE,
    table: tableData
  };
};
export const renameTableById = (newname, id) => {
  table.rename(newname, id);
  let list = table.getList();
  return {
    type: RENAME_TABLE,
    list
  };
};

export const deleteTableById = id => {
  table.delete(id);
  let list = table.getList();
  return {
    type: DELETE_TABLE,
    deleted: id,
    list
  };
};

export const createBatchByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(3, 8);
  batch.create(name, id);
  let list = batch.getList();
  return {
    type: CREATE_BATCH,
    list
  };
};
export const renameBatchById = (newname, id) => {
  batch.rename(newname, id);
  let list = batch.getList();
  return {
    type: RENAME_BATCH,
    list
  };
};

export const deleteBatchById = id => {
  batch.delete(id);
  let list = batch.getList();
  return {
    type: DELETE_BATCH,
    list
  };
};
export const createLectureByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(4, 9);
  lecture.create(name, id);
  let list = lecture.getList();
  console.log(list);
  return {
    type: CREATE_LECTURE,
    list
  };
};
export const renameLectureById = (newname, id) => {
  lecture.rename(newname, id);
  let list = lecture.getList();
  return {
    type: RENAME_LECTURE,
    list
  };
};

export const deleteLectureById = id => {
  lecture.delete(id);
  let list = lecture.getList();
  return {
    type: DELETE_LECTURE,
    list
  };
};
