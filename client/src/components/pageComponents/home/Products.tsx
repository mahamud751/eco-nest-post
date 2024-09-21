"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";

interface Product {
  id: string;
  name: string;
  fulldesc: string;
  price: string;
  photos: { src: string }[];
}

const Products = () => {
  const { data: products, loading, error } = UseFetch<Product[]>("products");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="container mx-auto py-10">
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
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 6,
          },
        }}
      >
        <div
          className="navigation-buttons"
          style={{
            position: "absolute",
            top: "30px",
            right: "60px",
            zIndex: 10,
            display: "flex",
            gap: "10px",
          }}
        >
          <ArrowForwardIosIcon className="swiper-button-prev p-3" />{" "}
          <ArrowBackIosIcon className="swiper-button-next p-3" />{" "}
        </div>

        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              key={product.id}
              imageUrl1={product.photos[0]?.src || ""}
              imageUrl2={product.photos[1]?.src || ""}
              productName={product.name}
              description={product.fulldesc}
              price={`$${product.price}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;
