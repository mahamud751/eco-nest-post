"use client";

import CommonSlider from "@/components/dynamics/CommonSlider";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  photos: { src: string }[];
}

const ProductsPage = () => {
  const renderSlide = (product: Product) => {
    return (
      <div className="mt-5">
        <Image
          width={2000}
          height={640}
          src={product?.photos[0]?.src}
          alt={product?.name || "Product Image"}
          style={{
            height: 600,
          }}
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
