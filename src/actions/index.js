import storage from "../engine/storage";
import {
  CREATE_COLLECTION,
  SELECT_COLLECTION,
  RENAME_COLLECTION,
  DELETE_COLLECTION,
  CREATE_TABLE,
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

//COLLECTION ACTIONS

export const createCollectionByName = name => {
  let id = rand("t", 0, 5);
  storage.create(id, name);
  let list = storage.getList();
  return {
    type: CREATE_COLLECTION,
    payload: {
      collections: list
    }
  };
};
export const selectCollectionById = id => {
  return {
    type: SELECT_COLLECTION,
    payload: {
      selectedCollection: storage.getData(id),
      tables: storage.list(id, "tables"),
      days: storage.list(id, "days"),
      places: storage.list(id, "places"),
      times: storage.list(id, "times"),
      blocks: storage.list(id, "blocks"),
      batches: storage.list(id, "batches"),
      subjects: storage.list(id, "subjects"),
      teachers: storage.list(id, "teachers")
    }
  };
};
export const renameCollectionById = (id, newname) => {
  storage.rename(id, newname);
  let list = storage.getList();
  return {
    type: RENAME_COLLECTION,
    payload: {
      collections: list
    }
  };
};
export const deleteCollectionById = id => {
  let deleted = storage.getData(id);
  storage.delete(id);
  let list = storage.getList();
  return {
    type: DELETE_COLLECTION,
    payload: {
      collections: list,
      deleted
    }
  };
};

//TABLE ACTIONS

export const createTable = (collectionID, data) => {
  let tableID = rand("tl", 1, 9);
  let tables = storage.list(collectionID, "tables");
  tables.createItem(tableID, data);
  tables = storage.list(collectionID, "tables");
  return {
    type: CREATE_TABLE,
    payload: {
      tables
    }
  };
};
export const deleteTableById = (collectionID, tableID) => {
  let tables = storage.list(collectionID, "tables");
  tables.deleteItem(tableID);
  tables = storage.list(collectionID, "tables");
  return {
    type: DELETE_TABLE,
    payload: {
      tables
    }
  };
};

//BLOCK ACTIONS

export const createBlock = (collectionID, data) => {
  let blockID = rand("bk", 1, 9);
  let blocks = storage.list(collectionID, "blocks");
  blocks.createItem(blockID, data);
  blocks = storage.list(collectionID, "blocks");
  return {
    type: CREATE_BLOCK,
    payload: {
      blocks
    }
  };
};
export const deleteBlockById = (collectionID, blockID) => {
  let blocks = storage.list(collectionID, "blocks");
  blocks.deleteItem(blockID);
  blocks = storage.list(collectionID, "blocks");
  return {
    type: DELETE_BLOCK,
    payload: {
      blocks
    }
  };
};

//DAY ACTIONS

export const createDay = (collectionID, data) => {
  let days = storage.list(collectionID, "days");
  days.createItem(rand("dy"), Object.assign(data, { no: days.all().length }));
  days = storage.list(collectionID, "days");
  return {
    type: CREATE_DAY,
    payload: {
      days
    }
  };
};
export const deleteDayById = (collectionID, dayID) => {
  let days = storage.list(collectionID, "days");
  days.deleteItem(dayID);
  days = storage.list(collectionID, "days");
  return {
    type: DELETE_DAY,
    payload: {
      days
    }
  };
};

//TIME ACTIONS

export const createTime = (collectionID, data) => {
  let times = storage.list(collectionID, "times");
  times.createItem(rand("tm"), Object.assign(data, { no: times.all().length }));
  times = storage.list(collectionID, "times");
  return {
    type: CREATE_TIME,
    payload: {
      times
    }
  };
};
export const deleteTimeById = (collectionID, timeID) => {
  let times = storage.list(collectionID, "times");
  times.deleteItem(timeID);
  times = storage.list(collectionID, "times");
  return {
    type: DELETE_TIME,
    payload: {
      times
    }
  };
};

//PLACE ACTIONS

export const createPlace = (collectionID, data) => {
  let places = storage.list(collectionID, "places");
  places.createItem(
    rand("pl"),
    Object.assign(data, { no: places.all().length })
  );
  places = storage.list(collectionID, "places");
  return {
    type: CREATE_PLACE,
    payload: {
      places
    }
  };
};
export const deletePlaceById = (collectionID, placeID) => {
  let places = storage.list(collectionID, "places");
  places.deleteItem(placeID);
  places = storage.list(collectionID, "places");
  return {
    type: DELETE_PLACE,
    payload: {
      places
    }
  };
};

//BATCH ACTIONS

export const createBatch = (collectionID, data) => {
  let batches = storage.list(collectionID, "batches");
  batches.createItem(
    rand("bh"),
    Object.assign(data, { no: batches.all().length })
  );
  batches = storage.list(collectionID, "batches");
  return {
    type: CREATE_BATCH,
    payload: {
      batches
    }
  };
};
export const deleteBatchById = (collectionID, batchID) => {
  let batches = storage.list(collectionID, "batches");
  batches.deleteItem(batchID);
  batches = storage.list(collectionID, "batches");
  return {
    type: DELETE_BATCH,
    payload: {
      batches
    }
  };
};

//SUBJECT ACTIONS

export const createSubject = (collectionID, data) => {
  let subjects = storage.list(collectionID, "subjects");
  subjects.createItem(
    rand("st"),
    Object.assign(data, { no: subjects.all().length })
  );
  subjects = storage.list(collectionID, "subjects");
  return {
    type: CREATE_SUBJECT,
    payload: {
      subjects
    }
  };
};
export const deleteSubjectById = (collectionID, subjectID) => {
  let subjects = storage.list(collectionID, "subjects");
  subjects.deleteItem(subjectID);
  subjects = storage.list(collectionID, "subjects");
  return {
    type: DELETE_SUBJECT,
    payload: {
      subjects
    }
  };
};

//TEACHER ACTIONS

export const createTeacher = (collectionID, data) => {
  let teachers = storage.list(collectionID, "teachers");
  teachers.createItem(
    rand("tr"),
    Object.assign(data, { no: teachers.all().length })
  );
  teachers = storage.list(collectionID, "teachers");
  return {
    type: CREATE_TEACHER,
    payload: {
      teachers
    }
  };
};
export const deleteTeacherById = (collectionID, teacherID) => {
  let teachers = storage.list(collectionID, "teachers");
  teachers.deleteItem(teacherID);
  teachers = storage.list(collectionID, "teachers");
  return {
    type: DELETE_TEACHER,
    payload: {
      teachers
    }
  };
};
