"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Variant } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import VariantForm from "@/components/pageComponents/VariantForm";

const EditVariant: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Variant>(`variants/${params.id}`);
  const [status, setStatus] = useState<string>("");
  const [variantOptions, setVariantOptions] = useState<string[]>([]);
  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <VariantForm
        variant={null}
        variantOptions={variantOptions}
        setVariantOptions={setVariantOptions}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
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
