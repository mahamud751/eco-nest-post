"use client";
import { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";
import { Product } from "@/services/types";

interface Category {
  id: string;
  name: string;
  products: Product[];
}

const CategoryProduct = () => {
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
  };

  if (loading) return <div>Loading categories...</div>;
  if (error || !categories || categories.length === 0) {
    return <div>Failed to load categories or no categories available</div>;
  }

  const selectedCategory = categories[selectedCategoryIndex];

  return (
    <Box className="container mx-auto py-10">
      <div className="bg-[#f2f9f4] p-12 shadow-lg rounded-lg mb-10">
        <Tabs
          value={selectedCategoryIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            display: "flex",
            flexDirection: isSmallScreen ? "row" : "column",
            overflowX: isSmallScreen ? "auto" : "unset",
            borderRight: !isSmallScreen ? 1 : "none",
            borderColor: "divider",
          }}
          variant={isSmallScreen ? "scrollable" : "standard"}
          scrollButtons={isSmallScreen ? "auto" : false}
          allowScrollButtonsMobile={true}
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category.name} />
          ))}
        </Tabs>

        <Box sx={{ marginLeft: isSmallScreen ? 0 : 3, marginTop: 5 }}>
          {selectedCategory.products.length > 0 ? (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={30}
              slidesPerView={3}
              navigation={{
                nextEl: ".swiper-button-prev",
                prevEl: ".swiper-button-next",
              }}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 1, spaceBetween: 10 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
                1280: { slidesPerView: 5, spaceBetween: 30 },
              }}
            >
              <div
                className="navigation-buttons"
                style={{
                  position: "absolute",
                  top: "22px",
                  right: "60px",
                  zIndex: 10,
                  display: "flex",
                  gap: "10px",
                }}
              >
                <ArrowForwardIosIcon className="swiper-button-prev p-3" />
                <ArrowBackIosIcon className="swiper-button-next p-3" />
              </div>
              {selectedCategory.products.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="mt-16">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div>No products available in this category</div>
          )}
        </Box>
      </div>
    </Box>
  );
};

export default CategoryProduct;
