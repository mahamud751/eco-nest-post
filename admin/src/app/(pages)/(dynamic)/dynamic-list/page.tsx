"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";

const DynamicList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Title", flex: 1 },
    { field: "desc", headerName: "Description", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/dynamics`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/dynamics`}
        columns={columns}
        searchField="name"
        link="dynamic-list"
      />
    </div>
  );
};

export default DynamicList;
