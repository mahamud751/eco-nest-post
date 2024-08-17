"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const BlogList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/blogs"
      deleteUrl="http://localhost:8080/v1/blogs"
      columns={columns}
      searchField="name"
      link="blog-list"
    />
  );
};

export default BlogList;
