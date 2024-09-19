"use client";

import React, { useState, useEffect } from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { BaseEditProps, Photo, User } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import UserForm from "@/components/pageComponents/UserForm";

const EditUser: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<User>(`users/${params.id}`);
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setRole(data.role);
      setPhotosData(data.photos || "");
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <UserForm role={role} setRole={setRole} user={data} />
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
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="deactive">Deactive</MenuItem>
            <MenuItem value="blocked">Blocked</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`https://api.korbojoy.shop/v1/users/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit User"
        id={params.id}
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/user-list"
      />
    </LoadingError>
  );
};

export default EditUser;
