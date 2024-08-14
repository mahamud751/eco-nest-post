"use client";

import React, { useState, useEffect } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Photo, Subcategory } from "@/services/types";
import SubCategoryForm from "@/components/pageComponents/SubCategoryForm";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";

const EditSubCategory: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Subcategory>(
    `subCategories/${params.id}`
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [photosData, setPhotosData] = useState<Photo[]>([]);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
      setSelectedCategory(data.category.id);
      setPhotosData(data.photos || "");
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <SubCategoryForm
        subCategory={data}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Grid item xs={4}>
        <StatusSelect status={status} handleStatusChange={handleStatusChange} />
      </Grid>
    </>
  );

  return (
    <LoadingError loading={loading} error={error}>
      <AddForm
        endpoint={`http://localhost:8080/v1/subCategories/${params.id}`}
        additionalFields={additionalFields}
        buttonText="Edit Sub Category"
        id={params.id}
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/subCategory-list"
      />
    </LoadingError>
  );
};

export default EditSubCategory;
