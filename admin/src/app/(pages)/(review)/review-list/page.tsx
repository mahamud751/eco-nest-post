"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Photo } from "@/services/types";
import Image from "next/image";
import StatusButton from "@/components/atoms/StatusButton";

const ReviewList = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "userName", headerName: "User Name", flex: 1 },
    { field: "comment", headerName: "Comment", flex: 1 },
    { field: "rating", headerName: "Rating", flex: 1 },
    {
      field: "photos",
      headerName: "Photos",
      flex: 1,
      renderCell: (params) => (
        <div className="my-2 flex">
          {params.value?.map(
            (photo: Photo, index: React.Key | null | undefined) => (
              <div key={index} className="flex mr-2">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  width={36}
                  height={36}
                />
              </div>
            )
          )}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <DataTable
      fetchUrl="https://api.korbojoy.shop/v1/reviews"
      deleteUrl="https://api.korbojoy.shop/v1/reviews"
      columns={columns}
      searchField="name"
      link="review-list"
      isJustCreateData={false}
    />
  );
};

export default ReviewList;
