export const listTables = tables => {
  let tablesData = tables;
  if (tablesData == null) {
    return [];
  }
  return {
    type: "LIST_TABLES",
    payload: tablesData
  };
};

export const displayModal = (show, content) => {
  return {
    type: "DISPLAY_MODAL",
    payload: {
      show,
      content
    }
  };
};
