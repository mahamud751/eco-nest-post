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

import { BaseEditProps, Order } from "@/services/types";

import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";

const EditOrder: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Order>(`orders/${params.id}`);
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
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="processing">Processing</MenuItem>
            <MenuItem value="approved">Approved</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
            <MenuItem value="canceled">Canceled</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Order"
        link="/order-list"
        isNoPhotoFile={true}
        photosData={[]}
      />
    </LoadingError>
  );
};

export default EditOrder;
