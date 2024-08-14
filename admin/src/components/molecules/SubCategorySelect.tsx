import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Subcategory } from "@/services/types";

interface SubCategorySelectProps {
  subcategories: Subcategory[];
  selectedSubCategory: string;
  onSubCategoryChange: (event: SelectChangeEvent<string>) => void;
}

const SubCategorySelect: React.FC<SubCategorySelectProps> = ({
  subcategories,
  selectedSubCategory,
  onSubCategoryChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="subcategory-select-label">Sub Category</InputLabel>
      <Select
        labelId="subcategory-select-label"
        id="subcategory-select"
        value={selectedSubCategory}
        label="Sub Category"
        onChange={onSubCategoryChange}
        name="subcategoryId"
      >
        {subcategories?.map((subcategory) => (
          <MenuItem key={subcategory.id} value={subcategory.id}>
            {subcategory.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SubCategorySelect;
