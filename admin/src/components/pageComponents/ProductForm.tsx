import React, { useEffect, useState } from "react";
import {
  Category,
  Subcategory,
  ProductFormProps,
  Variant,
} from "@/services/types";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Button,
  IconButton,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import useFetch from "@/services/hooks/UseRequest";
import CategorySelect from "../molecules/CategorySelect";
import SubCategorySelect from "../molecules/SubCategorySelect";

const ProductForm: React.FC<ProductFormProps> = ({
  subCategory,
  selectedCategory,
  setSelectedCategory,
  selectedSubCategory,
  setSelectedSubCategory,
  sizes,
  setSizes,
  colors,
  setColors,
  feature,
  setFeature,
  flashsale,
  setFlashsale,
  latest,
  setLatest,
  discountType,
  setDiscountType,
}) => {
  const { data: variantData } = useFetch<{ data: Variant[] }>("variants");
  console.log(variantData);

  const {
    data: responseData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useFetch<{ data: Category[] }>("categories");
  const {
    data: responseSubCategoryData,
    loading: subcategoriesLoading,
    error: subcategoriesError,
  } = useFetch<{ data: Subcategory[] }>("subCategories");

  const categories = responseData?.data || [];
  const subcategories = responseSubCategoryData?.data || [];
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const [, setCategoryName] = useState("");
  const [, setSubCategoryName] = useState("");

  useEffect(() => {
    if (selectedCategory && categories) {
      const selectedCategoryObj = categories.find(
        (category) => category.id === selectedCategory
      );
      setCategoryName(selectedCategoryObj?.name || "");
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    if (selectedSubCategory && subcategories) {
      const selectedSubCategoryObj = subcategories.find(
        (subcategory) => subcategory.id === selectedSubCategory
      );
      setSubCategoryName(selectedSubCategoryObj?.name || "");
    }
  }, [selectedSubCategory, subcategories]);

  if (categoriesLoading || subcategoriesLoading) return <p>Loading...</p>;
  if (categoriesError || subcategoriesError)
    return (
      <p>Error: {categoriesError?.message || subcategoriesError?.message}</p>
    );

  const filteredSubcategories = subcategories?.filter(
    (subcategory) => subcategory?.category?.id === selectedCategory
  );

  const handleCategoryChange = (event: { target: { value: any } }) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
    const selectedCategoryObj = categories?.find(
      (category) => category.id === selectedCategoryId
    );
    setCategoryName(selectedCategoryObj?.name || "");
  };

  const handleChangeInput = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const list = [...sizes];
    list[index] = value;
    setSizes(list);
  };

  const handleAddInput = () => {
    setSizes([...sizes, ""]);
  };

  const handleRemoveInput = (index: number) => {
    const list = [...sizes];
    list.splice(index, 1);
    setSizes(list);
  };

  const handleChangeInputColor = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    const list = [...colors];
    list[index] = value;
    setColors(list);
  };

  const handleAddInputColor = () => {
    setColors([...colors, ""]);
  };

  const handleRemoveInputColor = (index: number) => {
    const list = [...colors];
    list.splice(index, 1);
    setColors(list);
  };

  const handleSubCategoryChange = (event: { target: { value: any } }) => {
    const selectedSubCategoryId = event.target.value;
    setSelectedSubCategory(selectedSubCategoryId);
    const selectedSubCategoryObj = filteredSubcategories?.find(
      (subcategory) => subcategory.id === selectedSubCategoryId
    );
    setSubCategoryName(selectedSubCategoryObj?.name || "");
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setSizes((prevSizes) => [...prevSizes, value]);
    } else {
      setSizes((prevSizes) => prevSizes.filter((size) => size !== value));
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (event.target.checked) {
      setColors((prevColors) => [...prevColors, value]);
    } else {
      setColors((prevColors) => prevColors.filter((color) => color !== value));
    }
  };

  return (
    <>
      <Grid item xs={12} md={8}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          fullWidth
          defaultValue={subCategory?.name || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <CategorySelect
          categories={categories || []}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <SubCategorySelect
          subcategories={filteredSubcategories || []}
          selectedSubCategory={selectedSubCategory}
          onSubCategoryChange={handleSubCategoryChange}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Full Description"
          variant="outlined"
          name="fulldesc"
          fullWidth
          defaultValue={subCategory?.fulldesc || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          id="outlined-basic"
          label="Short Description"
          variant="outlined"
          name="desc"
          fullWidth
          defaultValue={subCategory?.desc || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset">
          <Box component="legend">Sizes</Box>
          {variantData?.data
            ?.find((variant) => variant.name === "size")
            ?.options.map((size: string, index: number) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                }
                label={size}
              />
            ))}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl component="fieldset">
          <Box component="legend">Colors</Box>
          {variantData?.data
            ?.find((variant) => variant.name === "Color")
            ?.options.map((color: string, index: number) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    value={color}
                    checked={colors.includes(color)}
                    onChange={handleColorChange}
                  />
                }
                label={color}
              />
            ))}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="feature-label">Feature</InputLabel>
          <Select
            labelId="feature-label"
            id="feature-select"
            label="Select Feature"
            name="feature"
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="flashsale-label">Flash Sale</InputLabel>
          <Select
            labelId="flashsale-label"
            id="flashsale-select"
            label="Select Flash Sale"
            name="flashsale"
            value={flashsale}
            onChange={(e) => setFlashsale(e.target.value)}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="latest-label">Latest</InputLabel>
          <Select
            labelId="latest-label"
            id="latest-select"
            label="Select Latest"
            name="latest"
            value={latest}
            onChange={(e) => setLatest(e.target.value)}
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <FormControl fullWidth>
          <InputLabel id="discount-type-label">Discount Type</InputLabel>
          <Select
            labelId="discount-type-label"
            id="discount-type-select"
            label="Select Discount Type"
            name="discountType"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value)}
          >
            <MenuItem value="winter">Winter</MenuItem>
            <MenuItem value="summer">Summer</MenuItem>
            <MenuItem value="regular">Regular</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="price"
          label="Price"
          variant="outlined"
          name="price"
          fullWidth
          defaultValue={subCategory?.price || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="b2bPrice"
          label="B2B Price"
          variant="outlined"
          name="b2bPrice"
          fullWidth
          defaultValue={subCategory?.b2bPrice || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField
          id="discount-price"
          label="Discount Price"
          variant="outlined"
          name="discountPrice"
          fullWidth
          defaultValue={subCategory?.discountPrice || ""}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

export default ProductForm;
