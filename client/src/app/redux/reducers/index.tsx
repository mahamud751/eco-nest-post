import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import { categoryReducer, selectedCategoryReducer } from "./ctegoryReducer";
import { productsReducer, selectedProductsReducer } from "./productReducer";

export default combineReducers({
  cartReducer,
  allProducts: productsReducer,
  product: selectedProductsReducer,
  allCategory: categoryReducer,
  category: selectedCategoryReducer,
});
