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
  Typography,
} from "@mui/material";
import { Category } from "@/services/types";
import ProductCard from "@/components/organisms/Product/ProductCard";
import Image from "next/image";
import UseFetch from "@/services/hooks/useFetch";
import Link from "next/link";

interface CategoryDetailsProps {
  params: {
    id: string;
  };
}

const CategoryDetails = ({ params: { id } }: CategoryDetailsProps) => {
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");
  const [category, setCategory] = useState<Category | null>(null);
  const [sort, setSort] = useState<number>(5);
  const [page, setPage] = useState<number>(1);

  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    colors: [] as string[],
    sizes: [] as string[],
  });

  const fetchCategory = async () => {
    try {
      const response = await axios.get<Category>(
        `https://api.korbojoy.shop/v1/categories/${id}`
      );
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setCategory(null);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const indexOfLastProduct = page * sort;
  const indexOfFirstProduct = indexOfLastProduct - sort;

  const filteredProducts =
    category?.products.filter((product) => {
      const isWithinPriceRange =
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max;

      const matchesColor = filters.colors.length
        ? filters.colors.includes(product.color)
        : true;

      const matchesSize = filters.sizes.length
        ? filters.sizes.includes(product.size)
        : true;

      return isWithinPriceRange && matchesColor && matchesSize;
    }) || [];

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

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

  return (
    <div className="p-6 flex">
      <div className="w-1/4 mr-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold">Filters</h2>
            <div>
              {categories?.map((category) => (
                <Link href={`${category.id}`} key={category.id}>
                  <div className="flex items-center space-x-4 mt-6">
                    <Image
                      src={category.photos[0]?.src || "/default-image.jpg"}
                      alt={category.photos[0]?.title || category.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <Typography variant="body2">{category.name}</Typography>
                  </div>
                </Link>
              ))}
            </div>

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
            <FormControlLabel
              control={
                <Checkbox
                  name="Red"
                  checked={filters.colors.includes("Red")}
                  onChange={handleColorChange}
                />
              }
              label="Red"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Blue"
                  checked={filters.colors.includes("Blue")}
                  onChange={handleColorChange}
                />
              }
              label="Blue"
            />

            <h2 className="text-lg font-bold mt-4">Size</h2>
            <FormControlLabel
              control={
                <Checkbox
                  name="Small"
                  checked={filters.sizes.includes("Small")}
                  onChange={handleSizeChange}
                />
              }
              label="Small"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="Large"
                  checked={filters.sizes.includes("Large")}
                  onChange={handleSizeChange}
                />
              }
              label="Large"
            />
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
        </div>

        <Grid container spacing={2}>
          {currentProducts.map((product) => (
            <Grid item xs={3} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>

        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil((filteredProducts.length || 0) / sort)}
            page={page}
            onChange={handleChangePage}
            variant="outlined"
            shape="rounded"
            className="pagination"
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#088178",
                color: "white",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
