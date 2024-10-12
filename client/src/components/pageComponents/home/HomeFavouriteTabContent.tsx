"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";
import { Product } from "@/services/types/types";

const HomeFavouriteTabContent = ({
  title,
  apiEndpoint,
}: {
  title: string;
  apiEndpoint: string;
  hasCountdown?: boolean;
}) => {
  const { data: products, loading, error } = UseFetch<Product[]>(apiEndpoint);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <h2 className="text-3xl font-bold text-[#088178]">{title}</h2>
        </div>
        <button className="px-6 py-2 bg-[#088178] text-white font-bold rounded-lg hover:bg-[#066c5b] transition duration-300">
          View All
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
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
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="mt-16">
              <ProductCard product={product} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeFavouriteTabContent;
