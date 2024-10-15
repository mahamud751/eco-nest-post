"use client";
import Image from "next/image";
import { Box, useMediaQuery } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import UseFetch from "@/services/hooks/useFetch";
import { Blog } from "@/services/types/types";
import Link from "next/link";

const Blogs = () => {
  const { data: blogs, loading, error } = UseFetch<Blog[]>("blogs");

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  if (loading) return <div>Loading blogs...</div>;
  if (error || !blogs || blogs.length === 0) {
    return <div>Failed to load blogs or no blogs available</div>;
  }

  return (
    <Box className="container mx-auto py-10">
      <div className="mb-10">
        <Box sx={{ marginLeft: isSmallScreen ? 0 : 3, marginTop: 5 }}>
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
              1280: { slidesPerView: 3, spaceBetween: 30 },
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
            {blogs.map((item) => (
              <SwiperSlide key={item.id}>
                <Link href={`blogDetails/${item.id}`} className="mt-16">
                  <div
                    key={item.id}
                    className="flex flex-col overflow-hidden rounded-lg shadow-lg"
                  >
                    <div className="flex-shrink-0">
                      <Image
                        src={item?.photos[0].src}
                        alt={item.name}
                        width={400}
                        height={400}
                        className="h-48 w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between bg-white p-6">
                      <div className="flex-1">
                        <a href="#" className="mt-1 block">
                          <p className="text-xl font-semibold text-gray-900">
                            {item.name.slice(0, 30)}
                          </p>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: item?.desc.slice(0, 90),
                            }}
                            className="mt-3 text-base text-gray-500"
                          />
                        </a>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#">
                            <span className="sr-only">{item.author}</span>
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                              {item?.author}
                            </a>
                          </p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time
                              dateTime={new Date(item.createdAt).toISOString()}
                            >
                              {new Date(item.createdAt).toLocaleDateString()}
                            </time>
                            <span aria-hidden="true">·</span>
                            <span>6 min read</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </div>
    </Box>
  );
};

export default Blogs;
