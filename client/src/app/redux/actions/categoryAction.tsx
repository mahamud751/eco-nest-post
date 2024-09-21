import {
  SET_CATEGORY,
  SELECTED_CATEGORY,
  REMOVE_SELECTED_CATEGORY,
} from "../types";

// Define the type for category (adjust based on your actual category structure)
interface Category {
  id: string;
  name: string;
}

// Define action creators with proper TypeScript types

// Set category action
export const setCategory = (category: Category) => {
  return {
    type: SET_CATEGORY,
    payload: category,
  };
};

// Select category action
export const selectedCategory = (category: Category) => {
  return {
    type: SELECTED_CATEGORY,
    payload: category,
  };
};

// Remove selected category action
export const removeSelectedCategory = () => {
  return {
    type: REMOVE_SELECTED_CATEGORY,
  };
};
