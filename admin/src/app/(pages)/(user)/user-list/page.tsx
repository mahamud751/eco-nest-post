"use client";
import React, { useState } from "react";
import DataTable from "@/components/templates/DataTable";
import { getCommonColumns } from "@/components/templates/CommonColums";
import { User } from "@/services/types";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import { useAuth } from "@/services/hooks/auth";
import CustomerRoleUpdate from "./CustomRoleUpdate";

const UserList = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleAssignClick = (row: User) => {
    setSelectedUser(row);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 120 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      minWidth: 200,
      renderCell: (params) => <p>{params.row?.name}</p>,
    },
    { field: "email", headerName: "Email", flex: 1, minWidth: 120 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 120 },
    { field: "role", headerName: "Role", flex: 1, minWidth: 120 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
  ];
  if (user?.role === "superAdmin") {
    columns.push({
      field: "roleUpdate",
      headerName: "Role Update",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <button
          className="mt-3 flex justify-center items-center bg-gray-700 text-white rounded w-[80px] h-[28px]"
          onClick={() => handleAssignClick(params.row)}
        >
          Update
        </button>
      ),
    });
  }
  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/users`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/users`}
        columns={columns}
        searchField="name"
        // defaultHiddenColumns={["id"]}
        link="user-list"
      />
      {selectedUser && (
        <CustomerRoleUpdate
          data={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default UserList;
