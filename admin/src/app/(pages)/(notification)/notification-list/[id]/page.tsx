"use client";
import React, { useEffect, useState } from "react";
import {
  Grid,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { BaseEditProps, Notification } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";

const EditNotification: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Notification>(
    `notifications/${params.id}`
  );
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
            <MenuItem value="read">Read</MenuItem>
            <MenuItem value="unread">UnRead</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Notifications"
        link="/notification-list"
        isNoPhotoFile={true}
        photosData={[]}
      />
    </LoadingError>
  );
};

export default EditNotification;
