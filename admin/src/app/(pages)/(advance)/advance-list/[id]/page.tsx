"use client";
import React, { useEffect, useState } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Advance, BaseEditProps } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import AdvanceForm from "@/components/pageComponents/AdvanceForm";

const EditAdvance: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Advance>(`advance/${params.id}`);
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (data) {
      if (data.files) {
        setFiles(
          data.files.map((file: any) => new File([file.src], file.title))
        );
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
      <AdvanceForm advance={data} />
      <Grid item xs={4}>
        <FormControl fullWidth>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            label="Select Status"
            name="status"
            value={status}
            onChange={handleStatusChange}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="approve">Approve</MenuItem>
            <MenuItem value="reject">Reject</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
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
