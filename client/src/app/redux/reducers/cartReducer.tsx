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
        (item) =>
          item.product.id === action.payload.product.id &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      const updatedCartItems = existingItem
        ? state.cartItems.map((item) =>
            item.product.id === action.payload.product.id &&
            item.color === action.payload.color &&
            item.size === action.payload.size
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        : [...state.cartItems, { ...action.payload }];

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
          if (
            item.product.id === action.payload.productId && // This should work
            item.color === action.payload.color && // Ensure item has a color property
            item.size === action.payload.size
          ) {
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
      const { productId, size, color } = action.payload;

      const updatedCartItems = state.cartItems
        .map((item) => {
          if (
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          ) {
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
      const { productId, size, color } = action.payload;

      const updatedCartItems = state.cartItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.color === color
          )
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
