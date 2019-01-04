import { combineReducers } from "redux";
import { MenuDisplay } from "./Menu";
import { ScreenReducer as Screen } from "./Screen";

export default combineReducers({ MenuDisplay, Screen });
