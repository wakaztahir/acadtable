import { combineReducers } from "redux";

import TableList from "./TableList";
import BatchList from "./BatchList";
import SelectedTable from "./SelectedTable";

export default combineReducers({ TableList, BatchList, SelectedTable });
