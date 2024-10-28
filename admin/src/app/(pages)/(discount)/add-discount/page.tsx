"use client";
import React from "react";
import AddForm from "@/components/templates/AddForm";
import DiscountForm from "@/components/pageComponents/DiscountForm";

const AddDiscount: React.FC = () => {
  const additionalFields = <DiscountForm discount={null} />;
  const photosData: { title: string; src: string }[] = [];
  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/discounts`}
      additionalFields={additionalFields}
      buttonText="Add Discount"
      id=""
      photosData={photosData}
      link="discount-list"
    />
  );
};

export default AddDiscount;
