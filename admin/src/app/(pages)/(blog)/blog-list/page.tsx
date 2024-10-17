"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const BlogList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/blogs`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/blogs`}
      columns={columns}
      searchField="name"
      link="blog-list"
    />
  );
};

export default BlogList;
