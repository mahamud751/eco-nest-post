"use client";
import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import UseFetch from "@/services/hooks/UseRequest";

interface Product {
  id: string;
  name: string;
  price: string;
  photos: { src: string }[];
}

const ProductCard: FC<{
  photo: string;
  productName: string;
  price: string;
}> = ({ photo, productName, price }) => {
  return (
    <Card
      className="relative flex overflow-hidden transition-transform duration-300 ease-in-out bg-white dark:bg-gray-800"
      style={{ width: 320, height: 80 }}
    >
      <div className="relative w-20 h-20">
        <Image
          src={photo}
          alt={productName}
          objectFit="cover"
          width={100}
          height={200}
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ height: 76 }}
        />
      </div>

      <div className="flex flex-col justify-center p-2 w-full">
        <Typography
          variant="body2"
          color="textSecondary"
          className="font-semibold text-black dark:text-white"
        >
          {productName}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          className="font-bold text-[#088178] dark:text-[#4ade80]"
        >
          ${price}
        </Typography>
      </div>
    </Card>
  );
};

const LatestProducts: FC = () => {
  const { data: products } = UseFetch<{ data: Product[] }>("products/latest");

  return (
    <div className="py-20">
      <div className="flex justify-center mb-10">
        <div
          className="border-2 border-[#cce7d0] dark:border-gray-600 hover:border-[#088178] dark:hover:border-[#4ade80] p-10"
          style={{ position: "relative" }}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-2">
              <KeyboardArrowDownIcon
                className="swiper-button-prev cursor-pointer p-2 text-black dark:text-white"
                style={{
                  fontSize: 24,
                  background: "#cce7d0",
                  borderRadius: "50%",
                }}
              />
              <KeyboardArrowUpIcon
                className="swiper-button-next cursor-pointer p-2 text-black dark:text-white"
                style={{
                  fontSize: 24,
                  background: "#cce7d0",
                  borderRadius: "50%",
                }}
              />
            </div>
          </div>

          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            direction="vertical"
            spaceBetween={10}
            slidesPerView={4}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-prev",
              prevEl: ".swiper-button-next",
            }}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            style={{ height: 400 }}
          >
            {products &&
              products?.data?.map((product) => (
                <SwiperSlide key={product.id} style={{ height: 90 }}>
                  <ProductCard
                    photo={product?.photos[0]?.src || ""}
                    productName={product?.name.slice(0, 20)}
                    price={product?.price}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default LatestProducts;
