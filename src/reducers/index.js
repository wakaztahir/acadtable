import { combineReducers } from "redux";
import CollectionsList from "./CollectionsList";
import SelectedCollection from "./SelectedCollection";
import TablesList from "./TablesList";
import PlacesList from "./PlacesList";
import DaysList from "./DaysList";
import TimesList from "./TimesList";
import BlocksList from "./BlocksList";
import SubjectsList from "./SubjectsList";
import TeachersList from "./TeachersList";

export default combineReducers({
  CollectionsList,
  SelectedCollection,
  TablesList,
  PlacesList,
  DaysList,
  TimesList,
  BlocksList,
  SubjectsList,
  TeachersList
});
