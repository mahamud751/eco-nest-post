"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { Review, BaseEditProps, Photo } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import ReviewForm from "@/components/pageComponents/ReviewForm";

const EditReview: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Review>(`reviews/${params.id}`);
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
      <ReviewForm review={data} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`https://api.korbojoy.shop/v1/reviews/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Review"
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/review-list"
      />
    </LoadingError>
  );
};

export default EditReview;
