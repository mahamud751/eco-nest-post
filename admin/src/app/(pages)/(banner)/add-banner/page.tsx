"use client";
import React from "react";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";

const AddBanner: React.FC = () => {
  const additionalFields = <BannerForm banner={null} />;
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint="http://localhost:8080/v1/banners"
      additionalFields={additionalFields}
      buttonText="Add Banner"
      id=""
      photosData={photosData}
      link="banner-list"
    />
  );
};

export default AddBanner;
