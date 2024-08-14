"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

import HistotyDataTable from "@/components/templates/HistoryDataTable";
import StatusButton from "@/components/atoms/StatusButton";
import { BaseEditProps, Blog, Photo } from "@/services/types";
import useFormattedDate from "@/services/hooks/useFormattedDate";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import CustomTabs from "@/components/molecules/CustomTabs";
import BlogShow from "@/components/organisms/BlogShow";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "OldName",
    headerName: "Old Name",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        <p>{params.row.oldValue?.name || "N/A"}</p>
      </div>
    ),
  },
  {
    field: "NewName",
    headerName: "New Name",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        <p>{params.row.newValue?.name || "N/A"}</p>
      </div>
    ),
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
    renderCell: (params) => (
      <>
        <StatusButton status={params.row.newValue?.status || "Unknown"} />
      </>
    ),
  },
  {
    field: "oldPic",
    headerName: "Old Picture",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 flex">
        {params.row.oldValue?.photos && params.row.oldValue.photos.length > 0
          ? params.row.oldValue.photos.map(
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
            )
          : "No Image"}
      </div>
    ),
  },
  {
    field: "newPic",
    headerName: "New Picture",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2 flex">
        {params.row.newValue?.photos && params.row.newValue.photos.length > 0
          ? params.row.newValue.photos.map(
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
            )
          : "No Image"}
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created At",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        <p>{useFormattedDate(params.row.oldValue?.createdAt) || "N/A"}</p>
      </div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        <p>{useFormattedDate(params.row.newValue?.updatedAt) || "N/A"}</p>
      </div>
    ),
  },
];

const ShowBlog: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Blog>(`blogs/${params?.id}`);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LoadingError loading={loading} error={error}>
      <div className="flex justify-end mt-5">
        <Link href={`/blog-list/${params.id}`}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            className="mr-2 px-6 bg-neutral-950 text-white hover:bg-neutral-700"
          >
            Edit
          </Button>
        </Link>
      </div>
      <CustomTabs
        labels={["Details", "History"]}
        value={value}
        onChange={handleChange}
      >
        <>{data ? <BlogShow data={data} /> : <p>No data available.</p>} </>

        <div style={{ height: 400, width: "100%" }}>
          <HistotyDataTable
            fetchUrl={`http://localhost:8080/v1/audit-logs?entityId=${params.id}`}
            columns={columns}
          />
        </div>
      </CustomTabs>
    </LoadingError>
  );
};

export default ShowBlog;
