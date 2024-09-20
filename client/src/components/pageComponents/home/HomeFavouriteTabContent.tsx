"use client";
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import ProductCard from "@/components/organisms/Product/ProductCard";

interface Product {
  _id: string;
  name: string;
  fulldesc: string;
  price: string;
  photos: { src: string }[];
}

const useCountdown = (targetDate: string) => {
  const countDownDate = new Date(targetDate).getTime();
  const [countdown, setCountdown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getTimeComponents(countdown);
};

const getTimeComponents = (countdown: number) => {
  const days = Math.floor(countdown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countdown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countdown % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const HomeFavouriteTabContent = ({
  title,
  apiEndpoint,
  hasCountdown,
}: {
  title: string;
  apiEndpoint: string;
  hasCountdown?: boolean;
}) => {
  const { data: products, loading, error } = UseFetch<Product[]>(apiEndpoint);

  const countdown = hasCountdown ? useCountdown("2024-10-01T00:00:00") : null;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load products</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex">
          <h2 className="text-3xl font-bold text-[#088178]">{title}</h2>
          {hasCountdown && countdown && (
            <div className="ms-20 flex items-center space-x-2 text-lg font-semibold text-red-600 mb-4">
              <span className="mr-2">Ending Soon...</span>
              <div className="bg-[#cce7d0] text-black font-bold rounded-lg px-3 py-1">
                {countdown.days}
              </div>
              <span>d</span>
              <div className="bg-[#cce7d0] text-black font-bold rounded-lg px-3 py-1">
                {countdown.hours}
              </div>
              <span>h</span>
              <div className="bg-[#cce7d0] text-black font-bold rounded-lg px-3 py-1">
                {countdown.minutes}
              </div>
              <span>m</span>
              <div className="bg-[#cce7d0] text-black font-bold rounded-lg px-3 py-1">
                {countdown.seconds}
              </div>
              <span>s left</span>
            </div>
          )}
        </div>
        <button className="px-6 py-2 bg-[#088178] text-white font-bold rounded-lg hover:bg-[#066c5b] transition duration-300">
          View All
        </button>
      </div>
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
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 5 },
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
          <SwiperSlide key={product._id}>
            <div className="mt-16">
              <ProductCard
                key={product._id}
                imageUrl1={product.photos[0]?.src || ""}
                imageUrl2={product.photos[1]?.src || ""}
                productName={product.name}
                description={product.fulldesc}
                price={`$${product.price}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeFavouriteTabContent;
