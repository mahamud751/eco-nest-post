"use client";
import { useState } from "react";
import { Tabs, Tab, Box, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";
import { Category } from "@/services/types/types";

const categoryBackgroundColors = [
  "linear-gradient(135deg, #f1f9f4, #a6e3d8)",
  "linear-gradient(135deg, #e6f7ff, #99c2ff)",
  "linear-gradient(135deg, #fff0f6, #ff99c2)",
  "linear-gradient(135deg, #fffbe6, #ffe5b4)",
  "linear-gradient(135deg, #f2e6ff, #c2a6ff)",
  "linear-gradient(135deg, #fff1f1, #ffcccc)",
  "linear-gradient(135deg, #e0f7fa, #80deea)",
  "linear-gradient(135deg, #ffebee, #ef9a9a)",
  "linear-gradient(135deg, #f3e5f5, #e1bee7)",
  "linear-gradient(135deg, #e3f2fd, #64b5f6)",
  "linear-gradient(135deg, #e0f2f1, #26a69a)",
  "linear-gradient(135deg, #f1f8e9, #aed581)",
  "linear-gradient(135deg, #fce4ec, #f48fb1)",
  "linear-gradient(135deg, #e8f5e9, #81c784)",
  "linear-gradient(135deg, #fff3e0, #ffb74d)",
  "linear-gradient(135deg, #f9fbe7, #e6ee9c)",
  "linear-gradient(135deg, #e0e0e0, #9e9e9e)",
  "linear-gradient(135deg, #ffccbc, #ffab91)",
  "linear-gradient(135deg, #d1c4e9, #9575cd)",
  "linear-gradient(135deg, #f0f4c3, #c6ff00)",
];

const CategoryProduct = () => {
  const { data: categories } = UseFetch<Category[]>("categories");
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleTabChange = (event: React.SyntheticEvent, newIndex: number) => {
    setSelectedCategoryIndex(newIndex);
  };

  const selectedCategory = categories && categories[selectedCategoryIndex];

  return (
    <Box className="container mx-auto py-10">
      <div
        className="p-6 md:p-12 shadow-lg rounded-lg mb-10"
        style={{ background: categoryBackgroundColors[selectedCategoryIndex] }}
      >
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
          {categories?.map((category, index) => (
            <Tab
              key={index}
              label={category.name}
              icon={
                <img
                  src={category?.photos[0].src}
                  alt={category.name}
                  style={{ width: 24, height: 24, borderRadius: "50%" }}
                />
              }
              iconPosition="start"
            />
          ))}
        </Tabs>

        <Box sx={{ marginLeft: isSmallScreen ? 0 : 3, marginTop: 5 }}>
          {selectedCategory && selectedCategory?.products?.length > 0 ? (
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
              {selectedCategory?.products?.map((product) => (
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
