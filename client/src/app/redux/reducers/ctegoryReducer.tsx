import {
  SET_CATEGORY,
  SELECTED_CATEGORY,
  REMOVE_SELECTED_CATEGORY,
} from "../types";

// Define the shape of the category item
interface Category {
  id: string;
  name: string;
  // Add other fields as needed
}

// Define the state interface for categoryReducer
interface CategoryState {
  category: Category[];
}

// Define the state interface for selectedCategoryReducer
interface SelectedCategoryState {
  [key: string]: any; // This could be refined based on the shape of the selected category
}

// Define the action interface
interface CategoryAction {
  type: string;
  payload?: any;
}

// Initial state for categoryReducer
const initialCategoryState: CategoryState = {
  category: [],
};

// Initial state for selectedCategoryReducer
const initialSelectedCategoryState: SelectedCategoryState = {};

// Category reducer
export const categoryReducer = (
  state = initialCategoryState,
  { type, payload }: CategoryAction
): CategoryState => {
  switch (type) {
    case SET_CATEGORY:
      return { ...state, category: payload };
    default:
      return state;
  }
};

// Selected category reducer
export const selectedCategoryReducer = (
  state = initialSelectedCategoryState,
  { type, payload }: CategoryAction
): SelectedCategoryState => {
  switch (type) {
    case SELECTED_CATEGORY:
      return { ...state, ...payload };
    case REMOVE_SELECTED_CATEGORY:
      return {};
    default:
      return state;
  }
};
