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
    { field: "price", headerName: "Price", flex: 1 },
    { field: "discountPrice", headerName: "Discount Price", flex: 1 },
    { field: "flashsale", headerName: "Flashsale", flex: 1 },
    {
      field: "sizes",
      headerName: "Sizes",
      flex: 1,
      valueParser: (params) =>
        params?.value?.map((item: any, index: number) => (
          <p key={index}>{item}</p>
        )),
    },
    {
      field: "colors",
      headerName: "Colors",
      flex: 1,
      valueParser: (params) =>
        params?.value?.map((item: any, index: number) => (
          <p key={index}>{item}</p>
        )),
    },
  ]);

  return (
    <DataTable
      fetchUrl={`https://api.korbojoy.shop/v1/products/latest`}
      deleteUrl="https://api.korbojoy.shop/v1/products"
      columns={columns}
      searchField="name"
      defaultHiddenColumns={[""]}
      link="product-list"
      isJustCreateData={false}
    />
  );
};

export default LatestProduct;
