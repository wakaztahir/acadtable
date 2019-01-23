import storage from "../engine/storage";
import {
  CREATE_COLLECTION,
  SELECT_COLLECTION,
  RENAME_COLLECTION,
  DELETE_COLLECTION,
  CREATE_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
  CREATE_BLOCK,
  UPDATE_BLOCK,
  DELETE_BLOCK,
  CREATE_DAY,
  UPDATE_DAY,
  DELETE_DAY,
  CREATE_TIME,
  UPDATE_TIME,
  DELETE_TIME,
  CREATE_PLACE,
  UPDATE_PLACE,
  DELETE_PLACE,
  CREATE_BATCH,
  UPDATE_BATCH,
  DELETE_BATCH,
  CREATE_SUBJECT,
  UPDATE_SUBJECT,
  DELETE_SUBJECT,
  CREATE_TEACHER,
  UPDATE_TEACHER,
  DELETE_TEACHER
} from "./types";

//COLLECTION ACTIONS

export const createCollection = (id, name) => {
  storage.create(id, name);
  let list = storage.getList();
  return {
    type: CREATE_COLLECTION,
    payload: {
      collections: list
    }
  };
};
export const selectCollection = id => {
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
export const renameCollection = (id, newname) => {
  storage.rename(id, newname);
  let list = storage.getList();
  return {
    type: RENAME_COLLECTION,
    payload: {
      collections: list
    }
  };
};
export const deleteCollection = id => {
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
  let tables = storage.list(collectionID, "tables");
  tables.createItem(data);
  tables = storage.list(collectionID, "tables");
  return {
    type: CREATE_TABLE,
    payload: {
      tables
    }
  };
};
export const updateTable = (collectionID, tableID, data) => {
  let tables = storage.list(collectionID, "tables");
  tables.updateItem(tableID, data);
  tables = storage.list(collectionID, "tables");
  return {
    type: UPDATE_TABLE,
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
  let blocks = storage.list(collectionID, "blocks");
  blocks.createItem(data);
  blocks = storage.list(collectionID, "blocks");
  return {
    type: CREATE_BLOCK,
    payload: {
      blocks
    }
  };
};
export const updateBlock = (collectionID, blockID, data) => {
  let blocks = storage.list(collectionID, "blocks");
  blocks.updateItem(blockID, data);
  blocks = storage.list(collectionID, "blocks");
  return {
    type: UPDATE_BLOCK,
    payload: {
      blocks
    }
  };
};
export const deleteBlock = (collectionID, blockID) => {
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
  days.createItem(data);
  days = storage.list(collectionID, "days");
  return {
    type: CREATE_DAY,
    payload: {
      days
    }
  };
};
export const updateDay = (collectionID, dayID, data) => {
  let days = storage.list(collectionID, "days");
  days.updateItem(dayID, data);
  days = storage.list(collectionID, "days");
  return {
    type: UPDATE_DAY,
    payload: {
      days
    }
  };
};
export const deleteDay = (collectionID, dayID) => {
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
  times.createItem(data);
  times = storage.list(collectionID, "times");
  return {
    type: CREATE_TIME,
    payload: {
      times
    }
  };
};
export const updateTime = (collectionID, timeID, data) => {
  let times = storage.list(collectionID, "times");
  times.updateItem(timeID, data);
  times = storage.list(collectionID, "times");
  return {
    type: UPDATE_TIME,
    payload: {
      times
    }
  };
};
export const deleteTime = (collectionID, timeID) => {
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
  places.createItem(data);
  places = storage.list(collectionID, "places");
  return {
    type: CREATE_PLACE,
    payload: {
      places
    }
  };
};
export const updatePlace = (collectionID, placeID, data) => {
  let places = storage.list(collectionID, "places");
  places.updateItem(placeID, data);
  places = storage.list(collectionID, "places");
  return {
    type: UPDATE_PLACE,
    payload: {
      places
    }
  };
};
export const deletePlace = (collectionID, placeID) => {
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
  batches.createItem(data);
  batches = storage.list(collectionID, "batches");
  return {
    type: CREATE_BATCH,
    payload: {
      batches
    }
  };
};
export const updateBatch = (collectionID, batchID, data) => {
  let batches = storage.list(collectionID, "batches");
  batches.updateItem(batchID, data);
  batches = storage.list(collectionID, "batches");
  return {
    type: UPDATE_BATCH,
    payload: {
      batches
    }
  };
};
export const deleteBatch = (collectionID, batchID) => {
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
  subjects.createItem(data);
  subjects = storage.list(collectionID, "subjects");
  return {
    type: CREATE_SUBJECT,
    payload: {
      subjects
    }
  };
};
export const updateSubject = (collectionID, subjectID, data) => {
  let subjects = storage.list(collectionID, "subjects");
  subjects.updateItem(subjectID, data);
  subjects = storage.list(collectionID, "subjects");
  return {
    type: UPDATE_SUBJECT,
    payload: {
      subjects
    }
  };
};
export const deleteSubject = (collectionID, subjectID) => {
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
  teachers.createItem(data);
  teachers = storage.list(collectionID, "teachers");
  return {
    type: CREATE_TEACHER,
    payload: {
      teachers
    }
  };
};
export const updateTeacher = (collectionID, teacherID, data) => {
  let teachers = storage.list(collectionID, "teachers");
  teachers.updateItem(teacherID, data);
  teachers = storage.list(collectionID, "teachers");
  return {
    type: UPDATE_TEACHER,
    payload: {
      teachers
    }
  };
};
export const deleteTeacher = (collectionID, teacherID) => {
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
