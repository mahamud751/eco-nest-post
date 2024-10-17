"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import { useAuth } from "@/services/hooks/auth";

const ProductList = () => {
  const { user } = useAuth();

  const fetchUrl =
    user?.role === "vendor"
      ? `${process.env.NEXT_PUBLIC_BASEURL}/v1/products?email=${user.email}`
      : `${process.env.NEXT_PUBLIC_BASEURL}/v1/products`;

  const columns = getCommonColumns([
    {
      field: "categoryName",
      headerName: "Category Name",
      flex: 1,
      renderCell: (params) => (
        <div>
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
      fetchUrl={fetchUrl}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/products`}
      columns={columns}
      searchField="name"
      defaultHiddenColumns={[""]}
      link="product-list"
    />
  );
};

export default ProductList;
