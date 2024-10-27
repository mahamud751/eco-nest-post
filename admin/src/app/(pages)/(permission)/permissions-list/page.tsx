"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import DataTable from "@/components/templates/DataTable";
import { Edit } from "@mui/icons-material";

const PermissionsAssign: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "assign",
      headerName: "Assign",
      flex: 1,
      renderCell: (params: { id: { toString: () => string } }) => (
        <div>
          <Link href={`permission-assign`}>
            <Edit color="action" className="mx-2" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/permissions`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/permissions`}
        columns={columns}
        searchField="name"
        link="permission-list"
        isJustEditData={false}
        isJustShowData={false}
      />
    </>
  );
};

export default PermissionsAssign;
