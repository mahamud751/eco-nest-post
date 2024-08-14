"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import Link from "next/link";

const BannerList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "files", // Field for file details
      headerName: "File Information",
      flex: 1,
      renderCell: (params) => {
        const fileDetails = params.row.files?.map(
          (detail: {
            src: any;
            id: React.Key | null | undefined;
            url: string;
          }) => (
            <div key={detail.id}>
              <Link
                href={`http://localhost:8080/public/uploads/${detail.src}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {detail.src.split("/").pop()}
              </Link>
            </div>
          )
        );
        return <>{fileDetails}</>;
      },
    },
  ];

  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/advance"
      deleteUrl="http://localhost:8080/v1/advance"
      columns={columns}
      searchField="name"
      link="advance-list"
    />
  );
};

export default BannerList;
