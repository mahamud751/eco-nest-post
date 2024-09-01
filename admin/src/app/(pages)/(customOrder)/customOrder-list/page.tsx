"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import { useAuth } from "@/services/hooks/auth";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";

const BannerList = () => {
  const { user } = useAuth();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },

    {
      field: "files",
      headerName: "File Information",
      flex: 1,
      renderCell: (params) => {
        const fileDetails = params.row.files?.map(
          (detail: { src: any; id: React.Key | null | undefined }) => (
            <div key={detail.id}>
              <Link
                href={`http://localhost:8080/public/uploads/${detail.src}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {detail.src.split("/").pop()}
              </Link>
            </div>
          )
        );
        return <div className="space-y-1">{fileDetails}</div>;
      },
    },
  ];

  return (
    <DataTable
      fetchUrl={`http://localhost:8080/v1/advance/${user?.id}/myAdvance`}
      deleteUrl="http://localhost:8080/v1/banners"
      columns={columns}
      searchField="name"
      link="banner-list"
      isJustData={false}
    />
  );
};

export default BannerList;
