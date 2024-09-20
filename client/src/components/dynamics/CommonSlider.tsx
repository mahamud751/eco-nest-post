"use client";

import { Autoplay, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Link from "next/link";
import UseFetch from "@/services/hooks/useFetch";

interface CommonSliderProps<T> {
  title?: string;
  endpoint: string;
  swiperOptions: any;
  link?: {
    href: string;
    label: string;
  };
  showTitle?: boolean;
  renderSlide: (item: T) => React.ReactNode;
}

const CommonSlider = <T extends { id: string }>({
  title,
  endpoint,
  swiperOptions,
  link,
  showTitle = true,
  renderSlide,
}: CommonSliderProps<T>) => {
  const { data: items, loading, error } = UseFetch<T[]>(endpoint);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {showTitle && title && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="title">{title}</h2>
          {link && (
            <div className="text-end">
              <Link href={link.href} className="explore-section">
                {link.label}
              </Link>
            </div>
          )}
        </div>
      )}
      <Swiper
        modules={[Autoplay, Pagination, Navigation, Scrollbar]}
        {...swiperOptions}
      >
        {items?.map((item) => (
          <SwiperSlide key={item.id}>{renderSlide(item)}</SwiperSlide>
        ))}
        {/* Add pagination, navigation, and scrollbar components */}
        <div className="swiper-pagination"></div>
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-scrollbar"></div>
      </Swiper>
    </div>
  );
};

export default CommonSlider;
