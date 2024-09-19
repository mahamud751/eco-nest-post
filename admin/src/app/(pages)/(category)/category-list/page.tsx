"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const CategoryList = () => {
  const columns = getCommonColumns([]);

  return (
    <DataTable
      fetchUrl="https://api.korbojoy.shop/v1/categories"
      deleteUrl="https://api.korbojoy.shop/v1/categories"
      columns={columns}
      searchField="name"
      link="category-list"
    />
  );
};

export default CategoryList;
