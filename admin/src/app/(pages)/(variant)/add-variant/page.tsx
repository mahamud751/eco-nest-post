"use client";
import React, { useState } from "react";
import VariantForm from "@/components/pageComponents/VariantForm";
import AddForm from "@/components/templates/AddForm";

const AddVariant: React.FC = () => {
  const [variantOptions, setVariantOptions] = useState<string[]>([]);

  const additionalFields = (
    <VariantForm
      variant={null}
      variantOptions={variantOptions}
      setVariantOptions={setVariantOptions}
    />
  );

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      additionalFields={additionalFields}
      buttonText="Add Variant"
      id=""
      photosData={[]}
      link="variant-list"
      isNoPhotoFile={true}
      additionalData={{
        options: variantOptions,
      }}
    />
  );
};

export default AddVariant;
