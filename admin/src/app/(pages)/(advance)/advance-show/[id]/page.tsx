"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import HistotyDataTable from "@/components/templates/HistoryDataTable";
import StatusButton from "@/components/atoms/StatusButton";
import { Advance, BaseEditProps } from "@/services/types";
import useFormattedDate from "@/services/hooks/useFormattedDate";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import CustomTabs from "@/components/molecules/CustomTabs";
import AdvanceShow from "@/components/organisms/AdvanceShow";

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
    field: "OldFiles",
    headerName: "Old Files",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        {params.row.oldValue?.files && params.row.oldValue.files.length > 0
          ? params.row.oldValue.files.map(
              (file: { id: React.Key | null | undefined; title: any }) => (
                <p key={file.id}>{file.title || "No Title"}</p>
              )
            )
          : "No Files"}
      </div>
    ),
  },
  {
    field: "NewFiles",
    headerName: "New Files",
    flex: 1,
    renderCell: (params) => (
      <div className="my-2">
        {params.row.newValue?.files && params.row.newValue.files.length > 0
          ? params.row.newValue.files.map(
              (file: { id: React.Key | null | undefined; title: any }) => (
                <p key={file.id}>{file.title || "No Title"}</p>
              )
            )
          : "No Files"}
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

const ShowAvance: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Advance>(`advance/${params?.id}`);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LoadingError loading={loading} error={error}>
      <div className="flex justify-end mt-5">
        <Link href={`/advance-list/${params.id}`}>
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
          {data ? (
            <AdvanceShow data={data} isFile={true} />
          ) : (
            <p>No data available.</p>
          )}
        </>
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

export default ShowAvance;
