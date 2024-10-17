"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import HistotyDataTable from "@/components/templates/HistoryDataTable";
import StatusButton from "@/components/atoms/StatusButton";
import { BaseEditProps, Faq } from "@/services/types";
import UseFormattedDate from "@/services/hooks/UseFormattedDate";
import useFetch from "@/services/hooks/UseRequest";
import LoadingError from "@/components/atoms/LoadingError";
import CustomTabs from "@/components/molecules/CustomTabs";
import FaqShow from "@/components/organisms/FaqShow";

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

const ShowFaq: React.FC<BaseEditProps> = ({ params }) => {
  const { data, loading, error } = useFetch<Faq>(`faq/${params?.id}`);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <LoadingError loading={loading} error={error}>
      <div className="flex justify-end mt-5">
        <Link href={`/faq-list/${params.id}`}>
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
        <>{data ? <FaqShow data={data} /> : <p>No data available.</p>}</>
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

export default ShowFaq;
