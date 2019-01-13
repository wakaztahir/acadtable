import { combineReducers } from "redux";

import SelectedTable from "./SelectedTable";
import TableList from "./TableList";
import BatchList from "./BatchList";
import LectureList from "./LectureList";

export default combineReducers({
  SelectedTable,
  TableList,
  BatchList,
  LectureList
});
