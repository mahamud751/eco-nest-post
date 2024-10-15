"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";

const OrderList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2">
          <p>
            {params.row?.firstName} {params.row?.lastName}
          </p>
        </div>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <DataTable
      fetchUrl="https://api.korbojoy.shop/v1/orders"
      deleteUrl="https://api.korbojoy.shop/v1/orders"
      columns={columns}
      searchField="name"
      link="order-list"
      isJustCreateData={false}
    />
  );
};

export default OrderList;
