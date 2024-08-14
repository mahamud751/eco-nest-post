"use client";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Category, Subcategory } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import CategorySelect from "@/components/molecules/CategorySelect";

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/v1/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/v1/subCategories"
        );
        setSubcategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const selectedCategoryId = event.target.value;
    setSelectedCategory(selectedCategoryId);
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

  const filteredSubcategories = subcategories?.filter(
    (subcategory) => subcategory?.category?.id === selectedCategory
  );

  const additionalFields = (
    <>
      <Grid item xs={6}>
        <CategorySelect
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Sub Category"
            name="subcategoryId"
          >
            {filteredSubcategories.map((subcategory) => (
              <MenuItem key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Full Description"
          variant="outlined"
          name="fulldesc"
          fullWidth
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-basic"
          label="Short Description"
          variant="outlined"
          name="desc"
          fullWidth
        />
      </Grid>

      <Grid item xs={6}>
        {sizes.map((size, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            className="my-2 p-2 border border-gray-300 rounded-md"
          >
            <TextField
              variant="outlined"
              name="sizes"
              value={size}
              onChange={(e) => handleChangeInput(index, e)}
              label="Size"
              fullWidth
              className="mr-2"
            />
            {sizes.length > 1 && (
              <IconButton
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleRemoveInput(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            className="mt-2 bg-blue-500 hover:bg-blue-700"
            startIcon={<AddCircleIcon />}
            onClick={handleAddInput}
          >
            Add Size
          </Button>
        </Box>
      </Grid>

      <Grid item xs={6}>
        {colors.map((color, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            className="my-2 p-2 border border-gray-300 rounded-md"
          >
            <TextField
              variant="outlined"
              name="colors"
              value={color}
              onChange={(e) => handleChangeInputColor(index, e)}
              label="Color"
              fullWidth
              className="mr-2"
            />
            {colors.length > 1 && (
              <IconButton
                className="bg-red-500 hover:bg-red-700 text-white"
                onClick={() => handleRemoveInputColor(index)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ))}
        <Box display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            className="mt-2 bg-blue-500 hover:bg-blue-700"
            startIcon={<AddCircleIcon />}
            onClick={handleAddInputColor}
          >
            Add Color
          </Button>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Feature</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Feature"
            name="feature"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Flash Sale</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Flash Sale"
            name="flashsale"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Latest</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Latest"
            name="latest"
          >
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"> Discount Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Select Discount Type"
            name="discountType"
          >
            <MenuItem value="Percentage">Percentage</MenuItem>
            <MenuItem value="Price">Price</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Discount Price"
          variant="outlined"
          name="discountPrice"
          fullWidth
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          name="price"
          fullWidth
        />
      </Grid>
    </>
  );

  const resetFields = () => {
    setCategories([]);
    setSelectedCategory("");
    setSizes([]);
    setColors([]);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" className="mb-4">
        Add Product
      </Typography>
      <AddForm
        endpoint="http://localhost:8080/v1/products"
        additionalFields={additionalFields}
        additionalData={{
          sizes: JSON.stringify(sizes),
          colors: JSON.stringify(colors),
        }}
        buttonText="Add Product"
        resetFields={resetFields}
        isMultiple={true}
        id={""}
        photosData={""}
      />
    </Box>
  );
};

export default AddProduct;
