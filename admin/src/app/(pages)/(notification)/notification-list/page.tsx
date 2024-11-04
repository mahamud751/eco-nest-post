"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";

import { useAuth } from "@/services/hooks/auth";

const NotificationList = () => {
  const { user } = useAuth();

  const fetchUrl = `${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications?email=${user?.email}`;

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 160 },
    { field: "userEmail", headerName: "Email", flex: 1, minWidth: 160 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={fetchUrl}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/notifications`}
        columns={columns}
        searchField="name"
        link="notification-list"
        isJustCreateData={false}
      />
    </>
  );
};

export default NotificationList;
