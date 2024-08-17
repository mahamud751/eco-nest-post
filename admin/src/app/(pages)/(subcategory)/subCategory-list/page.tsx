"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const SubCategoryList = () => {
  const columns = getCommonColumns([
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2">
          <p>{params.row.category?.name}</p>
        </div>
      ),
    },
  ]);

  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/subCategories"
      deleteUrl="http://localhost:8080/v1/subCategories"
      columns={columns}
      searchField="name"
      // defaultHiddenColumns={["id"]}
      link="subCategory-list"
    />
  );
};

export default SubCategoryList;
