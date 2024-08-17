import React, { useEffect, useState } from "react";
import { Category, Subcategory } from "@/services/types";
import { Grid, TextField } from "@mui/material";

import useFetch from "@/services/hooks/UseRequest";
import CategorySelect from "../molecules/CategorySelect";
import LoadingError from "../atoms/LoadingError";

interface SubCategoryFormProps {
  subCategory: Subcategory | null;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
}

const SubCategoryForm: React.FC<SubCategoryFormProps> = ({
  subCategory,
  selectedCategory,
  setSelectedCategory,
}) => {
  const {
    data: categories,
    loading,
    error,
  } = useFetch<Category[]>("categories");
  const [, setCategoryName] = useState("");

  useEffect(() => {
    if (selectedCategory && categories) {
      const selectedCategoryObj = categories.find(
        (category) => category.id === selectedCategory
      );
      setCategoryName(selectedCategoryObj?.name || "");
    }
  }, [selectedCategory, categories]);

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    const selectedCategoryObj = categories?.find(
      (category) => category.id === selectedCategoryId
    );
    setCategoryName(selectedCategoryObj?.name || "");
  };

  return (
    <LoadingError loading={loading} error={error}>
      <Grid item xs={12} md={8}>
        <TextField
          id="outlined-basic"
          label="Sub Category Name"
          name="name"
          fullWidth
          defaultValue={subCategory?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <CategorySelect
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Grid>
    </LoadingError>
  );
};

export default SubCategoryForm;
