import storage from "../engine/storage";
import {
  CREATE_TABLE,
  SELECT_TABLE,
  RENAME_TABLE,
  DELETE_TABLE,
  CREATE_BLOCK,
  DELETE_BLOCK,
  CREATE_DAY,
  DELETE_DAY,
  CREATE_TIME,
  DELETE_TIME,
  CREATE_PLACE,
  DELETE_PLACE,
  CREATE_BATCH,
  DELETE_BATCH,
  CREATE_SUBJECT,
  DELETE_SUBJECT,
  CREATE_TEACHER,
  DELETE_TEACHER
} from "./types";

//HELPER FUNCTIONS

const rand = (operator = "x", start = 0, end = 7) => {
  let id = Math.random()
    .toString()
    .split(".")[1]
    .substr(start, end);
  return operator + id;
};

//TABLE ACTIONS

export const createTableByName = name => {
  let id = rand("t", 0, 5);
  storage.create(id, name);
  let list = storage.getList();
  return {
    type: CREATE_TABLE,
    list
  };
};
export const selectTableById = id => {
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

//BLOCK ACTIONS

export const createBlock = (tableID, data) => {
  let blockID = rand("bl", 1, 9);
  let blocks = storage.list(tableID, "blocks");
  blocks.createItem(blockID, data);
  blocks = storage.list(tableID, "blocks");
  return {
    type: CREATE_BLOCK,
    blocks
  };
};

export const deleteBlockById = (tableID, blockID) => {
  let blocks = storage.list(tableID, "blocks");
  blocks.deleteItem(blockID);
  blocks = storage.list(tableID, "blocks");
  return {
    type: DELETE_BLOCK,
    blocks
  };
};

export const createDay = (tableID, data) => {
  let days = storage.list(tableID, "days");
  days.createItem(rand("dy"), Object.assign(data, { no: days.all().length }));
  days = storage.list(tableID, "days");
  return {
    type: CREATE_DAY,
    days
  };
};
export const deleteDayById = () => {};

export const createTime = (tableID, data) => {
  let times = storage.list(tableID, "times");
  times.createItem(rand("bl"), Object.assign(data, { no: times.all().length }));
  times = storage.list(tableID, "times");
  return {
    type: CREATE_TIME,
    times
  };
};
export const deleteTimeById = () => {};

export const createPlace = (tableID, data) => {
  let places = storage.list(tableID, "places");
  places.createItem(
    rand("pl"),
    Object.assign(data, { no: places.all().length })
  );
  places = storage.list(tableID, "places");
  return {
    type: CREATE_PLACE,
    places
  };
};
export const deletePlaceById = () => {};

export const createBatch = (tableID, data) => {
  let batches = storage.list(tableID, "batches");
  batches.createItem(
    rand("bh"),
    Object.assign(data, { no: batches.all().length })
  );
  batches = storage.list(tableID, "batches");
  return {
    type: CREATE_BATCH,
    batches
  };
};
export const deleteBatchById = () => {};

export const createSubject = (tableID, data) => {
  let subjects = storage.list(tableID, "subjects");
  subjects.createItem(
    rand("st"),
    Object.assign(data, { no: subjects.all().length })
  );
  subjects = storage.list(tableID, "subjects");
  return {
    type: CREATE_SUBJECT,
    subjects
  };
};
export const deleteSubjectById = () => {};

export const createTeacher = (tableID, data) => {
  let teachers = storage.list(tableID, "teachers");
  teachers.createItem(
    rand("tr"),
    Object.assign(data, { no: teachers.all().length })
  );
  teachers = storage.list(tableID, "teachers");
  return {
    type: CREATE_TEACHER,
    teachers
  };
};
export const deleteTeacherById = () => {};
