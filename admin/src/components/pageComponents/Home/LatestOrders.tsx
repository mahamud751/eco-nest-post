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
    <>
      <h1 className="text-center mt-5 text-green-700 text-2xl uppercase">
        Latest Orders
      </h1>{" "}
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`}
        columns={columns}
        searchField="name"
        defaultHiddenColumns={["photos"]}
        link="product-list"
        isJustCreateData={false}
        isJustActionData={false}
      />
    </>
  );
};

export default LatestOrders;
