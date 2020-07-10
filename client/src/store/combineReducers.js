import { combineReducers } from "redux";
import allCases from "./reducers/allCases";
import adminAccount from "./reducers/adminAccount";
import indexOfSelectedCase from "./reducers/indexOfSelectedCase";
import wysiwygState from "./reducers/wysiwygState";

export default combineReducers({
   allCases,
   adminAccount,
   indexOfSelectedCase,
   wysiwygState,
});
