import { createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import rootReducer from "./reducers";

const initialStore = {};

const store = createStore(rootReducer, initialStore, composeWithDevTools());

export default store;
