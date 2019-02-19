import { combineReducers } from "redux";
import User from "./User";
import Collections from "./Collections";
import Tables from "./Tables";
import Batches from "./Batches";
import Places from "./Places";
import Days from "./Days";
import Times from "./Times";
import Lectures from "./Lectures";
import Subjects from "./Subjects";
import Teachers from "./Teachers";

export default combineReducers({
  User,
  Collections,
  Tables,
  Places,
  Batches,
  Days,
  Times,
  Lectures,
  Subjects,
  Teachers
});
