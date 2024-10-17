"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const CategoryList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/categories`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/categories`}
      columns={columns}
      searchField="name"
      link="category-list"
    />
  );
};

export default CategoryList;
