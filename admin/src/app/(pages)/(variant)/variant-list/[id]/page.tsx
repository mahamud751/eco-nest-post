"use client";
import React, { useEffect, useState } from "react";

import { BaseEditProps, Variant } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import VariantForm from "@/components/pageComponents/VariantForm";

const EditVariant: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Variant>(`variants/${params.id}`);
  const [variantOptions, setVariantOptions] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setVariantOptions(data.options || []);
    }
  }, [data]);

  const additionalFields = (
    <>
      <VariantForm
        variant={data}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
      />
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Variant"
        photosData={[]}
        link="variant-list"
        isNoPhotoFile={true}
      />
    </LoadingError>
  );
};

export default EditVariant;
