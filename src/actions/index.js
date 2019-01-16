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
  DELETE_LECTURE,
  CREATE_SUBJECT,
  RENAME_SUBJECT,
  DELETE_SUBJECT,
  CREATE_TEACHER,
  RENAME_TEACHER,
  DELETE_TEACHER
} from "./types";

let table = new storage("table");
let batch = new storage("batch");
let lecture = new storage("lecture");
let subject = new storage("storage");
let teacher = new storage("teacher");

//TABLE ACTIONS

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
export const renameTableById = (id, newname) => {
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

//BATCH ACTIONS

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

//LECTURE ACTIONS

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

//SUBJECT ACTIONS

export const createSubjectByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(3, 8);
  subject.create(name, id);
  let list = subject.getList();
  return {
    type: CREATE_SUBJECT,
    list
  };
};
export const renameSubjectById = (newname, id) => {
  subject.rename(newname, id);
  let list = subject.getList();
  return {
    type: RENAME_SUBJECT,
    list
  };
};
export const deleteSubjectById = id => {
  subject.delete(id);
  let list = subject.getList();
  return {
    type: DELETE_SUBJECT,
    list
  };
};

//TEACHER ACTIONS

export const createTeacherByName = name => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(3, 8);
  teacher.create(name, id);
  let list = teacher.getList();
  return {
    type: CREATE_TEACHER,
    list
  };
};
export const renameTeacherById = (newname, id) => {
  teacher.rename(newname, id);
  let list = teacher.getList();
  return {
    type: RENAME_TEACHER,
    list
  };
};
export const deleteTeacherById = id => {
  teacher.delete(id);
  let list = teacher.getList();
  return {
    type: DELETE_TEACHER,
    list
  };
};
