"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import Button from "@mui/material/Button";
import BackupIcon from "@mui/icons-material/Backup";
import DataTable from "@/components/templates/DataTable";
import { useAuth } from "@/services/hooks/auth";
import DemoSubmitModal from "@/components/pageComponents/DemoSubmitModal";
import { Edit } from "@mui/icons-material";

const CustomVendorOrder: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleOpen = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedOrderId(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "files",
      headerName: "File Information",
      flex: 1,
      renderCell: (params) => {
        const fileDetails = params.row.files?.map(
          (detail: { src: string; id: string | null | undefined }) => (
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
          <Link href={`customOrderDemos-details/${params.id}`}>
            <Edit color="action" className="mx-2" />
          </Link>
        </div>
      ),
    },
    {
      field: "submit",
      headerName: "Demo Submit",
      flex: 1,
      renderCell: (params) => (
        <Button
          startIcon={<BackupIcon />}
          onClick={() => handleOpen(params.row.id)}
          className="mr-2 text-emerald-950"
        ></Button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance/${user?.id}/myAdvance`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/advance`}
        columns={columns}
        searchField="name"
        link="order-list"
        isJustCreateData={false}
      />
      {selectedOrderId && (
        <DemoSubmitModal
          open={open}
          handleClose={handleClose}
          orderId={selectedOrderId}
          refetch={() => { }}
        />
      )}
    </>
  );
};

export default CustomVendorOrder;
