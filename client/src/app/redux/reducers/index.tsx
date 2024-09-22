// In your rootReducer.ts or reducers/index.ts
import { combineReducers } from "redux";
import cartReducer from "./cartReducer"; // Example reducer

const rootReducer = combineReducers({
  cart: cartReducer,
  // other reducers
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
