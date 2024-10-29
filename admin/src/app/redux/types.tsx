import { Product } from "@/services/types";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const UPDATE_QUANTITY = "UPDATE_QUANTITY";

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface AddToCartAction {
  type: typeof ADD_TO_CART;
  payload: CartItem;
}

interface RemoveFromCartAction {
  type: typeof REMOVE_FROM_CART;
  payload: {
    productId: string;
    size: string;
    color: string;
  };
}

interface DeleteFromCartAction {
  type: typeof DELETE_FROM_CART;
  payload: {
    productId: string;
    size: string;
    color: string;
  };
}

interface ClearCartAction {
  type: typeof CLEAR_CART;
}

interface UpdateQuantityAction {
  type: typeof UPDATE_QUANTITY;
  payload: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  };
}

export type CartActionTypes =
  | AddToCartAction
  | RemoveFromCartAction
  | DeleteFromCartAction
  | ClearCartAction
  | UpdateQuantityAction;
