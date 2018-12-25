import { combineReducers } from "redux";

import CoreReducer from "./CoreReducer";
import TableReducer from "./TableReducer";
import UserReducer from "./UserReducer";
import SettingsReducer from "./SettingsReducer";

export default combineReducers({
  core: CoreReducer,
  table: TableReducer,
  user: UserReducer,
  settings: SettingsReducer
});
