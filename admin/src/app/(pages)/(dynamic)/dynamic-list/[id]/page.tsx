"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";
import { BaseEditProps, Dynamic } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import StatusSelect from "@/components/molecules/StatusSelect";
import DynamicForm from "@/components/pageComponents/DynamicForm";

const EditDynamic: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Dynamic>(`dynamics/${params.id}`);
  const [status, setStatus] = useState<string>("");
  const [desc, setDesc] = useState(data?.desc);
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
      <DynamicForm
        dynamic={data}
        onDetailsChange={(newDetails) => setDesc(newDetails)}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/dynamics/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        photosData={[]}
        buttonText="Edit Dynamic"
        link="/dynamic-list"
        additionalData={{ desc }}
        isNoPhotoFile={true}
      />
    </LoadingError>
  );
};

export default EditDynamic;
