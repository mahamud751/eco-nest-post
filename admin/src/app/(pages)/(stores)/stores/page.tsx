"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  Radio,
  FormControlLabel,
  Grid,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Box,
  SelectChangeEvent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import UseFetch from "@/services/hooks/UseRequest";
import { Category, Product } from "@/services/types";
import ProductCard from "@/components/organisms/ProductCard";

const CategoryDetails = () => {
  const { data: response } = UseFetch<{ data: Category[] }>("categories");

  const [categoryData, setCategoryData] = useState<{
    data: Product[];
    total: number;
    perPage: number;
    totalPages: number;
  } | null>(null);
  const [sort, setSort] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    color: "",
    size: "",
    categoryId: "",
  });
  const [openFilters, setOpenFilters] = useState(false);

  const fetchCategory = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.color) {
        queryParams.append("color", filters.color);
      }

      if (filters.size) {
        queryParams.append("size", filters.size);
      }

      if (filters.categoryId) {
        queryParams.append("categoryId", filters.categoryId);
      }

      const response = await axios.get<{
        data: Product[];
        total: number;
        perPage: number;
        totalPages: number;
      }>(
        `${
          process.env.NEXT_PUBLIC_BASEURL
        }/v1/products?page=${page}&perPage=${sort}&${queryParams.toString()}`
      );
      setCategoryData(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setCategoryData(null);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [filters, sort, page]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSortChange = (event: SelectChangeEvent<number>) => {
    setSort(event.target.value as number);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "All") {
      setFilters({ ...filters, color: "" });
    } else {
      setFilters({ ...filters, color: value });
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "All") {
      setFilters({ ...filters, size: "" });
    } else {
      setFilters({ ...filters, size: value });
    }
  };

  const filteredProducts =
    categoryData?.data.filter((product) => {
      const matchesColor = filters.color
        ? product.colors.includes(filters.color)
        : true;
      const matchesSize = filters.size
        ? product.sizes.includes(filters.size)
        : true;
      return matchesColor && matchesSize;
    }) || [];

  const handleOpenFilters = () => {
    setOpenFilters(true);
  };

  const handleCloseFilters = () => {
    setOpenFilters(false);
  };
  const handleCategoryChange = (categoryId: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      categoryId,
    }));
  };

  return (
    <Box className="container mx-auto py-10 p-2 md:p-0">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3 py-12 flex justify-center">
          <Button
            variant="outlined"
            onClick={handleOpenFilters}
            className="md:hidden mb-4"
          >
            Open Filters
          </Button>

          <div className="fixed md:w-1/6 top-24 max-h-[85vh] overflow-y-auto scrollbar-custom hidden md:block w-full">
            <Card className="border shadow-md">
              <CardContent>
                <div className="flex justify-center">
                  <Button
                    variant="contained"
                    onClick={() => handleCategoryChange("")}
                    className="py-2 px-8 cursor-pointer bg-slate-800 hover:bg-slate-400"
                  >
                    <Typography variant="body2">Select All</Typography>
                  </Button>
                </div>
                {response?.data &&
                  response.data.map((category) => (
                    <div
                      key={category?.id}
                      onClick={() => handleCategoryChange(category?.id)}
                      style={{
                        cursor: "pointer",
                      }}
                      className="mt-6"
                    >
                      <div className="flex items-center space-x-4">
                        <Image
                          src={category.photos[0]?.src || "/default-image.jpg"}
                          alt={category.photos[0]?.title || category.name}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        <Typography variant="body2">{category.name}</Typography>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card className="mt-5 border shadow-md">
              <CardContent>
                <h2 className="text-lg font-bold">Filters</h2>

                <h2 className="text-lg font-bold mt-4">Color</h2>
                <div className="flex items-center space-x-4">
                  <FormControlLabel
                    control={
                      <Radio
                        value="All"
                        checked={filters.color === ""}
                        onChange={handleColorChange}
                      />
                    }
                    label="All"
                  />
                </div>
                {["Red", "Blue", "Black", "White"].map((color) => (
                  <div className="flex items-center space-x-4" key={color}>
                    <FormControlLabel
                      control={
                        <Radio
                          value={color}
                          checked={filters.color === color}
                          onChange={handleColorChange}
                        />
                      }
                      label={color}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="mt-5 border shadow-md">
              <CardContent>
                <h2 className="text-lg font-bold mt-4">Size</h2>
                <div className="flex items-center space-x-4">
                  <FormControlLabel
                    control={
                      <Radio
                        value="All"
                        checked={filters.size === ""}
                        onChange={handleSizeChange}
                      />
                    }
                    label="All"
                  />
                </div>
                {["Small", "Medium", "Large", "XL"].map((size) => (
                  <div className="flex items-center space-x-4" key={size}>
                    <FormControlLabel
                      control={
                        <Radio
                          value={size}
                          checked={filters.size === size}
                          onChange={handleSizeChange}
                        />
                      }
                      label={size}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 grid grid-cols-1 gap-6">
          <div>
            <div className="flex justify-between mb-4 mt-5">
              <FormControl variant="outlined" className="w-1/3 hidden md:block">
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sort}
                  onChange={handleSortChange}
                  label="Sort By"
                >
                  <MenuItem value={10}>Show 10 per page</MenuItem>
                  <MenuItem value={25}>Show 25 per page</MenuItem>
                  <MenuItem value={50}>Show 50 per page</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div>
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid item xs={12} md={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            </div>

            <div className="flex justify-center mt-10 md:block mb-12">
              <Pagination
                count={categoryData?.totalPages || 0}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
                className="pagination"
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "rgba(0, 0, 0, 0.54)",
                    color: "white",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#888888",
                    },
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#088178",
                    color: "white",
                    border: "none",
                    "&:hover": {
                      backgroundColor: "#088178",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={openFilters}
        onClose={handleCloseFilters}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <DialogTitle sx={{ backgroundColor: "#4CAF50", color: "white" }}>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "8px" }}></span>
            Filters
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="h6">Color</Typography>
          <FormControlLabel
            control={
              <Radio
                value="All"
                checked={filters.color === ""}
                onChange={handleColorChange}
              />
            }
            label="All"
          />
          {["Red", "Blue", "Black", "White"].map((color) => (
            <FormControlLabel
              control={
                <Radio
                  value={color}
                  checked={filters.color === color}
                  onChange={handleColorChange}
                />
              }
              label={color}
              key={color}
            />
          ))}
          <Typography variant="h6" className="mt-4">
            Size
          </Typography>
          <FormControlLabel
            control={
              <Radio
                value="All"
                checked={filters.size === ""}
                onChange={handleSizeChange}
              />
            }
            label="All"
          />
          {["Small", "Medium", "Large", "XL"].map((size) => (
            <FormControlLabel
              control={
                <Radio
                  value={size}
                  checked={filters.size === size}
                  onChange={handleSizeChange}
                />
              }
              label={size}
              key={size}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFilters} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoryDetails;
