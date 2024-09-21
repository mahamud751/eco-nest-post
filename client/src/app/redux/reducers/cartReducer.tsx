import { ADD_ITEM, DELETE_CART, REMOVE_ITEM, CLEAR_CART } from "../types";
import { CartState, CartItem } from "../types"; // Adjust this import path if necessary

// Initial state
const initialState: CartState = {
  cart: [],
};

export default function cartReducer(
  state = initialState,
  action: { type: string; payload: any }
): CartState {
  switch (action.type) {
    case ADD_ITEM:
      const findItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (findItemIndex >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[findItemIndex] = {
          ...updatedCart[findItemIndex],
          qtn: updatedCart[findItemIndex].qtn + 1,
        };

        return {
          ...state,
          cart: updatedCart,
        };
      } else {
        const newItem: CartItem = { ...action.payload, qtn: 1 };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }

    case REMOVE_ITEM:
      const itemIndexToRemove = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndexToRemove >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[itemIndexToRemove] = {
          ...updatedCart[itemIndexToRemove],
          qtn: Math.max(0, updatedCart[itemIndexToRemove].qtn - 1),
        };

        if (updatedCart[itemIndexToRemove].qtn === 0) {
          updatedCart.splice(itemIndexToRemove, 1);
        }

        return {
          ...state,
          cart: updatedCart,
        };
      }
      return state;

    case DELETE_CART:
      const updatedCartAfterDelete = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedCartAfterDelete,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
}
