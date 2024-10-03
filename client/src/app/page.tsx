import Banner from "@/components/pageComponents/home/Banner";
import CategoryPage from "@/components/pageComponents/home/Category";
import CategoryProduct from "@/components/pageComponents/home/CategoryProduct";
import HomeFavouriteTab from "@/components/pageComponents/home/HomeFavouriteTab";

import React from "react";

const page = () => {
  return (
    <div>
      <Banner />
      <CategoryPage />

      <HomeFavouriteTab />
      <CategoryProduct />
    </div>
  );
};

export default page;
