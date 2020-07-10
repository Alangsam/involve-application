import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import combineReducer from "./combineReducers";

const initialState = {
   allCases: [],
   indexOfSelectedCase: 0,
   adminAccount: {},
   wysiwygState: {},
};

const store = createStore(combineReducer, initialState, composeWithDevTools());

export default store;
