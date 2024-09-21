// types item add, item remove, cart remove

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const ADD_ITEM = "ADD_ITEM";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const DELETE_CART = "DELETE_CART";
export const CLEAR_CART = "CLEAR_CART";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qtn: number;
}

// Define the state interface for cart
export interface CartState {
  cart: CartItem[];
}

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SELECTED_PRODUCT = "SELECTED_PRODUCT";
export const REMOVE_SELECTED_PRODUCT = "REMOVE_SELECTED_PRODUCT";

export const SET_CATEGORY = "SET_CATEGORY";
export const SELECTED_CATEGORY = "SELECTED_CATEGORY";
export const REMOVE_SELECTED_CATEGORY = "REMOVE_SELECTED_CATEGORY";
