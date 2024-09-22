"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Pagination,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
} from "@mui/material";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const products: Product[] = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  name: `Product ${index + 1}`,
  description: "This is a product description.",
  price: Math.floor(Math.random() * 100) + 1,
  rating: Math.floor(Math.random() * 5) + 1,
  image: "/path/to/image.jpg",
}));

const CategoryPage: React.FC = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [filters, setFilters] = useState({});

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSort(event.target.value as number);
  };

  const handleViewChange = (viewType: "grid" | "list") => {
    setView(viewType);
  };

  return (
    <div className="p-6 flex">
      {/* Left Side Filter Options */}
      <div className="w-1/4 mr-4">
        <Card>
          <CardContent>
            <h2 className="text-lg font-bold">Filters</h2>
            <FormControlLabel control={<Checkbox />} label="Category 1" />
            <FormControlLabel control={<Checkbox />} label="Category 2" />
            <h2 className="text-lg font-bold mt-4">Price Range</h2>
            <TextField label="Min Price" fullWidth className="mb-2" />
            <TextField label="Max Price" fullWidth />
            <h2 className="text-lg font-bold mt-4">Color</h2>
            <FormControlLabel control={<Checkbox />} label="Red" />
            <FormControlLabel control={<Checkbox />} label="Blue" />
            <h2 className="text-lg font-bold mt-4">Size</h2>
            <FormControlLabel control={<Checkbox />} label="Small" />
            <FormControlLabel control={<Checkbox />} label="Large" />
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
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <div>
            <Button
              variant={view === "grid" ? "contained" : "outlined"}
              onClick={() => handleViewChange("grid")}
              className="mr-2"
            >
              Grid View
            </Button>
            <Button
              variant={view === "list" ? "contained" : "outlined"}
              onClick={() => handleViewChange("list")}
            >
              List View
            </Button>
          </div>
        </div>

        {/* Product List */}
        <Grid container spacing={2}>
          {products.slice(0, sort).map((product) => (
            <Grid item xs={view === "grid" ? 3 : 12} key={product.id}>
              {view === "grid" ? (
                <Card>
                  <CardContent>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover"
                    />
                    <h3 className="font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Price: ${product.price}</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-1/4 h-24 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold">{product.name}</h3>
                    <p>{product.description}</p>
                    <p>Rating: {product.rating}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                </Card>
              )}
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          <Pagination
            count={Math.ceil(products.length / sort)}
            page={page}
            onChange={handleChangePage}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
