"use client";
import React from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import Link from "next/link";

const SchoolList = () => {
  const columns = getCommonColumns([
    { field: "email", headerName: "Email", flex: 1 },
    { field: "location", headerName: "Location", flex: 1 },
    {
      field: "link",
      headerName: "Link",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Link
            href={`https://www.korbojoy.shop/measurements/${params.row.id}`}
            className="mt-3 flex justify-center items-center bg-green-500 text-white rounded"
            style={{ height: 30 }}
            target="_blank"
          >
            Add Measurement Link
          </Link>
        </div>
      ),
    },
    {
      field: "measurement",
      headerName: "All Measurement",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Link
            href={`/school-measurement-list/${params.row.id}`}
            className="mt-3 flex justify-center items-center bg-red-500 text-white rounded"
            style={{ height: 30 }}
          >
            Measurements
          </Link>
        </div>
      ),
    },
  ]);
  return (
    <DataTable
      fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/schools`}
      deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/schools`}
      columns={columns}
      searchField="name"
      link="school-list"
    />
  );
};

export default SchoolList;
