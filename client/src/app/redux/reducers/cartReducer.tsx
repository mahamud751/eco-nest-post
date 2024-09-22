import {
  CartItem,
  CartActionTypes,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  DELETE_FROM_CART,
  CLEAR_CART,
  UPDATE_QUANTITY,
} from "../types";

interface CartState {
  cartItems: CartItem[];
}

// Load initial state from localStorage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }
  return [];
};

const initialState: CartState = {
  cartItems: loadCartFromLocalStorage(),
};
const cartReducer = (
  state = initialState,
  action: CartActionTypes
): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.cartItems.find(
        (item) => item.productId === action.payload.productId
      );
      const updatedCartItems = existingItem
        ? state.cartItems.map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cartItems, { ...action.payload, quantity: 1 }];

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case UPDATE_QUANTITY: {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (item.productId === action.payload.productId) {
            return { ...item, quantity: action.payload.quantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case REMOVE_FROM_CART: {
      const updatedCartItems = state.cartItems
        .map((item) => {
          if (item.productId === action.payload) {
            const newQuantity = item.quantity - 1;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item) => item !== null);

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case DELETE_FROM_CART: {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      }

      return {
        ...state,
        cartItems: updatedCartItems,
      };
    }

    case CLEAR_CART: {
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }

      return {
        ...state,
        cartItems: [],
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
