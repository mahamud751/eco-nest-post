import Banner from "@/components/pageComponents/home/Banner";
import CategoryPage from "@/components/pageComponents/home/Category";
import CategoryProduct from "@/components/pageComponents/home/CategoryProduct";
import HomeFavouriteTab from "@/components/pageComponents/home/HomeFavouriteTab";
import ProductPage from "@/components/pageComponents/home/Products";
import VerticalProductSlider from "@/components/pageComponents/home/VerticalPordoucSlider";

import React from "react";

const page = () => {
  return (
    <div>
      <Banner />
      <CategoryPage />
      {/* <ProductPage /> */}
      <HomeFavouriteTab />
      <CategoryProduct />
      {/* <VerticalProductSlider /> */}
    </div>
  );
};

export default page;
