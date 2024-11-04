"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";

const VariantList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 120 },
    { field: "name", headerName: "Name", flex: 1, minWidth: 120 },
    {
      field: "options",
      headerName: "Options",
      flex: 1,
      minWidth: 120,
      valueParser: (params) =>
        params?.value?.map((item: any, index: number) => (
          <p key={index}>{item}</p>
        )),
    },
  ];

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/variants`}
      columns={columns}
      searchField="name"
      link="variant-list"
    />
  );
};

export default VariantList;
