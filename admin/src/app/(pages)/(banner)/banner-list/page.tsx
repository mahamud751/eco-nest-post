"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";

import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import { Photo } from "@/services/types";

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
      field: "photos",
      headerName: "Photos",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex">
          {params.value?.map(
            (photo: Photo, index: React.Key | null | undefined) => (
              <div key={index} className="flex mr-2">
                <img
                  src={photo.src}
                  alt={photo.title}
                  style={{ width: "36px", height: "36px", objectFit: "cover" }}
                />
              </div>
            )
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/banners"
      deleteUrl="http://localhost:8080/v1/banners"
      columns={columns}
      searchField="name"
      link="banner-list"
    />
  );
};

export default BannerList;
