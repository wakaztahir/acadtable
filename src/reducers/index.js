import { combineReducers } from "redux";

const TableListReducer = () => {
  return [
    //Supposed Tables
    { name: "Class Table", id: 123 },
    { name: "West Table", id: 678 }
  ];
};

const SelectedTableReducer = (selectedTable = null, action) => {
  if (action === "DISPLAY_TABLE") {
    return selectedTable.id;
  }

  return null;
};

export default combineReducers({
  TableList: TableListReducer,
  SelectedTableReducer: SelectedTableReducer
});
