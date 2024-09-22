import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers"; // Import your combined reducers

const initialStore = {};

// Create the store without `redux-thunk`
const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools() // Still use dev tools, just no middleware
);

export default store;
