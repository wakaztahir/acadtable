import { combineReducers } from "redux";

import TablesList from "./TablesList";
import SelectedTable from "./SelectedTable";
import PlacesList from "./PlacesList";
import DaysList from "./DaysList";
import TimesList from "./TimesList";
import BlocksList from "./BlocksList";
import SubjectsList from "./SubjectsList";
import TeachersList from "./TeachersList";

export default combineReducers({
  TablesList,
  SelectedTable,
  PlacesList,
  DaysList,
  TimesList,
  BlocksList,
  SubjectsList,
  TeachersList
});
