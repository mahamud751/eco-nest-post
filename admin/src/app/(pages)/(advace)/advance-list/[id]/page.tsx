"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { Advance, BaseEditProps } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import AdvanceForm from "@/components/pageComponents/AdvanceForm";

const EditAdvance: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Advance>(`advance/${params.id}`);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);

  useEffect(() => {
    if (data) {
      if (data.files) {
        setFiles(Array.from(data.files));
      } else {
        setFiles([]);
      }

      setStatus(data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <AdvanceForm
        advance={data}
        onDetailsChange={(newDetails) => setQuantity(newDetails)}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`http://localhost:8080/v1/advance/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        additionalData={{
          quantity: quantity,
        }}
        photosData={[]}
        files={files}
        setFiles={setFiles}
        buttonText="Edit Advance"
        isFile={true}
        link="/advance-list"
      />
    </LoadingError>
  );
};

export default EditAdvance;
