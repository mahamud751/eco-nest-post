"use client";
import { FC, useEffect, useState } from "react";
import { Card, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

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
      className=" relative flex overflow-hidden transition-transform duration-300 ease-in-out"
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
          className="font-semibold text-black"
        >
          {productName}
        </Typography>
        <Typography
          variant="body1"
          color="textPrimary"
          className="font-bold text-[#088178]"
        >
          ${price}
        </Typography>
      </div>
    </Card>
  );
};

const PopularProduct: FC = () => {
  const [data, setData] = useState<{
    data: Product[];
  } | null>(null);
  const fetchData = async () => {
    try {
      const response = await axios.get<{
        data: Product[];
      }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products/popular`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setData(null);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#088178] text-center mb-12">
        Most View
      </h2>
      <div className="container mx-auto py-10 flex justify-center mb-10">
        <div
          className="border-2 border-[#cce7d0] hover:border-[#088178] p-10"
          style={{ position: "relative" }}
        >
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
            <div className="flex flex-col items-center gap-2">
              <KeyboardArrowDownIcon
                className="swiper-button-prev cursor-pointer p-2 text-black"
                style={{
                  fontSize: 24,
                  background: "#cce7d0",
                  borderRadius: "50%",
                }}
              />
              <KeyboardArrowUpIcon
                className="swiper-button-next cursor-pointer p-2 text-black"
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
            slidesPerView={6}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".swiper-button-prev",
              prevEl: ".swiper-button-next",
            }}
            autoplay={{ delay: 1000, disableOnInteraction: false }}
            style={{ height: 600 }}
          >
            {data?.data.map((product) => (
              <SwiperSlide key={product.id} style={{ height: 90 }}>
                <ProductCard
                  photo={product?.photos[0]?.src || ""}
                  productName={product.name.slice(0, 20)}
                  price={product.price}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
