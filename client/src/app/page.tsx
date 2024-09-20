import Banner from "@/components/pageComponents/home/Banner";
import CategoryPage from "@/components/pageComponents/home/Category";
import ProductPage from "@/components/pageComponents/home/Products";
import Navbar from "@/components/templates/shared/Navbar";
import React from "react";

const page = () => {
  return (
    <div>
      <Navbar />
      <Banner />
      <CategoryPage />
      <ProductPage />
    </div>
  );
};

export default page;
