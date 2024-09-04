"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const LatestProduct = () => {
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
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discountPrice", headerName: "Discount Price", flex: 1 },
    { field: "flashsale", headerName: "Flashsale", flex: 1 },
    {
      field: "sizes",
      headerName: "Sizes",
      flex: 1,
      valueParser: (params) => params?.value?.map((item: any) => <p>{item}</p>),
    },

    {
      field: "colors",
      headerName: "Colors",
      flex: 1,
      valueParser: (params) => params?.value?.map((item: any) => <p>{item}</p>),
    },
  ]);

  return (
    <DataTable
      fetchUrl={`http://localhost:8080/v1/products/latest`}
      deleteUrl="http://localhost:8080/v1/products"
      columns={columns}
      searchField="name"
      defaultHiddenColumns={[""]}
      link="product-list"
      isJustData={false}
    />
  );
};

export default LatestProduct;
