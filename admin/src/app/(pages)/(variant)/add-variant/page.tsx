"use client";
import React from "react";
import VariantForm from "@/components/pageComponents/VariantForm";
import AddForm from "@/components/templates/AddForm";

const AddVariant: React.FC = () => {
  const additionalFields = <VariantForm variant={null} />;

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      additionalFields={additionalFields}
      buttonText="Add Variant"
      id=""
      photosData={[]}
      link="variant-list"
      isNoPhotoFile={true}
    />
  );
};

export default AddVariant;
