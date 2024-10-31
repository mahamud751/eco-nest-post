"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import StatusButton from "@/components/atoms/StatusButton";
import { GridColDef } from "@mui/x-data-grid";

const LatestOrders = () => {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      renderCell: (params) => (
        <p>
          {params.row?.firstName} {params.row?.lastName}
        </p>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "b2b",
      headerName: "IsB2B",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <>
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
