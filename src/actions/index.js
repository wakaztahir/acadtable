import types from "./types";

// import Example from "./example.json";

import storage from "./storage";

let user = new storage();

//COLLECTION ACTIONS
export const exampleCollection = () => {
  return {
    type: types.EXAMPLE_COLLECTION,
    payload: {}
  };
};

export const createCollection = (data = {}) => {
  user.init();
  let collection = user.set(data);
  return {
    type: types.CREATE_COLLECTION,
    payload: collection
  };
};
export const selectCollection = id => {
  user.init(id);
  return {
    type: types.SELECT_COLLECTION,
    payload: {}
  };
};
export const copyCollection = id => {
  user.init();
  let collection = user.get(id);
  collection.name += " Copy";
  collection = user.set(collection);
  return {
    type: types.COPY_COLLECTION,
    payload: collection
  };
};
export const renameCollection = (id, newname) => {
  return {
    type: types.RENAME_COLLECTION,
    payload: {}
  };
};
export const deleteCollection = id => {
  user.init(id);
  let deleted = user.delete();
  return {
    type: types.DELETE_COLLECTION,
    payload: deleted
  };
};

//TABLE ACTIONS

export const createTable = (collectionID, data) => {
  return {
    type: types.CREATE_TABLE,
    payload: {}
  };
};
export const updateTable = (collectionID, tableID, data) => {
  return {
    type: types.UPDATE_TABLE,
    payload: {}
  };
};
export const deleteTable = (collectionID, tableID) => {
  return {
    type: types.DELETE_TABLE,
    payload: {}
  };
};

//BLOCK ACTIONS

export const createBlock = (collectionID, data) => {
  return {
    type: types.CREATE_BLOCK,
    payload: {}
  };
};
export const updateBlock = (collectionID, blockID, data) => {
  return {
    type: types.UPDATE_BLOCK,
    payload: {}
  };
};
export const deleteBlock = (collectionID, blockID) => {
  return {
    type: types.DELETE_BLOCK,
    payload: {}
  };
};

//DAY ACTIONS

export const createDay = (collectionID, data) => {
  return {
    type: types.CREATE_DAY,
    payload: {}
  };
};
export const updateDay = (collectionID, dayID, data) => {
  return {
    type: types.UPDATE_DAY,
    payload: {}
  };
};
export const deleteDay = (collectionID, dayID) => {
  return {
    type: types.DELETE_DAY,
    payload: {}
  };
};

//TIME ACTIONS

export const createTime = (collectionID, data) => {
  return {
    type: types.CREATE_TIME,
    payload: {}
  };
};
export const updateTime = (collectionID, timeID, data) => {
  return {
    type: types.UPDATE_TIME,
    payload: {}
  };
};
export const deleteTime = (collectionID, timeID) => {
  return {
    type: types.DELETE_TIME,
    payload: {}
  };
};

//PLACE ACTIONS

export const createPlace = (collectionID, data) => {
  return {
    type: types.CREATE_PLACE,
    payload: {}
  };
};
export const updatePlace = (collectionID, placeID, data) => {
  return {
    type: types.UPDATE_PLACE,
    payload: {}
  };
};
export const deletePlace = (collectionID, placeID) => {
  return {
    type: types.DELETE_PLACE,
    payload: {}
  };
};

//BATCH ACTIONS

export const createBatch = (collectionID, data) => {
  return {
    type: types.CREATE_BATCH,
    payload: {}
  };
};
export const updateBatch = (collectionID, batchID, data) => {
  return {
    type: types.UPDATE_BATCH,
    payload: {}
  };
};
export const deleteBatch = (collectionID, batchID) => {
  return {
    type: types.DELETE_BATCH,
    payload: {}
  };
};

//SUBJECT ACTIONS

export const createSubject = (collectionID, data) => {
  return {
    type: types.CREATE_SUBJECT,
    payload: {}
  };
};
export const updateSubject = (collectionID, subjectID, data) => {
  return {
    type: types.UPDATE_SUBJECT,
    payload: {}
  };
};
export const deleteSubject = (collectionID, subjectID) => {
  return {
    type: types.DELETE_SUBJECT,
    payload: {}
  };
};

//TEACHER ACTIONS

export const createTeacher = (collectionID, data) => {
  return {
    type: types.CREATE_TEACHER,
    payload: {}
  };
};
export const updateTeacher = (collectionID, teacherID, data) => {
  return {
    type: types.UPDATE_TEACHER,
    payload: {}
  };
};
export const deleteTeacher = (collectionID, teacherID) => {
  return {
    type: types.DELETE_TEACHER,
    payload: {}
  };
};
