"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const RiderList = () => {
  const columns = getCommonColumns([
    { field: "email", headerName: "Email", flex: 1, minWidth: 160 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 160 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 160 },
  ]);

  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/users?role=rider`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/users`}
      columns={columns}
      searchField="name"
      // defaultHiddenColumns={["id"]}
      link="user-list"
    />
  );
};

export default RiderList;
