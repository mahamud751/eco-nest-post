"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { Banner, BaseEditProps, Photo } from "@/services/types";
import BannerForm from "@/components/pageComponents/BannerForm";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";

const EditBanner: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Banner>(`banners/${params.id}`);
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (data) {
      setPhotosData(data?.photos || "");
      setStatus(data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <BannerForm banner={data} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/banners/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Banner"
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/banner-list"
      />
    </LoadingError>
  );
};

export default EditBanner;
