import React from "react";
import { Category } from "@/services/types";
import { Grid, TextField } from "@mui/material";

interface CategoryFormProps {
  category: Category | null;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
  return (
    <Grid item xs={12} md={8}>
      <TextField
        id="category-name"
        label="Category Name"
        variant="outlined"
        name="name"
        fullWidth
        defaultValue={category?.name || ""}
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
  );
};

export default CategoryForm;
