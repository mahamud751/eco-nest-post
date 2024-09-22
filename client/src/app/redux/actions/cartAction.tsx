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

export const remove_item = (productId: string): CartActionTypes => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const delete_item = (productId: string): CartActionTypes => {
  return {
    type: DELETE_FROM_CART,
    payload: productId,
  };
};

export const clear_cart = (): CartActionTypes => {
  return {
    type: CLEAR_CART,
  };
};

export const update_quantity = (
  productId: string,
  quantity: number
): CartActionTypes => {
  return {
    type: UPDATE_QUANTITY,
    payload: { productId, quantity },
  };
};
