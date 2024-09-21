import {
  SET_PRODUCTS,
  SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
} from "../types";

// Define the state types
interface Product {
  id: string;
  // Add other product properties as needed
}

interface ProductsState {
  products: Product[];
}

interface SelectedProductState {
  [key: string]: any; // Adjust this type based on your product structure
}

// Initial states
const initialState: ProductsState = {
  products: [],
};

export const productsReducer = (
  state = initialState,
  { type, payload }: { type: string; payload: Product[] }
): ProductsState => {
  switch (type) {
    case SET_PRODUCTS:
      return { ...state, products: payload };
    default:
      return state;
  }
};

export const selectedProductsReducer = (
  state: SelectedProductState = {},
  { type, payload }: { type: string; payload: Product }
): SelectedProductState => {
  switch (type) {
    case SELECTED_PRODUCT:
      return { ...state, ...payload };
    case REMOVE_SELECTED_PRODUCT:
      return {};
    default:
      return state;
  }
};
