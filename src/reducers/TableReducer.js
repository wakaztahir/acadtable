export const selectedTable = (data = null, action) => {
  if (action.type === "DISPLAY_TABLE") {
    return action.payload.table;
  }
  return data;
};
