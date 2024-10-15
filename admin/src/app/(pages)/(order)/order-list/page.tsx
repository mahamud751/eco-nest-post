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
        <div className="my-2">
          <p>
            {params.row?.firstName} {params.row?.lastName}
          </p>
        </div>
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
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleOpenModal(params.row)}
        >
          View Invoice
        </button>
      ),
    },
  ];

  return (
    <>
      <DataTable
        fetchUrl="https://api.korbojoy.shop/v1/orders"
        deleteUrl="https://api.korbojoy.shop/v1/orders"
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
