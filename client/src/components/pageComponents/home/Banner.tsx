"use client";

import CommonSlider from "@/components/dynamics/CommonSlider";
import Image from "next/image";
import { useEffect } from "react";

interface Product {
  id: string;
  name: string;
  photos: { src: string }[];
}

const ProductsPage = () => {
  useEffect(() => {
    const swiperNextButton = document.querySelector(".swiper-button-next");
    const swiperPrevButton = document.querySelector(".swiper-button-prev");

    const handleResize = () => {
      if (window.innerWidth <= 640) {
        if (swiperNextButton) swiperNextButton.classList.add("mt-3");
        if (swiperPrevButton) swiperPrevButton.classList.add("mt-3");
      } else {
        if (swiperNextButton) swiperNextButton.classList.remove("mt-10");
        if (swiperPrevButton) swiperPrevButton.classList.remove("mt-10");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call it initially to set the correct class on load.

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const renderSlide = (product: Product) => {
    return (
      <div className="mt-20 md:mt-5 p-1 md:p-0">
        <Image
          width={2000}
          height={640}
          src={product?.photos[0]?.src}
          alt={product?.name || "Product Image"}
          className="w-full h-[220px] md:h-[600px]"
        />
      </div>
    );
  };

  return (
    <CommonSlider<Product>
      endpoint="banners"
      swiperOptions={{
        direction: "horizontal",
        loop: true,
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          clickable: true,
          el: ".swiper-pagination",
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        scrollbar: {
          el: ".swiper-scrollbar",
        },
        breakpoints: {
          1200: { slidesPerView: 1 },
          800: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
        },
      }}
      renderSlide={renderSlide}
    />
  );
};

export default ProductsPage;
