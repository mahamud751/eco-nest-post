"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";

const LatestOrders = () => {
  const columns = getCommonColumns([
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2">
          <p>{params.row.firstName}</p>
          <p>{params.row.lastName}</p>
        </div>
      ),
    },

    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created At",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2">
          <p>{UseFormattedDate(params.row?.createdAt) || "N/A"}</p>
        </div>
      ),
    },
  ]);

  return (
    <DataTable
      fetchUrl={`https://api.korbojoy.shop/v1/orders`}
      deleteUrl="https://api.korbojoy.shop/v1/orders"
      columns={columns}
      searchField="name"
      defaultHiddenColumns={["photos"]}
      link="product-list"
      isJustCreateData={false}
    />
  );
};

export default LatestOrders;
