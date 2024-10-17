"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import Link from "next/link";
import CustomerAssignVendor from "@/components/molecules/CustomerAssignVendor";
import { Advance } from "@/services/types";
import { Edit } from "@mui/icons-material";

const AdvanceList = () => {
  const [selectedAdvance, setSelectedAdvance] = useState<Advance | null>(null);

  const handleAssignClick = (row: Advance) => {
    setSelectedAdvance(row);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "files",
      headerName: "File Information",
      flex: 1,
      renderCell: (params) => {
        const fileDetails = params.row.files?.map(
          (detail: { src: any; id: React.Key | null | undefined }) => (
            <div key={detail.id}>
              <Link
                href={`${process.env.NEXT_PUBLIC_BASEURL}/public/uploads/${detail.src}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {detail.src.split("/").pop()}
              </Link>
            </div>
          )
        );
        return <div className="space-y-1">{fileDetails}</div>;
      },
    },
    {
      field: "demo",
      headerName: "Demo",
      flex: 1,
      renderCell: (params: { id: { toString: () => string } }) => (
        <div>
          <Link href={`demo-details/${params.id}`}>
            <Edit color="action" className="mx-2" />
          </Link>
        </div>
      ),
    },
    {
      field: "assignVendor",
      headerName: "Assign Vendor",
      flex: 1,
      renderCell: (params) => (
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => handleAssignClick(params.row)}
        >
          Assign
        </button>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance`}
        columns={columns}
        searchField="name"
        link="advance-list"
      />

      {selectedAdvance && (
        <CustomerAssignVendor
          data={selectedAdvance}
          onClose={() => setSelectedAdvance(null)}
        />
      )}
    </div>
  );
};

export default AdvanceList;
