import { createStore } from "redux";
import rootReducer from "./reducers"; // Your combined reducers

// Define the RootState type
export type RootState = ReturnType<typeof rootReducer>;

const initialStore = {};
export const store = createStore(rootReducer, initialStore);
