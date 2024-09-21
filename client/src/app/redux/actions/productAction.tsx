import {
  SET_PRODUCTS,
  SELECTED_PRODUCT,
  REMOVE_SELECTED_PRODUCT,
} from "../types";

// Define the type for product (adjust based on your actual product structure)
interface Product {
  id: string;
  name: string;
  price: number;
  // Add other fields as necessary
}

// Define action creators with proper TypeScript types

// Set products action
export const setProducts = (products: Product[]) => {
  return {
    type: SET_PRODUCTS,
    payload: products,
  };
};

// Select product action
export const selectedProduct = (product: Product) => {
  return {
    type: SELECTED_PRODUCT,
    payload: product,
  };
};

// Remove selected product action
export const removeSelectedProduct = () => {
  return {
    type: REMOVE_SELECTED_PRODUCT,
  };
};
