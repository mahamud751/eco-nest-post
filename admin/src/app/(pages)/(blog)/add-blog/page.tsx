"use client";
import React, { useState } from "react";
import AddForm from "@/components/templates/AddForm";
import BlogForm from "@/components/pageComponents/BlogForm";

const AddBlog: React.FC = () => {
  const [desc, setDesc] = useState("");
  const photosData: { title: string; src: string }[] = [];

  const additionalFields = (
    <BlogForm
      blog={null}
      onDetailsChange={(newDetails) => setDesc(newDetails)}
    />
  );

  return (
    <AddForm
      endpoint={`${process.env.NEXT_PUBLIC_BASEURL}/v1/blogs`}
      additionalFields={additionalFields}
      buttonText="Add Blog"
      id=""
      photosData={photosData}
      link="blog-list"
      additionalData={{ desc }}
      isMultiple={true}
    />
  );
};

export default AddBlog;
