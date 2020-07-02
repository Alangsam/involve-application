import { combineReducers } from "redux";
import allCases from "./reducers/allCases";
import adminAccount from "./reducers/adminAccount";
import indexOfSelectedCase from "./reducers/indexOfSelectedCase";

export default combineReducers({
    allCases,
    adminAccount,
    indexOfSelectedCase,
});
