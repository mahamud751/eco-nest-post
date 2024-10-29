import {
  CartItem,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
} from "../types";

export const add_item = (product: CartItem): CartActionTypes => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const remove_item = (
  productId: string,
  size: string,
  color: string
): CartActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    payload: { productId, size, color },
  };
};

export const delete_item = (
  productId: string,
  size: string,
  color: string
): CartActionTypes => {
  return {
    type: DELETE_FROM_CART,
    payload: { productId, size, color }, // Updated payload to include size and color
  };
};

export const clear_cart = (): CartActionTypes => {
  return {
    type: CLEAR_CART,
  };
};

// In your actions file
export const update_quantity = (
  productId: string,
  quantity: number,
  size: string,
  color: string
): CartActionTypes => ({
  type: UPDATE_QUANTITY,
  payload: {
    productId,
    quantity,
    size,
    color,
  },
});
