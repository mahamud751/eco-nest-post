"use client";

import React, { useState, useEffect } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Photo, School, User } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import SchoolForm from "@/components/pageComponents/SchoolForm";
import StatusSelect from "@/components/molecules/StatusSelect";

const EditSchool: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<School>(`schools/${params.id}`);
  const [status, setStatus] = useState<string>("");
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setPhotosData(data.photos || "");
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <SchoolForm school={data} />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/schools/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit School"
        id={params.id}
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/school-list"
      />
    </LoadingError>
  );
};

export default EditSchool;
