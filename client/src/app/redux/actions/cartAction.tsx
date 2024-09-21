import { ThunkAction } from "redux-thunk";
import { AnyAction } from "redux";
import { ADD_ITEM, DELETE_CART, REMOVE_ITEM, CLEAR_CART } from "../types";
import { RootState } from "../store"; // Adjust this import based on your store file
import { CartItem } from "../types"; // Adjust this import based on your types file

// Define the types for actions
type ThunkResult<R> = ThunkAction<R, RootState, undefined, AnyAction>;

// Add item action
export const add_item = (item: CartItem): ThunkResult<void> => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_ITEM,
      payload: item,
    });

    const { cartReducer } = getState(); // Access cartReducer from state
    localStorage.setItem("cart", JSON.stringify(cartReducer.cart)); // Save cart in localStorage
  };
};

// Remove item action
export const remove_item = (item: CartItem): ThunkResult<void> => {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_ITEM,
      payload: item,
    });

    const { cartReducer } = getState(); // Access cartReducer from state
    localStorage.setItem("cart", JSON.stringify(cartReducer.cart)); // Save updated cart in localStorage
  };
};

// Delete cart item by id action
export const delete_cart = (id: string): ThunkResult<void> => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CART,
      payload: id,
    });

    const { cartReducer } = getState(); // Access cartReducer from state
    localStorage.setItem("cart", JSON.stringify(cartReducer.cart)); // Save updated cart in localStorage
  };
};

// Clear cart action
export const clear_cart = (): ThunkResult<void> => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });

    localStorage.removeItem("cart"); // Clear the cart from localStorage
  };
};
