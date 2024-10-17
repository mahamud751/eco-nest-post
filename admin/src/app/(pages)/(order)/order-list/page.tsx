"use client";
import React, { useState } from "react";
import { GridColDef } from "@mui/x-data-grid";
import StatusButton from "@/components/atoms/StatusButton";
import DataTable from "@/components/templates/DataTable";
import InvoiceModal from "./InvoiceModal";
import { Order } from "@/services/types";

const OrderList = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "name",
      headerName: "User Name",
      flex: 1,
      renderCell: (params) => (
        <p>
          {params.row?.firstName} {params.row?.lastName}
        </p>
      ),
    },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },

    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => <StatusButton status={params.value} />,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          className="mt-3 flex justify-center items-center bg-red-500 text-white px-4 rounded"
          onClick={() => handleOpenModal(params.row)}
          style={{ height: 27 }}
        >
          View Invoice
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`}
        deleteUrl={`${process.env.NEXT_PUBLIC_BASEURL}/v1/orders`}
        columns={columns}
        searchField="name"
        link="order-list"
        isJustCreateData={false}
      />
      {/* Invoice modal component */}
      {selectedOrder && (
        <InvoiceModal
          open={isModalOpen}
          onClose={handleCloseModal}
          selectedOrder={selectedOrder}
        />
      )}
    </>
  );
};

export default OrderList;
