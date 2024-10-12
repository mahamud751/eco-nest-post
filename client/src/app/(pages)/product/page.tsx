"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
} from "@mui/material";
import ProductCard from "@/components/organisms/Product/ProductCard";
import { Category, Product } from "@/services/types/types";
import UseFetch from "@/services/hooks/useFetch";
import { useSearchParams } from "next/navigation";

interface CategoryDetailsProps {
  params: {
    id: string;
  };
}

const CategoryDetails = ({ params: { id } }: CategoryDetailsProps) => {
  const { data: categories } = UseFetch<Category[]>("categories");
  const params = useSearchParams();
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
  });

  const fetchCategory = async () => {
    try {
      const queryParams = new URLSearchParams();

      if (filters.color) {
        queryParams.append("color", filters.color);
      }

      if (filters.size) {
        queryParams.append("size", filters.size);
      }

      const response = await axios.get<{
        data: Product[];
        total: number;
        perPage: number;
        totalPages: number;
      }>(
        `${
          process.env.NEXT_PUBLIC_BASEURL
        }/v1/products?page=${page}&perPage=${sort}&name=${params.get(
          "search"
        )}&${queryParams.toString()}`
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

  return (
    <Box className="container mx-auto py-10">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-3 grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="max-h-[80vh] overflow-y-auto scrollbar-custom">
            <Card className="border">
              <CardContent>
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
              </CardContent>
            </Card>

            <Card className="mt-5 border">
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

            {/* Size Filter */}
            <Card className="mt-5 border">
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

        {/* Right Side Product List */}
        <div className="col-span-12 md:col-span-9 grid grid-cols-1 gap-6">
          <div>
            <div className="flex justify-between mb-4">
              <FormControl variant="outlined" className="w-1/3">
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

            {/* Product Grid */}
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>

            <div className="flex justify-center mt-4">
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
    </Box>
  );
};

export default CategoryDetails;
