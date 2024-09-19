"use client";
import React, { useEffect, useState } from "react";
import { Grid, SelectChangeEvent } from "@mui/material";

import { BaseEditProps, Blog, Photo } from "@/services/types";
import AddForm from "@/components/templates/AddForm";
import useFetch from "@/services/hooks/UseRequest";
import StatusSelect from "@/components/molecules/StatusSelect";
import LoadingError from "@/components/atoms/LoadingError";
import BlogForm from "@/components/pageComponents/BlogForm";

const EditBlog: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Blog>(`blogs/${params.id}`);
  const [photosData, setPhotosData] = useState<Photo[]>([]);
  const [status, setStatus] = useState<string>("");
  const [desc, setDesc] = useState(data?.desc);

  useEffect(() => {
    if (data) {
      setPhotosData(data.photos || []);
      setStatus(data.status);
    }
  }, [data]);

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as string);
  };

  const additionalFields = (
    <>
      <BlogForm
        blog={data}
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
        endpoint={`https://api.korbojoy.shop/v1/blogs/${params.id}`}
        id={params.id}
        additionalFields={additionalFields}
        buttonText="Edit Blog"
        photosData={photosData}
        setPhotosData={setPhotosData}
        link="/blog-list"
        additionalData={{ desc }}
        isMultiple={true}
      />
    </LoadingError>
  );
};

export default EditBlog;
