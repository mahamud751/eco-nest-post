import Banner from "@/components/pageComponents/home/Banner";
import CategoryPage from "@/components/pageComponents/home/Category";
import HomeFavouriteTab from "@/components/pageComponents/home/HomeFavouriteTab";
import ProductPage from "@/components/pageComponents/home/Products";
import Navbar from "@/components/templates/shared/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <CategoryPage />
      {/* <ProductPage /> */}
      <HomeFavouriteTab />
    </div>
  );
};

export default page;
