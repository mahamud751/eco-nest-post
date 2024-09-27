"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";
import ProductCard from "@/components/organisms/Product/ProductCard";
import { Category, Product } from "@/services/types";

interface CategoryDetailsProps {
  params: {
    id: string;
  };
}

const CategoryDetails = ({ params: { id } }: CategoryDetailsProps) => {
  const [categoryData, setCategoryData] = useState<{
    data: Category[];
    total: number;
    perPage: number;
    totalPages: number;
  } | null>(null);
  const [sort, setSort] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    colors: [] as string[],
    sizes: [] as string[],
  });

  const fetchCategory = async () => {
    try {
      const queryParams = new URLSearchParams();

      // Add colors to the query params if any colors are selected
      if (filters.colors.length > 0) {
        filters.colors.forEach((color) => {
          queryParams.append("colors[]", color);
        });
      }

      // Add sizes to the query params if any sizes are selected
      if (filters.sizes.length > 0) {
        filters.sizes.forEach((size) => {
          queryParams.append("sizes[]", size);
        });
      }

      // Fetch the category products
      const response = await axios.get<{
        data: Category[];
        total: number;
        perPage: number;
        totalPages: number;
      }>(
        `https://api.korbojoy.shop/v1/categories/${id}/products?page=${page}&perPage=${sort}&${queryParams.toString()}`
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCategoryData(null);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id, filters, sort, page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as number);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [event.target.name]: Number(event.target.value),
      },
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newColors = checked
      ? [...filters.colors, name]
      : filters.colors.filter((color) => color !== name);

    setFilters({ ...filters, colors: newColors });
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name } = event.target;
    const newSizes = checked
      ? [...filters.sizes, name]
      : filters.sizes.filter((size) => size !== name);

    setFilters({ ...filters, sizes: newSizes });
  };

  // Filter products based on price, colors, and sizes
  const filteredProducts =
    categoryData?.data.filter((product) => {
      const isWithinPriceRange =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      const matchesColor = filters.colors.length
        ? filters.colors.includes(product.colors[0]) // Assuming colors[0] is the primary color
        : true;

      const matchesSize = filters.sizes.length
        ? filters.sizes.includes(product.sizes[0]) // Assuming sizes[0] is the primary size
        : true;

      return isWithinPriceRange && matchesColor && matchesSize;
    }) || [];
  console.log(categoryData);

  return (
    <div className="p-6 flex">
      <div className="w-1/4 mr-4">
        {/* Filter Sidebar */}
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold">Filters</h2>

            <h2 className="text-lg font-bold mt-4">Price Range</h2>
            <TextField
              label="Min Price"
              name="min"
              value={filters.priceRange.min}
              onChange={handlePriceChange}
              fullWidth
              className="mb-2"
            />
            <TextField
              label="Max Price"
              name="max"
              value={filters.priceRange.max}
              onChange={handlePriceChange}
              fullWidth
            />

            <h2 className="text-lg font-bold mt-4">Color</h2>
            {["Red", "Blue", "Black", "White"].map((color) => (
              <FormControlLabel
                key={color}
                control={
                  <Checkbox
                    name={color}
                    checked={filters.colors.includes(color)}
                    onChange={handleColorChange}
                  />
                }
                label={color}
              />
            ))}

            <h2 className="text-lg font-bold mt-4">Size</h2>
            {["Small", "Medium", "Large", "XL"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    name={size}
                    checked={filters.sizes.includes(size)}
                    onChange={handleSizeChange}
                  />
                }
                label={size}
              />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Right Side Product List */}
      <div className="w-3/4">
        {/* Sorting Options */}
        <div className="flex justify-between mb-4">
          <FormControl variant="outlined" className="w-1/3">
            <InputLabel>Sort By</InputLabel>
            <Select value={sort} onChange={handleSortChange} label="Sort By">
              <MenuItem value={10}>Show 10 per page</MenuItem>
              <MenuItem value={25}>Show 25 per page</MenuItem>
              <MenuItem value={50}>Show 50 per page</MenuItem>
            </Select>
          </FormControl>
          <Pagination
            count={categoryData?.totalPages || 0}
            page={page}
            onChange={handleChangePage}
          />
        </div>

        {/* Product Grid */}
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default CategoryDetails;
