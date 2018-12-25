import { combineReducers } from "redux";

import { Tables, Modal } from "./CoreReducer";
import { selectedTable } from "./TableReducer";
// import UserReducer from "./UserReducer";
// import SettingsReducer from "./SettingsReducer";

export default combineReducers({
  Tables,
  Modal,
  selectedTable
});
