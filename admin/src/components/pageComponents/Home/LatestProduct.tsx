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
      renderCell: (params) => <p>{params.row.category?.name}</p>,
    },
    { field: "price", headerName: "Price", flex: 1 },
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
    <>
      {" "}
      <h1 className="text-center mt-5 text-green-700 text-2xl uppercase">
        Latest Products
      </h1>{" "}
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/products/latest`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/products`}
        columns={columns}
        searchField="name"
        defaultHiddenColumns={[""]}
        link="product-list"
        isJustCreateData={false}
        isJustActionData={false}
      />
    </>
  );
};

export default LatestProduct;
