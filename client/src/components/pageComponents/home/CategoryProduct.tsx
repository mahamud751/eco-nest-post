"use client";
import { useState } from "react";
import { Tabs, Tab, Box, Grid } from "@mui/material";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";

interface Category {
  id: string;
  name: string;
  products: Product[];
}

interface Product {
  _id: string;
  name: string;
  price: string;
  fulldesc: string;
  photos: { src: string }[];
}

const CategoryProduct = () => {
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error || !categories || categories.length === 0) {
    return <div>Failed to load categories or no categories available</div>;
  }

  const selectedCategory = categories[selectedCategoryIndex] || null;

  return (
    <Box className="container mx-auto py-10">
      <div className="bg-[#f2f9f4] p-12 shadow-lg rounded-lg mb-10">
        <Tabs
          value={selectedCategoryIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-end",
          }}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
        </Tabs>

        <Box sx={{ marginLeft: 3, marginTop: 5 }}>
          {selectedCategory ? (
            <Grid container spacing={2}>
              {selectedCategory.products.length > 0 ? (
                selectedCategory.products.map((product) => (
                  <Grid item xs={12} sm={6} md={3} key={product._id}>
                    <ProductCard
                      key={product._id}
                      imageUrl1={product.photos[0]?.src || ""}
                      imageUrl2={product.photos[1]?.src || ""}
                      productName={product.name}
                      description={product.fulldesc}
                      price={`$${product.price}`}
                    />
                  </Grid>
                ))
              ) : (
                <div>No products available in this category</div>
              )}
            </Grid>
          ) : (
            <div>Select a category to view products</div>
          )}
        </Box>
      </div>
    </Box>
  );
};

export default CategoryProduct;
