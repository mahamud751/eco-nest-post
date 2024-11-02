"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Image from "next/image";

import HistotyDataTable from "@/components/templates/HistoryDataTable";
import StatusButton from "@/components/atoms/StatusButton";
import { BaseEditProps, Photo, Notification } from "@/services/types";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import CustomTabs from "@/components/molecules/CustomTabs";
import NotificationShow from "@/components/organisms/NotificationShow";

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
        <p>{UseFormattedDate(params.row.oldValue?.createdAt) || "N/A"}</p>
      </div>
    ),
  },
  {
    field: "updatedAt",
    headerName: "Updated At",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        <p>{UseFormattedDate(params.row.newValue?.updatedAt) || "N/A"}</p>
      </div>
    ),
  },
];

const ShowNotification: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Notification>(
    `notifications/${params?.id}`
  );
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LoadingError loading={loading} error={error}>
      <div className="flex justify-end mt-5">
        <Link href={`/notification-list/${params.id}`}>
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
        <>
          {data ? <NotificationShow data={data} /> : <p>No data available.</p>}
        </>
        <div style={{ height: 400, width: "100%" }}>
          <HistotyDataTable
            fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/audit-logs?entityId=${params.id}`}
            columns={columns}
          />
        </div>
      </CustomTabs>
    </LoadingError>
  );
};

export default ShowNotification;
