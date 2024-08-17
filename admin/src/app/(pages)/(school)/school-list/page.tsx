"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";

const SchoolList = () => {
  const columns = getCommonColumns([
    { field: "email", headerName: "Email", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
  ]);
  return (
    <DataTable
      fetchUrl="http://localhost:8080/v1/schools"
      deleteUrl="http://localhost:8080/v1/schools"
      columns={columns}
      searchField="name"
      // defaultHiddenColumns={["id"]}
      link="school-list"
    />
  );
};

export default SchoolList;
