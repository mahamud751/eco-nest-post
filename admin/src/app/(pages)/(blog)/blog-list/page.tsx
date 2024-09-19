"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const BlogList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl="https://api.korbojoy.shop/v1/blogs"
      deleteUrl="https://api.korbojoy.shop/v1/blogs"
      columns={columns}
      searchField="name"
      link="blog-list"
    />
  );
};

export default BlogList;
