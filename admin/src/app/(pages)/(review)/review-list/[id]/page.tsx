"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { Review, BaseEditProps } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";

const EditReview: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Review>(`reviews/${params.id}`);

  const [status, setStatus] = useState<string>("");

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
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/reviews/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Review"
        link="/review-list"
        isNoPhotoFile={true}
        photosData={[]}
      />
    </LoadingError>
  );
};

export default EditReview;
