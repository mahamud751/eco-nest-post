"use client";
import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  photos: { src: string }[];
}

const CategoryCard: FC<{ photos: string; categoryName: string }> = ({
  photos,
  categoryName,
}) => {
  return (
    <div className="flex flex-col items-center mt-20">
      <Card
        className="relative overflow-hidden transition-transform duration-300 ease-in-out border-2 border-[#cce7d0] hover:border-[#088178]"
        style={{ borderRadius: "50%", width: 140, height: 140 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={photos}
            alt={categoryName}
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          />
        </div>
      </Card>
      <Typography
        variant="body2"
        color="textSecondary"
        className="font-semibold mb-2 text-center text-black m-2"
      >
        {categoryName}
      </Typography>
    </div>
  );
};

const CategoriesPage: FC = () => {
  const {
    data: categories,
    loading,
    error,
  } = UseFetch<Category[]>("categories");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load categories</div>;

  return (
    <div className="container mx-auto py-10 relative">
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

        {categories?.map((category) => (
          <SwiperSlide key={category.id}>
            <Link href={`category/${category.id}`}>
              <CategoryCard
                photos={category.photos[0]?.src || ""}
                categoryName={category.name}
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategoriesPage;
