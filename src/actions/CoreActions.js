export const listTables = () => {
  let tableData = localStorage.getItem("tablesData");
  if (tableData != null) {
    tableData = JSON.parse(tableData);
  }
  return {
    type: "LIST_TABLES",
    payload: tableData
  };
};
