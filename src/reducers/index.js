import { combineReducers } from "redux";

import SelectedTable from "./SelectedTable";
import TableList from "./TableList";
import BatchList from "./BatchList";
import LectureList from "./LectureList";
import SubjectList from "./SubjectList";
import TeacherList from "./TeacherList";

export default combineReducers({
  SelectedTable,
  TableList,
  BatchList,
  LectureList,
  SubjectList,
  TeacherList
});
