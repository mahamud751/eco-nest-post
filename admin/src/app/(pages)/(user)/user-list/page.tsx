"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const UserList = () => {
  const columns = getCommonColumns([
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
  ]);
  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/users"
      deleteUrl="http://localhost:8080/v1/users"
      columns={columns}
      searchField="name"
      // defaultHiddenColumns={["id"]}
      link="user-list"
    />
  );
};

export default UserList;
