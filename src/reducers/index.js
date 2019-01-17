import { combineReducers } from "redux";

import TablesList from "./TablesList";
import SelectedTable from "./SelectedTable";

export default combineReducers({
  TablesList,
  SelectedTable
});
