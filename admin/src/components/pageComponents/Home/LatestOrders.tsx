"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const LatestOrders = () => {
  const columns = getCommonColumns([
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <div>
          <p>{params.row.firstName}</p>
          <p>{params.row.lastName}</p>
        </div>
      ),
    },

    { field: "email", headerName: "Email", flex: 1 },
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
